import * as Blockly from "blockly";
import datasetColumnsMap from "../constants/constants";


// Helper functions for dynamic dropdowns
const getLoadedDatasetColumns = (workspace) => {
  const blocks = workspace.getAllBlocks(false);
  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i];
    if (block.type === 'load_builtin_dataset' && block.getFieldValue) {
      const dataset = block.getFieldValue("DATASET");
      return datasetColumnsMap[dataset] || [];
    }
  }
  return [];
};

const getDropdownOptions = (workspace) => {
  const defaultOptions = [["Select column", ""]];
  const columns = getLoadedDatasetColumns(workspace);
  return columns.length > 0 ? columns : defaultOptions;
};

const getDropdownOptionsWithNone = (workspace) => {
  const columns = getLoadedDatasetColumns(workspace);
  return [["None", "None"], ...columns];
};

// Update dropdown function
const updateDropdowns = function(block, fieldNames) {
  const workspace = block.workspace;
  fieldNames.forEach(fieldName => {
    const field = block.getField(fieldName);
    if (!field) return;
    
    const current = field.getValue();
    let newOptions;
    
    if (fieldName === 'COLORVAR' || fieldName === 'GROUPVAR') {
      newOptions = getDropdownOptionsWithNone(workspace);
    } else {
      newOptions = getDropdownOptions(workspace);
    }
    
    field.menuGenerator_ = newOptions;
    const valid = newOptions.map(opt => opt[1]);
    if (valid.includes(current)) {
      field.setValue(current);
    } else {
      field.setValue(valid[0]);
    }
  });
};

