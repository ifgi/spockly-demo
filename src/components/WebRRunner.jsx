import React, { useEffect, useRef, useState } from "react";
import { WebR } from "@r-wasm/webr";
import {
  Box,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";
import PackageLoadingDialog from "./PackageLoadingDialog";

const webR = new WebR();
const CANVAS_SIZE = 550;

const WebRRunner = ({ code, isDarkMode, webRRef, setCurrentPackage }) => {
  const canvasRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [textOutput, setTextOutput] = useState("");
  const [sfPackageReady, setSfPackageReady] = useState(false);
  const [sfSetupInProgress, setSfSetupInProgress] = useState(false);
  const [webRReady, setWebRReady] = useState(false);
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [currentPackageInternal, setCurrentPackageInternal] = useState("");
  const [packagesReady, setPackagesReady] = useState(false);
  const [leafletDisplayed, setLeafletDisplayed] = useState(false);

  const resetLeafletFlag = () => {
    setLeafletDisplayed(false);
  };

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportPlotAsPNG = (filename) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          downloadFile(blob, filename);
          setTextOutput(prev => prev + `\nPlot exported as ${filename}`);
        }
      }, 'image/png');
    }
  };

  const loadJsPDF = async () => {
    if (window.jspdf) return window.jspdf;
    try {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      document.head.appendChild(script);
      return new Promise((resolve, reject) => {
        script.onload = () => resolve(window.jspdf);
        script.onerror = () => reject(new Error('Failed to load jsPDF'));
      });
    } catch (error) {
      throw new Error('Failed to load jsPDF');
    }
  };

  const exportPlotAsPDF = async (filename) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const jspdf = await loadJsPDF();
      const { jsPDF } = jspdf;
      const imgData = canvas.toDataURL('image/png');
      const widthInMM = canvas.width * 0.264583;
      const heightInMM = canvas.height * 0.264583;
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [widthInMM, heightInMM]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, widthInMM, heightInMM);
      pdf.save(filename);
      setTextOutput(prev => prev + `\nPlot exported as ${filename}`);
    } catch (error) {
      console.warn('PDF export failed, falling back to PNG:', error);
      canvas.toBlob((blob) => {
        if (blob) {
          const pngFilename = filename.replace('.pdf', '.png');
          downloadFile(blob, pngFilename);
          setTextOutput(prev => prev + `\nPDF export failed, saved as PNG: ${pngFilename}`);
        }
      }, 'image/png');
    }
  };

  const exportDataAsCSV = async (filename, dataVarName) => {
    try {
      if (!webRReady || !packagesReady) {
        setTextOutput(prev => prev + `\nWaiting for WebR to be ready...`);
        return;
      }
      const webRForCSV = webRRef?.current || webR;
      const result = await webRForCSV.evalR(`
        if (exists("${dataVarName}")) {
          write.csv(${dataVarName}, file = "", row.names = FALSE)
        } else {
          "Error: Variable '${dataVarName}' not found"
        }
      `);
      const csvContent = await result.toString();
      if (csvContent.includes("Error:")) {
        setTextOutput(prev => prev + `\n${csvContent}`);
        return;
      }
      const blob = new Blob([csvContent], { type: 'text/csv' });
      downloadFile(blob, filename);
      setTextOutput(prev => prev + `\nCSV exported as ${filename}`);
    } catch (err) {
      console.error("Error exporting CSV:", err);
      setTextOutput(prev => prev + `\nError exporting CSV: ${err.message}`);
    }
  };

  const exportWorkspace = async (filename) => {
    try {
      if (!webRReady || !packagesReady) {
        setTextOutput(prev => prev + `\nWaiting for WebR to be ready...`);
        return;
      }
      const webRForWorkspace = webRRef?.current || webR;
      const result = await webRForWorkspace.evalR(`
        temp_file <- tempfile()
        save.image(file = temp_file)
        readBin(temp_file, "raw", file.info(temp_file)$size)
      `);
      const workspaceData = await result.toTypedArray();
      const blob = new Blob([workspaceData], { type: 'application/octet-stream' });
      downloadFile(blob, filename);
      setTextOutput(prev => prev + `\nWorkspace saved as ${filename}`);
    } catch (err) {
      console.error("Error exporting workspace:", err);
      setTextOutput(prev => prev + `\nError exporting workspace: ${err.message}`);
    }
  };

  const exportLeafletAsHTML = async (filename) => {
	try {
	  if (!webRReady || !packagesReady) {
		setTextOutput(prev => prev + `\nWaiting for WebR to be ready...`);
		return;
	  }
	  
	  const webRForLeaflet = webRRef?.current || webR;
	  const result = await webRForLeaflet.evalR(`
		if (exists("leaflet_map")) {
		  map_data <- leaflet_map$x
		  if (!is.null(map_data$options$crs)) {
			map_data$options$crs <- NULL
		  }
		  widget_json <- jsonlite::toJSON(map_data, auto_unbox = TRUE, digits = 16, null = "null")
		  html_content <- paste0(
			'<!DOCTYPE html>\\n',
			'<html>\\n',
			'<head>\\n',
			'  <meta charset="utf-8">\\n',
			'  <title>Leaflet Map</title>\\n',
			'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\\n',
			'  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />\\n',
			'  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>\\n',
			'  <style>\\n',
			'    html, body { width: 100%; height: 100%; margin: 0; padding: 0; }\\n',
			'    #map { width: 100%; height: 100%; }\\n',
			'  </style>\\n',
			'</head>\\n',
			'<body>\\n',
			'  <div id="map"></div>\\n',
			'  <script>\\n',
			'    document.addEventListener("DOMContentLoaded", function() {\\n',
			'      try {\\n',
			'        var mapData = ', widget_json, ';\\n',
			'        console.log("Map data:", mapData);\\n',
			'        \\n',
			'        var map = L.map("map");\\n',
			'        \\n',
			'        if (mapData.setView && mapData.setView.length >= 2) {\\n',
			'          var coords = mapData.setView[0];\\n',
			'          var zoom = mapData.setView[1];\\n',
			'          map.setView([coords[0], coords[1]], zoom);\\n',
			'        } else {\\n',
			'          map.setView([0, 0], 2);\\n',
			'        }\\n',
			'        \\n',
			'        if (mapData.calls && Array.isArray(mapData.calls)) {\\n',
			'          mapData.calls.forEach(function(call) {\\n',
			'            console.log("Processing call:", call);\\n',
			'            try {\\n',
			'              switch(call.method) {\\n',
			'                case "addTiles":\\n',
			'                  var tileUrl = call.args[0] || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";\\n',
			'                  var tileOptions = call.args[3] || {};\\n',
			'                  L.tileLayer(tileUrl, tileOptions).addTo(map);\\n',
			'                  break;\\n',
			'                \\n',
			'                case "addMarkers":\\n',
			'                  if (call.args && call.args.length >= 2) {\\n',
			'                    var lat = call.args[0];\\n',
			'                    var lng = call.args[1];\\n',
			'                    var popup = null;\\n',
			'                    console.log("addMarkers args:", call.args);\\n',
			'                    if (call.args[2] && typeof call.args[2] === "string") {\\n',
			'                      popup = call.args[2];\\n',
			'                    } else {\\n',
			'                      for (var i = 2; i < call.args.length; i++) {\\n',
			'                        if (call.args[i]) {\\n',
			'                          if (typeof call.args[i] === "string") {\\n',
			'                            popup = call.args[i];\\n',
			'                            break;\\n',
			'                          } else if (typeof call.args[i] === "object") {\\n',
			'                            if (call.args[i].popup !== undefined) {\\n',
			'                              popup = call.args[i].popup;\\n',
			'                              break;\\n',
			'                            }\\n',
			'                            var keys = Object.keys(call.args[i]);\\n',
			'                            for (var j = 0; j < keys.length; j++) {\\n',
			'                              if (keys[j].toLowerCase().includes("popup") || keys[j].toLowerCase().includes("label")) {\\n',
			'                                popup = call.args[i][keys[j]];\\n',
			'                                break;\\n',
			'                              }\\n',
			'                            }\\n',
			'                          }\\n',
			'                        }\\n',
			'                      }\\n',
			'                    }\\n',
			'                    if (!popup && call.args.length > 9 && call.args[9]) {\\n',
			'                      popup = call.args[9];\\n',
			'                    }\\n',
			'                    console.log("Found popup:", popup);\\n',
			'                    if (Array.isArray(lat) && Array.isArray(lng)) {\\n',
			'                      for (var i = 0; i < lat.length; i++) {\\n',
			'                        var marker = L.marker([lat[i], lng[i]]).addTo(map);\\n',
			'                        if (popup) {\\n',
			'                          var popupContent = Array.isArray(popup) ? popup[i] : popup;\\n',
			'                          marker.bindPopup(popupContent);\\n',
			'                        }\\n',
			'                      }\\n',
			'                    } else if (typeof lat === "number" && typeof lng === "number") {\\n',
			'                      var marker = L.marker([lat, lng]).addTo(map);\\n',
			'                      if (popup) {\\n',
			'                        marker.bindPopup(popup);\\n',
			'                      }\\n',
			'                    }\\n',
			'                  }\\n',
			'                  break;\\n',
			'                \\n',
			'                case "addCircles":\\n',
			'                  if (call.args && call.args.length >= 2) {\\n',
			'                    var lat = call.args[0];\\n',
			'                    var lng = call.args[1];\\n',
			'                    var options = {};\\n',
			'                    if (call.args[2] && typeof call.args[2] === "number") {\\n',
			'                      options.radius = call.args[2];\\n',
			'                    }\\n',
			'                    for (var i = 2; i < call.args.length; i++) {\\n',
			'                      if (call.args[i] && typeof call.args[i] === "object") {\\n',
			'                        if (call.args[i].radius !== undefined) options.radius = call.args[i].radius;\\n',
			'                        if (call.args[i].color !== undefined) options.color = call.args[i].color;\\n',
			'                        if (call.args[i].weight !== undefined) options.weight = call.args[i].weight;\\n',
			'                        if (call.args[i].opacity !== undefined) options.opacity = call.args[i].opacity;\\n',
			'                        if (call.args[i].fillColor !== undefined) options.fillColor = call.args[i].fillColor;\\n',
			'                        if (call.args[i].fillOpacity !== undefined) options.fillOpacity = call.args[i].fillOpacity;\\n',
			'                      }\\n',
			'                    }\\n',
			'                    console.log("Circle options:", options);\\n',
			'                    if (Array.isArray(lat) && Array.isArray(lng)) {\\n',
			'                      for (var i = 0; i < lat.length; i++) {\\n',
			'                        L.circle([lat[i], lng[i]], options).addTo(map);\\n',
			'                      }\\n',
			'                    } else if (typeof lat === "number" && typeof lng === "number") {\\n',
			'                      L.circle([lat, lng], options).addTo(map);\\n',
			'                    }\\n',
			'                  }\\n',
			'                  break;\\n',
			'                \\n',
			'                case "addPolygons":\\n',
			'                  if (call.args && call.args.length >= 1) {\\n',
			'                    var coords = call.args[0];\\n',
			'                    var options = call.args[1] || {};\\n',
			'                    if (coords && coords.length > 0) {\\n',
			'                      L.polygon(coords, options).addTo(map);\\n',
			'                    }\\n',
			'                  }\\n',
			'                  break;\\n',
			'              }\\n',
			'            } catch (e) {\\n',
			'              console.error("Error processing call:", call.method, e);\\n',
			'            }\\n',
			'          });\\n',
			'        }\\n',
			'        \\n',
			'      } catch (error) {\\n',
			'        console.error("Error creating map:", error);\\n',
			'        document.body.innerHTML = "<h1>Error creating map</h1><p>" + error.message + "</p>";\\n',
			'      }\\n',
			'    });\\n',
			'  </script>\\n',
			'</body>\\n',
			'</html>'
		  )
		  html_content
		} else {
		  "No leaflet map found"
		}
	  `);
  
	  const htmlContent = await result.toString();
	  if (htmlContent === "No leaflet map found") {
		setTextOutput(prev => prev + `\nNo leaflet map found to save`);
		return;
	  }
  
	  const blob = new Blob([htmlContent], { type: 'text/html' });
	  downloadFile(blob, filename);
	  setTextOutput(prev => prev + `\nLeaflet map saved as ${filename}`);
	} catch (err) {
	  console.error("Error exporting leaflet map:", err);
	  setTextOutput(prev => prev + `\nError exporting leaflet map: ${err.message}`);
	}
  };


  const handleLeafletDisplay = async (code) => {
	if (leafletDisplayed) {
	  return;
	}
  
	try {
	  const webRForLeaflet = webRRef?.current || webR;
	  const result = await webRForLeaflet.evalR(`
		if (exists("leaflet_map")) {
		  map_data <- leaflet_map$x
		  if (!is.null(map_data$options$crs)) {
			map_data$options$crs <- NULL
		  }
		  widget_json <- jsonlite::toJSON(map_data, auto_unbox = TRUE, digits = 16, null = "null")
		  html_content <- paste0(
			'<!DOCTYPE html>\\n',
			'<html>\\n',
			'<head>\\n',
			'  <meta charset="utf-8">\\n',
			'  <title>Leaflet Map</title>\\n',
			'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\\n',
			'  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />\\n',
			'  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>\\n',
			'  <style>\\n',
			'    html, body { width: 100%; height: 100%; margin: 0; padding: 0; }\\n',
			'    #map { width: 100%; height: 100%; }\\n',
			'  </style>\\n',
			'</head>\\n',
			'<body>\\n',
			'  <div id="map"></div>\\n',
			'  <script>\\n',
			'    document.addEventListener("DOMContentLoaded", function() {\\n',
			'      try {\\n',
			'        var mapData = ', widget_json, ';\\n',
			'        console.log("Map data:", mapData);\\n',
			'\\n',
			'        var map = L.map("map");\\n',
			'\\n',
			'        if (mapData.setView && mapData.setView.length >= 2) {\\n',
			'          var coords = mapData.setView[0];\\n',
			'          var zoom = mapData.setView[1];\\n',
			'          map.setView([coords[0], coords[1]], zoom);\\n',
			'        } else {\\n',
			'          map.setView([0, 0], 2);\\n',
			'        }\\n',
			'\\n',
			'        var tilesAdded = false;\\n',
			'\\n',
			'        if (mapData.calls && Array.isArray(mapData.calls)) {\\n',
			'          mapData.calls.forEach(function(call) {\\n',
			'            console.log("Processing call:", call);\\n',
			'            try {\\n',
			'              switch(call.method) {\\n',
			'                case "addTiles":\\n',
			'                  if (!tilesAdded) {\\n',
			'                    var tileUrl = "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png";\\n',
			'                    var tileOptions = {\\n',
			'                      attribution: "© OpenMapTiles © OpenStreetMap contributors",\\n',
			'                      crossOrigin: true,\\n',
			'                      maxZoom: 18\\n',
			'                    };\\n',
			'\\n',
			'                    var fallbackUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";\\n',
			'                    var fallbackOptions = {\\n',
			'                      attribution: "© Esri",\\n',
			'                      crossOrigin: true,\\n',
			'                      maxZoom: 18\\n',
			'                    };\\n',
			'\\n',
			'                    var tileLayer = L.tileLayer(tileUrl, tileOptions);\\n',
			'                    tileLayer.on("tileerror", function() {\\n',
			'                      console.log("Primary tile server failed, trying fallback");\\n',
			'                      map.removeLayer(tileLayer);\\n',
			'                      L.tileLayer(fallbackUrl, fallbackOptions).addTo(map);\\n',
			'                    });\\n',
			'                    tileLayer.addTo(map);\\n',
			'                    tilesAdded = true;\\n',
			'                  }\\n',
			'                  break;\\n',
			'\\n',
			'                case "addMarkers":\\n',
			'                  if (call.args && call.args.length >= 2) {\\n',
			'                    var lat = call.args[0];\\n',
			'                    var lng = call.args[1];\\n',
			'                    var popup = null;\\n',
			'\\n',
			'                    console.log("Full addMarkers call:", call);\\n',
			'\\n',
			'                    if (call.args.length > 2) {\\n',
			'                      for (var i = 2; i < call.args.length; i++) {\\n',
			'                        var arg = call.args[i];\\n',
			'                        console.log("Checking arg", i, ":", arg);\\n',
			'                        \\n',
			'                        if (arg === null || arg === undefined) continue;\\n',
			'                        \\n',
			'                        if (typeof arg === "string") {\\n',
			'                          popup = arg;\\n',
			'                          break;\\n',
			'                        }\\n',
			'                        \\n',
			'                        if (Array.isArray(arg) && arg.length > 0) {\\n',
			'                          if (typeof arg[0] === "string") {\\n',
			'                            popup = arg;\\n',
			'                            break;\\n',
			'                          }\\n',
			'                        }\\n',
			'                        \\n',
			'                        if (typeof arg === "object" && arg !== null) {\\n',
			'                          var possibleKeys = ["popup", "label", "title", "text", "content"];\\n',
			'                          for (var j = 0; j < possibleKeys.length; j++) {\\n',
			'                            if (arg.hasOwnProperty(possibleKeys[j])) {\\n',
			'                              popup = arg[possibleKeys[j]];\\n',
			'                              break;\\n',
			'                            }\\n',
			'                          }\\n',
			'                          \\n',
			'                          if (popup) break;\\n',
			'                          \\n',
			'                          var keys = Object.keys(arg);\\n',
			'                          for (var k = 0; k < keys.length; k++) {\\n',
			'                            var key = keys[k];\\n',
			'                            var value = arg[key];\\n',
			'                            \\n',
			'                            if (Array.isArray(value) && value.length > 0) {\\n',
			'                              if (typeof value[0] === "string") {\\n',
			'                                popup = value;\\n',
			'                                break;\\n',
			'                              }\\n',
			'                            } else if (typeof value === "string") {\\n',
			'                              popup = value;\\n',
			'                              break;\\n',
			'                            }\\n',
			'                          }\\n',
			'                          \\n',
			'                          if (popup) break;\\n',
			'                        }\\n',
			'                      }\\n',
			'                    }\\n',
			'\\n',
			'                    console.log("Extracted popup:", popup);\\n',
			'\\n',
			'                    if (Array.isArray(lat) && Array.isArray(lng)) {\\n',
			'                      for (var i = 0; i < lat.length; i++) {\\n',
			'                        if (typeof lat[i] === "number" && typeof lng[i] === "number") {\\n',
			'                          var marker = L.marker([lat[i], lng[i]]).addTo(map);\\n',
			'                          \\n',
			'                          if (popup) {\\n',
			'                            var popupContent;\\n',
			'                            if (Array.isArray(popup)) {\\n',
			'                              popupContent = popup[i];\\n',
			'                            } else {\\n',
			'                              popupContent = popup;\\n',
			'                            }\\n',
			'                            \\n',
			'                            if (popupContent !== null && popupContent !== undefined && popupContent !== "") {\\n',
			'                              marker.bindPopup(String(popupContent));\\n',
			'                            }\\n',
			'                          }\\n',
			'                        }\\n',
			'                      }\\n',
			'                    } else if (typeof lat === "number" && typeof lng === "number") {\\n',
			'                      var marker = L.marker([lat, lng]).addTo(map);\\n',
			'                      \\n',
			'                      if (popup && popup !== null && popup !== undefined && popup !== "") {\\n',
			'                        marker.bindPopup(String(popup));\\n',
			'                      }\\n',
			'                    }\\n',
			'                  }\\n',
			'                  break;\\n',
			'\\n',
			'                case "addCircles":\\n',
			'                  if (call.args && call.args.length >= 2) {\\n',
			'                    var lat = call.args[0];\\n',
			'                    var lng = call.args[1];\\n',
			'                    var options = {};\\n',
			'                    if (call.args[2] && typeof call.args[2] === "number") {\\n',
			'                      options.radius = call.args[2];\\n',
			'                    }\\n',
			'                    for (var i = 2; i < call.args.length; i++) {\\n',
			'                      if (call.args[i] && typeof call.args[i] === "object") {\\n',
			'                        if (call.args[i].radius !== undefined) options.radius = call.args[i].radius;\\n',
			'                        if (call.args[i].color !== undefined) options.color = call.args[i].color;\\n',
			'                        if (call.args[i].weight !== undefined) options.weight = call.args[i].weight;\\n',
			'                        if (call.args[i].opacity !== undefined) options.opacity = call.args[i].opacity;\\n',
			'                        if (call.args[i].fillColor !== undefined) options.fillColor = call.args[i].fillColor;\\n',
			'                        if (call.args[i].fillOpacity !== undefined) options.fillOpacity = call.args[i].fillOpacity;\\n',
			'                      }\\n',
			'                    }\\n',
			'                    console.log("Circle options:", options);\\n',
			'                    if (Array.isArray(lat) && Array.isArray(lng)) {\\n',
			'                      for (var i = 0; i < lat.length; i++) {\\n',
			'                        L.circle([lat[i], lng[i]], options).addTo(map);\\n',
			'                      }\\n',
			'                    } else if (typeof lat === "number" && typeof lng === "number") {\\n',
			'                      L.circle([lat, lng], options).addTo(map);\\n',
			'                    }\\n',
			'                  }\\n',
			'                  break;\\n',
			'\\n',
			'                case "addPolygons":\\n',
			'                  if (call.args && call.args.length >= 1) {\\n',
			'                    var coords = call.args[0];\\n',
			'                    var options = call.args[1] || {};\\n',
			'                    if (coords && coords.length > 0) {\\n',
			'                      L.polygon(coords, options).addTo(map);\\n',
			'                    }\\n',
			'                  }\\n',
			'                  break;\\n',
			'              }\\n',
			'            } catch (e) {\\n',
			'              console.error("Error processing call:", call.method, e);\\n',
			'            }\\n',
			'          });\\n',
			'        }\\n',
			'\\n',
			'        if (!tilesAdded) {\\n',
			'          var fallbackUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";\\n',
			'          var fallbackOptions = {\\n',
			'            attribution: "© Esri",\\n',
			'            crossOrigin: true,\\n',
			'            maxZoom: 18\\n',
			'          };\\n',
			'          L.tileLayer(fallbackUrl, fallbackOptions).addTo(map);\\n',
			'        }\\n',
			'\\n',
			'      } catch (error) {\\n',
			'        console.error("Error creating map:", error);\\n',
			'        document.body.innerHTML = "<h1>Error creating map</h1><p>" + error.message + "</p>";\\n',
			'      }\\n',
			'    });\\n',
			'  </script>\\n',
			'</body>\\n',
			'</html>'
		  )
		  html_content
		} else {
		  "No leaflet map found"
		}
	  `);
  
	  const htmlContent = await result.toString();
	  if (htmlContent === "No leaflet map found") {
		setTextOutput(prev => prev + `\nNo leaflet map found`);
		return;
	  }
  
	  setLeafletDisplayed(true);
  
	  const blob = new Blob([htmlContent], { type: 'text/html' });
	  const url = URL.createObjectURL(blob);
	  const newTab = window.open(url, '_blank');
	  if (newTab) {
		setTextOutput(prev => prev + `\nLeaflet map opened in new tab`);
		setTimeout(() => {
		  URL.revokeObjectURL(url);
		}, 1000);
	  } else {
		setTextOutput(prev => prev + `\nPopup blocked - please allow popups for this site`);
	  }
	} catch (err) {
	  console.error("Error displaying leaflet map:", err);
	  setTextOutput(prev => prev + `\nError displaying leaflet map: ${err.message}`);
	}
  };
  

  const processExportCommands = async (code) => {
	const lines = code.split('\n');
	for (let i = 0; i < lines.length; i++) {
	  const line = lines[i].trim();
	  if (line.match(/png\s*\(\s*["']([^"']+)["']\s*\)/)) {
		const match = line.match(/png\s*\(\s*["']([^"']+)["']\s*\)/);
		const filename = match[1];
		setTimeout(() => exportPlotAsPNG(filename), 1000);
	  }
	  if (line.match(/pdf\s*\(\s*["']([^"']+)["']\s*\)/)) {
		const match = line.match(/pdf\s*\(\s*["']([^"']+)["']\s*\)/);
		const filename = match[1];
		setTimeout(async () => await exportPlotAsPDF(filename), 1000);
	  }
	  if (line.match(/write\.csv\s*\(\s*([^,]+)\s*,\s*file\s*=\s*["']([^"']+)["']/)) {
		const match = line.match(/write\.csv\s*\(\s*([^,]+)\s*,\s*file\s*=\s*["']([^"']+)["']/);
		const dataVar = match[1].trim();
		const filename = match[2];
		setTimeout(() => exportDataAsCSV(filename, dataVar), 600);
	  }
	  if (line.match(/save\.image\s*\(\s*file\s*=\s*["']([^"']+)["']/)) {
		const match = line.match(/save\.image\s*\(\s*file\s*=\s*["']([^"']+)["']/);
		const filename = match[1];
		setTimeout(() => exportWorkspace(filename), 600);
	  }
	  if (line.match(/htmlwidgets::saveWidget\s*\(\s*[^,]+\s*,\s*file\s*=\s*["']([^"']+)["']/)) {
		const match = line.match(/htmlwidgets::saveWidget\s*\(\s*[^,]+\s*,\s*file\s*=\s*["']([^"']+)["']/);
		const filename = match[1];
		setTimeout(() => exportLeafletAsHTML(filename), 1200);
	  }
	}
  };

  const cleanCodeForExecution = (code) => {
    return code
      .replace(/png\s*\([^)]+\)/g, '')
      .replace(/pdf\s*\([^)]+\)/g, '')
      .replace(/dev\.off\s*\(\s*\)/g, '')
      .replace(/write\.csv\s*\([^)]+\)/g, '')
      .replace(/save\.image\s*\([^)]+\)/g, '')
      .replace(/htmlwidgets::saveWidget\s*\([^)]+\)/g, '');
  };

  const installAndLoadPackages = async () => {
    const packages = ["jsonlite", "sp", "gstat", "leaflet", "htmlwidgets"];
    for (const pkg of packages) {
      setCurrentPackageInternal(pkg);
      setCurrentPackage(pkg);
      try {
        await webR.installPackages([pkg]);
        await webR.evalRVoid(`suppressMessages(library(${pkg}))`);
      } catch (err) {
        console.error(`Error installing/loading ${pkg}:`, err);
      }
    }
    setPackagesReady(true);
    setCurrentPackageInternal("Done!");
    setCurrentPackage("Done!");
    setTimeout(() => {
      setShowLoadingDialog(false);
      setCurrentPackageInternal("");
      setCurrentPackage("");
    }, 2000);
  };

  const setupSfPackage = async () => {
    if (sfPackageReady || sfSetupInProgress || !webRReady) return;
    setSfSetupInProgress(true);
    try {
      await webR.evalRVoid(`
        local_udunits_files <- c(
          "udunits2-prefixes.xml",
          "udunits2-base.xml",
          "udunits2-derived.xml",
          "udunits2-accepted.xml",
          "udunits2-common.xml"
        )
        for (file in local_udunits_files) {
          file_path <- paste0("/units/", file)
          content <- readLines(file_path)
          writeLines(content, paste0("/home/web_user/", file))
        }
        udunits_xml_content <- c(
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<unit-system>',
          '  <import>udunits2-prefixes.xml</import>',
          '  <import>udunits2-base.xml</import>',
          '  <import>udunits2-derived.xml</import>',
          '  <import>udunits2-accepted.xml</import>',
          '  <import>udunits2-common.xml</import>',
          '</unit-system>'
        )
        writeLines(udunits_xml_content, "/home/web_user/udunits2.xml")
        Sys.setenv(UDUNITS2_XML_PATH = "/home/web_user/udunits2.xml")
      `);
      await webR.evalRVoid(`
        options(units.database.path = "/home/web_user/udunits2.xml")
        .onLoad_units_patched <- function(libname, pkgname) {
          Sys.setenv(UDUNITS2_XML_PATH = "/home/web_user/udunits2.xml")
          return(invisible(NULL))
        }
        suppressMessages(suppressWarnings({
          tryCatch({
            library(units)
          }, error = function(e) {
            tryCatch({
              loadNamespace("units")
              library.dynam("units", "units")
            }, error = function(e2) {})
          })
        }))
      `);
      await webR.installPackages(["sf"]);
      await webR.evalRVoid(`suppressMessages(library(sf))`);
      setSfPackageReady(true);
    } catch (err) {
      console.error("Error setting up sf:", err);
    } finally {
      setSfSetupInProgress(false);
    }
  };

  const runCodeWithSfWorkaround = async (code) => {
    const webRForSf = webRRef?.current || webR;
    if (
      code.includes('library("sf")') ||
      code.includes("library(sf)") ||
      code.includes("sf::")
    ) {
      const lines = code.split("\n");
      let modifiedCode = "";
      let sfInstallLine = "";
      let sfLibraryLine = "";
      for (const line of lines) {
        if (line.includes('webr::install("sf")')) {
          sfInstallLine = line;
        } else if (
          line.includes('library("sf")') ||
          line.includes("library(sf)")
        ) {
          sfLibraryLine = line;
        } else {
          modifiedCode += line + "\n";
        }
      }
      if (sfInstallLine) {
        await webRForSf.evalRVoid(sfInstallLine);
      }
      await webRForSf.evalRVoid(`
        Sys.setenv(UDUNITS2_XML_PATH = "/home/web_user/udunits2.xml")
        sf_loaded <- FALSE
        suppressMessages(suppressWarnings({
          tryCatch({
            library(sf)
            sf_loaded <- TRUE
            message("SF package loaded successfully")
          }, error = function(e) {
            tryCatch({
              loadNamespace("sf")
              attachNamespace("sf")
              sf_loaded <- TRUE
              message("SF package loaded with workaround")
            }, error = function(e2) {
              tryCatch({
                library.dynam("sf", "sf")
                sf_loaded <- TRUE
                message("SF package partially loaded")
              }, error = function(e3) {
                message(paste("SF loading failed:", e3$message))
              })
            })
          })
        }))
      `);
      if (modifiedCode.trim()) {
        return await webRForSf.evalR(modifiedCode);
      }
    } else {
      return await webRForSf.evalR(code);
    }
  };

  const detectLeafletCode = (code) => {
    const leafletPatterns = [
      /leaflet\s*\(\s*\)/,
      /leaflet_map\s*<-/,
      /addTiles\s*\(\s*\)/,
      /addMarkers\s*\(/,
      /addCircles\s*\(/,
      /addPolygons\s*\(/,
      /setView\s*\(/,
      /fitBounds\s*\(/,
      /library\s*\(\s*leaflet\s*\)/,
      /library\s*\(\s*"leaflet"\s*\)/,
      /require\s*\(\s*leaflet\s*\)/,
      /require\s*\(\s*"leaflet"\s*\)/
    ];
    return leafletPatterns.some(pattern => pattern.test(code));
  };

  // FIX FOR FORMATTED OUTPUT
  const captureFormattedOutput = async (webRInstance, code) => {
    try {
      // First, try to capture the output using capture.output
      const captureResult = await webRInstance.evalR(`
        # Capture the formatted output
        captured <- capture.output({
          ${code}
        })
        paste(captured, collapse = "\\n")
      `);
      
      const capturedString = await captureResult.toString();
      
      // Filter out startup messages and check if we got meaningful output
      const filtered = filterRStartupMessages(capturedString);
      if (filtered && filtered.trim() !== "" && filtered !== "NULL") {
        return filtered;
      }
      
      // Otherwise, try the regular evaluation
      const result = await webRInstance.evalR(code);
      if (result) {
        const str = await result.toString();
        const filteredStr = filterRStartupMessages(str);
        if (filteredStr && filteredStr !== "NULL") {
          return filteredStr;
        }
      }
      
      return null;
    } catch (err) {
      // If capture.output fails, fall back to regular evaluation
      try {
        const result = await webRInstance.evalR(code);
        if (result) {
          const str = await result.toString();
          return filterRStartupMessages(str);
        }
      } catch (fallbackErr) {
        console.error("Error in captureFormattedOutput:", fallbackErr);
        throw fallbackErr;
      }
    }
  };

  const formatROutput = (output) => {
    // Clean up R's default output formatting
    return output
      .replace(/\[1\]\s*/g, '') // Remove [1] indices
      .replace(/\n\s*\n/g, '\n') // Remove extra blank lines
      .trim();
  };

  // Filter out R startup messages and other unwanted output
  const filterRStartupMessages = (text) => {
    if (!text) return '';
    
    // Split into lines for line-by-line filtering
    const lines = text.split('\n');
    
    // Patterns to filter out (comprehensive list)
    const filterPatterns = [
      /^R version \d+\.\d+\.\d+/,
      /^Copyright \(C\)/,
      /^Platform:/,
      /^R is free software/,
      /^You are welcome to redistribute/,
      /^Type 'license\(\)'/,
      /^R is a collaborative project/,
      /^Type 'contributors\(\)'/,
      /^Type 'demo\(\)'/,
      /^Type 'q\(\)'/,
      /^Type 'help\(\)'/,
      /^Type 'help\.start\(\)'/,
      /^'citation\(\)' on how to cite/,
      /^and comes with ABSOLUTELY NO WARRANTY/,
      /^for more information and/,
      /^for some demos/,
      /^for on-line help/,
      /^for an HTML browser/,
      /^to quit R\./,
      /^under certain conditions\./,
      /^or 'licence\(\)'/,
      /^in publications\./,
      /-- "Already Tomorrow"$/,
      /^Natural language support but running in an English locale$/,
      /^WARNING: multiple methods tables found/,
      /^Using built-in specs\./,
      /^Target:/,
      /^Configured with:/,
      /^Thread model:/,
      /^gcc version/,
      /^R is a collaborative project with many/,
      /^\s*$/,
	  /^'help\.start\(\)' for an HTML browser interface to help/,
    ];
    
    // Filter out lines that match any pattern
    const filteredLines = lines.filter(line => {
      const trimmedLine = line.trim();
      // Keep empty lines between actual content, but not standalone empty lines
      if (trimmedLine === '') {
        return false; // We'll re-add spacing as needed
      }
      return !filterPatterns.some(pattern => pattern.test(trimmedLine));
    });
    
    // Join lines and clean up extra whitespace
    let result = filteredLines.join('\n').trim();
    
    // Remove multiple consecutive newlines
    result = result.replace(/\n{3,}/g, '\n\n');
    
    return result;
  };

  useEffect(() => {
    const initWebR = async () => {
      try {
        await webR.init();
		window.webR = webR;
        setWebRReady(true);
        if (webRRef) webRRef.current = webR;

        // Suppress startup messages
        await webR.evalRVoid(`
          options(
            verbose = FALSE,
            warn = -1
          )
          suppressMessages({
            # Suppress any startup messages
          })
        `);

        // load co2 csv for basic usecase tutorial
        try {
          const response = await fetch("/co2.csv");
          const text = await response.text();
          const encoded = new TextEncoder().encode(text);
          await webR.FS.writeFile("/home/web_user/co2.csv", encoded);          
          console.log("co2.csv loaded successfully");
        } catch (err) {
          console.error("error loading co2.csv:", err);
        }

        await installAndLoadPackages();
        await setupSfPackage();
        
        // Re-enable warnings after initialization
        await webR.evalRVoid(`options(warn = 0)`);
      } catch (err) {
        console.error("WebR init failed:", err);
        setTextOutput(`Error initializing WebR: ${err.message}`);
      }
    };
    initWebR();
  }, []);

  useEffect(() => {
    if (webRReady && !sfPackageReady) {
      setupSfPackage();
    }
  }, [webRReady, sfPackageReady]);

  const runCode = async () => {
	setTextOutput("");
	const stillInstalling = !packagesReady;
	if (stillInstalling) {
	  setShowLoadingDialog(true);
	  while (!packagesReady) {
		await new Promise(resolve => setTimeout(resolve, 300));
	  }
	  setShowLoadingDialog(false);
	}
	setCurrentPackageInternal("");
	setCurrentPackage("");
	resetLeafletFlag();
	const isLeafletCode = detectLeafletCode(code);
  
	try {
	  await setupSfPackage();
	  const webRForCanvas = webRRef?.current || webR;
	  if (!isLeafletCode) {
		await webRForCanvas.evalRVoid("options(device=webr::canvas)");
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		(async () => {
		  for (;;) {
			const output = await webR.read();
			switch (output.type) {
			  case "canvas":
				if (output.data.event === "canvasImage") {
				  const canvas = canvasRef.current;
				  const ctx = canvas.getContext("2d");
				  ctx.drawImage(
					output.data.image,
					0,
					0,
					canvas.width - 10,
					canvas.height - 10
				  );
				} else if (output.data.event === "canvasNewPage") {
				  const canvas = canvasRef.current;
				  const ctx = canvas.getContext("2d");
				  ctx.clearRect(0, 0, canvas.width, canvas.height);
				}
				break;
			  case "stdout":
			  case "stderr":
				if (output.data) {
				  const filtered = filterRStartupMessages(output.data);
				  if (filtered) {
				    setTextOutput((prev) => prev + filtered);
				  }
				}
				break;
			  default:
				console.log(output);
			}
		  }
		})();
	  }
	  await processExportCommands(code);
	  const cleanedCode = cleanCodeForExecution(code);
	  const webRForExecution = webRRef?.current || webR;
	  let leafletHandled = false;
	  
	  try {
		// Check if the code contains functions that need formatted output
		const needsFormattedOutput = /summary\s*\(|str\s*\(|head\s*\(|tail\s*\(|table\s*\(|print\s*\(/i.test(cleanedCode);
		
		if (needsFormattedOutput) {
		  // Use our enhanced capture method for formatted functions
		  const formattedOutput = await captureFormattedOutput(webRForExecution, cleanedCode);
		  if (formattedOutput) {
			const filtered = filterRStartupMessages(formattedOutput);
			const cleaned = formatROutput(filtered);
			if (cleaned && cleaned.trim() !== '') {
			  setTextOutput((prev) => prev + (prev ? "\n" : "") + cleaned);
			}
		  }
		} else if (
		  cleanedCode.includes("sf::") ||
		  cleanedCode.includes('library("sf")') ||
		  cleanedCode.includes("library(sf)")
		) {
		  const result = await runCodeWithSfWorkaround(cleanedCode);
		  if (result) {
			const values = await result.toArray();
			const stringValues = values.map(val => val ? val.toString() : '');
			const combinedOutput = stringValues.join('\n');
			const filtered = filterRStartupMessages(combinedOutput);
			if (filtered && filtered.trim() !== '' && filtered !== 'NULL') {
			  setTextOutput(
				(prev) => prev + (prev ? "\n" : "") + filtered
			  );
			}
		  }
		} else {
		  const result = await webRForExecution.evalR(cleanedCode);
		  if (result) {
			const values = await result.toArray();
			const stringValues = values.map(val => val ? val.toString() : '');
			const combinedOutput = stringValues.join('\n');
			const filtered = filterRStartupMessages(combinedOutput);
			if (filtered && filtered.trim() !== '' && filtered !== 'NULL') {
			  setTextOutput(
				(prev) => prev + (prev ? "\n" : "") + filtered
			  );
			}
		  }
		}
		
		if (isLeafletCode && !leafletHandled) {
		  leafletHandled = true;
		  setTimeout(() => handleLeafletDisplay(cleanedCode), 1000);
		}
		
	  } catch (err) {
		try {
		  await webRForExecution.evalRVoid(cleanedCode);
		  if (isLeafletCode && !leafletHandled) {
			leafletHandled = true;
			setTimeout(() => handleLeafletDisplay(cleanedCode), 1000);
		  }
		} catch (voidErr) {
		  setTextOutput(`Error: ${voidErr.message}`);
		}
	  }
	} catch (err) {
	  console.error("WebR Error:", err);
	  setTextOutput(`Error: ${err.message}`);
	}
  };

  return (
    <Box sx={{ height: "100%", borderRadius: "5px", zIndex: 1 }}>
      <Stack direction="row-reverse" sx={{ paddingY: 1 }}>
        <Tooltip title="Run R Code">
          <IconButton
            onClick={runCode}
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
      </Stack>
      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          height: CANVAS_SIZE,
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
          overflow: "auto",
        }}
      >
        {textOutput && (
          <Box
            sx={{
              fontFamily: "monospace",
              fontSize: "14px",
              whiteSpace: "pre-wrap",
              margin: 4,
            }}
          >
            {textOutput}
          </Box>
        )}
        <Box sx={{ marginX: 4 }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE * window.devicePixelRatio}
            height={CANVAS_SIZE * window.devicePixelRatio}
            style={{
              width: CANVAS_SIZE + "px",
              height: CANVAS_SIZE + "px",
              display: "block",
            }}
          />
          <PackageLoadingDialog
            open={showLoadingDialog}
            currentPackage={currentPackageInternal}
            onClose={() => setShowLoadingDialog(false)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WebRRunner;