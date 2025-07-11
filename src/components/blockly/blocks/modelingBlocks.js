import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    "type": "linear_model_block",
    "message0": "linear model from data %1 with dependent variable %2 and independent variables %3",
    "args0": [
      {
        "type": "input_value",
        "name": "DATA",
        "check": "DataFrame"
      },
      {
        "type": "input_value",
        "name": "DEPENDENT_VAR",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "INDEPENDENT_VARS",
        "check": "String"
      }
    ],
    "output": "LinearModel",
    "colour": "#A1887F",
    "tooltip": "Create a linear model with specified dependent and independent variables",
    "helpUrl": ""
  },
  {
    "type": "semivariogram",
    "message0": "compute semivariogram of %1 analyzing column %2 with X column %3 and Y column %4",
    "args0": [
      { "type": "input_value", "name": "DATA" },
      { "type": "input_value", "name": "COLUMN", "check": "String" },
      { "type": "input_value", "name": "X_COL", "check": "String" },
      { "type": "input_value", "name": "Y_COL", "check": "String" }
    ],
    "output": "Semivariogram",
    "colour": "#A1887F",
    "tooltip": "Compute a semivariogram with a specified value column and X/Y coordinates",
    "helpUrl": "https://www.rdocumentation.org/packages/gstat/topics/variogram"
  },
  
  {
    "type": "kriging_interpolation",
    "message0": "create a prediction map from %1 \nusing column %2 and \nlocations (X column)%3 and \n(Y column)%4 ", 
    "args0": [
      { "type": "input_value", "name": "DATA", "check": "DataFrame" },
      { "type": "input_value", "name": "VALUE_COL", "check": "String" },
      { "type": "input_value", "name": "X_COL", "check": "String" },
      { "type": "input_value", "name": "Y_COL", "check": "String" }
    ],
    "output": "KrigingModel",
    "colour": "#A1887F",
    "tooltip": "Perform kriging interpolation with custom value and coordinate columns",
    "helpUrl": "https://www.rdocumentation.org/packages/gstat/topics/krige"
  },

  {
    "type": "idw_interpolation",
    "message0": "Estimate with IDW from %1\nusing values in %2\nX column: %3, Y column: %4",
    "args0": [
      { "type": "input_value", "name": "DATA", "check": "DataFrame" },
      { "type": "input_value", "name": "VALUE_COL", "check": "String" },
      { "type": "input_value", "name": "X_COL", "check": "String" },
      { "type": "input_value", "name": "Y_COL", "check": "String" }
    ],
    "output": "IDWModel",
    "colour": "#A1887F",
    "tooltip": "Interpolate using Inverse Distance Weighting (IDW) with specified value and coordinates",
    "helpUrl": "https://www.rdocumentation.org/packages/gstat/topics/idw"
  },
  
  {
    "type": "logistic_regression_block",
    "message0": "logistic regression of %1 with response %2 and predictors %3",
    "args0": [
      { "type": "input_value", "name": "DATA", "check": "DataFrame" },
      { "type": "input_value", "name": "DEPENDENT_VAR", "check": "String" },
      { "type": "input_value", "name": "INDEPENDENT_VAR", "check": "String" }
    ],
    "output": "LogisticModel",
    "colour": "#A1887F",
    "tooltip": "Fit a logistic regression model",
    "helpUrl": "https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/glm"
  },
  {
    "type": "random_forest_block",
    "message0": "random forest model on %1 with target %2 and features %3",
    "args0": [
      { "type": "input_value", "name": "DATA", "check": "DataFrame" },
      { "type": "input_value", "name": "DEPENDENT_VAR", "check": "String" },
      { "type": "input_value", "name": "INDEPENDENT_VAR", "check": "String" }
    ],
    "output": "RandomForestModel",
    "colour": "#A1887F",
    "tooltip": "Train a random forest model",
    "helpUrl": "https://www.rdocumentation.org/packages/randomForest/versions/4.6-14/topics/randomForest"
  },
  {
    "type": "kmeans_block",
    "message0": "Cluster grouping on data %1 \nusing columns %2 \nwith %3 clusters",
    "args0": [
      { "type": "input_value", "name": "DATA", "check": "DataFrame" },
      { "type": "input_value", "name": "COLUMNS", "check": "String" },
      { "type": "input_value", "name": "CLUSTERS", "check": "Number" }
    ],
    "output": "KMeansModel",
    "colour": "#A1887F",
    "tooltip": "Perform K-means clustering on specified columns",
    "helpUrl": "https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/kmeans"
  }
    
    
    
]);

