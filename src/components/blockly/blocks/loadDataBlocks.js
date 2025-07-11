import * as Blockly from "blockly";
import datasetColumnsMap from "../constants/constants";

// --- Data Loading Blocks ---
// Blocks to load various types of data sources into the workspace

Blockly.defineBlocksWithJsonArray([
	{
	  type: "load_geojson",
	  message0: "load GeoJSON file %1",
	  args0: [
		{
		  type: "field_input",
		  name: "FILENAME",
		  text: "data.geojson",
		},
	  ],

	  output: null,
	  colour: "#FFA726",
	  tooltip: "Load a GeoJSON file",
	},
  ]);
  
  Blockly.Generator.R.forBlock["load_geojson"] = function (block, generator) {
	generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
	const filename = block.getFieldValue("FILENAME");
	return [`sf::st_read("${filename}")`, Blockly.Generator.R.ORDER_NONE];
  };

// Blocks to load various types of data sources into the workspace
  
Blockly.defineBlocksWithJsonArray([
  // Load CSV
  {
    type: "load_csv",
    message0: "load CSV file %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "data.csv" }],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Load a CSV file from WebR filesystem",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table"
  },

  // Load Shapefile
  {
    type: "load_shapefile",
    message0: "load shapefile %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "map.shp" }],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a shapefile (.shp) from WebR filesystem using sf::st_read()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/st_read"
  },

  // Load Raster (stars)
  {
    type: "load_raster",
    message0: "load raster file %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "raster.tif" }],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a raster file using stars",
    helpUrl: "https://www.rdocumentation.org/packages/stars/versions/0.6-3/topics/read_stars"
  },

  // Load TXT
  {
    type: "load_txt",
    message0: "load text file %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "data.txt" }],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a text file using read.table()",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table"
  },

  // Load JSON
  {
    type: "load_json",
    message0: "load JSON file %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "data.json" }],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a JSON file using jsonlite",
    helpUrl: "https://www.rdocumentation.org/packages/jsonlite/versions/1.8.7/topics/read_json"
  },

  // Load CSV from URL
  {
    type: "load_csv_url",
    message0: "load CSV from URL %1",
    args0: [{ type: "field_input", name: "URL", text: "https://example.com/data.csv" }],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Load a CSV file from a URL",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table"
  },

  // Load API data
  {
    type: "load_api_data",
    message0: "load data from API %1",
    args0: [{ type: "field_input", name: "API_URL", text: "https://api.example.com/data" }],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Load data from a REST API endpoint",
    helpUrl: "https://www.rdocumentation.org/packages/httr/versions/1.4.2/topics/GET"
  },

  // Load built-in dataset
  {
    "type": "load_builtin_dataset",
    "message0": "load built-in dataset %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DATASET",
        "options": [["iris", "iris"], ["mtcars", "mtcars"], ["airquality", "airquality"], ["meuse", "meuse"]]
      }
    ],

    "output": "Dataset",
    "colour": "#FFA726",
    "tooltip": "Load a built-in dataset like iris",
    "helpUrl": "https://www.rdocumentation.org/packages/datasets/versions/3.6.2/topics/iris"
},

  // Reference built-in dataset
  {
    type: "get_dataset",
    message0: "use dataset %1",
    args0: [
      {
        type: "field_dropdown",
        name: "DATASET",
        options: [["iris", "iris"], ["mtcars", "mtcars"], ["airquality", "airquality"], ["meuse", "meuse"]]
      }
    ],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Reference a built-in dataset"
  },
  {
    type: "load_api_data",
    message0: "load data from API %1",
    args0: [
      {
        type: "field_input",
        name: "API_URL",
        text: "https://api.example.com/data",
      },
    ],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Load data from a REST API endpoint",
    helpUrl: "https://www.rdocumentation.org/packages/httr/versions/1.4.2/topics/GET"
  }
]);

// Generator for load_csv block
Blockly.Generator.R.forBlock['load_csv'] = function(block) {
  var filename = block.getFieldValue('FILENAME');

  var code = 'read.csv("' + filename + '")';
  return [code, Blockly.Generator.R.ORDER_NONE];
};