// ------------------------ Block definition text vizualization inbuilt datasets------------------------ //
Blockly.defineBlocksWithJsonArray([
  // Show first N rows
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
  },

  // Show last N rows
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
  },

  // Show structure of the dataset
  {
    type: "show_structure",
    message0: "show structure of loaded dataset",
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Show the structure of the loaded dataset (e.g., columns, types)",
    helpUrl: ""
  },

  // Print full dataset
  {
    type: "print_data",
    message0: "print full dataset",
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Prints the entire loaded dataset",
    helpUrl: ""
  },

  // Preview dataset (head + tail)
  {
    type: "preview_data",
    message0: "preview dataset(view head and tail)",
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Preview the dataset by showing the top and bottom rows",
    helpUrl: ""
  },

  // Bar chart
  {
    type: "barplot_block",
    message0: "bar chart of %1",
    args0: [
      {
        type: "field_dropdown",
        name: "COLUMN",
        options: [["Select column", ""]]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Generate a bar chart of the data",
    helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/barplot"
  },

  // Pie chart
  {
    type: "piechart_block",
    message0: "pie chart of %1",
    args0: [
      {
        type: "field_dropdown",
        name: "COLUMN",
        options: [["Select column", ""]]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Generate a pie chart of the data",
    helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/pie"
  },

  // Scatter plot
  {
    type: "plot_scatter",
    message0: "scatter plot of X: %1 Y: %2 Color by: %3",
    args0: [
      {
        type: "field_dropdown",
        name: "XVAR",
        options: [["Select column", ""]]
      },
      {
        type: "field_dropdown",
        name: "YVAR",
        options: [["Select column", ""]]
      },
      {
        type: "field_dropdown",
        name: "COLORVAR",
        options: [["None", "None"]]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Plot selected data using scatter plot",
    helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/plot"
  },

  // Histogram
  {
    type: "plot_histogram",
    message0: "Histogram of %1",
    args0: [
      {
        type: "field_dropdown",
        name: "COLUMN",
        options: [["Select column", ""]]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Plot histogram of selected column",
    helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/hist"
  },

  // Boxplot
  {
    type: "plot_boxplot",
    message0: "Boxplot of %1 Grouped by %2",
    args0: [
      {
        type: "field_dropdown",
        name: "COLUMN",
        options: [["Select column", ""]]
      },
      {
        type: "field_dropdown",
        name: "GROUPVAR",
        options: [["None", "None"]]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Boxplot of a column, optionally grouped by another column",
    helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/boxplot"
  }
]);

// Add the onchange event handlers after block creation
Blockly.Blocks['barplot_block'].onchange = function(event) {
  if (event.type === Blockly.Events.FINISHED_LOADING || 
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_DELETE ||
      event.type === Blockly.Events.BLOCK_CHANGE) {
    updateDropdowns(this, ['COLUMN']);
  }
};

Blockly.Blocks['piechart_block'].onchange = function(event) {
  if (event.type === Blockly.Events.FINISHED_LOADING || 
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_DELETE ||
      event.type === Blockly.Events.BLOCK_CHANGE) {
    updateDropdowns(this, ['COLUMN']);
  }
};

Blockly.Blocks['plot_scatter'].onchange = function(event) {
  if (event.type === Blockly.Events.FINISHED_LOADING || 
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_DELETE ||
      event.type === Blockly.Events.BLOCK_CHANGE) {
    updateDropdowns(this, ['XVAR', 'YVAR', 'COLORVAR']);
  }
};

Blockly.Blocks['plot_histogram'].onchange = function(event) {
  if (event.type === Blockly.Events.FINISHED_LOADING || 
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_DELETE ||
      event.type === Blockly.Events.BLOCK_CHANGE) {
    updateDropdowns(this, ['COLUMN']);
  }
};

Blockly.Blocks['plot_boxplot'].onchange = function(event) {
  if (event.type === Blockly.Events.FINISHED_LOADING || 
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_DELETE ||
      event.type === Blockly.Events.BLOCK_CHANGE) {
    updateDropdowns(this, ['COLUMN', 'GROUPVAR']);
  }
};

// ------------ R code generator text vizualization inbuilt datasets------------- //

Blockly.Generator.R.forBlock["show_rows"] = function(block) {
  const rows = block.getFieldValue("ROWS");
  return `head(data, ${rows})\n`;
};

Blockly.Generator.R.forBlock["show_tail"] = function(block) {
  const rows = block.getFieldValue("ROWS");
  return `tail(data, ${rows})\n`;
};

Blockly.Generator.R.forBlock["show_structure"] = function(block) {
  const code = `cat(capture.output(str(data)), sep = "\\n")\n`;
  return code;
};

Blockly.Generator.R.forBlock["print_data"] = function(block) {
  return `print(data)\n`;
};

Blockly.Generator.R.forBlock["preview_data"] = function(block) {
  return `rbind(head(data, 3), tail(data, 3))\n`;
};

// ------------ R code generator plots vizualization inbuilt datasets------------- //


// Bar chart generator
Blockly.Generator.R.forBlock["barplot_block"] = function(block) {
  const column = block.getFieldValue("COLUMN");
  const varName = `dataset$${column}`;
  const varTitle = `Bar Chart of ${column}`;
  let code = '';
  code += 'dataset <- data\n';
  code += `counts <- table(${varName})\n`;
  code += `bar_colors <- rainbow(length(counts))\n`;
  code += `barplot(counts, main="${varTitle}", xlab="${column}", ylab="Frequency", col=bar_colors)\n`;
  code += `legend("topright", legend=names(counts), fill=bar_colors, title="${column}")\n`;
  return code;
};


//piechart generator

Blockly.Generator.R.forBlock["piechart_block"] = function(block) {
  const column = block.getFieldValue("COLUMN");
  let code = '';
  code += 'dataset <- data\n';
  code += `counts <- table(dataset$${column})\n`;
  code += `percentages <- round(100 * counts / sum(counts), 1)\n`;
  code += `labels <- paste(names(counts), ":", percentages, "%")\n`;
  code += `pie(counts, labels=labels, main="Pie Chart of ${column}", col=rainbow(length(counts)))\n`;
  return code;
};

// scatter-plot generator
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

// histogram generator
Blockly.Generator.R.forBlock["plot_histogram"] = function(block) {
  const column = block.getFieldValue("COLUMN");
  let code = '';
  code += 'dataset <- data\n';
  code += `hist(dataset$${column}, main="Histogram of ${column}", xlab="${column}", col="skyblue", border="white")\n`;
  return code;
};

// boxplot generator
Blockly.Generator.R.forBlock["plot_boxplot"] = function(block) {
  const column = block.getFieldValue("COLUMN");
  const groupVar = block.getFieldValue("GROUPVAR");

  let code = '';
  code += 'dataset <- data\n';
  if (groupVar && groupVar !== "None") {
    code += `boxplot(dataset$${column} ~ dataset$${groupVar}, data=dataset,\n`;
    code += `        main="Boxplot of ${column} by ${groupVar}",\n`;
    code += `        xlab="${groupVar}", ylab="${column}", col=rainbow(length(unique(dataset$${groupVar}))))\n`;
  } else {
    code += `boxplot(dataset$${column}, main="Boxplot of ${column}", ylab="${column}", col="lightgreen")\n`;
  }

  return code;
};