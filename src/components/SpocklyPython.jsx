import { useEffect, useState, useRef } from "react";
import BlocklyComponent from "./BlocklyComponentPython";
import CodeDisplay from "./CodeDisplayPython";
import { Card, Box, Grid, Tab, Tabs, Tooltip } from "@mui/material";
import { darkTheme, lightTheme } from "../appTheme";
import FileUploadManager from "./FileUploadManagerPython";
import CodeOutput from "./CodeOutput"
import { MdOutlineOutput } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import main from "./init";
import useSpocklyTour from "./useSpocklyTour";
import BlockExplanations from "./BlockExplanationsPython";
import { FaHandsHelping } from "react-icons/fa";

function TabPanel({ children, value, index }) {
  return (
    <div
      hidden={value !== index}
      role="tabpanel"
      style={{
        height: "100%",
        display: value === index ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, height: "100%" }}>{ children }</Box>
    </div>
  );
}

export default function SPOCKLY({ isDarkMode }) {
  const [code, setCode] = useState("Generated Python code will appear here...");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [currentPackage, setCurrentPackage] = useState("");
  const [plot, setPlot] = useState("");
  const workspaceRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useSpocklyTour();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const [isLoading, setIsLoading] = useState(true);
  const [output, setOutput] = useState("Loading Pyodide...\n\nIf this is taking too long, please try refreshing the page.");
  useEffect(() => {
    const firstRun = async () => {
        const code = `
import pyodide_js
await pyodide_js.loadPackage(['pandas', 'geopandas', 'requests', 'numpy', 'shapely'])
`;
        const result = await main(code);
        setOutput(result);
        console.info('Pyodide is ready!');
        setIsLoading(false);
        
    }
    firstRun();
  }, []);

  const handleUploadClick = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadClose = () => {
    setUploadDialogOpen(false);
  };

//Keyboard shortcuts
  try {
    document.addEventListener(
      "keydown",
      (ev) => {
        const keyName = ev.key;
          if (keyName === "Control") {
          return;
       }
        if ((ev.ctrlKey || ev.metaKey) && keyName === 'ArrowRight') {
          ev.preventDefault();
          setValue((value + 1) > 2 ? 2 : (value + 1));
        }
      },
      false,
    );
    document.addEventListener(
      "keydown",
      (ev) => {
        const keyName = ev.key;
        if (keyName === "Control") {
          return;
        }
        if ((ev.ctrlKey || ev.metaKey) && keyName === 'ArrowLeft') {
          ev.preventDefault();
          setValue((value - 1) < 0 ? 0 : (value - 1));
        }
      },
      false,
    );
  } catch (e) {
    console.warn("Keyboard shortcuts not available in this environment.");
  }
  document.addEventListener(
    "keydown",
    (ev) => {
      const keyName = ev.key;
        if (keyName === "Control") {
        return;
     }
      if ((ev.ctrlKey || ev.metaKey) && ev.altKey && keyName === 'o') {
        ev.preventDefault();
        setValue(2);
      }
    },
    false,
  );
  document.addEventListener(
    "keydown",
    (ev) => {
      const keyName = ev.key;
        if (keyName === "Control") {
        return;
      }
      if ((ev.ctrlKey || ev.metaKey) && ev.altKey && keyName === 'c') {
        ev.preventDefault();
        setValue(1);
      }
    },
    false,
  );
  document.addEventListener(
    "keydown",
    (ev) => {
      const keyName = ev.key;
      if (keyName === "Control") {
        return;
      }
      if ((ev.ctrlKey || ev.metaKey) && ev.altKey && keyName === 'h') {
        ev.preventDefault();
        setValue(0);
      }
    },
    false,
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Grid
        container
        sx={{
          flexGrow: 1,
          height: "100vh",
        }}
      >
        <Grid size={ 6 } sx={{ height: "100%" }}>
          <Card
            sx={{
              m: 2,
              p: 2,
              borderRadius: 4,
              backgroundColor: theme.palette.primary.main,
              height: "85%",
              boxShadow: 3,
            }}
          >
            <BlocklyComponent
              setCode={ setCode }
              isDarkMode={ isDarkMode }
              onUploadClick={ handleUploadClick }
              workspaceRef={ workspaceRef }
            />
          </Card>
        </Grid>
        <Grid
          size={ 6 }
          sx={{
            height: "100%",
            overflow: "auto",
          }}
        >
          <Card
            sx={{
              m: 2,
              p: 2,
              borderRadius: "16px",
              backgroundColor: theme.palette.primary.main,
              height: "85%",
              position: "relative",
            }}
          >
            <Tabs
              value={ value }
              onChange={ handleChange }
              sx={{
                padding: 1,
                backgroundColor: theme.palette.background.default,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Tooltip title="Ctrl + Alt + H">
                <Tab
                  id="helpTab"
                  label={
                    <Box display="flex" alignItems="center" gap={ 1 }>
                      <FaHandsHelping /> Help
                    </Box>
                  }
                  sx={{
                    fontWeight: "bold",
                    color: isDarkMode ? "lightgrey" : "darkgrey",
                    textTransform: "none",
                  }}
                />
                </Tooltip>
                <Tooltip title="Ctrl + Alt + C">
                  <Tab
                    id="codeTab"
                    label={
                      <Box display="flex" alignItems="center" gap={ 1 }>
                        <FaCode /> Code
                      </Box>
                    }
                    sx={{
                      fontWeight: "bold",
                      color: isDarkMode ? "lightgrey" : "darkgrey",
                      textTransform: "none",
                    }}
                  />
                </Tooltip>
                <Tooltip title="Ctrl + Alt + O">
                  <Tab
                    id="outputTab"
                    label={
                      <Box display="flex" alignItems="center" gap={ 1 }>
                        <MdOutlineOutput /> Output
                      </Box>
                    }
                    sx={{
                      fontWeight: "bold",
                      color: isDarkMode ? "lightgrey" : "darkgrey",
                      textTransform: "none",
                    }}
                  />
                  {/* <Box sx={{ marginLeft: "auto", marginRight: "50px" }}>
                    <MiniPackageLoadingBar currentPackage={ currentPackage } />
                  </Box> */}
                </Tooltip>
            </Tabs>
            <TabPanel value={ value } index={ 0 }>
              <Box sx={{ height: "60%", p: 1 }}>
                <BlockExplanations
                  isDarkMode={ isDarkMode }
                  workspaceRef={ workspaceRef }
                />
              </Box>
            </TabPanel>
            <TabPanel value={ value } index={ 1 }>
              <Box sx={{ height: "60%", p: 1 }}>
                <CodeDisplay
                  code={ code }
                  setCode={ setCode }
                  isDarkMode={ isDarkMode }
                  workspaceRef={ workspaceRef }
                />
              </Box>
            </TabPanel>
            <TabPanel value={ value } index={ 2 }>
              <Box sx={{ height: "60%", p: 1 }}>
                <CodeOutput 
                  setPlot={ setPlot } 
                  code={ code } 
                  isDarkMode={ isDarkMode }
                  setCurrentPackage={ setCurrentPackage }
                />
              </Box>
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
      <FileUploadManager
        isDarkMode={ isDarkMode }
        open={ uploadDialogOpen }
        onClose={ handleUploadClose }
      />
    </Box>
  );
}