// Generator for load_shapefile block
Blockly.Generator.R.forBlock['load_shapefile'] = function(block) {
  var filename = block.getFieldValue('FILENAME');
  Blockly.Generator.R.requirePackage('sf');
  
  var code = 'st_read("' + filename + '")';
  return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

// Generator for load_raster block
Blockly.Generator.R.forBlock['load_raster'] = function(block) {
  var filename = block.getFieldValue('FILENAME');
  Blockly.Generator.R.requirePackage('terra');
  
  var code = 'rast("' + filename + '")';
  return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

Blockly.Generator.R.forBlock["load_builtin_dataset"] = function(block) {
	const dataset = block.getFieldValue("DATASET");
	if (dataset === "meuse") {
	  return [`meuse`, Blockly.Generator.R.ORDER_ATOMIC];
	} else {
	  return [`${dataset}`, Blockly.Generator.R.ORDER_ATOMIC];
	}
  };

// Generator for get_dataset block
Blockly.Generator.R.forBlock['get_dataset'] = function(block) {
  var dataset = block.getFieldValue('DATASET');
  var code = dataset;
  return [code, Blockly.Generator.R.ORDER_ATOMIC];
};


// --- Data Transformation Blocks ---
// Blocks to manipulate and transform dataframes

Blockly.defineBlocksWithJsonArray([
  {
    type: "data_shape",
    message0: "get shape of %1",
    args0: [
      {
        type: "input_value",
        name: "DATA",
        check: "DataFrame"
      }
    ],
    output: "Vector",
    colour: "#FFA726",
    tooltip: "Get the shape of a dataframe",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/dim"
  },
  {
    type: "filter_rows",
    message0: "filter rows with condition %1",
    args0: [{ type: "field_input", name: "CONDITION", text: "value > 10" }],
    output: null,
    colour: "#FFA726",
    tooltip: "Filter rows from a dataframe",
  },
  {
    type: "select_columns",
    message0: "select columns %1",
    args0: [{ type: "field_input", name: "COLUMNS", text: "col1, col2" }],
    output: null,
    colour: "#FFA726",
    tooltip: "Select specific columns from a dataframe",
  },
  {
    type: "group_by_summarise",
    message0: "group by %1 and summarise %2",
    args0: [
      { type: "field_input", name: "GROUP_COL", text: "group" },
      { type: "field_input", name: "SUMMARISE", text: "mean(value)" }
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Group and summarise a dataset",
  },
  {
    type: "subset_rows",
    message0: "subset %1 from row %2 to %3",
    args0: [
      { type: "input_value", name: "DATA", check: "DataFrame" },
      { type: "field_number", name: "START", value: 1 },
      { type: "field_number", name: "END", value: 10 },
    ],
    output: "DataFrame",
    previousStatement: null,
    nextStatement: null,
    colour: "#FFA726",
    tooltip: "Subset rows of a dataset",
  },
  {
    type: "subset_column_range",
    message0: "column %1 of %2 from row %3 to %4",
    args0: [
      { type: "field_input", name: "COLUMN", text: "Sepal.Length" },
      { type: "field_dropdown", name: "DATASET", options: [["iris", "iris"]] },
      { type: "field_number", name: "START", value: 40 },
      { type: "field_number", name: "END", value: 60 }
    ],
    output: "Vector",
    colour: "#FFA726",
    tooltip: "Access a column range from a dataframe"
  }
]);

// --- Utility and Array Operation Blocks ---
// Blocks for array manipulation and other utility functions

Blockly.defineBlocksWithJsonArray([
  {
    type: "stack_data",
    message0: "stack data %1 and %2 using %3",
    args0: [
      { type: "input_value", name: "DATA1" },
      { type: "input_value", name: "DATA2" },
      {
        type: "field_dropdown",
        name: "METHOD",
        options: [
          ["rbind", "rbind"],
          ["cbind", "cbind"]
        ]
      }
    ],
    output: "DataFrame",
    colour: "#ffd54f",
    tooltip: "Stack two data objects using rbind() or cbind()",
    helpUrl: "https://www.rdocumentation.org/packages/R6Frame/versions/0.1.0/topics/rbind"
  },
  {
    type: "append_array",
    message0: "append value %1 to %2",
    args0: [
      { type: "input_value", name: "VALUE" },
      { type: "input_value", name: "ARRAY" }
    ],
    output: null,
    colour: "#FFD54F",
    tooltip: "Append a value to a vector using append()",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/append"
  },
  {
    type: "create_array",
    message0: "create array from %1 with dimension %2",
    args0: [
      { type: "input_value", name: "DATA" },
      { type: "input_value", name: "DIM" }
    ],
    output: "Array",
    colour: "#FFA726",
    tooltip: "Create an array from a dataset and a dimension vector",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/array"
  },
  {
    type: "sort_array",
    message0: "sort array %1 by %2 in %3 order",
    args0: [
      { type: "input_value", name: "ARRAY" },
      { type: "field_input", name: "COLUMN", text: "1" },
      {
        type: "field_dropdown",
        name: "ORDER",
        options: [["ascending", "TRUE"], ["descending", "FALSE"]]
      }
    ],
    output: "Array",
    colour: "#FFA726",
    tooltip: "Sort an array by a specific column in ascending or descending order",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/sort"
  },
  {
    type: "slice_file",
    message0: "subset %1 with condition %2",
    args0: [
      { type: "input_value", name: "DATA" },
      { type: "field_input", name: "CONDITION", text: "value > 10" }
    ],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Subset data by condition, like data[condition, ]",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/data"
  }
]);

Blockly.defineBlocksWithJsonArray([
	{
	  type: "load_geojson",
	  message0: "load GeoJSON file %1",
	  args0: [
		{
		  type: "field_input",
		  name: "FILENAME",
		  text: "data.geojson",
		},
	  ],

	  output: null,
	  colour: "#FFA726",
	  tooltip: "Load a GeoJSON file",
	},
  ]);
  
  Blockly.Generator.R.forBlock["load_geojson"] = function (block, generator) {
	generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
	const filename = block.getFieldValue("FILENAME");
	return [`sf::st_read("${filename}")`, Blockly.Generator.R.ORDER_NONE];
  };

  Blockly.defineBlocksWithJsonArray([
	{
	  type: "load_tif",
	  message0: "load GeoTIF file %1",
	  args0: [
		{
		  type: "field_input",
		  name: "FILENAME",
		  text: "data.tif",
		},
	  ],

	  output: null,
	  colour: "#FFA726",
	  tooltip: "Load a tif file",
	},
  ]);
  
  Blockly.Generator.R.forBlock["load_tif"] = function (block, generator) {
	generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
	generator.requirePackage("terra");
	const filename = block.getFieldValue("FILENAME");
	return [`terra::rast("${filename}")`, Blockly.Generator.R.ORDER_NONE];
  };