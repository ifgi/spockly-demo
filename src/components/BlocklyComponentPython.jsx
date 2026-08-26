import { useEffect, useRef, useMemo, useState } from "react";
import * as Blockly from "blockly";
import "./blockly/customBlocksPython.jsx";
import {
  Box,
  useTheme,
  Button,
  Select,
  MenuItem,
  FormControl,
  Stack,
} from "@mui/material";
import { lightTheme, darkTheme } from "./blockly/blocklyThemes.js";
import {
  Co2Outlined,
  QuestionMark,
  Upload,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { Toolbar } from "@mui/material";
import { MdChecklist, MdCreate } from "react-icons/md";
import CreateDataDialog from "./CreateDataDialog.jsx";
import CheckUploadedDataDialog from "./CheckUploadedDataDialogPython.jsx";
import CO2Tutorial from "./CO2Tutorial.jsx";
import { pythonGenerator } from "blockly/python";
import { english } from "../locales/english.js";
import { german } from "../locales/german.js";
import * as De from "blockly/msg/de";
import * as En from "blockly/msg/en"
import co2Tutorial from "../data/co2Tutorial.js";

const lang = navigator.languages;
if(lang.some((l) => l.startsWith('de'))) { //Reactivate after testing
    Blockly.setLocale(De);
    Blockly.setLocale(german);
} else {
  Blockly.setLocale(En);
  Blockly.setLocale(english);
}

const BlocklyComponent = ({ setCode, isDarkMode, onUploadClick, workspaceRef }) => {
  const theme = useTheme();
  const blocklyDiv = useRef(null);
  const linkRef = useRef(null);
  const [level, setLevel] = useState("level1");
  const [openCO2Tutorial, setOpenCO2Tutorial] = useState(false);
  const [openCreateDataDialog, setOpenCreateDataDialog] = useState(false);
  const [showCheckDataDialog, setShowCheckDataDialog] = useState(false);
  const [stepCO2Tutorial, setStepCO2Tutorial] = useState(0);

  // Tutorial Functions
  const handleOpenCO2Tutorial = () => {
    setStepCO2Tutorial(0);
    setOpenCO2Tutorial(true);
  };
  const handleCloseCO2Tutorial = () => setOpenCO2Tutorial(false);
  const nextStepCO2Tutorial = () => setStepCO2Tutorial((prev) => prev + 1);
  const prevStepCO2Tutorial = () => setStepCO2Tutorial((prev) => prev - 1);

  // Level Selectbox Functions
  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  // Blockly toolbox definition for Level 1 (Beginner)
  const beginnerToolbox = `
        <xml>
          <category name="${Blockly.Msg.Categories["MATH"]}" colour="#253dc7">
            <block type="math_number"></block>
            <block type="consts"></block>
            <block type="math_arithmetic">
              <field name="OP">ADD</field>
              <value name="A">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="B">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="logic_compare"></block>
            <block type="math_square"></block>
            <block type="sqrt_of"></block>
            <block type="exp_of"></block>
            <block type="log_of"></block>
            <block type="trigo"></block>
            <block type="round"></block>
            <block type="modulo"></block>
          </category>

          <category name="${Blockly.Msg.Categories["BOOLEANS"]}" colour="#1d8425">
            <block type="to_bool"></block>
            <block type="bool1"></block>
            <block type="bool2"></block>
          </category>

          <category name="${Blockly.Msg.Categories["DATA"]}" colour="#0396c1">
            <category name="${Blockly.Msg.Categories["DOWNLOAD_DATA"]}" colour="#0396c1">
                <block type="func_download"></block>
                <block type="sampleDataB"></block>
                <block type="read_file"></block>
            </category>
            <category name="${Blockly.Msg.Categories["DATA_MANIPULATION"]}" colour="#0396c1">
              <block type="convert_column"></block>        
              <block type="data_shape"></block>
              <block type="slice"></block>
              <block type="add_object"></block>
              <block type="delete_object"></block>
              <block type="sort"></block>
              <block type="delete_axes">
                <value name="ColArr">
                  <block type="list_create"></block>
                </value>
                <value name="IndArr">
                  <block type="list_create"></block>
                </value>
              </block>
            </category>
          </category>

          <category name="${Blockly.Msg.Categories["VISUALISATION"]}" colour="#b12222">
            <block type="create_list_XCoords"></block>
            <block type="create_list_YCoords"></block>
            <block type="plot">
              <value name="Legend">
                <block type="list_create">
                  <value name="element_0">
                    <block type="text">
                      <field name="TEXT">Legend</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
          </category>
            
          <category name="${Blockly.Msg.Categories["STATISTICS"]}" colour="#05a219">
            <block type="mean"></block>
            <block type="median"></block>
            <block type="std"></block>
            <block type="mean_squared"></block>
            <block type="max"></block>
            <block type="min"></block>
            <block type="sum"></block>
          </category>

          <category name="${Blockly.Msg.Categories["VARIABLES"]}" custom="VARIABLE" colour="#A65E2E"></category>

          <category name="${Blockly.Msg.Categories["BASIC_FUNCTIONS"]}" colour="#123456">
            <block type="text_print"></block>
            <block type="length_of_str"></block>
            <block type="list_create"></block>
            <block type="list_access"></block>
            <block type="type"></block>
          </category>

          <category name="${Blockly.Msg.Categories["GEOMETRY"]}" colour="#99a700">
            <block type="coords"></block>
            <block type="create_point"></block>
            <block type="buffer"></block>
            <block type="line_segment"></block>
            <block type="polygon"></block>
            <block type="distance_calc"></block>
            <block type="centroid"></block>
            <block type="polygon_area"></block>
            <block type="polygon_perimeter"></block>
            <block type="geometry_type"></block>
          </category>

          <category name="${Blockly.Msg.Categories["OTHER"]}" colour="#5C81A6">
            <block type="controls_if"></block>
            <block type="repeat_times"></block>
            <block type="operators"></block>
            <block type="temp_var"></block>
            <block type="text"></block>
            <block type="line_break"></block>
            <block type="arange">
              <value name="start">
                <shadow type="math_number">
                  <field name="NUM">0</field>
                </shadow>
              </value>
              <value name="stop">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
              <value name="step">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
          </category>
        </xml>
      `;


      /*******
       * Level 2 Toolbox
       * This toolbox includes more advanced blocks for data handling, visualisation, and spatial analysis.
       */


      const advancedToolbox = `
        <xml>
          <category name="${Blockly.Msg.Categories["MATH"]}" colour="#253dc7">
            <block type="math_number"></block>
            <block type="consts"></block>
            <block type="math_arithmetic">
              <field name="OP">ADD</field>
              <value name="A">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="B">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="to_bool"></block>
            <block type="bool"></block>
            <block type="logic_compare"></block>
            <block type="math_square"></block>
            <block type="sqrt_of"></block>
            <block type="exp_of"></block>
            <block type="log_of"></block>
            <block type="trigo"></block>
            <block type="round"></block>
            <block type="modulo"></block>
          </category>

          <category name="${Blockly.Msg.Categories["DATA"]}" colour="#0396c1">
            <category name="${Blockly.Msg.Categories["DOWNLOAD_DATA"]}" colour="#0396c1">
              <block type="sampleDataA"></block>
              <block type="func_download"></block>
              <block type="read_file"></block>
              <block type="listdir"></block>  
              <block type="load_csv"></block>
              <block type="load_json"></block>
              <block type="request_json_data"></block>
              <block type="load_raster"></block>
            </category>
            <category name="${Blockly.Msg.Categories["DATA_MANIPULATION"]}" colour="#0396c1">
              <block type="convert_column"></block>
              <block type="convert_np_to_pd"></block>          
              <block type="data_shape"></block>
              <block type="slice"></block>
              <block type="stacking"></block>
              <block type="group_by"></block>
              <block type="add_object"></block>
              <block type="del_col"></block>
              <block type="delete_object"></block>
              <block type="create_array"></block>
              <block type="sort"></block>
              <block type="reshape">
                <value name="rows">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
                <value name="columns">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
              </block>
              <block type="slice_file"></block>
              <block type="delete_axes">
                <value name="ColArr">
                  <block type="list_create">
                    <value name="element_0">
                      <block type="text">
                        <field name="TEXT">Column Name</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="IndArr">
                  <block type="list_create">
                    <value name="element_0">
                      <block type="text">
                        <field name="TEXT">Row name</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </category>
          </category>

          <category name="${Blockly.Msg.Categories["VISUALISATION"]}" colour="#b12222">
            <block type="create_list_XCoords"></block>
            <block type="create_list_YCoords"></block>
            <block type="plot">
              <value name="Legend">
                <block type="list_create">
                  <value name="element_0">
                    <block type="text">
                      <field name="TEXT">Legend</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
            <block type="scatter">
              <value name="Legend">
                <block type="list_create">
                  <value name="element_0">
                    <block type="text">
                      <field name="TEXT">Legend</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
            <block type="pie_chart">
              <value name="sizes">
                <block type="list_create">
                  <value name="element_0">
                    <block type="math_number">
                      <field name="NUM">100</field>
                    </block>
                  </value>
                </block>
              </value>
              <value name="labels">
                <block type="list_create">
                  <value name="element_0">
                    <block type="text">
                      <field name="TEXT">Value 1</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
            <block type="bar_chart">
              <value name="sizes">
                <block type="list_create">
                  <value name="element_0">
                    <block type="text">
                      <field name="TEXT">A</field>
                    </block>
                  </value>
                </block>
              </value>
              <value name="heights">
                <block type="list_create">
                  <value name="element_0">
                    <block type="math_number">
                      <field name="NUM">10</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
            <block type="boxplot">
              <value name="data">
                <block type="list_create">
                  <value name="element_0">
                    <block type="math_number">
                      <field name="NUM">1</field>
                    </block>
                  </value>
                </block>
              </value>
              <value name="label_group">
                <block type="list_create">
                  <value name="element_0">
                    <block type="text">
                      <field name="TEXT">Label 1</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
            <block type="histogram">
              <value name="data">
                <block type="list_create">
                  <value name="element_0">
                    <block type="math_number">
                      <field name="NUM">1</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
            <block type="density_plot">
              <value name="data">
                <block type="list_create">
                  <value name="element_0">
                    <block type="math_number">
                      <field name="NUM">1</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
            <block type="heatmap">
              <value name="matrix">
                <block type="list_create">
                  <value name="element_0">
                    <block type="list_create">
                      <value name="element_0">
                        <block type="math_number">
                          <field name="NUM">1</field>
                        </block>
                      </value>
                    </block>
                  </value>
                </block>
              </value>
            </block>
            <block type="subplots"></block>
          </category>

          <category name="${Blockly.Msg.Categories["STATISTICS"]}" colour="#05a219">
            <block type="mean"></block>
            <block type="median"></block>
            <block type="std"></block>
            <block type="mean_squared"></block>
            <block type="max"></block>
            <block type="min"></block>
            <block type="sum"></block>
          </category>

          <category name="${Blockly.Msg.Categories["VARIABLES"]}" custom="VARIABLE" colour="#A65E2E"></category>

          <category name="${Blockly.Msg.Categories["IMPORTS"]}" colour="#90A4AE">
            <block type="import0"></block>
            <block type="import1"></block>
            <block type="import2"></block>
            <block type="import3"></block>
          </category>

          <category name="${Blockly.Msg.Categories["BASIC_FUNCTIONS"]}" colour="#123456">
            <block type="lambda"></block>
            <block type="text_print"></block>
            <block type="length_of_str"></block>
            <block type="list_create"></block>
            <block type="list_access"></block>
            <block type="type"></block>
          </category>

          <category name="${Blockly.Msg.Categories["PROCEDURES"]}" custom="PROCEDURE" colour="#8e0079"></category>

          <category name="${Blockly.Msg.Categories["GEOMETRY"]}" colour="#99a700">
            <category name="${Blockly.Msg.Categories["DISTANCE"]}" colour="#99a700">
              <block type="distance_calc"></block>
              <block type="distance_vinc"></block>
              <block type="distance_sph"></block>
              <block type="distance_rect"></block>
              <block type="distance_manhattan"></block>
              <block type="distance_haversine"></block>
            </category>
            <category name="${Blockly.Msg.Categories["POINTS"]}" colour="#99a700">
              <block type="coords"></block>
              <block type="create_point"></block>
              <block type="buffer"></block>
              <block type="line_segment"></block>
              <block type="polygon"></block>
              <block type="multipolygon"></block>
              <block type="centroid"></block>
              <block type="polygon_area"></block>
              <block type="polygon_perimeter"></block>
              <block type="bounding_box"></block>
              <block type="geometry_type"></block>
            </category>
          </category>

          <category name="${Blockly.Msg.Categories["INTERPOLATION"]}" colour="#de6c00">
            <block type="idw_interpolation"></block>
            <block type="ppv_interpolation"></block>
          </category>

          <category name="${Blockly.Msg.Categories["MAPS"]}" colour="#8803c1">
            <block type="GeoCoords"></block>
            <block type="folium_map">
              <value name="center">
                <shadow type="GeoCoords">
                  <field name="XCoord">0</field>
                  <field name="YCoord">0</field>
                </shadow>
              </value>
            </block>
            <block type="folium_icon"></block>
            <block type="folium_marker">
              <value name="icon">
                <shadow type="folium_icon">
                  <field name="icon">info-sign</field>
                  <field name="color">blue</field>
                  <field name="IcColor">white</field>
                  <field name="angle">0</field>
                </shadow>
              </value>
              <value name="position">
                <shadow type="GeoCoords">
                  <field name="XCoord">0</field>
                  <field name="YCoord">0</field>
                </shadow>
              </value>
            </block>
            <block type="folium_polygon">
              <value name="position">
                <block type="list_create">
                  <value name="element_0">
                    <block type="GeoCoords">
                      <field name="XCoord">0</field>
                      <field name="YCoord">0</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
            <block type="folium_circle">
              <value name="position">
                <shadow type="GeoCoords">
                  <field name="XCoord">0</field>
                  <field name="YCoord">0</field>
                </shadow>
              </value>
            </block>
            <block type="folium_rectangle">
              <value name="firstCoord">
                <shadow type="GeoCoords">
                  <field name="XCoord">0</field>
                  <field name="YCoord">0</field>
                </shadow>
              </value>
              <value name="secondCoord">
                <shadow type="GeoCoords">
                  <field name="XCoord">0</field>
                  <field name="YCoord">0</field>
                </shadow>
              </value>
            </block>
            <block type="folium_polyline">
              <value name="position">
                <block type="list_create">
                  <value name="element_0">
                    <block type="GeoCoords">
                      <field name="XCoord">0</field>
                      <field name="YCoord">0</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
            <block type="Choropleth_map">
              <value name="columns_shown">
                <block type="list_create">
                  <value name="element_0">
                    <block type="text">
                      <field name="TEXT">Column 1</field>
                    </block>
                  </value>
                </block>
              </value>
            </block>
            <block type="JSON_on_map"></block>
            <block type ="plotly_scatter_mapbox"></block>
            <block type="saveAndDisplayMap"></block>
          </category>

          <category name="${Blockly.Msg.Categories["OTHER"]}" colour="#5C81A6">
            <block type="while_loop"></block>
            <block type="controls_if"></block>
            <block type="repeat_times"></block>
            <block type="operators"></block>
            <block type="temp_var"></block>
            <block type="var_to_func"></block>
            <block type="text"></block>
            <block type="line_break"></block>
            <block type="arange">
              <value name="start">
                <shadow type="math_number">
                  <field name="NUM">0</field>
                </shadow>
              </value>
              <value name="stop">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
              <value name="step">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="linspace">
              <value name="number">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
              <value name="start">
                <shadow type="math_number">
                  <field name="NUM">0</field>
                </shadow>
              </value>
              <value name="stop">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
            </block>
          </category>
        </xml>
      `;
      const toolboxXml = useMemo(() => {
    return level === "level1" ? beginnerToolbox : advancedToolbox;
  }, [level, beginnerToolbox, advancedToolbox]);

  // Initialise Blockly with the selected theme and toolbox whenever the theme or level changes
  useEffect(() => {
    if (!blocklyDiv.current) {
      console.error("blocklyDiv is not available.");
      return;
    }
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxXml,
      media: "blockly/media/",
      theme: isDarkMode ? darkTheme : lightTheme,
      grid: {
        spacing: 40,
        length: 4,
        colour: "#fff",
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
      },
      move: {
        drag: true,
        wheel: true,
      },
      trashcan: {},
    });
    
    return () => {
      if (linkRef.current) {
        linkRef.current.remove();
        linkRef.current = null;
      }
      workspaceRef.current?.dispose();
    };
  }, [isDarkMode, toolboxXml, workspaceRef]);

  globalThis.generateCode = () => {
    if (!workspaceRef.current) {
      console.error("Blockly workspace is not initialised.");
      return;
    }
    var libs = "", np, pd, gpd, sns, plt, requests, os, def_download, px, folium, interpol_idw, interpol_ppv, geodes, point, line, polyg, multipolyg, box, kde;
    var pythonCode = pythonGenerator.workspaceToCode(workspaceRef.current);
    if(~pythonCode.indexOf('np.')) np = true;
    if(~pythonCode.indexOf('pd.')) pd = true;
    if(~pythonCode.indexOf('sns.')) sns = true;
    if(~pythonCode.indexOf('plt.') || ~pythonCode.indexOf('plot.kde')) plt = true;
    if(~pythonCode.indexOf('gpd.')) gpd = true;
    if(~pythonCode.indexOf('requests.')) requests = true;
    if(~pythonCode.indexOf('os.')) os = true;
    if(~pythonCode.indexOf('download(')) def_download = true;
    if(~pythonCode.indexOf('px.')) px = true;
    if(~pythonCode.indexOf('folium.')) folium = true;
    if(~pythonCode.indexOf('idw_interpolation(')) interpol_idw = true;
    if(~pythonCode.indexOf('interp_ppv(')) interpol_ppv = true;
    if(~pythonCode.indexOf('geodesic(')) geodes = true;
    if(~pythonCode.indexOf('Point')) point = true;
    if(~pythonCode.indexOf('LineString([')) line = true;
    if(~pythonCode.indexOf('Polygon([')) polyg = true;
    if(~pythonCode.indexOf('MultiPolygon([')) multipolyg = true;
    if(~pythonCode.indexOf('box')) box = true;
    if(~pythonCode.indexOf('gaussian_kde')) kde = true;
    libs += np ? "import numpy as np\n" : "";
    libs += pd ? "import pandas as pd\n" : "";
    libs += sns ? "import seaborn as sns\n" : ""; 
    libs += plt ? 'import matplotlib.pyplot as plt\n' : "";
    libs += gpd ? "import geopandas as gpd\n" : "";
    libs += requests ? "import requests\n" : "";
    libs += os ? "import os\n" : "";
    libs += def_download ? 'import requests\n' +
                            'import os\n' +
                            'def download(url):\n' +
                              '\tfilename = os.path.basename(url)\n' +
                              '\tif not os.path.exists(filename):\n' + 
                                '\t\twith requests.get(url, stream=True, allow_redirects=True) as r:\n' +
                                    '\t\t\twith open(filename, "wb") as f:\n' + 
                                        '\t\t\t\tfor chunk in r.iter_content(chunk_size=8192):\n' +
                                            '\t\t\t\t\tf.write(chunk)\n' + 
                                '\t\tprint("Downloaded \'" + filename + "\'")\n\n' : '';
    libs += px ? 'import plotly.express as px\n' : '';
    libs += folium ? 'import folium\n' : '';
    libs += geodes ? "from geopy.distance import geodesic\n" : "";
    libs += point ? "from shapely import Point\n" : "";
    libs += line ? "from shapely import LineString\n" : "";
    libs += polyg ? "from shapely import Polygon\n" : "";
    libs += multipolyg ? "from shapely import MultiPolygon\n" : "";
    libs += box ? "from shapely.geometry import box\n" : "";
    libs += interpol_ppv ? `
import numpy as np
def interp_ppv(x_obs, y_obs, z_obs, x_int, y_int):   
  z_int = np.nan*np.zeros(x_int.shape)
  for i in np.arange(0,x_int.shape[0]):
      for j in np.arange(0,x_int.shape[1]):
          d = np.sqrt((x_int[i,j]-x_obs)**2+(y_int[i,j]-y_obs)**2)
          idx = np.argmin(d)
          z_int[i,j] = z_obs[idx]
  return z_int` : '';
    libs += interpol_idw ? `
from scipy.spatial import cKDTree
def idw_interpolation(xi, yi, zi, xi_interp, yi_interp, power=2):
    tree = cKDTree(np.c_[xi, yi])
    distances, idx = tree.query(np.c_[xi_interp, yi_interp], k=8)
    weights = 1 / distances**power
    weights /= weights.sum(axis=1)[:, None]
    zi_interp = np.sum(weights * zi[idx-1], axis=1)
    return zi_interp` : '';
    libs += kde ? "from scipy.stats import gaussian_kde\n" : "";
    setCode((libs ? libs + '\n' : '') + pythonCode);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Top bar with Upload button and Level toggle */}
      <Toolbar
        sx={{
          bgcolor: theme.palette.background.default,
          borderRadius: 4,
          mb: 2,
          maxHeight: 88,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%", p: 1, flexWrap: "wrap" }}
        >
          <Tooltip title="Upload your CSV, GeoJSON or TIF data." arrow>
            <IconButton
              id="uploadDataButton"
              variant="contained"
              onClick={ onUploadClick }
              sx={{
                width: 40,
                height: 40,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: "#fff",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 0,
              }}
            >
              <Upload fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Check uploaded data">
            <Button
              id="checkDataButton"
              variant="outlined"
              size="small"
              onClick={ () => setShowCheckDataDialog(true) }
              sx={{
                borderRadius: 4,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                height: 40,
                px: 1.5,
                textTransform: "none",
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: "#fff",
                  borderColor: theme.palette.primary.dark,
                },
              }}
            >
              <MdChecklist style={{ marginRight: 4 }} />
              Check Uploads
            </Button>
          </Tooltip>

          <Tooltip title="Create CSV data manually">
            <Button
              id="createDataButton"
              variant="outlined"
              size="small"
              onClick={ () => setOpenCreateDataDialog(true) }
              sx={{
                borderRadius: 4,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                height: 40,
                px: 1.5,
                textTransform: "none",
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: "#fff",
                  borderColor: theme.palette.primary.dark,
                },
              }}
            >
              <MdCreate style={{ marginRight: 4 }} />
              Create Data
            </Button>
          </Tooltip>

          <Tooltip
            title={
              <Box>
                <div>
                  <strong>Beginner:</strong> simple blocks & built-in data
                </div>
                <div>
                  <strong>Advanced:</strong> external files, spatial modeling
                </div>
                <div>Check out the tutorials to get started!</div>
              </Box>
            }
            arrow
            enterDelay={300}
            placement="right"
          >
            <Box>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  labelId="level-select-label"
                  id="level-select"
                  value={ level }
                  onChange={ handleChangeLevel }
                  sx={{
                    height: 40,
                    minHeight: 40,
                    fontSize: "0.9rem",
                    borderRadius: 2,
                    bgcolor:
                      level === "level1"
                        ? "#00c853"
                        : level === "level2"
                        ? "#F44336"
                        : theme.palette.primary.main,
                    color: "#fff",
                    "&:hover": {
                      bgcolor:
                        level === "level1"
                          ? "#00b248" // etwas dunkler
                          : level === "level2"
                          ? "#d32f2f"
                          : theme.palette.primary.dark,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        level === "level1"
                          ? "#00c853"
                          : level === "level2"
                          ? "#F44336"
                          : theme.palette.primary.main,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        level === "level1"
                          ? "#00c853"
                          : level === "level2"
                          ? "#F44336"
                          : theme.palette.primary.dark,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        level === "level1"
                          ? "#00c853"
                          : level === "level2"
                          ? "#F44336"
                          : theme.palette.primary.dark,
                    },
                    ".MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      height: 40,
                      paddingTop: 0,
                      paddingBottom: 0,
                    },
                  }}
                >
                  <MenuItem value="level1" sx={{ fontSize: "1rem" }}>
                    Beginner
                  </MenuItem>
                  <MenuItem value="level2" sx={{ fontSize: "1rem" }}>
                    Advanced
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Tooltip>

          {/* Help button to start Spockly tour */}
          <Tooltip title="Start Spockly Tour" arrow>
            <IconButton
              onClick={() => window?.__startSpocklyTour?.()}
              sx={{
                width: 40,
                height: 40,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: "#fff",
                },
              }}
            >
              <QuestionMark />
            </IconButton>
          </Tooltip>
          <Tooltip title="Show Simple CO₂ Tutorial" arrow>
            <IconButton
              id="showTutorialButton"
              onClick={ handleOpenCO2Tutorial }
              sx={{
                width: 40,
                height: 40,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  color: "#fff",
                },
              }}
            >
              <Co2Outlined />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>

      {/* Blockly rendering area */}
      <Box
        id="blocklyWorkspaceContainer"
        ref={ blocklyDiv }
        sx={{
          height: "80%",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      />

      {/* Dialog */}

      <CheckUploadedDataDialog
        open={showCheckDataDialog}
        onClose={() => setShowCheckDataDialog(false)}
      />

      <CreateDataDialog
        open={openCreateDataDialog}
        onClose={() => setOpenCreateDataDialog(false)}
      />

      <CO2Tutorial
        open={openCO2Tutorial}
        onClose={handleCloseCO2Tutorial}
        step={stepCO2Tutorial}
        nextStep={nextStepCO2Tutorial}
        prevStep={prevStepCO2Tutorial}
        tutorialData={co2Tutorial}
      />
    </Box>
  );
};

export default BlocklyComponent;
