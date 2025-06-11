import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "create_vector",
    message0: "vector with %1",
    args0: [
      {
        type: "field_input",
        name: "ELEMENTS",
        text: "1, 2, 3",
      },
    ],
    output: null,
    colour: 230,
    tooltip: "Create a numeric vector",
    helpUrl: "",
  },
]);

Blockly.Generator.R.forBlock["create_vector"] = function (block) {
  const elements = block.getFieldValue("ELEMENTS");
  return [`c(${elements})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "plot_vector",
    message0: "plot %1",
    args0: [
      {
        type: "input_value",
        name: "VECTOR",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 200,
    tooltip: "Plot a vector using plot()",
    helpUrl: "",
  },
]);

Blockly.Generator.R.forBlock["plot_vector"] = function (block, generator) {
  const vector =
    generator.valueToCode(block, "VECTOR", Blockly.Generator.R.ORDER_NONE) ||
    "c()";
  return `plot(${vector})\n`;
};

// --- Load Data ---
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
	  output: null,
	  colour: "#FFA726",
	  tooltip: "Load a CSV file",
	  helpUrl: "",
	},
  ]);
  
  Blockly.Generator.R.forBlock["load_csv"] = function (block) {
	const filename = block.getFieldValue("FILENAME");
	return `
	  data <- read.csv("${filename}")
	`;
  };
  
Blockly.defineBlocksWithJsonArray([
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
    tooltip: "Load a built-in dataset like iris",
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
  }
]);


// --------RGENERATOR LOAD DATA-----------

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



// --- Transformations ---
Blockly.defineBlocksWithJsonArray([
  {
    type: "filter_rows",
    message0: "filter rows with condition %1",
    args0: [{ type: "field_input", name: "CONDITION", text: "value > 10" }],
    output: null,
    colour: "#FFD54F",
    tooltip: "Filter rows from a dataframe",
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
    colour: "#FFD54F",
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
    colour: "#FFD54F",
    tooltip: "Access a column range from a dataframe"
  }
]);


// --------RGENERATOR TRANSFORMATION----------

// --- Math ---
Blockly.defineBlocksWithJsonArray([
  {
    type: "sum_vector",
    message0: "sum of %1",
    args0: [{ type: "input_value", name: "VECTOR" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Sum of all elements in a vector",
  },
  {
    type: "vector_minus_scalar",
    message0: "%1 minus %2",
    args0: [
      { type: "input_value", name: "VECTOR" },
      { type: "input_value", name: "SCALAR" }
    ],
    output: null,
    colour: "#FF8A65",
    tooltip: "Subtract scalar from each element of the vector"
  },
  {
    type: "square_vector",
    message0: "%1 squared",
    args0: [{ type: "input_value", name: "VECTOR" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Square each element in the vector",
  },
  {
    type: "sqrt_vector",
    message0: "sqrt of %1",
    args0: [{ type: "input_value", name: "INPUT" }],
    output: null,
    colour: "#FF8A65",
    tooltip: "Square root of a value or expression",
  },
  {
    type: "divide_values",
    message0: "%1 divided by %2",
    args0: [
      { type: "input_value", name: "NUMERATOR" },
      { type: "input_value", name: "DENOMINATOR" }
    ],
    output: null,
    colour: "#FF8A65",
    tooltip: "Divide one value by another",
    helpUrl: ""
  }
]);

// --------RGENERATOR MATH----------

// --- Statistics Blocks ---
Blockly.defineBlocksWithJsonArray([
  {
    "type": "calculate_sd",
    "message0": "standard deviation of %1",
    "previousStatement": null,
    "nextStatement": null,
    "args0": [
      {
        "type": "field_dropdown",
        "name": "COLUMN",
        "options": [["Select column", ""]]
      }
    ],
    "output": null,
    "colour": "#BA68C8",
    "tooltip": "Calculate standard deviation of a numeric column",
    "extensions": ["dynamic_column_dropdown"]
  },
  {
    "type": "quantile_column",
    "message0": "quantile of %1 at %2",
    "previousStatement": null,
    "nextStatement": null,
    "args0": [
      {
        "type": "field_dropdown",
        "name": "COLUMN",
        "options": [["Select column", ""]]
      },
      {
        "type": "field_input",
        "name": "VALUES",
        "text": "0.1, 0.5, 0.9"
      }
    ],
    "output": null,
    "colour": "#BA68C8",
    "tooltip": "Compute quantiles at given probabilities",
    "extensions": ["dynamic_column_dropdown"]
  },
  {
    "type": "sorted_element_at",
    "message0": "sorted element of %1 at position %2",
    "previousStatement": null,
    "nextStatement": null,
    "args0": [
      {
        "type": "field_dropdown",
        "name": "COLUMN",
        "options": [["Select column", ""]]
      },
      {
        "type": "field_number",
        "name": "INDEX",
        "value": 1,
        "min": 1
      }
    ],
    "output": null,
    "colour": "#BA68C8",
    "tooltip": "Access an element from sorted column",
    "extensions": ["dynamic_column_dropdown"]
  },
  {
    "type": "summarize_data",
    "message0": "summarize loaded data",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#BA68C8",
    "tooltip": "Generate a summary of the loaded dataset using summary()"
  },
  {
    "type": "calculate_mean",
    "message0": "mean of %1",
    "previousStatement": null,
    "nextStatement": null,
    "args0": [
      {
        "type": "field_dropdown",
        "name": "COLUMN",
        "options": [["Select column", ""]]
      }
    ],
    "output": null,
    "colour": "#BA68C8",
    "tooltip": "Calculate mean of a numeric column",
    "extensions": ["dynamic_column_dropdown"]
  }
]);

// --- Dynamic Column Extension ---
Blockly.Extensions.register('dynamic_column_dropdown', function() {
  const block = this;

  block.getLoadedDatasetColumns = function() {
    const blocks = this.workspace.getAllBlocks(false);
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i];
      if (block.type === 'load_builtin_dataset' && block.getFieldValue) {
        const dataset = block.getFieldValue("DATASET");
        return datasetColumnsMap[dataset] || [];
      }
    }
    return [];
  };

  block.updateDropdown = function() {
    const dropdown = this.getField('COLUMN');
    const currentVal = dropdown.getValue();
    const columns = this.getLoadedDatasetColumns();
    const newOptions = columns.length > 0 ? columns : [['Select column', '']];

    dropdown.menuGenerator_ = newOptions;
    if (newOptions.some(opt => opt[1] === currentVal)) {
      dropdown.setValue(currentVal);
    }
  };

  block.updateDropdown();
  block.workspace.addChangeListener(function(event) {
    if (
      event.type === Blockly.Events.BLOCK_CHANGE || 
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_DELETE
    ) {
      block.updateDropdown();
    }
  });
});

// --- R Code Generators for statistics blocks---

Blockly.Generator.R.forBlock['calculate_sd'] = function(block) {
  const column = block.getFieldValue('COLUMN');
  const code = column ? `print(sd(data$${column}, na.rm = TRUE))\n` : '';
  return code;
};

Blockly.Generator.R.forBlock['quantile_column'] = function(block) {
  const column = block.getFieldValue('COLUMN');
  const values = block.getFieldValue('VALUES').trim();
  const probs = values.split(',').map(v => v.trim()).filter(v => v).join(', ');
  const code = (column && probs) ? `print(quantile(data$${column}, probs = c(${probs}), na.rm = TRUE))\n` : '';
  return code;
};

Blockly.Generator.R.forBlock['sorted_element_at'] = function(block) {
  const column = block.getFieldValue('COLUMN');
  const index = block.getFieldValue('INDEX');
  const code = (column && index) 
    ? `print(sort(data$${column}, na.last = NA)[${index}])\n` 
    : '';
  return code;
};

Blockly.Generator.R.forBlock["summarize_data"] = function(block) {
  const code = `summary(data)\n`;
  return code;
};


Blockly.Generator.R.forBlock["calculate_mean"] = function(block) {
  const column = block.getFieldValue("COLUMN");
  
  return `
print(mean(data[["${column}"]], na.rm = TRUE))
`;
};



// --------------------------- Modeling ---------------------------//
Blockly.defineBlocksWithJsonArray([
  {
    type: "linear_regression",
    message0: "linear model: %1 ~ %2",
    args0: [
      { type: "field_input", name: "RESPONSE", text: "y" },
      { type: "field_input", name: "PREDICTOR", text: "x" },
    ],
    output: null,
    colour: "#A1887F",
    tooltip: "Run a linear regression",
  },
  {
    type: "semivariogram",
    message0: "compute semivariogram of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Compute a semivariogram",
  },
  {
    type: "kriging_interpolation",
    message0: "interpolate using kriging on %1",
    args0: [{ type: "input_value", name: "DATA" }],
    output: null,
    colour: "#A1887F",
    tooltip: "Perform kriging interpolation",
  }
]);

// ---------------------------- Geometry ------------------------//
Blockly.defineBlocksWithJsonArray([
  {
    type: "st_centroid",
    message0: "calculate centroid of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    output: null,
    colour: "#4DD0E1",
    tooltip: "Calculate centroids of geometries",
  },
  {
    type: "st_transform",
    message0: "transform %1 to CRS %2",
    args0: [
      { type: "input_value", name: "GEOM" },
      { type: "field_input", name: "CRS", text: "4326" },
    ],
    output: null,
    colour: "#4DD0E1",
    tooltip: "Transform coordinate reference system",
  },
  {
    type: "st_buffer",
    message0: "buffer %1 by %2 units",
    args0: [
      { type: "input_value", name: "GEOM" },
      { type: "field_number", name: "DISTANCE", value: 100 },
    ],
    output: null,
    colour: "#4DD0E1",
    tooltip: "Create buffer around geometries",
  }
]);

// ------------------------------------ Raster --------------------------//
Blockly.defineBlocksWithJsonArray([
  {
    type: "read_stars",
    message0: "read raster using stars from %1",
    args0: [{ type: "field_input", name: "FILENAME", text: "raster.tif" }],
    output: null,
    colour: "#64B5F6",
    tooltip: "Read raster data using the stars package",
  },
  {
    type: "crop_raster",
    message0: "crop raster %1 to extent %2",
    args0: [
      { type: "input_value", name: "RASTER" },
      { type: "field_input", name: "EXTENT", text: "xmin, xmax, ymin, ymax" },
    ],
    output: null,
    colour: "#64B5F6",
    tooltip: "Crop raster data",
  },
  {
    type: "aggregate_raster",
    message0: "aggregate raster %1 with factor %2",
    args0: [
      { type: "input_value", name: "RASTER" },
      { type: "field_number", name: "FACTOR", value: 2 },
    ],
    output: null,
    colour: "#64B5F6",
    tooltip: "Aggregate raster data",
  }
]);

// ----------------------------- Maps -------------------------------//
Blockly.defineBlocksWithJsonArray([
  {
    type: "plot_map",
    message0: "plot map of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Plot spatial data",
  },
  {
    type: "set_map_title",
    message0: "set map title to %1",
    args0: [{ type: "field_input", name: "TITLE", text: "Map Title" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Set the main title of the map",
  },
  {
    type: "color_by_attribute",
    message0: "color map by attribute %1",
    args0: [{ type: "field_input", name: "ATTRIBUTE", text: "value" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#81C784",
    tooltip: "Color geometries by attribute",
  }
]);

// ---------------------- Visualization -------------------------//
Blockly.defineBlocksWithJsonArray([
  {
    type: "print_output",
    message0: "print output %1",
    args0: [{ type: "input_value", name: "TEXT" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Print output to the console",
  },
  {
    type: "preview_data",
    message0: "preview data %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Preview first rows of data",
  },
  {
    type: "show_structure",
    message0: "show structure of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Show structure of an object",
  }
]);


/*
 * From here on: Tests
 */

// Histogram
Blockly.defineBlocksWithJsonArray([
	{
		type: "histogram_block",
		message0: "histogram of %1",
		args0: [
			{
				type: "input_value",
				name: "VECTOR",
			},
		],
		previousStatement: null,
		nextStatement: null,
		colour: 230,
		tooltip: "Generate a histogram of a given vector",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["histogram_block"] = function (block, generator) {
	const vector =
		generator.valueToCode(block, "VECTOR", Blockly.Generator.R.ORDER_NONE) ||
		"c()";
	return `hist(${vector})\n`;
};

// Generate random numbers from normal distribution
Blockly.defineBlocksWithJsonArray([
	{
		type: "rnorm_block",
		message0: "rnorm %1 values with mean %2 and standard deviation %3",
		args0: [
			{
				type: "input_value",
				name: "N",
				check: "Number",
			},
			{
				type: "input_value",
				name: "MEAN",
				check: "Number",
			},
			{
				type: "input_value",
				name: "SD",
				check: "Number",
			},
		],
		output: "Array",
		colour: 160,
		tooltip: "Generate random numbers from a normal distribution",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["rnorm_block"] = function (block, generator) {
	const n = generator.valueToCode(block, "N", Blockly.Generator.R.ORDER_ATOMIC);
	const mean = generator.valueToCode(
		block,
		"MEAN",
		Blockly.Generator.R.ORDER_ATOMIC
	);
	const sd = generator.valueToCode(
		block,
		"SD",
		Blockly.Generator.R.ORDER_ATOMIC
	);

	return [
		`rnorm(${n}, mean = ${mean}, sd = ${sd})`,
		Blockly.Generator.R.ORDER_ATOMIC,
	];
};

// Numeric literal
Blockly.Generator.R.forBlock["math_number"] = function (block) {
	const code = Number(block.getFieldValue("NUM"));
	return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

// Text block
Blockly.defineBlocksWithJsonArray([
	{
		type: "text",
		message0: "%1",
		args0: [
			{
				type: "field_input",
				name: "TEXT",
				text: "",
			},
		],
		output: "String",
		colour: 160,
		tooltip: "A block containing text.",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["text"] = function (block) {
	const text = block.getFieldValue("TEXT");
	return [`"${text}"`, Blockly.Generator.R.ORDER_ATOMIC];
};

// Print block
Blockly.defineBlocksWithJsonArray([
	{
		type: "text_print",
		message0: "print %1",
		args0: [
			{
				type: "input_value",
				name: "TEXT",
			},
		],
		previousStatement: null,
		nextStatement: null,
		colour: 160,
		tooltip: "Print text to the console.",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["text_print"] = function (block, generator) {
	const text =
		generator.valueToCode(block, "TEXT", Blockly.Generator.R.ORDER_NONE) ||
		'""';
	return `print(${text})\n`;
};


// ---------------block read inbuilt dataset (visualization)-----------------------//
Blockly.defineBlocksWithJsonArray([
  {
    type: "show_rows",
    message0: "show first %1 rows of loaded data",
    args0: [
      {
        type: "field_number",
        name: "ROWS",
        value: 5,
        min: 1,
        max: 1000
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Show the first n rows of the loaded dataset",
    helpUrl: ""
  }
]);
Blockly.Generator.R.forBlock["show_rows"] = function(block) {
  const rows = block.getFieldValue("ROWS");
  const code = `head(data, ${rows})\n`;
  return code;
};

// block read tail of the inbuilt dataset
Blockly.defineBlocksWithJsonArray([
  {
    type: "show_tail",
    message0: "tail %1 rows of loaded data",
    args0: [
      {
        type: "field_number",
        name: "ROWS",
        value: 5,
        min: 1,
        max: 1000
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Show tail n rows of the loaded dataset",
    helpUrl: ""
  }
]);
Blockly.Generator.R.forBlock["show_tail"] = function(block) {
  const rows = block.getFieldValue("ROWS");
  const code = `tail(data, ${rows})\n`;
  return code;
};

//block check or show data structure
Blockly.defineBlocksWithJsonArray([
  {
    type: "show_structure",
    message0: "show structure of loaded dataset",
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Show the structure of the loaded dataset (e.g., columns, types)",
    helpUrl: ""
  }
]);
Blockly.Generator.R.forBlock["show_structure"] = function(block) {
  const code = `str(data)\n`;
  return code;
};



// -------------------------Column mapping for R inbuilt datasets------------------------------//
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

// Define the block to select columns
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
    this.setColour("#FFD54F"); 
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
    this.setColour("#FFD54F");
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


// plot_scatter plot block
Blockly.Blocks['plot_scatter'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Plot")
      .appendField("X:")
      .appendField(new Blockly.FieldDropdown(this.getDropdownOptions.bind(this)), "XVAR")
      .appendField("Y:")
      .appendField(new Blockly.FieldDropdown(this.getDropdownOptions.bind(this)), "YVAR")
      .appendField("Color by:")
      .appendField(new Blockly.FieldDropdown(this.getDropdownOptionsWithNone.bind(this)), "COLORVAR");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#90A4AE");
    this.setTooltip("Plot selected data using ggplot2");
    this.setHelpUrl("");

    this.workspace.addChangeListener(this.onWorkspaceChange.bind(this));
  },

  // Get dropdown options from selected dataset
  getDropdownOptions: function () {
    const defaultOptions = [["Select column", ""]];
    const columns = this.getLoadedDatasetColumns();
    return columns.length > 0 ? columns : defaultOptions;
  },

  getDropdownOptionsWithNone: function () {
    const columns = this.getLoadedDatasetColumns();
    return [["None", "None"], ...columns];
  },

  getLoadedDatasetColumns: function () {
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

  onWorkspaceChange: function (event) {
    if (
      event.type === Blockly.Events.BLOCK_CHANGE ||
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_DELETE
    ) {
      this.updateDropdowns();
    }
  },

  updateDropdowns: function () {
    const xField = this.getField('XVAR');
    const yField = this.getField('YVAR');
    const colorField = this.getField('COLORVAR');

    const currentX = xField.getValue();
    const currentY = yField.getValue();
    const currentColor = colorField.getValue();

    const newXOptions = this.getDropdownOptions();
    const newYOptions = this.getDropdownOptions();
    const newColorOptions = this.getDropdownOptionsWithNone();

    xField.menuGenerator_ = newXOptions;
    yField.menuGenerator_ = newYOptions;
    colorField.menuGenerator_ = newColorOptions;

    const validX = newXOptions.map(opt => opt[1]);
    const validY = newYOptions.map(opt => opt[1]);
    const validColor = newColorOptions.map(opt => opt[1]);

    if (validX.includes(currentX)) xField.setValue(currentX);
    if (validY.includes(currentY)) yField.setValue(currentY);
    if (validColor.includes(currentColor)) colorField.setValue(currentColor);
  }
};

Blockly.Generator.R.forBlock["plot_scatter"] = function(block) {
  const xVar = block.getFieldValue("XVAR");
  const yVar = block.getFieldValue("YVAR");
  const colorVar = block.getFieldValue("COLORVAR");

  let code = '';
  code += 'dataset <- data\n';
  code += `cols <- rainbow(length(unique(dataset$${colorVar})))\n`;
  code += `plot(NULL, xlim=range(dataset$${xVar}), ylim=range(dataset$${yVar}), xlab="${xVar}", ylab="${yVar}", main="Scatter plot")\n`;
  code += `for(i in seq_along(unique(dataset$${colorVar}))) {\n`;
  code += `  grp <- unique(dataset$${colorVar})[i]\n`;
  code += `  points(dataset[dataset$${colorVar} == grp, ]$${xVar}, dataset[dataset$${colorVar} == grp, ]$${yVar}, col=cols[i], pch=19)\n`;
  code += `}\n`;
  code += `legend("topright", legend=unique(dataset$${colorVar}), col=cols, pch=19)\n`;

  return code;
};














// -----------------------------------Testing out working with geojson data---------------------------------------//

Blockly.defineBlocksWithJsonArray([
  {
    "type": "load_geojson",
    "message0": "load geojson from variable %1 into %2",
    "args0": [
      {
        "type": "field_input",
        "name": "VAR_NAME",
        "text": "geojson_text"
      },
      {
        "type": "field_input",
        "name": "VAR",
        "text": "geo"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Load GeoJSON from a character variable into a spatial object",
    "helpUrl": ""
  },
  {
    "type": "assign_variable",
    "message0": "set %1 to %2",
    "args0": [
      {
        "type": "field_input",
        "name": "VAR",
        "text": "geo"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Assign a value to a variable",
    "helpUrl": ""
  },
  {
    "type": "print_statement",
    "message0": "print %1",
    "args0": [
      {
        "type": "field_input",
        "name": "TEXT",
        "text": "geo"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Print output",
    "helpUrl": ""
  },
  {
    "type": "plot_statement",
    "message0": "plot %1",
    "args0": [
      {
        "type": "field_input",
        "name": "TEXT",
        "text": "geo"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 65,
    "tooltip": "Plot an object",
    "helpUrl": ""
  },
  {
    "type": "plot_geojson",
    "message0": "plot %1 as %2",
    "args0": [
      {
        "type": "field_input",
        "name": "DATA_VAR",
        "text": "geo"
      },
      {
        "type": "field_dropdown",
        "name": "PLOT_TYPE",
        "options": [
          ["points", "point"],
          ["heatmap", "heatmap"]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 65,
    "tooltip": "Plot GeoJSON using ggplot2",
    "helpUrl": ""
  },
  {
    "type": "custom_geojson_plot",
    "message0": "plot %1 with x = %2, y = %3, color = %4",
    "args0": [
      {
        "type": "field_input",
        "name": "DATA_VAR",
        "text": "geo"
      },
      {
        "type": "field_input",
        "name": "X_COLUMN",
        "text": "lon"
      },
      {
        "type": "field_input",
        "name": "Y_COLUMN",
        "text": "lat"
      },
      {
        "type": "field_input",
        "name": "COLOR_COLUMN",
        "text": ""
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 95,
    "tooltip": "Plot GeoJSON data with custom axes and optional color",
    "helpUrl": ""
  }
  
  
]);


// Load_geojson block to use jsonlite instead of sf
Blockly.Generator.R.forBlock['load_geojson'] = function(block) {
  const varName = block.getFieldValue('VAR_NAME');
  const varOutput = block.getFieldValue('VAR');
  const code = `
library(jsonlite)
${varOutput} <- geojson_to_df(${varName})
`;
  return code;
};
Blockly.Generator.R.forBlock['plot_geojson'] = function(block) {
  const dataVar = block.getFieldValue('DATA_VAR');
  const plotType = block.getFieldValue('PLOT_TYPE') || 'point';

  let code = '';

  switch (plotType) {
    case 'point':
      code = `
library(ggplot2)
if('lon' %in% names(${dataVar}) && 'lat' %in% names(${dataVar})) {
  print(ggplot(${dataVar}, aes(x = lon, y = lat)) + 
        geom_point() + 
        theme_minimal() +
        labs(title = "PLOT"))
}
`;
      break;

    case 'heatmap':
      code = `
library(ggplot2)
if('lon' %in% names(${dataVar}) && 'lat' %in% names(${dataVar})) {
  print(ggplot(${dataVar}, aes(x = lon, y = lat)) + 
        geom_bin2d() + 
        theme_minimal() +
        labs(title = "GeoJSON Heatmap"))
}
`;
      break;

    default:
      code = `plot(${dataVar})\n`;
  }

  return code;
};
