import React, { useState, useEffect, useRef } from "react";
import { WebR } from "@r-wasm/webr";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";

const webR = new WebR();

const WebRRunner = ({ code, isDarkMode }) => {
  const [output, setOutput] = useState("Ready to run code");
  const canvasRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const initWebR = async () => {
      try {
        await webR.init();
        console.log("WebR initialized");
      } catch (err) {
        console.error("WebR initialization failed:", err);
        setOutput(`Error initializing WebR: ${err.message}`);
      }
    };
    initWebR();
  }, []);

  const runCode = async () => {
    try {
      setOutput("Running...");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Use webr::canvas device for live plotting
      await webR.evalRVoid("options(device = webr::canvas)");

      let isPlottable = /\b(plot|hist|boxplot|barplot|image)\s*\(/i.test(code);

      // Setup canvas listening loop
      (async () => {
        for (;;) {
          const output = await webR.read();
          if (output.type === "canvas") {
            if (output.data.event === "canvasImage") {
              const image = output.data.image;
              ctx.drawImage(image, 0, 0);
            } else if (output.data.event === "canvasNewPage") {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
          } else {
            console.log("Other output:", output);
          }
        }
      })();


      await webR.evalRVoid(code);

      // Capture textual result
      const result = await webR.evalR(code);
      const jsResult = await result.toJs();
      const stringResult = JSON.stringify(jsResult, null, 2);

      // Show text if not a plot
      if (!isPlottable) {
        setOutput(<pre>{stringResult}</pre>);
      } else {
        setOutput(null);
      }
    } catch (err) {
      console.error("WebR Error:", err);
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <Box
      sx={{
        top: 20,
        left: 20,
        right: 20,
        height: "100%",
        borderRadius: "5px",
        zIndex: 1,
      }}
    >
      <Stack direction="row">
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: theme.palette.primary.contrastText,
            paddingBottom: "15px",
          }}
        >
          Output
        </Typography>

        <Fab
          size="small"
          variant="extended"
          sx={{
            left: 20,
            width: "140px",
            bgcolor: "#33bfff",
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: "#00b0ff",
            },
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
            sx={{
              color: theme.palette.primary.contrastText,
              whiteSpace: "pre-wrap",
            }}
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
