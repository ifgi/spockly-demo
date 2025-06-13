import * as Blockly from "blockly";

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

  // Print full dataset  (NOTE TO SELF MAKE PRINTING MORE DYNAMIC, I.E SELECT COLUMN  ROW etc)
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
  {
    type: "barplot_block",
    message0: "bar chart of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Generate a bar chart of the data",
    helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/barplot"
  },
  {
    type: "piechart_block",
    message0: "pie chart of %1",
    args0: [{ type: "input_value", name: "DATA" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#90A4AE",
    tooltip: "Generate a pie chart of the data",
    helpUrl: "https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/pie"
  },
]);

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


// plot_scatter plot block
Blockly.Blocks['plot_scatter'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("scatter plot of")
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
    this.setHelpUrl("https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/plot");

    this.workspace.addChangeListener(this.onWorkspaceChange.bind(this));
  },
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
    
      if (!xField || !yField || !colorField) return;
    
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
    

      xField.setValue(validX.includes(currentX) ? currentX : validX[0]);
      yField.setValue(validY.includes(currentY) ? currentY : validY[0]);
      colorField.setValue(validColor.includes(currentColor) ? currentColor : validColor[0]);
    }
    
};
// scatter-plot rgenerater
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

//histogram
Blockly.Blocks['plot_histogram'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Histogram of")
      .appendField(new Blockly.FieldDropdown(this.getDropdownOptions.bind(this)), "COLUMN");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#90A4AE");
    this.setTooltip("Plot histogram of selected column");
    this.setHelpUrl("https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/hist");

    this.workspace.addChangeListener(this.onWorkspaceChange.bind(this));
  },

  getDropdownOptions: function () {
    const defaultOptions = [["Select column", ""]];
    const columns = this.getLoadedDatasetColumns();
    return columns.length > 0 ? columns : defaultOptions;
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
      const columnField = this.getField('COLUMN');
    
      if (!columnField) return;
    
      const current = columnField.getValue();
      const newOptions = this.getDropdownOptions();
      columnField.menuGenerator_ = newOptions;
    
      const valid = newOptions.map(opt => opt[1]);
      if (valid.includes(current)) columnField.setValue(current);
    }
    
};

Blockly.Generator.R.forBlock["plot_histogram"] = function(block) {
  const column = block.getFieldValue("COLUMN");
  let code = '';
  code += 'dataset <- data\n';
  code += `hist(dataset$${column}, main="Histogram of ${column}", xlab="${column}", col="skyblue", border="white")\n`;
  return code;
};


//boxplot

Blockly.Blocks['plot_boxplot'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Boxplot of")
      .appendField(new Blockly.FieldDropdown(this.getDropdownOptions.bind(this)), "COLUMN")
      .appendField("Grouped by")
      .appendField(new Blockly.FieldDropdown(this.getDropdownOptionsWithNone.bind(this)), "GROUPVAR");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#90A4AE");
    this.setTooltip("Boxplot of a column, optionally grouped by another column");
    this.setHelpUrl("https://www.rdocumentation.org/packages/graphics/versions/3.6.2/topics/boxplot");

    this.workspace.addChangeListener(this.onWorkspaceChange.bind(this));
  },

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
      const columnField = this.getField('COLUMN');
      const groupField = this.getField('GROUPVAR');
    
      if (!columnField || !groupField) {
        return;
      }
    
      const currentColumn = columnField.getValue();
      const currentGroup = groupField.getValue();
    
      const columnOptions = this.getDropdownOptions();
      const groupOptions = this.getDropdownOptionsWithNone();
    
      columnField.menuGenerator_ = columnOptions;
      groupField.menuGenerator_ = groupOptions;
    
      const validCols = columnOptions.map(opt => opt[1]);
      const validGroups = groupOptions.map(opt => opt[1]);
    
      if (validCols.includes(currentColumn)) columnField.setValue(currentColumn);
      if (validGroups.includes(currentGroup)) groupField.setValue(currentGroup);
    }
    
    
};

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

