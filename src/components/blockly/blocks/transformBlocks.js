import * as Blockly from "blockly";

// Convert to SF object with geographic coordinates
Blockly.defineBlocksWithJsonArray([
	{
		type: "convert_to_sf",
		message0: "convert %1\n to sf object with\n lon: %2\n lat: %3\n crs: %4\n",
		args0: [
			{
				type: "input_value",
				name: "OBJECT",
				check: "DataFrame",
			},
			{
				type: "input_value",
				name: "LONG",
				check: "String",
			},
			{
				type: "input_value",
				name: "LAT",
				check: "String",
			},
			{
				type: "input_value",
				name: "CRS",
				check: "Number",
			},
		],
		previousStatement: null,
		nextStatement: null,
		output: "SFObject",
		colour: "#FFD54F",
		tooltip: "Convert a DataFrame to an SF object with geographic coordinates",
		helpUrl: "https://www.rdocumentation.org/packages/sf/versions/0.1/topics/as.sf",
	},
]);

Blockly.Generator.R.forBlock["convert_to_sf"] = function (block, generator) {
	generator.requirePackage("sf", 'Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))');
	const dataFrame = generator.valueToCode(block, "OBJECT", Blockly.Generator.R.ORDER_NONE);
	const long = generator.valueToCode(block, "LONG", Blockly.Generator.R.ORDER_NONE) || '"longitude"';
	const lat = generator.valueToCode(block, "LAT", Blockly.Generator.R.ORDER_NONE) || '"latitude"';
	const crs = generator.valueToCode(block, "CRS", Blockly.Generator.R.ORDER_ATOMIC) || "4326"; // Default to WGS 84
	return [
		`sf::st_as_sf(${dataFrame}, coords = c(${long}, ${lat}), crs = ${crs})`,
		Blockly.Generator.R.ORDER_ATOMIC,
	];
};


// Convert to Data Frame
Blockly.defineBlocksWithJsonArray([
    {
        type: "convert_to_dataframe",
        message0: "convert to DataFrame %1",
        args0: [
            {
                type: "input_statement",
                name: "OBJECTS",
            },
        ],
        output: "DataFrame",
        colour: "#FFD54F",
        tooltip: "Convert objects to a DataFrame",
        helpUrl: "",
    },
]);

Blockly.Generator.R.forBlock["convert_to_dataframe"] = function (block, generator) {
    let objectsCode = [];
    let seenCode = new Set(); // Use a Set to keep track of unique code snippets
    let objectBlock = block.getInputTargetBlock('OBJECTS');

    while (objectBlock) {
        const objectCode = generateSingleBlockCode(objectBlock, generator);
        if (objectCode && !seenCode.has(objectCode)) {
            seenCode.add(objectCode);
            objectsCode.push(objectCode);
        }
        objectBlock = objectBlock.getNextBlock();
    }

    // Join all the objects with commas and create a data frame
    return [`data.frame(${objectsCode.join(', ')})`, Blockly.Generator.R.ORDER_ATOMIC];
};

// Helper function to generate code for a single block
function generateSingleBlockCode(block, generator) {
    // Temporarily remove the next block
    const nextBlock = block.nextConnection ? block.nextConnection.targetBlock() : null;
    if (nextBlock) {
        block.nextConnection.disconnect();
    }

    // Generate code for only this block
    const code = generator.blockToCode(block);

    // Reconnect the next block
    if (nextBlock) {
        block.nextConnection.connect(nextBlock.previousConnection);
    }

    return code;
}

//
// ─── ARRAY AND UTILITY BLOCKS ───────────────────────────────────────────────────
//

