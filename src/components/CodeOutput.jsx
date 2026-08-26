import { useEffect, useState, useRef } from "react";
import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  PlayArrow,
  OpenInNew,
  Visibility,
  VisibilityOff,
  RestartAlt
} from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";
import main from './init.js';
import { pyodideWorker, asyncRun } from "./workerApi.mjs";
import PackageLoadingDialog from "./PackageLoadingDialog.jsx";

const CodeOutput = ({ code, isDarkMode, setPlot }) => {
    const [isLoading, setIsLoading] = useState(true);
    const theme = isDarkMode ? darkTheme : lightTheme;
    const [isAPlot, setIsAPlot] = useState(false);
    const [showPlot, setShowPlot] = useState(true);
    const [isAMap, setIsAMap] = useState(false);
    const [showMap, setShowMap] = useState(true);
    const [showLoadingDialog, setShowLoadingDialog] = useState(false);
    const [currentPackage, setCurrentPackage] = useState("");
    const [packagesReady, setPackagesReady] = useState(false);
    const canvasRef = useRef(null);
    const [output, setOutput] = useState("Loading Pyodide...\n\nIf this is taking too long, please try refreshing the page.");

    const CANVAS_SIZE = 650;

    const openPlotInNewTabHandler = () => {
      window.open(`data:image/jpeg;base64,${globalThis.getRes()}`, '_blank');
    };
    const openMapInNewTabHandler = async () => {
      let fileName;
      try {
        fileName = code.split("m.save('")[1].split(".html')")[0];
      } catch {
        fileName = 'map';
      }
      let txt = await asyncRun(`
        with open('${fileName}.html', 'rt') as fh:
            txt = fh.read()
        txt
`, {});
      const blob = new Blob([txt.result], {type : 'text/html'});
      let url = window.URL.createObjectURL(blob);
      window.open(url);
      window.URL.revokeObjectURL(url);
    };
    const hidePlotHandle = () => setShowPlot(false);
    const showPlotHandle = () => setShowPlot(true);
    const hideMapHandle = () => {
      setShowMap(false);
      var d = document.getElementById("iframeMap");
      var e = document.getElementById("responsiveBox2");
      Array.from(e.children).forEach(child => {
        child.style.display = "block";
      });
      if (d) {
        d.style.display = "none";
      }
    };
    const showMapHandle = () => {
      setShowMap(true);
      var d = document.getElementById("iframeMap");
      var e = document.getElementById("responsiveBox2");
      Array.from(e.children).forEach(child => {
        child.style.display = "none";
      });
      if (d) {
        d.style.display = "block";
      }
    };

    const runCode = async () => {
      setIsAPlot(false);
      setIsAMap(false);
      setShowPlot(true);
      console.log('Running code...');
      setOutput("Running...");
      if(~code.indexOf('plt.') || ~code.indexOf('df_interp.plot')) {
        code = `
import io
import base64
import js

class Dud:
    def __init__(self, *args, **kwargs) -> None:
        return
    
    def __getattr__(self, __name: str):
        return Dud

js.document = Dud()
bytes_io = None
base64_encoded_spectrogram = None

${code}

bytes_io = io.BytesIO()
plt.savefig(bytes_io, format='jpg')
bytes_io.seek(0)
base64_encoded_spectrogram = base64.b64encode(bytes_io.read())
print(base64_encoded_spectrogram.decode('utf-8'))`
      }

      const result = await main(code);

      /*** Create map w/ Folium ***/
      const saveMap = !~code.indexOf('###DISPLAYONLY###');
      var fileName;
      try {
        fileName = code.split("m.save('")[1].split(".html')")[0];
      } catch {
        fileName = 'map';
      }

      window.foliumHandler = async (fileName) => {
        setIsAMap(true);
        let txt = await asyncRun(`
          with open('${fileName}.html', 'rt') as fh:
              txt = fh.read()
          txt
`, {});
        const blob = new Blob([txt.result], {type : 'text/html'});
        const box = document.getElementById("responsiveBox2");
        let url = window.URL.createObjectURL(blob);
        try {
          document.getElementById("iframeMap").remove();
        } catch {}
        var iframe = document.createElement("iframe");
        iframe.id = 'iframeMap';
        iframe.style.border = "none";
        iframe.src = url;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        var e = document.getElementById("responsiveBox2");
        Array.from(e.children).forEach(child => {
          child.style.display = "none";
        });
        box.appendChild(iframe);
        if (saveMap) {
          var a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          a.click();
        }
        window.URL.revokeObjectURL(url); //Preventing memory leaks
        return url;
      }
      if(~code.indexOf("m.save('")) {
        foliumHandler(fileName);
      }

      /*** Plot w/ Plotly ***/
      const savePlot = !~code.indexOf('###DISPLAYONLY###');
      var plotlyFileName;
      try {
        plotlyFileName = code.split("write_html('")[1].split(".html')")[0];
      } catch {
        plotlyFileName = 'plot';
      }
      window.plotlyHandler = async (plotlyFileName) => {
        setIsAMap(true);
        let txtBis = await asyncRun(`
          with open('${plotlyFileName}.html', 'rt') as fh:
              txt = fh.read()
          txt
`, {});
        const blobBis = new Blob([txtBis.result], {type : 'text/html'});
        const boxBis = document.getElementById("responsiveBox2");
        let urlBis = window.URL.createObjectURL(blobBis);
        try {
          document.getElementById("iframeMap").remove();
        } catch {}
        var iframe = document.createElement("iframe");
        iframe.id = 'iframeMap';
        iframe.style.border = "none";
        iframe.src = urlBis;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        var e = document.getElementById("responsiveBox2");
        Array.from(e.children).forEach(child => {
          child.style.display = "none";
        });
        boxBis.appendChild(iframe);
        if(savePlot) {
          var a = document.createElement("a");
          a.href = urlBis;
          a.download = plotlyFileName;
          a.click();
        }
        window.URL.revokeObjectURL(urlBis);
        return urlBis;
      }
      if(~code.indexOf("write_html('")) {
        plotlyHandler(plotlyFileName);
      }

      setOutput(result);
      if (typeof result === "string" && result.length > 100 && /^[A-Za-z0-9+/=\s]+$/.test(result)) {
        setIsAPlot(true);
        try {
          setPlot(result);
        } catch {
          setPlot("");
        }
      } else {
        setPlot("");
      }

      globalThis.getRes = () => {
        return result;
      }
    }
    useEffect(() => {
      pyodideWorker.addEventListener("message", (event) => {
        if (event.data && event.data.ready) {
          setOutput('No output');
          setIsLoading(false);
        }
      });
    }, []);
    useEffect(() => {
      const findInfo = () => {
          const cslInfo = console.info;
          console.info = function(message) {
            onInfo(message);
          };

          function onInfo(message) {
            cslInfo(message);
            if (message === 'Pyodide is ready!') {
              try {
                  document.getElementsByClassName('Mui-disabled')[0].classList.remove('Mui-disabled');
              } catch {}
              document.getElementById('toast').style.color = '#089d08';
              document.querySelector('#toast p').innerHTML = 'Libraries loaded!';
              document.getElementById('toast').style.animation = 'slideOut 5s ease-in-out';
              setTimeout(() => document.getElementById('toast').style.display = 'none', 4950);
              document.addEventListener(
                "keydown",
                (ev) => {
                  const keyName = ev.key;
                      if (keyName === "Control") {
                      return;
                  }
                  if ((ev.ctrlKey || ev.metaKey) && ev.altKey && keyName === 'Enter') {
                    ev.preventDefault();
                    runCode();
                  }
                },
                false,
              );
            }
        }
      };
      findInfo();
    });

    return (
        <Box
      sx={{
        height: "100%",
        borderRadius: "5px",
      }}
    >
      <Stack direction="row-reverse" sx={{ paddingY: 1 }}>
        <Box 
        sx={{
          height: "100%",
          zIndex: 1,
          color: theme.palette.primary.light,
          paddingBottom: "15px",
        }}
        >
          <Stack direction="row" gap={ 1 }>
            <Box display="flex" alignItems="center" gap={ 0.5 } sx={{ marginRight: "10px" }}>
              <Typography sx={{ fontSize: "0.9em", color: "#BBB" }}>Ctrl + Alt + Enter</Typography>  
            </Box>
            <Tooltip title="Run Python Code">
              <IconButton
                onClick={ runCode }
                disabled={ isLoading }
                sx={{
                  bgcolor: "#33bfff",
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    bgcolor: "#00b0ff",
                  },
                }}
              >
                <PlayArrow />
              </IconButton>
            </Tooltip>

            <Tooltip title="Reset output">
                  <IconButton
                    onClick={
                      () => {
                        hidePlotHandle();
                        setOutput("");
                        setIsAPlot(false);
                        setShowPlot(false);
                        setIsAMap(false);
                        setShowMap(true);
                        try {
                          document.getElementById("iframeMap").remove();
                          Array.from(document.getElementById("responsiveBox2").children).forEach(child => {
                            child.style.display = "block";
                          });
                        } catch {}
                      }
                    }
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      "&:hover": {
                        bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
                      },
                    }}
                  >
                    <RestartAlt />
                  </IconButton>
                </Tooltip>
            { isAPlot ? (
                <Tooltip title="Open plot in new tab">
                  <IconButton
                    onClick={ openPlotInNewTabHandler }
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      "&:hover": {
                        bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
                      },
                    }}
                  >
                    <OpenInNew />
                  </IconButton>
                </Tooltip>
            ) : (isAMap ? (
              <Tooltip title="Open map in new tab">
                <IconButton
                  onClick={ openMapInNewTabHandler }
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    "&:hover": {
                      bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
                    },
                  }}
                >
                  <OpenInNew />
                </IconButton>
              </Tooltip>
            ) : null) }
                { isAPlot && showPlot ? (
                  <Tooltip title="Hide plot">
                  <IconButton
                    onClick={ hidePlotHandle }
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      "&:hover": {
                        bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
                      },
                    }}
                  >
                    <VisibilityOff />
                  </IconButton>
                </Tooltip>
                ) : (null) }
                { isAPlot && !showPlot ? (
                  <Tooltip title="Show plot">
                    <IconButton
                      onClick={ showPlotHandle }
                      sx={{
                        backgroundColor: theme.palette.primary.light,
                        "&:hover": {
                          bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
                        },
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  ) : (null) }
                  { isAMap && showMap ? (
                  <Tooltip title="Hide map">
                  <IconButton
                    onClick={ hideMapHandle }
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      "&:hover": {
                        bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
                      },
                    }}
                  >
                    <VisibilityOff />
                  </IconButton>
                </Tooltip>
                ) : (null) }
                { isAMap && !showMap ? (
                  <Tooltip title="Show map">
                  <IconButton
                    onClick={ showMapHandle }
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      "&:hover": {
                        bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
                      },
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>
                ) : (null) }
          </Stack>
        </Box>
      </Stack>
      { isAPlot && showPlot ? (
        <img
          src={`data:image/jpeg;base64,${globalThis.getRes()}`}
          alt="Plot"
          style={{
            height: "auto",
            borderRadius: "5px",
            overflow: "auto",
            zIndex: 1,
            position: "relative",
            width: "100%",
            display: "flex",
          }}
         />
          ) : (
            <Box
        id="responsiveBox2"
        sx={{
          position: "relative",
          borderRadius: "5px",
          width: "100%",
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
          overflow: "auto",
        }}
      >
        <Typography
          sx={{
            color: isDarkMode ? "#FFFFFA" : "#000000",
            paddingBottom: "10px",
            padding: "20px",
            whiteSpace: "pre-wrap",
          }}
        >
          { output || 'No output' }
        </Typography>
      </Box>
          ) }
          {/* <Box sx={{ marginX: 4 }}>
          <canvas
            ref={ canvasRef }
            width={ CANVAS_SIZE * window.devicePixelRatio }
            height={ CANVAS_SIZE * window.devicePixelRatio }
            style={{
              width: CANVAS_SIZE + "px",
              height: CANVAS_SIZE + "px",
              display: "block",
            }}
          />
          <PackageLoadingDialog
            open={ showLoadingDialog }
            currentPackage={ currentPackage }
            onClose={ () => setShowLoadingDialog(false) }
          />
        </Box> */}
    </Box>
    );
};

export default CodeOutput;