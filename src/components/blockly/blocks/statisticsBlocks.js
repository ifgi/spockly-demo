import * as Blockly from "blockly";

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
  },
  {
    type: "calculate_median",
    message0: "median of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Calculate the median of a column"
  },
  {
    type: "calculate_mse",
    message0: "mean squared error of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Calculate the mean squared error of a column"
  },
  {
    type: "calculate_max",
    message0: "maximum of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Return the maximum value of a column"
  },
  {
    type: "calculate_min",
    message0: "minimum of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Return the minimum value of a column"
  },
  {
    type: "calculate_sum",
    message0: "sum of %1",
    args0: [{ type: "input_value", name: "COLUMN" }],
    output: null,
    colour: "#BA68C8",
    tooltip: "Return the sum of values in a column"
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
Blockly.Generator.R.forBlock["calculate_mse"] = function (block, generator) {
  const col = generator.valueToCode(block, "COLUMN", Blockly.Generator.R.ORDER_NONE);
  return [`mean(((${col}) - mean(${col}))^2)`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["calculate_max"] = function (block, generator) {
  const col = generator.valueToCode(block, "COLUMN", Blockly.Generator.R.ORDER_NONE);
  return [`max(${col})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["calculate_min"] = function (block, generator) {
  const col = generator.valueToCode(block, "COLUMN", Blockly.Generator.R.ORDER_NONE);
  return [`min(${col})`, Blockly.Generator.R.ORDER_ATOMIC];
};

Blockly.Generator.R.forBlock["calculate_sum"] = function (block, generator) {
  const col = generator.valueToCode(block, "COLUMN", Blockly.Generator.R.ORDER_NONE);
  return [`sum(${col})`, Blockly.Generator.R.ORDER_ATOMIC];
};