Blockly.defineBlocksWithJsonArray([
	{
	  type: "stack_data",
	  message0: "stack data %1 and %2 using %3",
	  args0: [
		{ type: "input_value", name: "DATA1", check: ["DataFrame", "Variable", "Array"] },
		{ type: "input_value", name: "DATA2", check: ["DataFrame", "Variable", "Array"] },
		{
		  type: "field_dropdown",
		  name: "METHOD",
		  options: [
			["rbind (rows)", "rbind"],
			["cbind (columns)", "cbind"]
		  ]
		}
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "DataFrame",
	  colour: "#FFD54F",
	  tooltip: "Stack two data objects using rbind() or cbind()",
	  helpUrl: "https://www.rdocumentation.org/packages/R6Frame/versions/0.1.0/topics/rbind"
	},
	{
	  type: "append_array",
	  message0: "append value %1 to %2",
	  args0: [
		{ type: "input_value", name: "VALUE", check: ["String", "Number", "Variable"] },
		{ type: "input_value", name: "ARRAY", check: ["Vector", "Array", "Variable"] }
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "Vector",
	  colour: "#FFD54F",
	  tooltip: "Append a value to a vector using append()",
	  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/append"
	},
	{
	  type: "create_array",
	  message0: "create array from %1 with dimensions %2",
	  args0: [
		{ type: "input_value", name: "DATA", check: ["Vector", "Variable"] },
		{ type: "field_input", name: "DIM", text: "c(2, 3)" }
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "Array",
	  colour: "#FFD54F",
	  tooltip: "Create an array from data with specified dimensions",
	  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/array"
	},
	{
	  type: "sort_array",
	  message0: "sort %1 in %2 order",
	  args0: [
		{ type: "input_value", name: "ARRAY", check: ["Vector", "Array", "Variable"] },
		{
		  type: "field_dropdown",
		  name: "ORDER",
		  options: [
			["ascending", "FALSE"], 
			["descending", "TRUE"]
		  ]
		}
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "Vector",
	  colour: "#FFD54F",
	  tooltip: "Sort a vector or array in ascending or descending order",
	  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/sort"
	},
	{
	  type: "slice_file",
	  message0: "subset %1 where %2",
	  args0: [
		{ type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] },
		{ type: "field_input", name: "CONDITION", text: "column > 10" }
	  ],
	  previousStatement: null,
	  nextStatement: null,
	  output: "DataFrame",
	  colour: "#FFD54F",
	  tooltip: "Subset data by condition using bracket notation",
	  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/Extract"
	}
  ]);
  
  // Code generators for array and utility blocks
  Blockly.Generator.R.forBlock['stack_data'] = function(block, generator) {
	const data1 = generator.valueToCode(block, 'DATA1', Blockly.Generator.R.ORDER_ATOMIC) || 'data1';
	const data2 = generator.valueToCode(block, 'DATA2', Blockly.Generator.R.ORDER_ATOMIC) || 'data2';
	const method = block.getFieldValue('METHOD');
	
	const code = `${method}(${data1}, ${data2})`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, 0];
  };
  
  Blockly.Generator.R.forBlock['append_array'] = function(block, generator) {
	const value = generator.valueToCode(block, 'VALUE', Blockly.Generator.R.ORDER_ATOMIC) || '1';
	const array = generator.valueToCode(block, 'ARRAY', Blockly.Generator.R.ORDER_ATOMIC) || 'c()';
	
	const code = `append(${array}, ${value})`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, 0];
  };
  
  Blockly.Generator.R.forBlock['create_array'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || '1:12';
	const dim = block.getFieldValue('DIM') || 'c(2, 3)';
	
	const code = `array(${data}, dim = ${dim})`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, 0];
  };
  
  Blockly.Generator.R.forBlock['sort_array'] = function(block, generator) {
	const array = generator.valueToCode(block, 'ARRAY', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const decreasing = block.getFieldValue('ORDER');
	
	const code = `sort(${array}, decreasing = ${decreasing})`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, 0];
  };
  
  Blockly.Generator.R.forBlock['slice_file'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const condition = block.getFieldValue('CONDITION') || 'TRUE';
	
	const code = `${data}[${condition}, ]`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, 0];
  };