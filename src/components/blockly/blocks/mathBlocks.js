import * as Blockly from "blockly";

//
// ─── MATH BLOCKS ───────────────────────────────────────────────────────────────
//

Blockly.defineBlocksWithJsonArray([

  //
  // ─── BASIC ARITHMETIC AND NUMBER MANIPULATION ───────────────────────────────
  //

  {
    type: "divide_values",
    message0: "%1 divided by %2",
    args0: [
      { type: "input_value", name: "NUMERATOR" },
      { type: "input_value", name: "DENOMINATOR" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF8A65",
    tooltip: "Divide one value by another (x / y)",
    helpUrl: "https://www.projectpro.io/recipes/divide-2-numbers-r"
  },
  {
    type: "modulo_values",
    message0: "%1 modulo %2",
    args0: [
      { type: "input_value", name: "DIVIDEND" },
      { type: "input_value", name: "DIVISOR" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF8A65",
    tooltip: "Modulo operation (x %% y)",
    helpUrl: "https://stackoverflow.com/questions/38524774/understanding-the-result-of-modulo-operator"
  },
  {
    type: "round_value",
    message0: "round %1",
    args0: [{ type: "input_value", name: "VALUE" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF8A65",
    tooltip: "Round a number to the nearest integer",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/Round"
  },

  //
  // ─── VECTOR OPERATIONS ──────────────────────────────────────────────────────
  //

  {
    type: "sum_vector",
    message0: "sum of %1",
    args0: [{ type: "input_value", name: "VECTOR" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF8A65",
    tooltip: "Sum of all elements in a vector",
    helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/sum"
  },
  {
    type: "vector_minus_scalar",
    message0: "%1 minus %2",
    args0: [
      { type: "input_value", name: "VECTOR" },
      { type: "input_value", name: "SCALAR" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF8A65",
    tooltip: "Subtract a scalar from each element in the vector (x - y)",
    helpUrl: "https://www.alphacodingskills.com/r/notes/r-operator-subtract.php"
  },
  {
    type: "square_vector",
    message0: "%1 squared",
    args0: [{ type: "input_value", name: "VECTOR" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF8A65",
    tooltip: "Square each element in the vector (x^2)",
    helpUrl: "https://stackoverflow.com/questions/21322034/how-to-square-all-the-values-in-a-vector-in-r"
  },
  {
    type: "sqrt_vector",
    message0: "sqrt of %1",
    args0: [{ type: "input_value", name: "INPUT" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF8A65",
    tooltip: "Square root of a value or expression (sqrt(x))",
    helpUrl: "https://www.rdocumentation.org/packages/SparkR/versions/2.1.2/topics/sqrt"
  },

  //
  // ─── MATH FUNCTIONS (EXP, LOG, TRIGONOMETRY) ────────────────────────────────
  //

  {
    type: "exp_of",
    message0: "exp of %1",
    args0: [{ type: "input_value", name: "VALUE" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF8A65",
    tooltip: "Exponential of a value (e^x)",
    helpUrl: "https://www.rdocumentation.org/packages/onion/versions/1.2-7/topics/exp"
  },
  {
    type: "log_of",
    message0: "log of %1",
    args0: [{ type: "input_value", name: "VALUE" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF8A65",
    tooltip: "Natural logarithm of a value (log(x))",
    helpUrl: "https://www.rdocumentation.org/packages/onion/versions/1.2-7/topics/exp"
  },
  {
    type: "sin_of",
    message0: "sin of %1",
    args0: [{ type: "input_value", name: "ANGLE" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#FF8A65",
    tooltip: "Sine of an angle (in radians) (sin(x))",
    helpUrl: "https://www.rdocumentation.org/packages/onion/versions/1.2-7/topics/exp"
  }

]);

Blockly.defineBlocksWithJsonArray([
	{
	  type: "create_matrix",
	  message0: "create matrix from %1 with %2 rows and %3 columns %4 fill by %5",
	  args0: [
		{
		  type: "input_value",
		  name: "DATA",
		  check: ["Vector", "Array", "Variable"]
		},
		{
		  type: "input_value",
		  name: "NROW",
		  check: "Number"
		},
		{
		  type: "input_value",
		  name: "NCOL",
		  check: "Number"
		},
		{
		  type: "input_dummy"
		},
		{
		  type: "field_dropdown",
		  name: "BYROW",
		  options: [
			["column", "FALSE"],
			["row", "TRUE"]
		  ]
		}
	  ],
	  output: "Matrix",
	  colour: "#FF8A65",
	  tooltip: "Create a matrix from data with specified dimensions",
	  helpUrl: "https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/matrix"
	}
  ]);
  
  Blockly.Generator.R.forBlock['create_matrix'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'c()';
	const nrow = generator.valueToCode(block, 'NROW', Blockly.Generator.R.ORDER_ATOMIC) || '1';
	const ncol = generator.valueToCode(block, 'NCOL', Blockly.Generator.R.ORDER_ATOMIC) || '1';
	const byrow = block.getFieldValue('BYROW');
	
	const code = `matrix(${data}, nrow = ${nrow}, ncol = ${ncol}, byrow = ${byrow})`;
	
	if (block.outputConnection && !block.outputConnection.isConnected()) {
	  return code + '\n';
	}
	return [code, Blockly.Generator.R.ORDER_ATOMIC];
  };