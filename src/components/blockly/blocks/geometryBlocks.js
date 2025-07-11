import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "st_centroid",
    message0: "calculate centroid of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#4DD0E1",
    tooltip: "Calculate centroids of geometries",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/geos_unary"
  },
  {
	type: "set_coordinates_sp",
	message0: "set spatial coordinates of %1 to %2 and %3",
	args0: [
	  { type: "input_value", name: "DATA", check: ["DataFrame", "Variable"] },
	  { type: "field_input", name: "X_COL", text: "x_column" },
	  { type: "field_input", name: "Y_COL", text: "y_column" }
	],
	previousStatement: null,
	nextStatement: null,
	colour: "#4DD0E1",
	tooltip: "Convert DataFrame to sp object by setting coordinates",
	helpUrl: ""
  },
  {
    type: "st_transform",
    message0: "transform %1 to CRS %2",
    args0: [
      { type: "input_value", name: "GEOM" },
      { type: "field_input", name: "CRS", text: "4326" },
    ],
    previousStatement: null,
    nextStatement: null,
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
    previousStatement: null,
    nextStatement: null,
    output: null,
    colour: "#4DD0E1",
    tooltip: "Create buffer around geometries",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/geos_unary"
  },
  {
    type: "st_coords",
    message0: "get coordinates of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    previousStatement: null,
    nextStatement: null,
    output: "Array",
    colour: "#4DD0E1",
    tooltip: "Extract coordinates from geometry using st_coordinates()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/st_coordinates"
  },
  {
    type: "st_point",
    message0: "create point from coordinates (x: %1, y: %2)",
    args0: [
      { type: "field_number", name: "X", value: 0 },
      { type: "field_number", name: "Y", value: 0 }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create a point geometry using st_point()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/st_coordinates"
  },
  {
    type: "st_linestring",
    message0: "create linestring from matrix %1",
    args0: [{ type: "input_value", name: "MATRIX" }],
    previousStatement: null,
    nextStatement: null,
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create a linestring from a matrix using st_linestring()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/st_coordinates"
  },
  {
    type: "st_polygon",
    message0: "create polygon from matrix %1",
    args0: [{ type: "input_value", name: "MATRIX" }],
    previousStatement: null,
    nextStatement: null,
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create a polygon from coordinates using st_polygon()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/st_coordinates"
  },
  {
    type: "st_multipolygon",
    message0: "create multipolygon from list %1",
    args0: [{ type: "input_value", name: "LIST" }],
    previousStatement: null,
    nextStatement: null,
    output: "Geometry",
    colour: "#4DD0E1",
    tooltip: "Create a multipolygon from a list of polygons using st_multipolygon()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/st_coordinates"
  },
  {
    type: "st_distance",
    message0: "distance between %1 and %2",
    args0: [
      { type: "input_value", name: "GEOM1" },
      { type: "input_value", name: "GEOM2" }
    ],
    previousStatement: null,
    nextStatement: null,
    output: "Number",
    colour: "#4DD0E1",
    tooltip: "Calculate distance between geometries using st_distance()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/geos_measures"
  },
  {
    type: "st_area",
    message0: "area of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    previousStatement: null,
    nextStatement: null,
    output: "Number",
    colour: "#4DD0E1",
    tooltip: "Calculate area using st_area()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/geos_unary"
  },
  {
    type: "st_length",
    message0: "length of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    previousStatement: null,
    nextStatement: null,
    output: "Number",
    colour: "#4DD0E1",
    tooltip: "Calculate perimeter/length using st_length()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-14/topics/geos_unary"
  },
  {
    type: "st_bbox",
    message0: "bounding box of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    previousStatement: null,
    nextStatement: null,
    output: "Array",
    colour: "#4DD0E1",
    tooltip: "Get bounding box using st_bbox()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-20/topics/st_bbox"
  },
  {
    type: "st_crs",
    message0: "CRS info of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    previousStatement: null,
    nextStatement: null,
    output: "Text",
    colour: "#4DD0E1",
    tooltip: "Get coordinate reference system info using st_crs()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-20/topics/st_crs"
  },
  {
    type: "st_geometry_type",
    message0: "geometry type of %1",
    args0: [{ type: "input_value", name: "GEOM" }],
    previousStatement: null,
    nextStatement: null,
    output: "Text",
    colour: "#4DD0E1",
    tooltip: "Get geometry type using st_geometry_type()",
    helpUrl: "https://www.rdocumentation.org/packages/sf/versions/1.0-8/topics/st_geometry_type"
  },
  {
	type: "set_crs",
	message0: "set CRS of %1 to %2",
	args0: [
	  { type: "input_value", name: "DATA", check: ["Variable"] },
	  { type: "field_input", name: "CRS", text: "+proj=longlat +datum=WGS84" }
	],
	previousStatement: null,
	nextStatement: null,
	colour: "#FFD54F",
	tooltip: "Set coordinate reference system",
	helpUrl: ""
  }
]);
  
Blockly.Generator.R.forBlock['set_coordinates_sp'] = function(block, generator) {
	generator.requirePackage('sp');
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const xCol = block.getFieldValue('X_COL') || 'x';
	const yCol = block.getFieldValue('Y_COL') || 'y';
	
	return `coordinates(${data}) <- ~${xCol} + ${yCol}\n`;
  };

  Blockly.Generator.R.forBlock['set_crs'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const crs = block.getFieldValue('CRS');
	return `proj4string(${data}) <- CRS("${crs}")\n`;
  };