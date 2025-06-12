import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import "./blockly/customBlocks"; // Import custom blocks
import "./blockly/customGenerator"; // Import custom generator
import "./blockly/rBlocks"; // Import R blocks
import { Box } from "@mui/material";
import { lightTheme, darkTheme } from "./blockly/blocklyThemes";

const BlocklyComponent = ({ setCode, isDarkMode, workspaceRef }) => {
  const blocklyDiv = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    if (!blocklyDiv.current) {
      console.error("blocklyDiv is not available.");
      return;
    }

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      renderer: "zelos",
      toolbox: `
      <xml>
        <category name="Examples" colour="#5C81A6">
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
          <block type="math_number"></block>
          <block type="math_arithmetic"></block>
          <block type="text"></block>
          <block type="text_print"></block>
          <block type="histogram_block"></block>
          <block type="rnorm_block"></block>
        </category>
        <category name="Custom Blocks" colour="#5C81A6">
          <block type="print_hello"></block>
          <block type="math_square"></block>
          <block type="text_greeting"></block>
          <block type="repeat_times"></block>
          <block type="dropdown_color"></block>
        </category>
        <category name="R-Example" colour="#5CA65C">
          <block type="create_vector"></block>
          <block type="plot_vector"></block>
        </category>

        <category name="Load Data" colour="#FFA726">
          <block type="load_csv"></block>
          <block type="load_shapefile"></block>
          <block type="load_raster"></block>
          <block type="load_builtin_dataset"></block>
          <block type="get_dataset"></block>
        </category>

        <category name="Variables" colour="#A65E2E" custom="VARIABLE"></category>
        <category name="Math" colour="#FF8A65">
          <block type="sum_vector"></block>
          <block type="vector_minus_scalar"></block>
          <block type="square_vector"></block>
          <block type="sqrt_vector"></block>
          <block type="divide_values"></block>
          <block type="math_number"></block>
          <block type="math_arithmetic"></block>
        </category>

        <category name="Transformations" colour="#FFD54F">
          <block type="filter_rows"></block>
          <block type="select_columns"></block>
          <block type="group_by"></block>
          <block type="subset_rows"></block>
          <block type="subset_column_range"></block>
        </category>

        <category name="Statistics" colour="#BA68C8">
          <block type="calculate_mean"></block>
          <block type="calculate_sd"></block>
          <block type="quantile_column"></block>
          <block type="sorted_element_at"></block>
          <block type="summarize_data"></block>
        </category>

        <category name="Modeling" colour="#A1887F">
          <block type="linear_regression"></block>
          <block type="semivariogram"></block>
          <block type="kriging_interpolation"></block>
        </category>

        <category name="Geometry" colour="#4DD0E1">
          <block type="st_centroid"></block>
          <block type="st_transform"></block>
          <block type="st_buffer"></block>
        </category>

        <category name="Raster" colour="#64B5F6">
          <block type="read_stars"></block>
          <block type="crop_raster"></block>
          <block type="aggregate_raster"></block>
        </category>

        <category name="Maps" colour="#81C784">
          <block type="plot_map"></block>
          <block type="set_map_title"></block>
          <block type="color_by_attribute"></block>
        </category>

        <category name="Visualization" colour="#90A4AE">
          <block type="print_output"></block>
          <block type="preview_data"></block>
          <block type="show_structure"></block>
          <block type="show_rows"></block>
          <block type="show_tail"></block>
          <block type="plot_scatter"></block>
          <block type="plot_histogram"></block>
          <block type="plot_boxplot"></block>
        </category>
        
        <category name="Geojson filetest" colour="#8E44AD">
          <block type="load_geojson"></block>
          <block type="assign_variable"></block>
          <block type="print_statement"></block>
          <block type="plot_geojson"></block>
        </category>
      </xml>
    `,
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
        scrollbars: true,
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
  }, [isDarkMode]);

  return (
    <Box
      ref={blocklyDiv}
      sx={{
        height: "100%",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export default BlocklyComponent;
