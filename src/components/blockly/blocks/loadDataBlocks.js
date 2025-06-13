import * as Blockly from "blockly";


// ---column mapping for R inbuilt datasets--------------//
const datasetColumnsMap = {
  iris: [
    ['Sepal.Length', 'Sepal.Length'],
    ['Sepal.Width', 'Sepal.Width'],
    ['Petal.Length', 'Petal.Length'],
    ['Petal.Width', 'Petal.Width'],
    ['Species', 'Species']
  ],
  mtcars: [
    ['mpg', 'mpg'],
    ['cyl', 'cyl'],
    ['disp', 'disp'],
    ['hp', 'hp'],
    ['drat', 'drat'],
    ['wt', 'wt'],
    ['qsec', 'qsec'],
    ['vs', 'vs'],
    ['am', 'am'],
    ['gear', 'gear'],
    ['carb', 'carb']
  ],
  airquality: [
    ['Ozone', 'Ozone'],
    ['Solar.R', 'Solar.R'],
    ['Wind', 'Wind'],
    ['Temp', 'Temp'],
    ['Month', 'Month'],
    ['Day', 'Day']
  ],
  meuse: [
    ['x', 'x'],
    ['y', 'y'],
    ['cadmium', 'cadmium'],
    ['copper', 'copper'],
    ['lead', 'lead'],
    ['zinc', 'zinc'],
    ['elev', 'elev'],
    ['dist', 'dist'],
    ['om', 'om'],
    ['ffreq', 'ffreq'],
    ['soil', 'soil'],
    ['lime', 'lime'],
    ['landuse', 'landuse'],
    ['dist.m', 'dist.m']
  ]
};


// --- Data Loading Blocks ---
// Blocks to load various types of data sources into the workspace
  
