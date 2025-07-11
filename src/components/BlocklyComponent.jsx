import { useEffect, useRef, useMemo, useState } from "react";
import * as Blockly from "blockly";
import "./blockly/customBlocks"; // Import custom blocks
import "./blockly/customGenerator"; // Import custom generator
import "./blockly/rBlocks"; // Import R blocks
import { Box, useTheme, Button } from "@mui/material";
import { lightTheme, darkTheme } from "./blockly/blocklyThemes";
import { Upload } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { ToggleButton, ToggleButtonGroup, IconButton } from "@mui/material";
import { FaBookOpen, FaMapMarkedAlt, FaQuestionCircle } from "react-icons/fa";
import { MdCo2 } from "react-icons/md";
import { Toolbar } from "@mui/material";

import CreateDataDialog from "./CreateDataDialog.jsx";
import CheckUploadedDataDialog from "./CheckUploadedDataDialog.jsx";
import SimpleTutorialPanel from "./SimpleTutorialPanel.jsx";

const BlocklyComponent = ({
  setCode,
  isDarkMode,
  onUploadClick,
  workspaceRef,
}) => {
  const theme = useTheme();
  const blocklyDiv = useRef(null);

  // State to toggle between beginner and advanced block toolboxes
  const [level, setLevel] = useState("level1");

  const [openCreateDataDialog, setOpenCreateDataDialog] = useState(false);

  const [showTutorial, setShowTutorial] = useState(false);
  const [showCheckDataDialog, setShowCheckDataDialog] = useState(false);

  // Blockly toolbox definition for Level 1 (Beginner)
  // Change content later
  const beginnerToolbox = `
<xml>
  <category name="Tests" colour="#5C81A6">
    <block type="head_print"></block>	
	<block type="install_package"></block>
	<block type="plot_vector"></block>
	<block type="load_geojson_to_leaflet"></block>
	<block type="load_csv_to_leaflet"></block>
	<block type="krigging_temperature_interpolation"></block>
  </category>

  <category name="Load Data" colour="#FFA726">
    <block type="load_builtin_dataset"></block>
	<block type="load_csv"></block>
	<block type="load_geojson"></block>
	<block type="load_tif"></block>
  </category>

  <category name="Data Inspection" colour="#FF7043">
  	<block type="access_column"></block>
	<block type="structure_overview"></block>
    <block type="data_summary"></block>
    <block type="data_table"></block>
	<block type="length_data"></block>
	<block type="show_tail"></block>
	<block type="show_rows"></block>
  </category>

  <category name="Variables" colour="#7d4561" custom="VARIABLE"></category>
  
  <category name="Booleans" colour="#D32F2F">
    <block type="convert_to_bool"></block>
    <block type="boolean_true"></block>
    <block type="boolean_false"></block>
  </category>

  <category name="Maths" colour="#FF8A65">
    <block type="math_number"></block>
    <block type="sum_vector"></block>
    <block type="vector_minus_scalar"></block>
    <block type="square_vector"></block>
    <block type="sqrt_vector"></block>
    <block type="divide_values"></block>
    <block type="exp_of"></block>
    <block type="log_of"></block>
	<block type="rnorm_block"></block>
  </category>
  
  <category name="Text" colour="#0f45a3">
    <block type="text"></block>
	<block type="text_print"></block>
  </category>

  <category name="Statistics" colour="#BA68C8">
    <block type="calculate_mean"></block>
    <block type="calculate_sd"></block>
    <block type="calculate_quantile"></block>
    <block type="calculate_median"></block>
    <block type="calculate_max"></block>
    <block type="calculate_min"></block>
    <block type="calculate_sum"></block>
  </category>  

  <category name="Transformations" colour="#FFD54F">
    <block type="filter_rows"></block>
    <block type="select_columns"></block>
    <block type="subset_rows"></block>
    <block type="subset_column_range"></block>
	    <block type="rename_column">
      <value name="COLUMN_NUMBER">
        <block type="math_number">
          <field name="NUM"></field>
        </block>
      </value>
      <value name="NEW_NAME">
        <block type="text">
          <field name="TEXT"></field>
        </block>
      </value>
    </block>
	<block type="convert_to_sf"></block>
	<block type="convert_to_dataframe"></block>
  </category>

<category name="Maps" colour="#67c761">
  <label text="Create Map" web-class="toolboxLabel"></label>
  <block type="create_map_beginner">
    <field name="LOCATION">new_york</field>
    <field name="ZOOM">10</field>
	<field name="STYLE">osm</field>
  </block>
  
<label text="Load Your Data" web-class="toolboxLabel"></label>
<block type="load_data_to_map_beginner">
  <field name="DISPLAY_TYPE">markers</field>
  <field name="POPUP_FIELD">auto</field>
  <value name="DATA_FILE">
    <block type="text">
      <field name="TEXT">data.csv</field>
    </block>
  </value>
</block>
  
  <label text="Add to Map" web-class="toolboxLabel"></label>
  <block type="add_marker_beginner">
    <value name="LAT">
      <block type="math_number">
        <field name="NUM">40.7128</field>
      </block>
    </value>
    <value name="LNG">
      <block type="math_number">
        <field name="NUM">-74.0060</field>
      </block>
    </value>
    <value name="LABEL">
      <block type="text">
        <field name="TEXT">New York City</field>
      </block>
    </value>
  </block>
  
  <block type="add_circle_beginner">
    <field name="RADIUS">500</field>
    <field name="COLOR">#FF5252</field>
    <value name="LAT">
      <block type="math_number">
        <field name="NUM">40.7128</field>
      </block>
    </value>
    <value name="LNG">
      <block type="math_number">
        <field name="NUM">-74.0060</field>
      </block>
    </value>
  </block>

  <label text="Save Map" web-class="toolboxLabel"></label>
  <block type="save_map_beginner">
    <field name="FILENAME">my_map.html</field>
  </block>
</category>
  
<category name="Visualization" colour="#90A4AE">
  <label text="Basic Charts" web-class="toolboxLabel"></label>
  <block type="create_chart_beginner">
    <field name="CHART_TYPE">scatter</field>
    <field name="COLOR">#4285F4</field>
  </block>
  
  <block type="create_xy_chart_beginner">
    <field name="CHART_TYPE">scatter</field>
    <field name="COLOR">#4285F4</field>
  </block>
  
  <label text="Add to Chart" web-class="toolboxLabel"></label>
  <block type="add_to_chart_beginner">
    <field name="ADD_TYPE">points</field>
  </block>
  
  <label text="Layout" web-class="toolboxLabel"></label>
  <block type="chart_layout_beginner">
    <field name="LAYOUT">1,2</field>
  </block>
</category>


  <category name="Export" colour="#FFB74D">
    <block type="export_plot_png"></block>
	<block type="export_plot_pdf"></block>
    <block type="export_data_csv"></block>
    <block type="save_workspace"></block>
  </category>
</xml>
`;

  // Blockly toolbox definition for Level 2 (Advanced)
  // Change content later
  const advancedToolbox = `
<xml>
  <category name="Tests" colour="#5C81A6">
    <block type="head_print"></block>	
	<block type="install_package"></block>
	<block type="plot_vector"></block>
	<block type="load_geojson_to_leaflet"></block>
	<block type="load_csv_to_leaflet"></block>
  </category>

  <category name="Load Data" colour="#FFA726">
    <block type="load_builtin_dataset"></block>
    <block type="load_csv"></block>
    <block type="load_shapefile"></block>
    <block type="load_raster"></block>
    <block type="load_txt"></block>
    <block type="load_json"></block>
    <block type="load_geojson"></block>
	<block type="load_tif"></block>
    <block type="load_csv_url"></block>
    <block type="load_api_data"></block>
	<block type="load_csv"></block>
	<block type="load_geojson"></block>
  </category>

  <category name="Data Inspection" colour="#FF7043">
  	<block type="data_summary"></block>
    <block type="structure_overview"></block>
    <block type="data_shape"></block>
    <block type="group_by_summarise"></block>
	<block type="data_table"></block>
	<block type="length_data"></block>
	<block type="show_tail"></block>
	<block type="show_rows"></block>
	<block type="access_column"></block>
  </category>

  <category name="Variables" colour="#7d4561" custom="VARIABLE"></category>
  
  <category name="Booleans" colour="#D32F2F">
    <block type="convert_to_bool"></block>
    <block type="boolean_true"></block>
    <block type="boolean_false"></block>
  </category>

  <category name="Maths" colour="#FF8A65">
    <block type="math_number"></block>
    <block type="sum_vector"></block>
    <block type="vector_minus_scalar"></block>
    <block type="square_vector"></block>
    <block type="sqrt_vector"></block>
    <block type="divide_values"></block>
    <block type="exp_of"></block>
    <block type="log_of"></block>
    <block type="sin_of"></block>
    <block type="round_value"></block>
    <block type="modulo_values"></block>
    <block type="math_arithmetic"></block>
	<block type="rnorm_block"></block>
  </category>

  <category name="Text" colour="#0f45a3">
    <block type="text"></block>
	<block type="text_print"></block>
  </category>

  <category name="Statistics" colour="#BA68C8">
    <block type="calculate_mean"></block>
    <block type="calculate_sd"></block>
    <block type="calculate_quantile"></block>
    <block type="calculate_median"></block>
    <block type="calculate_max"></block>
    <block type="calculate_min"></block>
    <block type="calculate_sum"></block>
  </category>

  <category name="Transformations" colour="#FFD54F">
	<block type="select_columns"></block>
    <block type="sort_array"></block>
    <block type="stack_data"></block>
    <block type="append_array"></block>
    <block type="create_array"></block>
    <block type="slice_file"></block>
	<block type="filter_rows"></block>
	<block type="subset_rows"></block>
    <block type="subset_column_range"></block>
	<block type="convert_to_sf"></block>
	<block type="convert_to_dataframe"></block>
  </category>

<category name="Maps" colour="#67c761">
  <label text="Map Creation" web-class="toolboxLabel"></label>
  <block type="leaflet_map_advanced">
    <statement name="SETTINGS">
      <block type="map_center_setting">
        <value name="LAT">
          <block type="math_number">
            <field name="NUM">40.7128</field>
          </block>
        </value>
        <value name="LNG">
          <block type="math_number">
            <field name="NUM">-74.0060</field>
          </block>
        </value>
        <next>
          <block type="map_zoom_setting">
            <value name="ZOOM">
              <block type="math_number">
                <field name="NUM">10</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
  </block>
  
  <label text="Map Settings" web-class="toolboxLabel"></label>
  <block type="map_center_setting">
    <value name="LAT">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
    <value name="LNG">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
  </block>
  
  <block type="map_zoom_setting">
    <value name="ZOOM">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
  </block>
  
  <block type="map_bounds_setting">
    <value name="SW_LAT">
      <block type="math_number">
        <field name="NUM">-10</field>
      </block>
    </value>
    <value name="SW_LNG">
      <block type="math_number">
        <field name="NUM">-10</field>
      </block>
    </value>
    <value name="NE_LAT">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
    <value name="NE_LNG">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
  </block>
  
  <block type="map_options_setting">
    <statement name="OPTIONS">
      <block type="min_zoom_option">
        <field name="MIN_ZOOM">1</field>
        <next>
          <block type="max_zoom_option">
            <field name="MAX_ZOOM">18</field>
          </block>
        </next>
      </block>
    </statement>
  </block>
  
  <label text="Tile Layers" web-class="toolboxLabel"></label>
  <block type="add_tiles_advanced">
    <field name="PROVIDER">osm</field>
  </block>
  
  <label text="Map Elements" web-class="toolboxLabel"></label>
  <block type="add_markers_advanced">
    <statement name="SETTINGS">
      <block type="marker_lat_lng_setting">
        <value name="LAT_COL">
          <block type="text">
            <field name="TEXT">latitude</field>
          </block>
        </value>
        <value name="LNG_COL">
          <block type="text">
            <field name="TEXT">longitude</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  
  <block type="marker_lat_lng_setting">
    <value name="LAT_COL">
      <block type="text">
        <field name="TEXT">lat</field>
      </block>
    </value>
    <value name="LNG_COL">
      <block type="text">
        <field name="TEXT">lng</field>
      </block>
    </value>
  </block>
  
  <block type="marker_popup_setting">
    <value name="POPUP_COL">
      <block type="text">
        <field name="TEXT">name</field>
      </block>
    </value>
  </block>
  
  <block type="marker_icon_setting">
    <field name="WIDTH">25</field>
    <field name="HEIGHT">25</field>
    <value name="ICON_URL">
      <block type="text">
        <field name="TEXT">marker-icon.png</field>
      </block>
    </value>
  </block>
  
  <block type="add_polygons_advanced">
    <statement name="STYLE">
      <block type="polygon_fill_style">
        <field name="FILL_OPACITY">0.5</field>
        <value name="FILL_COLOR">
          <block type="text">
            <field name="TEXT">blue</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  
  <block type="polygon_fill_style">
    <field name="FILL_OPACITY">0.5</field>
    <value name="FILL_COLOR">
      <block type="text">
        <field name="TEXT">red</field>
      </block>
    </value>
  </block>
  
  <block type="polygon_stroke_style">
    <field name="WEIGHT">2</field>
    <value name="STROKE_COLOR">
      <block type="text">
        <field name="TEXT">black</field>
      </block>
    </value>
  </block>
  
  <label text="Legend" web-class="toolboxLabel"></label>
  <block type="add_legend_advanced">
    <field name="POSITION">topright</field>
  </block>
  
  <label text="Export" web-class="toolboxLabel"></label>
  <block type="save_leaflet_advanced">
    <field name="FILENAME">interactive_map.html</field>
    <field name="SELF_CONTAINED">TRUE</field>
  </block>
</category>

<category name="Visualization" colour="#607D8B">
  <label text="Plot Types" web-class="toolboxLabel"></label>
  <block type="plot_advanced">
    <field name="PLOT_TYPE">scatter</field>
    <statement name="SETTINGS">
      <block type="plot_xy_setting"></block>
    </statement>
  </block>
  
  <label text="Data Settings" web-class="toolboxLabel"></label>
  <block type="plot_data_setting"></block>
  <block type="plot_xy_setting"></block>
  
  <label text="Appearance" web-class="toolboxLabel"></label>
  <block type="plot_appearance_setting">
    <statement name="OPTIONS">
      <block type="color_option">
        <value name="COLOR">
          <block type="text">
            <field name="TEXT">blue</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  
  <block type="color_option">
    <value name="COLOR">
      <block type="text">
        <field name="TEXT">red</field>
      </block>
    </value>
  </block>
  
  <block type="symbol_option">
    <field name="SYMBOL">1</field>
  </block>
  
  <block type="line_type_option">
    <field name="LINE_TYPE">1</field>
  </block>
  
  <block type="size_option">
    <field name="SIZE">1</field>
  </block>
  
  <label text="Labels & Titles" web-class="toolboxLabel"></label>
  <block type="plot_labels_setting">
    <statement name="LABELS">
      <block type="title_label">
        <value name="TITLE">
          <block type="text">
            <field name="TEXT">My Plot</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  
  <block type="title_label">
    <value name="TITLE">
      <block type="text">
        <field name="TEXT">Title</field>
      </block>
    </value>
  </block>
  
  <block type="axis_label">
    <field name="AXIS">x</field>
    <value name="LABEL">
      <block type="text">
        <field name="TEXT">X Axis</field>
      </block>
    </value>
  </block>
  
  <label text="Axis Limits" web-class="toolboxLabel"></label>
  <block type="plot_limits_setting">
    <statement name="LIMITS">
      <block type="axis_limit">
        <field name="AXIS">x</field>
        <value name="MIN">
          <block type="math_number">
            <field name="NUM">0</field>
          </block>
        </value>
        <value name="MAX">
          <block type="math_number">
            <field name="NUM">100</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  
  <block type="axis_limit">
    <field name="AXIS">x</field>
    <value name="MIN">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
    <value name="MAX">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
  </block>
  
  <label text="Legend" web-class="toolboxLabel"></label>
  <block type="plot_legend_setting">
    <field name="SHOW">TRUE</field>
    <field name="POSITION">topright</field>
  </block>
  
  <label text="Add Layers" web-class="toolboxLabel"></label>
  <block type="add_layer_advanced">
    <field name="LAYER_TYPE">points</field>
  </block>
  
  <label text="Layout" web-class="toolboxLabel"></label>
  <block type="layout_advanced">
    <field name="ROWS">2</field>
    <field name="COLS">2</field>
    <field name="ADJUST_MARGINS">FALSE</field>
  </block>
</category>

  <category name="Geometry" colour="#4DD0E1">
    <block type="st_centroid"></block>
    <block type="st_transform"></block>
    <block type="st_buffer"></block>
    <block type="st_coords"></block>
    <block type="st_point"></block>
    <block type="st_linestring"></block>
    <block type="st_polygon"></block>
    <block type="st_multipolygon"></block>
    <block type="st_distance"></block>
    <block type="st_area"></block>
    <block type="st_length"></block>
    <block type="st_bbox"></block>
    <block type="st_crs"></block>
    <block type="st_geometry_type"></block>
  </category>

  <category name="Raster" colour="#64B5F6">
    <block type="crop_raster"></block>
    <block type="aggregate_raster"></block>
  </category>

  <category name="Export" colour="#FFB74D">
    <block type="export_plot_png"></block>
	<block type="export_plot_pdf"></block>
    <block type="export_data_csv"></block>
    <block type="save_workspace"></block>
  </category>
</xml>
`;

  const toolboxXml = useMemo(() => {
    return level === "level1" ? beginnerToolbox : advancedToolbox;
  }, [level]);

  // Initialize Blockly with the selected theme and toolbox whenever the theme or level changes
  useEffect(() => {
    if (!blocklyDiv.current) return;
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      media:"blockly/media/",
      renderer: "zelos",
      toolbox: toolboxXml,
      theme: isDarkMode ? darkTheme : lightTheme,
      grid: { spacing: 40, length: 4, colour: "#fff", snap: true },
      zoom: { controls: true, wheel: true },
      move: { drag: true, wheel: true },
      trashcan: {},
    });

    return () => workspaceRef.current?.dispose();
  }, []);
  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.setTheme(isDarkMode ? darkTheme : lightTheme);
    }
  }, [isDarkMode]);
  useEffect(() => {
    workspaceRef.current?.updateToolbox(toolboxXml);
  }, [toolboxXml]);

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
          display: "flex",
          justifyContent: "space-between",
          bgcolor: isDarkMode ? "#150e31" : "#f5f5f5",
          mb: 2,
          borderRadius: 4,
        }}
      >
        <Tooltip title="Upload your CSV, GeoJSON or TIF data." arrow>
          <Button
            id="uploadDataButton"
            variant="contained"
            onClick={onUploadClick}
            sx={{
              width: 48,
              height: 48,
              minWidth: 0,
              borderRadius: "50%",
              bgcolor: theme.palette.secondary.main,
              color: isDarkMode ? "#FFFFFA" : "#000000",
              "&:hover": {
                bgcolor: theme.palette.secondary.dark,
                color: "#fff",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 0,
            }}
          >
            <Upload fontSize="medium" />
          </Button>
        </Tooltip>

        <Tooltip title="Check uploaded data">
            <Button
              id="checkDataButton"
              variant="outlined"
              onClick={() => setShowCheckDataDialog(true)}
              sx={{ ml: 2 }}
            >
              Check Uploads
            </Button>
            <CheckUploadedDataDialog
              open={showCheckDataDialog}
              onClose={() => setShowCheckDataDialog(false)}
            />
        </Tooltip>

        <Tooltip title="Create CSV data manually">
          <Button
            id="createDataButton"
            variant="outlined"
            onClick={() => setOpenCreateDataDialog(true)}
            sx={{ ml: 2 }}
          >
            Create Data
          </Button>
        </Tooltip>

        <CreateDataDialog
          open={openCreateDataDialog}
          onClose={() => setOpenCreateDataDialog(false)}
        />

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          flex={1}
          justifyContent="flex-end"
          minWidth={0}
        >
          <Tooltip
            title={
              <Box>
                Beginner: built-in datasets & simple blocks.
                <br />
                Advanced: load files, model, visualize spatial data.
                <br />
                See tutorials for more information.
              </Box>
            }
            arrow
            enterDelay={0}
          >
            <ToggleButtonGroup
              exclusive
              value={level}
              onChange={(e, newLevel) => newLevel && setLevel(newLevel)}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
              }}
              id="switchLevelsButton"
            >
              <ToggleButton value="level1" sx={{ px: 2, py: 1, gap: 1 }}>
                <FaBookOpen /> Beginner
              </ToggleButton>
              <ToggleButton value="level2" sx={{ px: 2, py: 1, gap: 1 }}>
                <FaMapMarkedAlt /> Advanced
              </ToggleButton>
            </ToggleButtonGroup>
          </Tooltip>

          {/* Help button to start Spockly tour */}
          <Tooltip title="Start Spockly Tour" arrow>
            <IconButton
              onClick={() => window?.__startSpocklyTour?.()}
              sx={{ color: "inherit" }}
            >
              <FaQuestionCircle />
            </IconButton>
          </Tooltip>

          <Tooltip title="Show Simple CO₂ Tutorial" arrow>
            <IconButton
              id="showTutorialButton"
              onClick={() => setShowTutorial((prev) => !prev)}
              sx={{ color: showTutorial ? "green" : "inherit" }}
            >
              <MdCo2 />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      {/* Blockly rendering area */}
      <Box
        id="blocklyWorkspaceContainer"
        ref={blocklyDiv}
        sx={{
          height: "90%",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      />

      {showTutorial && (
        <SimpleTutorialPanel onClose={() => setShowTutorial(false)} />
      )}
    </Box>
  );
};

export default BlocklyComponent;
