import {
  Box,
  Tab,
  Tabs,
  Typography,
  useTheme,
  Button,
  InputAdornment,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Divider
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLocation } from "react-router-dom";
import TabPanel from "../../components/TabPanel";
import WebRRunner from "../../components/WebRRunner";
import tutorialData from "../../data/tutorialData.json";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Tutorials = ({ isDarkMode }) => {
  const [value, setValue] = useState(0);
  const [isGerman, setIsGerman] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const theme = useTheme();
  const webRRef = useRef(null);

  // Change active tutorial tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle content search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 1) {
      const results = tutorialData
        .map((tut, index) => ({
          index,
          headline: isGerman ? tut.headline_de : tut.headline,
          description: isGerman ? tut.description_de : tut.description,
        }))
        .filter((tut) =>
          (tut.headline + tut.description).toLowerCase().includes(value.toLowerCase())
        );

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Jump to selected tutorial result
  const jumpToTutorial = (index) => {
    setValue(index);
    setSearchResults([]);
    setSearchTerm("");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)", position: "relative" }}>
      {/* Sidebar with language toggle and tutorial list */}
      <Box
        sx={{
          width: 250,
          borderRight: 1,
          borderColor: "divider",
          paddingTop: 4,
          paddingLeft: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ marginBottom: 2, paddingLeft: 1, color: isDarkMode ? "#FFFFFF" : "#000000" }}
        >
          Tutorials
        </Typography>

        <Button
          variant="outlined"
          sx={{
            mb: 2,
            mr: 1,
            color: isDarkMode ? "#B58FFF" : theme.palette.primary.main,
            borderColor: isDarkMode ? "#B58FFF" : theme.palette.primary.main,
            "&:hover": {
              borderColor: isDarkMode ? "#D0A8FF" : theme.palette.primary.dark,
              backgroundColor: isDarkMode ? "rgba(181, 143, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
            },
          }}
          onClick={() => setIsGerman((prev) => !prev)}
        >
          {isGerman ? "Switch to English" : "Zur deutschen Version"}
        </Button>

        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: isDarkMode ? "#B58FFF" : theme.palette.primary.main,
              width: "3px",
            },
          }}
          sx={{
            ".MuiTab-root": {
              alignItems: "flex-start",
              textAlign: "left",
              fontSize: "1rem",
              fontWeight: 500,
              opacity: 1,
              textTransform: "none",
              color: isDarkMode ? "#DDD" : "#333",
              paddingY: 1,
              justifyContent: "flex-start",
              minHeight: "auto",
            },
            ".Mui-selected": {
              fontWeight: 600,
              color: theme.palette.primary.main,
            },
          }}
        >
          {tutorialData.map((tut, index) => (
            <Tab key={index} label={isGerman ? tut.headline_de : tut.headline} />
          ))}
        </Tabs>
      </Box>

      {/* Main content with tutorial markdown, search and optional code runner */}
      <Box
        sx={{
          color: isDarkMode ? "#FFFFFA" : "#000000",
          flexGrow: 1,
          padding: 4,
        }}
      >
        {/* Search Field */}
        <Box sx={{ marginBottom: 3 }}>
          <TextField
            placeholder="Search tutorial content..."
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {searchResults.length > 0 && (
            <List dense sx={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9", borderRadius: 1, mt: 1 }}>
              {searchResults.map((res, idx) => (
                <React.Fragment key={idx}>
                  <ListItemButton onClick={() => jumpToTutorial(res.index)}>
                    <ListItemText
                      primary={res.headline}
                      secondary={res.description.substring(0, 80) + "..."}
                    />
                  </ListItemButton>
                  {idx < searchResults.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* Tab Content */}
        {tutorialData.map((tut, index) => (
          <TabPanel key={index} value={value} index={index}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {isGerman ? tut.headline_de : tut.headline}
            </Typography>
            <Box
              sx={{
                '& table': {
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginTop: 2,
                },
                '& th, & td': {
                  border: '1px solid #ccc',
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontFamily: 'monospace',
                },
                '& th': {
                  backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
                  fontWeight: 'bold',
                },
                '& td': {
                  backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
                },
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {isGerman ? tut.description_de : tut.description}
              </ReactMarkdown>

              {/* Optional: R code runner */}
              {tut.r_code && (
                <Box mt={4}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {isGerman ? "Teste den Code unten direkt in R:" : "Try the code below in R:"}
                  </Typography>
                  <SyntaxHighlighter language="r" style={oneDark}>
                    {tut.r_code}
                  </SyntaxHighlighter>
                  <Box
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: isDarkMode ? "#444" : "#ccc",
                      backgroundColor: isDarkMode ? "#1e1e1e" : "#fefefe"
                    }}
                  >
                    <WebRRunner
                      code={tut.r_code}
                      isDarkMode={isDarkMode}
                      webRRef={webRRef}
                    />
                  </Box>
                </Box>
              )}

              {/* Optional: File downloads */}
              {tut.downloads && tut.downloads.length > 0 && (
                <Box mt={4}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {isGerman ? "Beispieldateien herunterladen:" : "Example files to download:"}
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={1}>
                    {tut.downloads.map((file, i) => (
                      <Button
                        key={i}
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        href={file.url}
                        download
                        sx={{
                          justifyContent: "flex-start",
                          textTransform: "none",
                          color: theme.palette.primary.main,
                          borderColor: theme.palette.primary.main,
                          "&:hover": {
                            bgcolor: isDarkMode ? "#333" : "#f0f0f0"
                          }
                        }}
                      >
                        {file.label}
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default Tutorials;
