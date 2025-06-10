import React, { useState, useEffect, useRef } from "react";
import { WebR } from "@r-wasm/webr";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";

// WebR initialization outside the component
const webR = new WebR();
let initializationPromise = null;
let installedPackages = [];

// WebR package Initialization 
const initializeWebR = async (setOutput) => {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      try {
        setOutput("Initializing WebR...");
        await webR.init();
        
        const packagesToTry = [
          { name: 'ggplot2', essential: true },
          { name: 'jsonlite', essential: true },
          { name: 'geojsonio', essential: false },
          { name: 'leaflet', essential: false },
          { name: 'sf', essential: false },
        ];
        
        for (const pkg of packagesToTry) {
          try {
            setOutput(`Checking ${pkg.name}...`);
            const check = await webR.evalR(`requireNamespace("${pkg.name}", quietly = TRUE)`);
            const installed = (await check.toJs()).values[0];
            
            if (!installed) {
              setOutput(`Installing ${pkg.name}...`);
              await webR.evalRVoid(`webr::install("${pkg.name}", repos = "https://repo.r-wasm.org/")`);
              installedPackages.push(pkg.name);
            } else if (!installedPackages.includes(pkg.name)) {
              installedPackages.push(pkg.name);
            }
          } catch (err) {
            console.warn(`Package ${pkg.name} error:`, err);
            if (pkg.essential) throw err;
          }
        }

        // Helper functions setup
        if (installedPackages.includes('jsonlite')) {
          await webR.evalRVoid(`
            read_geojson_text <- function(geojson_text) {
              jsonlite::fromJSON(geojson_text, simplifyVector = FALSE)
            }
            
            extract_coordinates <- function(geojson_obj) {
              if (geojson_obj$type == "FeatureCollection") {
                coords_list <- list()
                for (i in seq_along(geojson_obj$features)) {
                  feature <- geojson_obj$features[[i]]
                  if (feature$geometry$type == "Point") {
                    coords_list[[i]] <- feature$geometry$coordinates
                  } else if (feature$geometry$type == "Polygon") {
                    coords_list[[i]] <- feature$geometry$coordinates[[1]][[1]]
                  }
                }
                return(coords_list)
              }
              return(NULL)
            }
            
            geojson_to_df <- function(geojson_text) {
              geojson_obj <- read_geojson_text(geojson_text)
              if (geojson_obj$type == "FeatureCollection") {
                df_list <- list()
                for (i in seq_along(geojson_obj$features)) {
                  feature <- geojson_obj$features[[i]]
                  props <- feature$properties
                  if (feature$geometry$type == "Point") {
                    props$lon <- feature$geometry$coordinates[[1]]
                    props$lat <- feature$geometry$coordinates[[2]]
                  }
                  df_list[[i]] <- props
                }
                return(do.call(rbind.data.frame, df_list))
              }
              return(data.frame())
            }
          `);
        }

        return installedPackages;
      } catch (err) {
        console.error("WebR initialization failed:", err);
        throw err;
      }
    })();
  }
  
  return initializationPromise;
};

const WebRRunner = ({ code, isDarkMode }) => {
  const [output, setOutput] = useState("Ready to run code");
  const [geojsonVar, setGeojsonVar] = useState("");
  const [availablePackages, setAvailablePackages] = useState([]);
  const canvasRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Initialize WebR
  useEffect(() => {
    initializeWebR(setOutput)
      .then((packages) => {
        setAvailablePackages(packages);
        setOutput(`Ready! Available packages: ${packages.join(', ')}`);
      })
      .catch((err) => {
        setOutput(`Error initializing WebR: ${err.message}`);
      });
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      JSON.parse(text);
      
      const safeText = JSON.stringify(text);
      const defineGeojson = `geojson_text <- ${safeText}`;
      setGeojsonVar(defineGeojson);
      setOutput(`GeoJSON file "${file.name}" loaded successfully. Use 'geojson_to_df(geojson_text)' to convert to data frame.`);
    } catch (err) {
      setOutput(`Error loading GeoJSON file: ${err.message}`);
    }
  };

  const runCode = async () => {
    try {
      setOutput("Running...");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      await webR.evalRVoid("options(device = webr::canvas)");

      (async () => {
        for (;;) {
          try {
            const output = await webR.read();
            if (output.type === "canvas") {
              if (output.data.event === "canvasImage") {
                const image = output.data.image;
                ctx.drawImage(image, 0, 0);
              } else if (output.data.event === "canvasNewPage") {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
              }
            }
          } catch (readErr) {
            break;
          }
        }
      })();

      const fullCode = `${geojsonVar ? geojsonVar + "\n" : ""}${code}`;

      if ((fullCode.includes('library(sf)') || fullCode.includes('require(sf)')) && 
          !availablePackages.includes('sf')) {
        setOutput(`Warning: 'sf' package is not available. Try using 'jsonlite' with helper functions.`);
        return;
      }

      await webR.evalRVoid(fullCode);

      const isPlottable = /\b(plot|hist|boxplot|barplot|image|ggplot)\s*\(/i.test(code);
      if (!isPlottable) {
        const result = await webR.evalR(code);
        const jsResult = await result.toJs();
        const stringResult = JSON.stringify(jsResult, null, 2);
        setOutput(<pre>{stringResult}</pre>);
      } else {
        setOutput("Plot generated successfully!");
      }
    } catch (err) {
      console.error("WebR Error:", err);
      let errorMessage = err.message;
      if (errorMessage.includes("sf") || errorMessage.includes("units")) {
        errorMessage += "\n\nTip: Try using 'jsonlite' for GeoJSON processing instead.";
      }
      setOutput(`Error: ${errorMessage}`);
    }
  };

  return (
    <Box sx={{ top: 20, left: 20, right: 20, height: "100%", borderRadius: "5px", zIndex: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.primary.contrastText }}>
          Output
        </Typography>

        <input type="file" accept=".geojson" onChange={handleFileUpload} style={{ color: "#fff" }} />

        <Fab
          size="small"
          variant="extended"
          sx={{
            width: "140px",
            bgcolor: "#33bfff",
            color: theme.palette.primary.contrastText,
            "&:hover": { bgcolor: "#00b0ff" },
            boxShadow: "none",
          }}
          onClick={runCode}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <PlayArrow fontSize="small" />
            <Typography fontWeight="bold">Run R Code</Typography>
          </Box>
        </Fab>
      </Stack>

      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          width: "100%",
          height: "75%",
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
          padding: "20px",
        }}
      >
        {output && typeof output === "string" ? (
          <Typography
            fontWeight="bold"
            sx={{ color: theme.palette.primary.contrastText, whiteSpace: "pre-wrap" }}
          >
            {output}
          </Typography>
        ) : (
          output
        )}

        <canvas
          ref={canvasRef}
          width="1008"
          height="1008"
          style={{ width: "450px", height: "450px", display: "block", marginTop: "10px" }}
        />
      </Box>
    </Box>
  );
};

export default WebRRunner;