Blockly.Generator.R.forBlock['linear_model_block'] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
  const dependentVar = generator.valueToCode(block, 'DEPENDENT_VAR', Blockly.Generator.R.ORDER_ATOMIC) || '""';
  const independentVars = generator.valueToCode(block, 'INDEPENDENT_VARS', Blockly.Generator.R.ORDER_ATOMIC) || '""';
  const updateDependentVar = dependentVar.replace(/^["']|["']$/g, '');
  const updateIndependentVars = independentVars.replace(/^["']|["']$/g, '');
  const formulaString = `${updateDependentVar} ~ ${updateIndependentVars}`;
  return [
    `lm(${formulaString}, data = ${data})`,
    Blockly.Generator.R.ORDER_ATOMIC
  ];
};

Blockly.Generator.R.forBlock['semivariogram'] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
  const valueCol = generator.valueToCode(block, 'COLUMN', Blockly.Generator.R.ORDER_ATOMIC) || '""';
  const xCol = generator.valueToCode(block, 'X_COL', Blockly.Generator.R.ORDER_ATOMIC) || '""';
  const yCol = generator.valueToCode(block, 'Y_COL', Blockly.Generator.R.ORDER_ATOMIC) || '""';

  const updateValue = valueCol.replace(/^["']|["']$/g, '');
  const updateX = xCol.replace(/^["']|["']$/g, '');
  const updateY = yCol.replace(/^["']|["']$/g, '');

  return [
    `variogram(${updateValue} ~ 1, locations = ~${updateX} + ${updateY}, data = ${data})`,
    Blockly.Generator.R.ORDER_ATOMIC
  ];
};

Blockly.Generator.R.forBlock['kriging_interpolation'] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
  const valueCol = generator.valueToCode(block, 'VALUE_COL', Blockly.Generator.R.ORDER_ATOMIC) || '""';
  const xCol = generator.valueToCode(block, 'X_COL', Blockly.Generator.R.ORDER_ATOMIC) || '""';
  const yCol = generator.valueToCode(block, 'Y_COL', Blockly.Generator.R.ORDER_ATOMIC) || '""';

  const updateValue = valueCol.replace(/^["']|["']$/g, '');
  const updateX = xCol.replace(/^["']|["']$/g, '');
  const updateY = yCol.replace(/^["']|["']$/g, '');

  return [`
{
  df <- ${data}
  coordinates(df) <- ~${updateX} + ${updateY}

  grid <- expand.grid(
    ${updateX} = seq(min(df\$${updateX}), max(df\$${updateX}), length.out = 50),
    ${updateY} = seq(min(df\$${updateY}), max(df\$${updateY}), length.out = 50)
  )
  coordinates(grid) <- ~${updateX} + ${updateY}
  gridded(grid) <- TRUE

  vgm_emp <- variogram(${updateValue} ~ 1, df)
  vgm_model <- fit.variogram(vgm_emp, vgm("Sph"))

  krige(${updateValue} ~ 1, df, grid, model = vgm_model)
}
`, Blockly.Generator.R.ORDER_ATOMIC];
};




Blockly.Generator.R.forBlock['idw_interpolation'] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
  const valueCol = generator.valueToCode(block, 'VALUE_COL', Blockly.Generator.R.ORDER_ATOMIC) || '""';
  const xCol = generator.valueToCode(block, 'X_COL', Blockly.Generator.R.ORDER_ATOMIC) || '""';
  const yCol = generator.valueToCode(block, 'Y_COL', Blockly.Generator.R.ORDER_ATOMIC) || '""';

  const updateValue = valueCol.replace(/^["']|["']$/g, '');
  const updateX = xCol.replace(/^["']|["']$/g, '');
  const updateY = yCol.replace(/^["']|["']$/g, '');

  return [
    ` {
data_df <- ${data}
coordinates(data_df) <- ~${updateX} + ${updateY}
x_range <- range(data_df@coords[, "${updateX}"])
y_range <- range(data_df@coords[, "${updateY}"])
grid <- expand.grid(
  ${updateX} = seq(x_range[1], x_range[2], length.out = 100),
  ${updateY} = seq(y_range[1], y_range[2], length.out = 100)
)
coordinates(grid) <- ~${updateX} + ${updateY}
gridded(grid) <- TRUE
idw_result <- idw(${updateValue} ~ 1, data_df, newdata = grid)
}
    `,
    Blockly.Generator.R.ORDER_ATOMIC
  ];
};



Blockly.Generator.R.forBlock['logistic_regression_block'] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
  const dependentVar = generator.valueToCode(block, 'DEPENDENT_VAR', Blockly.Generator.R.ORDER_ATOMIC) || '""';
  const independentVar = generator.valueToCode(block, 'INDEPENDENT_VAR', Blockly.Generator.R.ORDER_ATOMIC) || '""';

  const updateDependentVar = dependentVar.replace(/^["']|["']$/g, '');
  const updateIndependentVar = independentVar.replace(/^["']|["']$/g, '');

  return [
    `glm(${updateDependentVar} ~ ${updateIndependentVar}, data = ${data}, family = binomial)`,
    Blockly.Generator.R.ORDER_ATOMIC
  ];
};


Blockly.Generator.R.forBlock['random_forest_block'] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
  const dependentVar = generator.valueToCode(block, 'DEPENDENT_VAR', Blockly.Generator.R.ORDER_ATOMIC) || '""';
  const independentVar = generator.valueToCode(block, 'INDEPENDENT_VAR', Blockly.Generator.R.ORDER_ATOMIC) || '""';

  const updateDependentVar = dependentVar.replace(/^["']|["']$/g, '');
  const updateIndependentVar = independentVar.replace(/^["']|["']$/g, '');

  return [
    `randomForest(${updateDependentVar} ~ ${updateIndependentVar}, data = ${data})`,
    Blockly.Generator.R.ORDER_ATOMIC
  ];
};

Blockly.Generator.R.forBlock['kmeans_block'] = function(block, generator) {
  const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
  const columns = generator.valueToCode(block, 'COLUMNS', Blockly.Generator.R.ORDER_ATOMIC) || '""';
  const clusters = generator.valueToCode(block, 'CLUSTERS', Blockly.Generator.R.ORDER_ATOMIC) || '3';

  const selectColumns = columns.replace(/^["']|["']$/g, '').split(',').map(s => s.trim());
  const colsString = selectColumns.length
    ? `c(${selectColumns.map(c => `"${c}"`).join(', ')})`
    : 'NULL';

  const rCode = `
{
  data_df <- ${data}
  km <- kmeans(data_df[, ${colsString}], centers = ${clusters})
  km
}
`.trim();

  return [rCode, Blockly.Generator.R.ORDER_ATOMIC];
};