Blockly.defineBlocksWithJsonArray([
  {
	  type: "load_csv",
	  message0: "load CSV file %1",
	  args0: [
		{
		  type: "field_input",
		  name: "FILENAME",
		  text: "data.csv",
		},
	  ],
	  output: "DataFrame",
	  colour: "#FFA726",
	  tooltip: "Load a CSV file from WebR filesystem",
	  helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table",
	},
  {
    type: "load_shapefile",
    message0: "load shapefile %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "map.shp",
      },
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a shapefile with st_read()",
    helpUrl: ""
  },
  {
    type: "load_raster",
    message0: "load raster file %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "raster.tif",
      },
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a raster file using stars",
    helpUrl: ""
  },
  {
    type: "load_txt",
    message0: "load text file %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "data.txt",
      },
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a text file using read.table()",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table"
  },
  {
    type: "load_json",
    message0: "load JSON file %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "data.json",
      },
    ],
    output: null,
    colour: "#FFA726",
    tooltip: "Load a JSON file using jsonlite",
  },
  {
    type: "load_csv_url",
    message0: "load CSV from URL %1",
    args0: [
      {
        type: "field_input",
        name: "URL",
        text: "https://example.com/data.csv",
      },
    ],
    output: "DataFrame",
    colour: "#FFA726",
    tooltip: "Load a CSV file from a URL",
    helpUrl: "https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/read.table"
  },
  {
    type: "load_builtin_dataset",
    message0: "load built-in dataset %1",
    args0: [
      {
        type: "field_dropdown",
        name: "DATASET",
        options: [["iris", "iris"], ["mtcars", "mtcars"], ["airquality", "airquality"], ["meuse", "meuse"]]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FFA726",
    tooltip: "Load a built-in dataset like iris e.t.c ",
    helpUrl: "https://www.rdocumentation.org/packages/datasets/versions/3.6.2/topics/iris"
  },
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
  Blockly.Generator.R.addLibrary('readr');
  
  var code = 'read_csv("' + filename + '")';
  return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

// Generator for load_shapefile block
Blockly.Generator.R.forBlock['load_shapefile'] = function(block) {
  var filename = block.getFieldValue('FILENAME');
  Blockly.Generator.R.addLibrary('sf');
  
  var code = 'st_read("' + filename + '")';
  return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

// Generator for load_raster block
Blockly.Generator.R.forBlock['load_raster'] = function(block) {
  var filename = block.getFieldValue('FILENAME');
  Blockly.Generator.R.addLibrary('stars');
  
  var code = 'read_stars("' + filename + '")';
  return [code, Blockly.Generator.R.ORDER_FUNCTION_CALL];
};

Blockly.Generator.R.forBlock["load_builtin_dataset"] = function(block) {
  const dataset = block.getFieldValue("DATASET");
  if (dataset === "meuse") {
    return `library(sp)\ndata(meuse)\ndata <- meuse\n`;
  } else {
    return `data <- ${dataset}\n`;
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


// Define the block to select column - inbuilt dataset
Blockly.Blocks['select_columns'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("select columns")
        .appendField(new Blockly.FieldDropdown(this.getColumnOptions.bind(this)), "COLUMN1")
        .appendField(",")
        .appendField(new Blockly.FieldDropdown(this.getColumnOptions.bind(this)), "COLUMN2");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null);     
    this.setColour("#FFA726"); 
    this.setTooltip("Select two columns from the loaded dataset");
    this.setHelpUrl("");

    this.workspace.addChangeListener(this.onWorkspaceChange.bind(this));
  },

  getColumnOptions: function() {
    const defaultColumns = [['col1', 'col2']];
    const loadedDataset = this.getLoadedDatasetColumns();
    return loadedDataset.length > 0 ? loadedDataset : defaultColumns;
  },
  getLoadedDatasetColumns: function() {
    const blocks = this.workspace.getAllBlocks(false);
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i];
      if (block.type === 'load_builtin_dataset' && block.getFieldValue) {
        const datasetName = block.getFieldValue('DATASET');
        if (datasetColumnsMap[datasetName]) {
          return datasetColumnsMap[datasetName];
        }
      }
    }
    return [];
  },
  onWorkspaceChange: function(event) {
    if (event.type === Blockly.Events.BLOCK_CHANGE || 
        event.type === Blockly.Events.BLOCK_CREATE ||
        event.type === Blockly.Events.BLOCK_DELETE) {
      this.updateDropdowns();
    }
  },

  updateDropdowns: function() {
    const newOptions = this.getColumnOptions();
    const dropdown1 = this.getField('COLUMN1');
    const dropdown2 = this.getField('COLUMN2');
    
    if (dropdown1 && dropdown2) {
      const currentVal1 = dropdown1.getValue();
      const currentVal2 = dropdown2.getValue();

      dropdown1.menuGenerator_ = newOptions;
      dropdown2.menuGenerator_ = newOptions;

      const optionValues = newOptions.map(option => option[1]);
      if (optionValues.includes(currentVal1)) {
        dropdown1.setValue(currentVal1);
      }
      if (optionValues.includes(currentVal2)) {
        dropdown2.setValue(currentVal2);
      }
    }
  }
};

Blockly.Generator.R.forBlock["select_columns"] = function(block) {
  const column1 = block.getFieldValue("COLUMN1");
  const column2 = block.getFieldValue("COLUMN2");
  return `selected_data <- data[c("${column1}", "${column2}")]\n`;
};


//group by block
Blockly.Blocks['group_by'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("group data by")
        .appendField(new Blockly.FieldDropdown(this.getGroupByOptions.bind(this)), "GROUP_COL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFA726");
    this.setTooltip("Group the dataset by a specific column (e.g., Species or cyl)");
    this.setHelpUrl("");
    
    this.workspace.addChangeListener(this.onWorkspaceChange.bind(this));
  },

  getGroupByOptions: function() {
    const defaultColumns = [['Select column', '']];
    const columns = this.getLoadedDatasetColumns();
    return columns.length > 0 ? columns : defaultColumns;
  },

  getLoadedDatasetColumns: function() {
    const blocks = this.workspace.getAllBlocks(false);
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i];
      if (block.type === 'load_builtin_dataset' && block.getFieldValue) {
        const dataset = block.getFieldValue("DATASET");
        return datasetColumnsMap[dataset] || [];
      }
    }
    return [];
  },

  onWorkspaceChange: function(event) {
    if (event.type === Blockly.Events.BLOCK_CHANGE || 
        event.type === Blockly.Events.BLOCK_CREATE ||
        event.type === Blockly.Events.BLOCK_DELETE) {
      this.updateDropdown();
    }
  },

  updateDropdown: function() {
    const dropdown = this.getField('GROUP_COL');
    const currentVal = dropdown.getValue();
    const newOptions = this.getGroupByOptions();
    dropdown.menuGenerator_ = newOptions;

    const validOptions = newOptions.map(opt => opt[1]);
    if (validOptions.includes(currentVal)) {
      dropdown.setValue(currentVal);
    }
  }
};

Blockly.Generator.R.forBlock["group_by"] = function(block) {
  const groupColumn = block.getFieldValue("GROUP_COL");
  return `grouped <- split(data, data$${groupColumn})\n`;
};

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
    colour: "#FFA726",
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
    colour: "#FFA726",
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