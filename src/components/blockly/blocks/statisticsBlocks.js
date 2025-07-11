import * as Blockly from "blockly";
import datasetColumnsMap from "../constants/constants";

Blockly.defineBlocksWithJsonArray([
  {
    "type": "calculate_sd",
    "message0": "standard deviation of %1",
    "previousStatement": null,
    "nextStatement": null,
    "args0": [
      {
        "type": "input_value",
        "name": "DATA",
        "check": ["DataFrame", "Variable"]
      }
    ],
    "output": null,
    "colour": "#BA68C8",
    "tooltip": "Calculate standard deviation of a numeric column or vector",
	"helpUrl": "https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/sd"
  },
  {
    type: "calculate_quantile",
    message0: "calculate %1 quantile of %2",
    args0: [
      {
        type: "field_dropdown",
        name: "QUANTILE_TYPE",
        options: [
          ["25% (first quartile)", "0.25"],
          ["50% (median)", "0.5"],
          ["75% (third quartile)", "0.75"],
          ["90% (90th percentile)", "0.9"],
          ["95% (95th percentile)", "0.95"],
          ["99% (99th percentile)", "0.99"],
          ["all quartiles (25%, 50%, 75%)", "quartiles"],
          ["all percentiles (0%, 25%, 50%, 75%, 100%)", "all"],
          ["custom value", "custom"]
        ]
      },
      {
        type: "input_value",
        name: "DATA",
        check: ["DataFrame", "Variable", "Vector"]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "Vector",
    colour: "#BA68C8",
    tooltip: "Calculate quantiles (percentiles) of numeric data",
    helpUrl: "https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/quantile"
  },
  {
    "type": "calculate_mean",
    "message0": "mean of %1",
    "previousStatement": null,
    "nextStatement": null,
    "args0": [
      {
        "type": "input_value",
        "name": "DATA",
        "check": ["DataFrame", "Variable"]
      }
    ],
    "output": null,
    "colour": "#BA68C8",
    "tooltip": "Calculate mean of a numeric column or vector",
	"helpUrl": "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/mean",
  },
  {
    type: "calculate_median",
    message0: "median of %1",
    args0: [
		{ 
			"type": "input_value",
			"name": "DATA",
			"check": ["DataFrame", "Variable"]
		}
	],
    previousStatement: null,
    nextStatement: null,
    output: "Number",
    colour: "#BA68C8",
    tooltip: "Calculate the median of a column or vector",
    helpUrl: "https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/median"
  },
  {
    type: "calculate_mse",
    message0: "mean squared error between %1 and %2",
    args0: [
      {
        type: "input_value",
        name: "ACTUAL",
        check: ["DataFrame", "Variable", "Vector"]
      },
      {
        type: "input_value", 
        name: "PREDICTED",
        check: ["DataFrame", "Variable", "Vector"]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "Number",
    colour: "#BA68C8",
    tooltip: "Calculate mean squared error between actual and predicted values",
    helpUrl: "https://www.rdocumentation.org/packages/mlr3measures/versions/0.5.0/topics/mse"
  },
  {
    type: "calculate_max",
    message0: "maximum of %1",
	"args0": [
		{
		  "type": "input_value",
		  "name": "DATA",
		  "check": ["DataFrame", "Variable"]
		}
	  ],
    previousStatement: null,
    nextStatement: null,
    output: "Number",
    colour: "#BA68C8",
    tooltip: "Return the maximum value of a column or vector",
    helpUrl: "https://www.rdocumentation.org/packages/rapportools/versions/1.2/topics/max"
  },
  {
    type: "calculate_min",
    message0: "minimum of %1",
	"args0": [
		{
		  "type": "input_value",
		  "name": "DATA",
		  "check": ["DataFrame", "Variable"]
		}
	  ],
    previousStatement: null,
    nextStatement: null,
    output: "Number",
    colour: "#BA68C8",
    tooltip: "Return the minimum value of a column or vector",
    helpUrl: "https://www.rdocumentation.org/packages/rapportools/versions/1.2/topics/min"
  },
  {
    type: "calculate_sum",
    message0: "sum of %1",
	"args0": [
		{
		  "type": "input_value",
		  "name": "DATA",
		  "check": ["DataFrame", "Variable"]
		}
	  ],
    previousStatement: null,
    nextStatement: null,
    output: "Number",
    colour: "#BA68C8",
    tooltip: "Return the sum of values in a column or vector",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/sum"
  }
]);

// --- R Code Generators for statistics blocks ---

Blockly.Generator.R.forBlock['calculate_sd'] = function(block, generator) {
	const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const code = `sd(${data}, na.rm = TRUE)`;
	return code + '\n';
};

Blockly.Generator.R.forBlock['calculate_quantile'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const quantileType = block.getFieldValue('QUANTILE_TYPE') || '0.5';
	
	let code;
	
	switch(quantileType) {
	  case 'quartiles':
		code = `quantile(${data}, probs = c(0.25, 0.5, 0.75), na.rm = TRUE)`;
		break;
	  case 'all':
		code = `quantile(${data}, na.rm = TRUE)`;
		break;
	  case 'custom':
		code = `quantile(${data}, probs = 0.5, na.rm = TRUE)`;
		break;
	  default:
		code = `quantile(${data}, probs = ${quantileType}, na.rm = TRUE)`;
	}
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, 0];
  };

Blockly.Generator.R.forBlock["calculate_mean"] = function(block, generator) {
	const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const code = `mean(${data}, na.rm = TRUE)`;
	return code + '\n';
  };

  Blockly.Generator.R.forBlock['calculate_mse'] = function(block, generator) {
	const actual = generator.valueToCode(block, 'ACTUAL', Blockly.Generator.R.ORDER_ATOMIC) || 'actual';
	const predicted = generator.valueToCode(block, 'PREDICTED', Blockly.Generator.R.ORDER_ATOMIC) || 'predicted';
	
	const code = `mean((${actual} - ${predicted})^2, na.rm = TRUE)`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, 0];
  };

Blockly.Generator.R.forBlock["calculate_max"] = function (block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const code = `max(${data}, na.rm = TRUE)`;
	  if (block.outputConnection && !block.outputConnection.isConnected()) {
		return code + '\n';
	  }
	  return [code, 0];
};

Blockly.Generator.R.forBlock["calculate_min"] = function (block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const code = `min(${data}, na.rm = TRUE)`;
	  if (block.outputConnection && !block.outputConnection.isConnected()) {
		return code + '\n';
	  }
	  return [code, 0];
};

Blockly.Generator.R.forBlock["calculate_sum"] = function (block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const code = `sum(${data}, na.rm = TRUE)`;
	  if (block.outputConnection && !block.outputConnection.isConnected()) {
		return code + '\n';
	  }
	  return [code, 0];
};
  
Blockly.Generator.R.forBlock['calculate_median'] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
  const code = `median(${data}, na.rm = TRUE)`;
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, 0];
  };