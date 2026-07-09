import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { english } from "../../locales/english"
import { german } from "../../locales/german"
import * as De from "blockly/msg/de";
import * as En from "blockly/msg/en"

const lang = navigator.languages;
if(lang.some((l) => l.startsWith('de'))) { //Reactivate after testing
    Blockly.setLocale(De);
    Blockly.setLocale(german);
} else {
  Blockly.setLocale(En);
  Blockly.setLocale(english);
}

/**
 * Value Input Block (returns value)
 */

Blockly.Blocks["math_square"] = {
  init: function () {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField(Blockly.Msg.Blocks.MATH_SQUARE_Field);
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip(Blockly.Msg.Blocks.MATH_SQUARE_Tooltip);
  },
};
pythonGenerator.forBlock["math_square"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`(${num} ** 2)`, pythonGenerator.ORDER_EXPONENTIATION];
};


/** Mathematical constants */
Blockly.Blocks['consts'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['e', 'e'],
          ['π', 'pi'],
          ['∞', 'inf'],
          ['γ', 'euler_gamma'],
          ['NaN', 'nan']
        ]), 'NUM');
    this.setOutput(true, "Number");
    this.setTooltip('A block to be able to use several mathematical constants');
    this.setColour(230);
  }
}
pythonGenerator.forBlock['consts'] = function(block) {
  const dropdown_name = block.getFieldValue('NUM');
  return [`np.${dropdown_name}`, pythonGenerator.ORDER_ATOMIC];
}

/** sqrt block**/
Blockly.Blocks["sqrt_of"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("sqrt of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the sqrt of a number");
  },
};
pythonGenerator.forBlock["sqrt_of"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.sqrt(${num})`, pythonGenerator.ORDER_ATOMIC];
};

/** exponentiel block**/
Blockly.Blocks["exp_of"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("exp of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the exponential of a number");
  },
};
pythonGenerator.forBlock["exp_of"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.exp(${num})`, pythonGenerator.ORDER_ATOMIC];
};

/** logarithm block**/
Blockly.Blocks["log_of"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("log of");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the logarithm of a number");
  },
};
pythonGenerator.forBlock["log_of"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.log(${num})`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['trigo'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField(new Blockly.FieldDropdown([
          ['sin', 'sin'],
          ['cos', 'cos'],
          ['tan', 'tan'],
          ['arcsin', 'arcsin'],
          ['arccos', 'arccos'],
          ['arctan', 'arctan'],
          ['sinh', 'sinh'],
          ['cosh', 'cosh'],
          ['tanh', 'tanh'],
          ['arcsinh', 'arcsinh'],
          ['arccosh', 'arccosh'],
          ['arctanh', 'arctanh']
        ]), 'TRIGO');
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the sine, cosine, tangent, etc. of a number");
  }
}
pythonGenerator.forBlock['trigo'] = function (block, generator) {
  const num = generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  const trigFunc = block.getFieldValue('TRIGO');
  return [`np.${trigFunc}(${num})`, pythonGenerator.ORDER_ATOMIC];
};

/** round block**/
Blockly.Blocks["round"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("round");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Returns the unit round of a number");
  },
};
pythonGenerator.forBlock["round"] = function (block, generator) {
  const num =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.round(${num})`, pythonGenerator.ORDER_ATOMIC];
};

/**Block modulo**/
Blockly.Blocks['modulo'] = {
  init: function() {
    this.appendValueInput('NAME')
    .setAlign(Blockly.inputs.Align.RIGHT)
      .appendField(new Blockly.FieldNumber(0), 'a')
      .appendField('modulo')
      .appendField(new Blockly.FieldNumber(0), 'b');
    this.setOutput(true, 'Number');
    this.setTooltip('Module: returns the remainder of a division');
    this.setColour(230);
  }
};
pythonGenerator.forBlock['modulo'] = function(block) {
  const number_a = block.getFieldValue('a');
  const number_b = block.getFieldValue('b');
  return [`(${number_a} % ${number_b})`, pythonGenerator.ORDER_MULTIPLICATIVE];
}

//** boolean blocks*/
Blockly.Blocks['bool'] = {
  init: function() {
    this.appendDummyInput('')
        .appendField(new Blockly.FieldDropdown([
          ['True', 'True'],
          ['False', 'False']
        ]), 'drop');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Boolean value');
    this.setHelpUrl('https://en.wikipedia.org/wiki/Boolean_data_type');
    this.setColour(95);
  }
};
pythonGenerator.forBlock['bool'] = function(block) {
  const bool = block.getFieldValue('drop');
  return [bool, pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['bool1'] = {
  init: function() {
    this.appendDummyInput('')
        .appendField('True');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Boolean value: True');
    this.setHelpUrl('https://en.wikipedia.org/wiki/Boolean_data_type');
    this.setColour(95);
  }
};
pythonGenerator.forBlock['bool1'] = function(block) {
  return ['True', pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['bool2'] = {
  init: function() {
    this.appendDummyInput('')
        .appendField('False');
    this.setOutput(true, 'Boolean');
    this.setTooltip('Boolean value False');
    this.setHelpUrl('https://en.wikipedia.org/wiki/Boolean_data_type');
    this.setColour(95);
  }
};
pythonGenerator.forBlock['bool2'] = function() {
  return ['False', pythonGenerator.ORDER_ATOMIC];
}

/**
 * Value to boolean
 */
Blockly.Blocks['to_bool'] = {
  init: function() {
    this.appendValueInput('NAME')
      .appendField('convert to boolean');
    this.setInputsInline(true)
    this.setOutput(true, 'Boolean');
    this.setTooltip('Transform a value into a boolean: False for 0 or empty elements, else True');
    this.setHelpUrl('https://www.geeksforgeeks.org/python/bool-in-python/');
    this.setColour(95);
  }
};
pythonGenerator.forBlock['to_bool'] = function(block, generator) {
  const value_name = generator.valueToCode(block, 'NAME', pythonGenerator.ORDER_ATOMIC);
  return [`bool(${value_name})`, pythonGenerator.ORDER_ATOMIC];
}

/************************
 * 
 * LOADING BLOCKS
 * 
 ************************/
/**
 * Load csv file
 */
Blockly.Blocks['load_csv'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Load data from CSV or TXT file:')
        .appendField(new Blockly.FieldTextInput('file.csv'), 'CSV');
    this.appendDummyInput()
        .appendField('with separator')
        .appendField(new Blockly.FieldTextInput(','), 'sep');
    this.setTooltip('Loads a given CSV or TXT dataset');
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setTooltip('Load a CSV or TXT file. Write the name of the uploaded file previously.')
    this.setHelpUrl('https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html');
    this.setColour(210);
  },
};
pythonGenerator.forBlock['load_csv'] = function(block) {
  const dataset = block.getFieldValue('CSV') || '';
  const separator = block.getFieldValue('sep') || ',';
  return [`pd.read_csv('${dataset}', sep = '${separator}')`, pythonGenerator.ORDER_ATOMIC];
};
      
//**load from txt */
/* Blockly.Blocks['load_txt'] = {
  init: function(){
    this.appendDummyInput()
        .appendField('Load data from txt')
        .appendField(new Blockly.FieldTextInput(''), 'txt');
    this.appendDummyInput()
        .appendField('with separator')
        .appendField(new Blockly.FieldTextInput(','), 'sep');
    this.appendDummyInput()
        .appendField('(only include columns numbered')
        .appendField(new Blockly.FieldTextInput(''), 'usecols')
        .appendField(')');
    this.setTooltip('Loads a given txt dataset (leave columns empty to load all, e.g (0,1,4))');
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setInputsInline(false);
    this.setHelpUrl('https://numpy.org/doc/2.2/reference/generated/numpy.loadtxt.html');
    this.setColour(210);
  },
};
pythonGenerator.forBlock['load_txt'] = function(block) {
  const dataset = block.getFieldValue('txt') || '0';
  const sep = block.getFieldValue('sep') || ',';
  const usecols = block.getFieldValue('usecols') || '';
  return [`np.loadtxt('${dataset}', delimiter='${sep}'${usecols ? ', usecols=' + usecols : ''})`, pythonGenerator.ORDER_ATOMIC];
}; */

//**load from a json file */
Blockly.Blocks['load_json'] = {
  init: function(){
    this.appendDummyInput()
        .appendField('Load data from json:')
        .appendField(new Blockly.FieldTextInput(''), 'json')
    this.setTooltip('Loads a given json file');
    this.setHelpUrl('https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_json.html')
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setColour(210);
  },
};
pythonGenerator.forBlock['load_json'] = function(block) {
  const dataset = block.getFieldValue('json') || 'file.json';
  return [`pd.read_json('${dataset}')`, pythonGenerator.ORDER_ATOMIC];
};

//**load from a raster */
Blockly.Blocks['load_raster'] = {
  init: function(){
    this.appendDummyInput()
        .appendField('Load a raster image from tif:')
        .appendField(new Blockly.FieldTextInput(''), 'tif');
    this.setTooltip('Load a raster image. It is converted into an array of pixel values.');
    this.setHelpUrl('https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.imread.html');
    this.appendEndRowInput();
    this.setOutput(true, 'Array');
    this.setColour(210);
  },
};
pythonGenerator.forBlock['load_raster'] = function(block) {
  const dataset = block.getFieldValue('tif') || '0';
  return [`plt.imread('${dataset}')`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['request_json_data'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Request JSON data')
        .appendField(new Blockly.FieldTextInput('http://example.com/file.json', (url) => url.match(/^[a-z]{4,5}:\/\/[A-Za-zÀ-ÖØ-öø-ÿ0-9./:_-]*?\.[a-z]{2,6}/) ? url : 'ERROR!'), 'url');
    this.setOutput(true, '');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/user_guide/geojson/choropleth.html');
    this.setTooltip('Request JSON data from a given URL');
    this.setColour('210');
  }
}
pythonGenerator.forBlock['request_json_data'] = function(block) {
  const url = block.getFieldValue('url') || '';
  return [`requests.get('${url}').json()\n`, pythonGenerator.ORDER_ATOMIC];
};

// Blockly.Blocks['create_folder'] = {
//   init: function() {
//     this.appendDummyInput('')
//         .appendField('Create folder')
//         .appendField(new Blockly.FieldTextInput('data', txt => txt.replace(/[/<>:?*\\"|]/g, '')), 'FOLDER');
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setColour(210);
//     this.setTooltip('Create a folder to store files.');
//   }
// };
// pythonGenerator.forBlock['create_folder'] = function(block) {
//   const folder = block.getFieldValue('FOLDER') || 'data';
//   return '' +
//     `if not os.path.exists('${folder}'):\n` +
//         `\tos.mkdir('${folder}')\n`;
// };

Blockly.Blocks['func_download'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Download (from URL)')
        .appendField(new Blockly.FieldTextInput('http://file.csv'), 'NAME');
    this.setTooltip('Use function to download file from URL.');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(210);
  }
}
pythonGenerator.forBlock['func_download'] = function(block) {
  const url = block.getFieldValue('NAME') || 'http://file.csv';
  return `download('${url}')\n`
}

Blockly.Blocks['read_file'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Read file')
        .appendField(new Blockly.FieldTextInput('file.csv'), 'NAME');
    this.setTooltip('Use function to read file. Use this block just after a download block.');
    this.setOutput(true);
    this.setHelpUrl('https://geopandas.org/en/stable/docs/reference/api/geopandas.read_file.html');
    this.setColour(210);
  }
};
pythonGenerator.forBlock['read_file'] = function(block,generator) {
  const fileName = block.getFieldValue('NAME');
  return [`gpd.read_file('${fileName}')`, pythonGenerator.ORDER_ATOMIC];
}

var load_sensebox_array_phenomena = [["", ""]];
var load_sensebox_id_default = "id";
Blockly.Blocks['load_sensebox'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Read SenseBox data')
    this.appendDummyInput()
        .appendField('- Box Id:')
        .appendField(new Blockly.FieldTextInput('id'), 'ID');
    this.appendDummyInput()
        .appendField('- From date:')
        .appendField(new Blockly.FieldTextInput('DD'), 'DAY_FROM')
        .appendField('/')
        .appendField(new Blockly.FieldTextInput('MM'), 'MONTH_FROM')
        .appendField('/')
        .appendField(new Blockly.FieldTextInput('YYYY'), 'YEAR_FROM');
    this.appendDummyInput()
        .appendField('  To date:     ')
        .appendField(new Blockly.FieldTextInput('DD'), 'DAY_TO')
        .appendField('/')
        .appendField(new Blockly.FieldTextInput('MM'), 'MONTH_TO')
        .appendField('/')
        .appendField(new Blockly.FieldTextInput('YYYY'), 'YEAR_TO');
    this.appendDummyInput('pheno')
        .appendField('- Phenomenon:')
        .appendField(new Blockly.FieldDropdown(load_sensebox_array_phenomena), 'PHENOMENON');
    this.setTooltip('Load a CSV file of SenseBox data.');
    this.setOutput(true);
    this.setHelpUrl('https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html');
    this.setColour(210);
  },
  onchange: function() {
    if (this.getFieldValue('ID') != load_sensebox_id_default) {
      load_sensebox_id_default = this.getFieldValue('ID');
      this.removeInput('pheno');
      this.appendDummyInput('pheno')
          .appendField('- Phenomenon: Loading...');
      fetch("https://api.opensensemap.org/boxes/" + this.getFieldValue('ID') + "/sensors")
      .then(HTTP => HTTP.json())
      .then(result => {
        if ("sensors" in result) {
          load_sensebox_array_phenomena = [];
          for (let i = 0 ; i < result.sensors.length ; i++) {
            load_sensebox_array_phenomena.push([result.sensors[i].title, result.sensors[i].title]);
          }
          this.removeInput('pheno');
          this.appendDummyInput('pheno')
              .appendField('- Phenomenon:')
              .appendField(new Blockly.FieldDropdown(load_sensebox_array_phenomena), 'PHENOMENON');
        }
      });
    }
  }
};
pythonGenerator.forBlock['load_sensebox'] = function(block,generator) {
  const boxId = block.getFieldValue('ID');
  const phenomenon = block.getFieldValue('PHENOMENON');
  const dayFrom = block.getFieldValue('DAY_FROM');
  const monthFrom = block.getFieldValue('MONTH_FROM');
  const yearFrom = block.getFieldValue('YEAR_FROM');
  const dayTo = block.getFieldValue('DAY_TO');
  const monthTo = block.getFieldValue('MONTH_TO');
  const yearTo = block.getFieldValue('YEAR_TO');
  return [`pd.read_csv(load_sensebox( \
  "https://api.opensensemap.org/boxes/data?boxId=" + "${boxId}" \
  + "&from-date=" + "${yearFrom}" + "-" + "${monthFrom}" + "-" + "${dayFrom}" + "T00:00:00Z" \
  + "&to-date=" + "${yearTo}" + "-" + "${monthTo}" + "-" + "${dayTo}" + "T23:59:59Z" \
  + "&phenomenon=" + "${phenomenon}" + "&columns=lat,lon,boxName,boxId,unit,value,createdAt"))
  `, pythonGenerator.ORDER_ATOMIC];
}

// Blockly.Blocks['write_file'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField('Create GeoPackage')
//         .appendField(new Blockly.FieldTextInput('file_name'), 'NAME')
//         .appendField('.gpkg');
//     this.appendValueInput('RES')
//         .appendField('With data');
//     this.setTooltip('Write to given output folder. The format of this file is GeoPackage (.gpkg). A variable is expected as input.');
//     this.setNextStatement(true);
//     this.setPreviousStatement(true);
//     this.setColour(210);
//   }
// }
// pythonGenerator.forBlock['write_file'] = function(block, generator) {
//   const fileName = block.getFieldValue('NAME');
//   const res = generator.valueToCode(block, 'RES', pythonGenerator.ORDER_ATOMIC);
//   return `${res}.to_file(driver='GPKG', filename='${fileName}.gpkg')\n`
// }

// Blockly.Blocks['chdir'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField('Change current directory to')
//         .appendField(new Blockly.FieldTextInput('path'), 'PATH');
//     this.setTooltip('Change directory to given path');
//     this.setNextStatement(true);
//     this.setPreviousStatement(true);
//     this.setColour(210); 
//   }
// }
// pythonGenerator.forBlock['chdir'] = function(block) {
//   const path = block.getFieldValue('PATH');
//   return `\nos.chdir('${path}')`;
// }

// Blockly.Blocks['getDir'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField('Get current directory');
//     this.setTooltip('Get the current working directory')
//     this.setOutput(true, 'String');
//     this.setColour(210);
//   }
// }
// pythonGenerator.forBlock['getDir'] = function() {
//   return [`os.path.abspath(os.getcwd())`, pythonGenerator.ORDER_ATOMIC];
// }

Blockly.Blocks['sampleDataA'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Download sample data')
        .appendField(new Blockly.FieldDropdown([
          ['iris.csv', 'https://gist.githubusercontent.com/netj/8836201/raw/6f9306ad21398ea43cba4f7d537619d0e07d5ae3/iris.csv'],
          ['zinc_dataset.csv', 'https://gist.githubusercontent.com/KSR2001/7c4937e0ec8a7eb6e146d9e8f3e052cd/raw/b9d450220ce0e11b732a99a02a5dc1107583bec9/zinc_dataset.csv'],
          ['grid.csv', 'https://gist.githubusercontent.com/vivien789/cc1072281ccc542affbc0676cc852615/raw/3559558e3690b1962a83b2191f3943ec18813b79/grid.csv'],
          ['litter.csv', 'https://gist.githubusercontent.com/MatteoBRGR/ef8230eed8a33d6febb5c4399582b161/raw/d2b0164b295e2e8055e449a07109a64c6f5bc877/litter.csv'],
          ['trashCans.csv', 'https://gist.githubusercontent.com/MatteoBRGR/d0b377baabc494ab9de1edba2c2dd893/raw/3d5cefe34ff669d399da2f42c8b7e19f501658a3/trashCans.csv']
        ]), 'NAME');
    this.setTooltip('Download sample data from GitHub Gist.');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(210); 
  }
}
pythonGenerator.forBlock['sampleDataA'] = function(block) {
  const dataset = block.getFieldValue('NAME') ||  'https://gist.githubusercontent.com/netj/8836201/raw/6f9306ad21398ea43cba4f7d537619d0e07d5ae3/iris.csv';
  return `download('${dataset}')\n`;
}

Blockly.Blocks['sampleDataB'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Download sample data (iris.csv)');
    this.setTooltip('Download Iris sample data from the Internet.');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(210); 
  }
}
pythonGenerator.forBlock['sampleDataB'] = function(block) {
  return `download('https://gist.githubusercontent.com/netj/8836201/raw/6f9306ad21398ea43cba4f7d537619d0e07d5ae3/iris.csv')\n`;
}

Blockly.Blocks['listdir'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('List all directories in path')
        .appendField(new Blockly.FieldTextInput('name'), 'PATH');
    this.setTooltip('List directory of given path');
    this.setOutput(true);
    this.setColour(210); 
  }
}
pythonGenerator.forBlock['listdir'] = function(block) {
  const path = block.getFieldValue('PATH') || '';
  return [`os.listdir(${path ? '"' + path + '"' : ''})`, pythonGenerator.ORDER_ATOMIC];
}


//  STATISTICS BLOCKS
/** 
 * Mean of array of numbers
 */
Blockly.Blocks["mean"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Mean of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setTooltip("Returns the mean of an array of numbers. To be used mainly on a column.");
  },
};
pythonGenerator.forBlock["mean"] = function(block, generator) {
  const mean =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.mean(${mean})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Median of array of numbers
 */
Blockly.Blocks["median"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Median of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setTooltip("Returns the median of an array of numbers. To be used mainly on a column.");
  },
};
pythonGenerator.forBlock["median"] = function(block, generator) {
  const median =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.median(${median})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Sum of array of numbers
 */
Blockly.Blocks["sum"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Sum of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setTooltip("Returns the sum of an array of numbers. To be used mainly on a column.");
  },
};
pythonGenerator.forBlock["sum"] = function(block, generator) {
  const sum =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.sum(${sum})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Standard deviation of array of numbers
 */
Blockly.Blocks["std"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Standard deviation of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setTooltip("Returns the standard deviation of an array of numbers. To be used mainly on a column.");
  },
};
pythonGenerator.forBlock["std"] = function(block, generator) {
  const std =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.std(${std})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * mean squared error of array of numbers
 */
Blockly.Blocks["mean_squared"] = {
  init: function () {
    this.appendValueInput("NUM")
    .setCheck("Array")
    .appendField("Mean squared error of");
    this.setOutput(true, "Number");
    this.setColour(150);
    this.setTooltip("Returns the mean squared error of an array of numbers. To be used mainly on a column.");
  },
};
pythonGenerator.forBlock["mean_squared"] = function(block, generator) {
  const msq =
    generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  return [`np.mean((${msq} - np.mean(${msq})) ** 2)\n`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Maximum of array of numbers
 */
Blockly.Blocks['max'] = {
  init: function() {
    this.appendValueInput('maximum')
        .setCheck('Array')
        .appendField('Maximum of');
    this.setOutput(true, 'Number');
    this.setTooltip("Returns the maximum of an array of numbers. To be used mainly on a column.");
    this.setColour(150);
  }
};
pythonGenerator.forBlock["max"] = function(block, generator) {
  const maxi =
    generator.valueToCode(block, "maximum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.max(${maxi})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Minimum of array of numbers
 */
Blockly.Blocks['min'] = { 
  init: function() {
    this.appendValueInput('minimum')
    .setCheck('Array')
      .appendField('Minimum of');
    this.setOutput(true, 'Number');
    this.setTooltip('Returns the minimum of an array of numbers. To be used mainly on a column.');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["min"] = function(block, generator) {
  const mini =
    generator.valueToCode(block, "minimum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.min(${mini})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Quantiles of array of numbers
 */
Blockly.Blocks['quantile'] = { 
  init: function() {
    this.appendValueInput('quantile')
        .setCheck('Array')
        .appendField(new Blockly.FieldDropdown([
          ["First quartile (25%)", "0.25"],
          ["Median (50%)", "0.5"],
          ["Third quartile (75%)", "0.75"],
          ["90th percentile (90%)", "0.9"],
          ["95th percentile (95%)", "0.95"],
          ["99th percentile (99%)", "0.99"],
          ["All quartiles (25%, 50%, 75%)", "[0.25, 0.5, 0.75]"],
          ["All percentiles (0%, 25%, 50%, 75%, 100%)", "[0, 0.25, 0.5, 0.75, 1]"],
          ["Custom percentile", "custom"]
        ]), 'QUANTILE')
        .appendField("of");
    this.appendDummyInput('custom')
        .appendField("Custom value (0 - 100):")
        .appendField(new Blockly.FieldNumber(0), 'custom_q');
    this.setOutput(true, 'Number');
    this.setInputsInline(false);
    this.setTooltip('Returns the selected quantile(s) of an array of numbers. To be used mainly on a column.');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["quantile"] = function(block, generator) {
  const data =
    generator.valueToCode(block, "quantile", pythonGenerator.ORDER_NONE) || "0";
  const selectedQ = block.getFieldValue('QUANTILE');
  const customQ = block.getFieldValue('custom_q');
  if (selectedQ == "custom") {
    if (customQ < 0 || customQ > 100) {
      return [`np.quantile(${data}, 0.5)`, pythonGenerator.ORDER_ATOMIC];
    }
    return [`np.quantile(${data}, ${customQ / 100})`, pythonGenerator.ORDER_ATOMIC];
  }
  return [`np.quantile(${data}, ${selectedQ})`, pythonGenerator.ORDER_ATOMIC];
};


/**
 * Manipulation data blocks
 */
      
/* Select a dataframe column */
Blockly.Blocks['select_column'] = {
  init: function() {
    this.appendDummyInput('column')
        .appendField('Select column')
        .appendField(new Blockly.FieldTextInput('column_name'), 'column_name');
    this.appendDummyInput()
        .appendField('of DataFrame')
        .appendField(new Blockly.FieldVariable('df'), 'df_name');
    this.setOutput(true);
    this.setInputsInline(false);
    this.setTooltip('Select a specific column of a DataFrame.');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['select_column'] = function(block) {
  const column_name = block.getFieldValue('column_name') || 'column_name';
  const df_name = block.getFieldValue('df_name') || 'df';
  const getVar = block.workspace.getVariableById(df_name);
  const Var = getVar ? getVar.name : 'undefined';  
  return [`${Var}['${column_name}']`, pythonGenerator.ORDER_ATOMIC];
};

/* Slice iterable */
Blockly.Blocks['slice'] = {
  init: function() {
    this.appendDummyInput('NAME')
        .appendField('slice variable')
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "VAR")
        .appendField('to values')
        .appendField(new Blockly.FieldNumber("0"), "VAL1")
        .appendField(':')
        .appendField(new Blockly.FieldNumber("0"), "VAL2");
    this.setOutput(true);
    this.setTooltip('Slice a variable (list, array) according to given indexes.');
    this.setHelpUrl('https://stackoverflow.com/questions/9027862/what-does-listxy-do')
    this.setColour(200);
  }
};
pythonGenerator.forBlock['slice'] = function(block) {
  const Val1 = block.getFieldValue('VAL1');
  const Val2 = block.getFieldValue('VAL2');
  const varID = block.getFieldValue('VAR') || '0';
  const getVar = block.workspace.getVariableById(varID);
  const Var = getVar ? getVar.name : 'undefined';
  return [`${Var}[${Val1}:${Val2}]\n`, pythonGenerator.ORDER_ATOMIC]
};

/* Slice file */
Blockly.Blocks['slice_file'] = {
  init: function() {
    this.appendDummyInput('NAME')
        .appendField('slice file')
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "VAR");
    this.appendValueInput('CNAME')
        .appendField('to condition');
    this.setInputsInline(true);
    this.setOutput(true, 'Array');
    this.setTooltip('Slice a file according to a given condition.')
    this.setColour(200);
  }
};
pythonGenerator.forBlock['slice_file'] = function(block, generator) {
  const varID = block.getFieldValue('VAR') || '0';
  const getVar = block.workspace.getVariableById(varID);
  const Var = getVar ? getVar.name : 'undefined';
  const cond = generator.valueToCode(block, 'CNAME', pythonGenerator.ORDER_ATOMIC);
  return [`${Var}[${cond}]`, pythonGenerator.ORDER_COLLECTION]
};

//**Shape of data */
Blockly.Blocks['data_shape'] = {
  init: function() {
    this.appendValueInput('data')
        .setCheck('Array')
        .appendField('Data shape');
    this.setInputsInline(true)
    this.setOutput(true, 'tuple');
    this.setTooltip('Find shape of a data array. Return parenthesis with two integers.');
    this.setHelpUrl('https://numpy.org/devdocs/reference/generated/numpy.shape.html');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['data_shape'] = function(block, generator) {
  const data = generator.valueToCode(block, 'data', pythonGenerator.ORDER_ATOMIC);
  return [`np.shape(${data})`, pythonGenerator.ORDER_COLLECTION];
};

//**reshape an array */
Blockly.Blocks['reshape'] = {
  init: function() {
    this.appendValueInput('NAME')
    .setCheck('Array')
      .appendField('Reshape array', 'DATA');
    this.appendValueInput('rows')
        .setCheck('Number')
        .appendField('Number of arrays');
    this.appendValueInput('columns')
        .setCheck('Number')
        .appendField('Elements per array');
    this.setInputsInline(false)
    this.setOutput(true, 'Array');
    this.setTooltip('Reshape an array. Write the rows number and the colmuns number that you want.');
    this.setHelpUrl('https://www.w3schools.com/python/numpy/numpy_array_reshape.asp');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['reshape'] = function(block, generator) {
  const value_array = generator.valueToCode(block, 'NAME', pythonGenerator.ORDER_COLLECTION);
  const value_rows = generator.valueToCode(block, 'rows', pythonGenerator.ORDER_ATOMIC);
  const value_columns = generator.valueToCode(block, 'columns', pythonGenerator.ORDER_ATOMIC);
  return [`np.reshape(${value_array}, (${value_rows},${value_columns}))`, pythonGenerator.ORDER_ATOMIC];
};

//**stacking data */
Blockly.Blocks['stacking'] = {
  init: function() {
    this.appendValueInput('db1')
        .setCheck('Array')
        .appendField('Stacking by')
        .appendField(new Blockly.FieldDropdown([
          ['columns', 'COLUMNS'],
          ['rows', 'ROWS']
        ]), 'type');
    this.appendValueInput('db2')
    .setCheck('Array');
    this.setInputsInline(true)
    this.setOutput(true, 'Array');
    this.setTooltip('Stack the data by rows or columns.');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.hstack.html')
    this.setColour(200);
  }
};
pythonGenerator.forBlock['stacking'] = function(block, generator) {
  const dropdown_type = block.getFieldValue('type');
  const db1 = generator.valueToCode(block, 'db1', pythonGenerator.ORDER_COLLECTION);
  const db2 = generator.valueToCode(block, 'db2', pythonGenerator.ORDER_COLLECTION);
  switch (dropdown_type) {
    case 'COLUMNS':
      return [`np.hstack((${db1}, ${db2}))\n`, pythonGenerator.ORDER_COLLECTION];
    case 'ROWS':
      return [`np.vstack((${db1}, ${db2}))\n`, pythonGenerator.ORDER_COLLECTION];
  }
}

//**Group data by one column */
Blockly.Blocks['group_by'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Group by')
        .appendField(new Blockly.FieldTextInput('column_name'), 'columnName');
    this.appendValueInput("NUM")
        .setCheck("Array")
        .appendField("of DataFrame");
    this.appendDummyInput()
        .appendField('with operation')
        .appendField(new Blockly.FieldDropdown([['mean', 'mean'], ['sum', 'sum'], ['count', 'count'], ['min', 'min'], ['max', 'max']]), 'operation');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Group the data by one column. Choose one way to group data: mean, sum...');
    this.setHelpUrl('https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.groupby.html')
    this.setColour(200);
  }
};
pythonGenerator.forBlock['group_by'] = function(block, generator) {
  const columnName = block.getFieldValue('columnName') || 'columnName';
  const dfName = generator.valueToCode(block, "NUM", pythonGenerator.ORDER_NONE) || "0";
  const operation = block.getFieldValue('operation') || 'mean';
  return `${dfName} = ${dfName}.groupby(by = '${columnName}').${operation}()\n`;  
}

/**
 * Sort a list
 */

Blockly.Blocks['sort'] = {
  init: function() {
    this.appendValueInput('CNAME')
      .appendField('list to sort')
      .setCheck('List');
    this.setInputsInline(true)
    this.setOutput(true, 'List');
    this.setTooltip('Sort an array (one- or multidimensionl)');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.sort.html');
    this.setColour(95);
  }
};
pythonGenerator.forBlock['sort'] = function(block, generator) {
  const value_name = generator.valueToCode(block, 'CNAME', pythonGenerator.ORDER_ATOMIC);
  return [`np.sort(np.array(${value_name}))`, pythonGenerator.ORDER_ATOMIC];
}

//** create an array*/
Blockly.Blocks['create_array'] = {
  init: function() {
    this.appendValueInput('array')
        .setCheck(['Number', 'Boolean', 'String', 'List', 'Array', 'Matrix'])
        .appendField('Create array with');
    this.setOutput(true, 'Array');
    this.setTooltip('Create an array with np.array(). Input a list, a number, a string...');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.array.html');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['create_array'] = function(block, generator) {
  const array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_ATOMIC);
  return [`np.array(${array})`, pythonGenerator.ORDER_COLLECTION];
}             

Blockly.Blocks['delete_axes'] = {
  init: function() {
    this.appendValueInput('ColArr')
        .setCheck(['List', 'Array', 'String', 'Number'])
        .appendField('Delete columns');
    this.appendValueInput('IndArr')
        .setCheck(['List', 'Array', 'String', 'Number'])
        .appendField('and/or rows');
    this.appendDummyInput()
        .appendField('from dataframe')
        .appendField(new Blockly.FieldVariable('df'), 'DATAFRAME');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Deletes given rows and columns from a dataframe');
    this.setHelpUrl('https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop.html'); 
    this.setColour(195);
  }
};
pythonGenerator.forBlock['delete_axes'] = function(block, generator) {
  const delCols = generator.valueToCode(block, 'ColArr', pythonGenerator.ORDER_ATOMIC) || '';
  const delInds = generator.valueToCode(block, 'IndArr', pythonGenerator.ORDER_COLLECTION) || '';
  const varID = block.getFieldValue('DATAFRAME') || '0';
  const getVar = block.workspace.getVariableById(varID);
  const df = getVar ? getVar.name : 'df';
  return `${df}.drop(${(delInds === '[None]') ? '' : 'index=' + delInds + ', '}${(delCols === '[None]') ? '' : 'columns=' + delCols})\n`;
}


//**Delete in an array */
Blockly.Blocks['delete_object'] = {
  init: function() {
    this.appendValueInput('object')
        .setCheck(['Array', 'Number'])
        .appendField('delete');
    this.appendValueInput('array')
        .setCheck('Array')
        .appendField('in');
    this.setInputsInline(true);
    this.setOutput(true, 'Array');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.delete.html')
    this.setTooltip('Delete an object (columns, values) in an array');
    this.setColour(195);
  }
};
pythonGenerator.forBlock['delete_object'] = function(block, generator) {
  const value_object = generator.valueToCode(block, 'object', pythonGenerator.ORDER_ATOMIC);
  const value_array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_COLLECTION);
  return [`np.delete(${value_array}, ${value_object})`, pythonGenerator.ORDER_COLLECTION];
}

//**Add in an array */
Blockly.Blocks['add_object'] = {
  init: function() {
    this.appendValueInput('object')
        .setCheck(['Array', 'Number'])
        .appendField('add');
    this.appendValueInput('array')
        .setCheck('Array')
        .appendField('in');
    this.setInputsInline(true);
    this.setOutput(true, 'Array');
    this.setTooltip('Add an object (columns, values) in an array');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.append.html');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['add_object'] = function(block, generator) {
  const value_object = generator.valueToCode(block, 'object', pythonGenerator.ORDER_ATOMIC);
  const value_array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_COLLECTION);
  return [`np.append(${value_array}, ${value_object})`, pythonGenerator.ORDER_COLLECTION];
}

Blockly.Blocks['del_col'] = {
  init: function() {
    this.appendValueInput('array')
      .setCheck(['Array'])
      .appendField('Delete columns');
    this.appendValueInput('columns')
      .appendField('Name of columns');
    this.setOutput(true, 'Array');
    this.setTooltip('Remove one column. Enter the column name and the corresponding dataframe.');
    this.setHelpUrl('https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop.html')
    this.setColour(200);
  }
};
pythonGenerator.forBlock['del_col'] = function(block, generator) {
  const array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_ATOMIC);
  const columns = generator.valueToCode(block, 'columns', pythonGenerator.ORDER_ATOMIC);
  return [`${array} = ${array}.drop(columns=${columns}, axis = 1)`, pythonGenerator.ORDER_COLLECTION];
}


Blockly.Blocks['convert_column'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Convert column')
        .appendField(new Blockly.FieldTextInput('column_name'), 'column_name');
    this.appendDummyInput()
        .appendField('of DataFrame')
        .appendField(new Blockly.FieldVariable('df'), 'df_name');
    this.appendDummyInput()
        .appendField('to type')
        .appendField(new Blockly.FieldDropdown([['String', 'str'], ['Integer', 'int'], ['Float', 'float'], ['Boolean', 'bool']]), 'type');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Convert a column of a DataFrame to a different type. Use this block in case of unforseen errors e.g. in maps.');
    this.setHelpUrl('https://www.geeksforgeeks.org/python/python-pandas-dataframe-astype/')
    this.setColour(200);
  }
}
pythonGenerator.forBlock['convert_column'] = function(block) {
  const column_name = block.getFieldValue('column_name') || 'column_name';
  const df_name = block.getFieldValue('df_name') || 'df';
  const type = block.getFieldValue('type') || 'float';
  const getVar = block.workspace.getVariableById(df_name);
  const Var = getVar ? getVar.name : 'undefined';  
  return `${Var}['${column_name}'] = ${Var}['${column_name}'].astype(${type})\n`;
}

//** converte numpy to pandas
Blockly.Blocks['convert_np_to_pd'] = {
  init: function() {
    this.appendValueInput('array')
    .setCheck(['Array'])
      .appendField('Convert to DataFrame');
    this.appendValueInput('columns')
      .appendField('Name of columns');
    this.setOutput(true);
    this.setTooltip('Convert to DataFrame. Write the number of columns name that corresponds to the column number of the dataframe.');
    this.setHelpUrl('https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html')
    this.setColour(200);
  }
};
pythonGenerator.forBlock['convert_np_to_pd'] = function(block, generator) {
  const array = generator.valueToCode(block, 'array', pythonGenerator.ORDER_ATOMIC);
  const columns = generator.valueToCode(block, 'columns', pythonGenerator.ORDER_ATOMIC);
  return [`pd.DataFrame(${array}, columns=${columns})`, pythonGenerator.ORDER_COLLECTION];
}

//**indices in array */
/** 
 * Minimum indices of array of numbers
 */
Blockly.Blocks['ind_min'] = {
  init: function() {
    this.appendValueInput('minimum')
        .setCheck('Array')
        .appendField('Indice of minimum of');
    this.setOutput(true, 'Number');
    this.setTooltip('Returns the indice of the minimum of an array of numbers');
    this.setColour(150);
    this.setHelpUrl('https://numpy.org/doc/2.1/reference/generated/numpy.argmin.html');
  }
};
pythonGenerator.forBlock["ind_min"] = function(block, generator) {
  const ind_mini =
    generator.valueToCode(block, "minimum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argmin(${ind_mini})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Maximum indices of array of numbers
 */
Blockly.Blocks['ind_max'] = { 
  init: function() {
    this.appendValueInput('maximum')
        .setCheck('Array')
        .appendField('Indice of maximum of');
    this.setOutput(true, 'Number');
    this.setTooltip('Returns the indice of the maximum of an array of numbers');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.argmax.html');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["ind_max"] = function(block, generator) {
  const ind_maxi =
    generator.valueToCode(block, "maximum", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argmax(${ind_maxi})`, pythonGenerator.ORDER_ATOMIC];
};

/** 
 * Sorting indices of array of numbers
 */
Blockly.Blocks['ind_sort'] = { 
  init: function() {
    this.appendValueInput('sort')
        .setCheck('Array')
        .appendField('Sorted array of indices of');
    this.setOutput(true, 'Array');
    this.setTooltip('Returns an array of indices of an array of numbers according to their values');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.argsort.html');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["ind_sort"] = function(block, generator) {
  const ind_sort =
    generator.valueToCode(block, "sort", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argsort(${ind_sort})`, pythonGenerator.ORDER_COLLECTION];
};

/** 
 * Finding the indice of array of numbers
 */
Blockly.Blocks['ind_find'] = { 
  init: function() {
    this.appendValueInput('find')
        .appendField('Find indices');
    this.setOutput(true, 'Array');
    this.setTooltip('Returns the found indices of an array of numbers, given a condition');
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.argwhere.html');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["ind_find"] = function(block, generator) {
  const ind_find =
    generator.valueToCode(block, "find", pythonGenerator.ORDER_NONE) || "0";
  return [`np.argwhere(${ind_find})`, pythonGenerator.ORDER_COLLECTION];
};

/** Import blocks */
Blockly.Blocks['import0'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT');
    this.setTooltip('Import module to code');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Import modules if it is not imported in code generator.');
    this.setHelpUrl('https://realpython.com/python-import/');
  }
};
pythonGenerator.forBlock['import0'] = function(block) {
  const module = block.getFieldValue('IMPORT') || 'module';
  return `import ${module}\n`;
}

Blockly.Blocks['import1'] = {
  init: function() {
    this.appendDummyInput('CNAME')
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT')
        .appendField('as')
        .appendField(new Blockly.FieldTextInput('alias'), 'ALIAS')
    this.setTooltip('Import library to code, with alias');
    this.setHelpUrl('https://realpython.com/python-import/');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
pythonGenerator.forBlock['import1'] = function(block) {
  const module = block.getFieldValue('IMPORT') || 'module';
  const alias = block.getFieldValue('ALIAS') || 'alias';
  return `import ${module} as ${alias}\n`;
}

Blockly.Blocks['import2'] = {
  init: function() {
    this.appendDummyInput('CNAME')
        .appendField('from')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT')
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('function'), 'FUNCTION');
    this.setTooltip('Import functions from library to code. You can also use \'*\' and specify more functions separating them with commas.');
    this.setHelpUrl('https://realpython.com/python-import/');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
pythonGenerator.forBlock['import2'] = function(block) {
  const module = block.getFieldValue('IMPORT') || 'module';
  const func = block.getFieldValue('FUNCTION') || 'function';
  return `from ${module} import ${func}\n`;
}

Blockly.Blocks['import3'] = {
  init: function() {
    this.appendDummyInput('CNAME')
        .appendField('from')
        .appendField(new Blockly.FieldTextInput('module'), 'IMPORT')
        .appendField('import')
        .appendField(new Blockly.FieldTextInput('function'), 'FUNCTION')
        .appendField('as')
        .appendField(new Blockly.FieldTextInput('alias'), 'ALIAS');
    this.setTooltip('Import library to code.');
    this.setHelpUrl('https://realpython.com/python-import/');
    this.setColour('#888');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
pythonGenerator.forBlock['import3'] = function(block) {
  const module = block.getFieldValue('IMPORT') || 'module';
  const func = block.getFieldValue('FUNCTION') || 'function';
  const alias = block.getFieldValue('ALIAS') || 'alias';
  return `from ${module} import ${func} as ${alias}\n`;
};


/*****************
 * DATA VIZ BLOCKS
 *****************/

/** Show data **/
Blockly.Blocks['plot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Plot line');
    this.appendValueInput('valX')
        .appendField('X-value');
    this.appendValueInput('valY')
        .appendField('Y-value');
    this.appendDummyInput('fmt')
        .appendField('Colour')
        .appendField(new Blockly.FieldTextInput('red'), 'FMT');
    this.appendDummyInput()
        .appendField('Title')
        .appendField(new Blockly.FieldTextInput('Title'), 'title');
    this.appendDummyInput('size')
        .appendField('Size:')
        .appendField('X')
        .appendField(new Blockly.FieldNumber('1'), 'XVAL')
        .appendField('Y')
        .appendField(new Blockly.FieldNumber('1'), 'YVAL');
    this.appendDummyInput()
        .appendField('X-axis label')
        .appendField(new Blockly.FieldTextInput('Label'), 'XLVAL');;
    this.appendDummyInput()
        .appendField('Y-axis label')
        .appendField(new Blockly.FieldTextInput('Label'), 'YLVAL');;
    this.appendValueInput('Legend')
        .setCheck('List')
        .appendField('Legend');
    this.appendDummyInput('GRID')
        .appendField('Grid?')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'Grid');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Plot a line with X and Y data');
    this.setHelpUrl('https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html#matplotlib.pyplot.plot');
    this.setColour(325);
  }
}
pythonGenerator.forBlock['plot'] = function(block, generator) {
  const dataX = generator.valueToCode(block, 'valX', pythonGenerator.ORDER_NONE) || "0";
  const dataY = generator.valueToCode(block, 'valY', pythonGenerator.ORDER_NONE) || "x";
  const format = block.getFieldValue('FMT') || 'black';
  const title = block.getFieldValue('title') || "Title";
  const size = [block.getFieldValue('XVAL'), block.getFieldValue('YVAL')];
  const labels = [block.getFieldValue('XLVAL') || "X", block.getFieldValue('YLVAL') || "Y"];
  const legend = generator.valueToCode(block, 'Legend', pythonGenerator.ORDER_NONE) || "Legend";
  let grid = block.getFieldValue('Grid').toLowerCase();
  grid = grid[0].toUpperCase() + grid.slice(1);
  return '' +
  `x = ${dataX}\n` +
  `y = ${dataY}\n` +
  `plt.figure(figsize = (${size[0]}, ${size[1]}))\n` + 
  `plt.plot(x, y, color = '${format}')\n` + 
  `plt.title('${title}')\n` +
  `plt.xlabel('${labels[0]}')\n` + 
  `plt.ylabel('${labels[1]}')\n` +
  `plt.grid(${grid})\n` +
  `plt.legend(${legend})\n`
}

/** Show scattered data */
Blockly.Blocks['scatter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Plot points');
    this.appendValueInput('valX')
        .appendField('X-value');
    this.appendValueInput('valY')
        .appendField('Y-value');
    this.appendDummyInput()
        .appendField('Colour')
        .appendField(new Blockly.FieldTextInput('red'), 'COL')
    this.appendDummyInput()
        .appendField('Title')
        .appendField(new Blockly.FieldTextInput('Title'), 'title');
    this.appendDummyInput()
        .appendField('Size:')
        .appendField('X')
        .appendField(new Blockly.FieldNumber('1'), 'XVAL')
        .appendField('Y')
        .appendField(new Blockly.FieldNumber('1'), 'YVAL');
    this.appendDummyInput()
        .appendField('X-axis label')
        .appendField(new Blockly.FieldTextInput('Label'), 'XLabel');
    this.appendDummyInput()
        .appendField('Y-axis label')
        .appendField(new Blockly.FieldTextInput('Label'), 'YLabel');
    this.appendValueInput('Legend')
        .setCheck('List')
        .appendField('Legend');
    this.appendDummyInput('GRID')
        .appendField('Grid?')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'Grid');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(false);
    this.setHelpUrl('https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.scatter.html#matplotlib.axes.Axes.scatter');
    this.setTooltip('Plot a graph with X and Y data');
    this.setColour(325);
  }
}
pythonGenerator.forBlock['scatter'] = function(block, generator) {
  const dataX = generator.valueToCode(block, 'valX', pythonGenerator.ORDER_NONE) || "1";
  const dataY = generator.valueToCode(block, 'valY', pythonGenerator.ORDER_NONE) || "1";
  const title = block.getFieldValue('title') || "Title";
  const col = block.getFieldValue('COL');
  const size = [block.getFieldValue('XVAL'), block.getFieldValue('YVAL')];
  const labels = [block.getFieldValue('XLabel') || "X", block.getFieldValue('YLabel') || "Y"];
  const legend = generator.valueToCode(block, 'Legend', pythonGenerator.ORDER_NONE) || "0";
  let grid = block.getFieldValue('Grid').toLowerCase();
  grid = grid[0].toUpperCase() + grid.slice(1);
  return '' +
  `x = ${dataX}\n` +
  `y = ${dataY}\n` +
  `plt.figure(figsize = (${size[0]}, ${size[1]}))\n` + 
  `plt.scatter(x, y, color = '${col}')\n` + 
  `plt.title('${title}')\n` +
  `plt.xlabel('${labels[0]}')\n` + 
  `plt.ylabel('${labels[1]}')\n` +
  `plt.grid(${grid})\n` +
  `plt.legend(${legend})\n`
}


Blockly.Blocks['pie_chart'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Pie chart');
    this.appendValueInput('sizes')
        .setCheck('List')
        .appendField('Sizes');
    this.appendValueInput('labels')
        .setCheck('List')
        .appendField('Labels');
    this.appendDummyInput()
        .appendField('Title')
        .appendField(new Blockly.FieldTextInput('Title'), 'title');
    this.appendDummyInput()
        .appendField('Percentages')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'percent');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Plot a pie chart');
    this.setHelpUrl('https://matplotlib.org/stable/gallery/pie_and_polar_charts/pie_features.html');
    this.setColour(325);
  }
}
pythonGenerator.forBlock['pie_chart'] = function(block, generator) {
  const sizes = generator.valueToCode(block, 'sizes', pythonGenerator.ORDER_NONE) || "[100]";
  const labels = generator.valueToCode(block, 'labels', pythonGenerator.ORDER_NONE) || "['Label']";
  const percent = block.getFieldValue('percent') || 'TRUE';
  const title = block.getFieldValue('title') || "Title";
  return `plt.pie(${sizes}, labels=${labels}, autopct=${percent === 'TRUE' ? '\'%1.1f%%\'':'None'})\n`
      + `plt.title('${title}')\n`
}

Blockly.Blocks['create_list_XCoords'] = {
  init: function() {
    this.appendDummyInput('')
        .appendField('Create list with X coords')
        .appendField(new Blockly.FieldVariable('df'), 'VAR');
    this.setOutput(true);
    this.setTooltip('Attach an array. This array should be an array of points with X and Y coordinates. This blocks creates a list of all X coordinates of the points.');
    this.setColour(100);
    this.setHelpUrl('https://stackoverflow.com/questions/59417997/how-to-plot-a-list-of-shapely-points');
  }
}
pythonGenerator.forBlock['create_list_XCoords'] = function (block) {
  const varID = block.getFieldValue('VAR') || '0';
  const getVar = block.workspace.getVariableById(varID);
  const Var = getVar ? getVar.name : 'undefined';
  return [`[point.x for point in ${Var}]`, pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['create_list_YCoords'] = {
  init: function() {
    this.appendDummyInput('')
        .appendField('Create list with Y coords')
        .appendField(new Blockly.FieldVariable('df'), 'VAR');
    this.setOutput(true);
    this.setTooltip('Attach an array. This array should be an array of points with X and Y coordinates. This blocks creates a list of all Y coordinates of the points.');
    this.setColour(100);
    this.setHelpUrl('https://stackoverflow.com/questions/59417997/how-to-plot-a-list-of-shapely-points');
  }
}
pythonGenerator.forBlock['create_list_YCoords'] = function (block) {
  const varID = block.getFieldValue('VAR') || '0';
  const getVar = block.workspace.getVariableById(varID);
  const Var = getVar ? getVar.name : 'undefined';
  return [`[point.y for point in ${Var}]`, pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['bar_chart'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Bar chart');
    this.appendValueInput('heights')
        .setCheck('List')
        .appendField('Heights');
    this.appendValueInput('sizes')
        .setCheck('List')
        .appendField('Labels');
    this.appendDummyInput()
        .appendField('Title')
        .appendField(new Blockly.FieldTextInput('Title'), 'title');
    this.appendDummyInput()
        .appendField('X-axis label')
        .appendField(new Blockly.FieldTextInput('Label'), 'XLabel');
    this.appendDummyInput()
        .appendField('Y-axis label')
        .appendField(new Blockly.FieldTextInput('Label'), 'YLabel');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Plot a bar chart');
    this.setHelpUrl('https://matplotlib.org/stable/gallery/pie_and_polar_charts/pie_features.html');
    this.setColour(325);
  }
}
pythonGenerator.forBlock['bar_chart'] = function(block, generator) {
  const sizes = generator.valueToCode(block, 'sizes', pythonGenerator.ORDER_NONE) || "[5]";
  const labels = [block.getFieldValue('XLabel') || "X", block.getFieldValue('YLabel') || "Y"];
  const title = block.getFieldValue('title') || "Title";
  const heights = generator.valueToCode(block, 'heights', pythonGenerator.ORDER_NONE) || "[10]";
  return '' +
  `plt.bar(${sizes}, ${heights})\n` +
  `plt.title('${title}')\n` +
  `plt.xlabel('${labels[0]}')\n` + 
  `plt.ylabel('${labels[1]}')\n`
}

Blockly.Blocks['boxplot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Boxplot');
    this.appendValueInput('data')
        .setCheck('List')
        .appendField('Data');
    this.appendValueInput('label_group')
        .setCheck('List')
        .appendField('Labels');
    this.appendDummyInput()
        .appendField('Vertical')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'orientation');
    this.appendDummyInput()
        .appendField('Add notches')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'notches');
    this.appendDummyInput()
        .appendField('Title')
        .appendField(new Blockly.FieldTextInput('Title'), 'title');
    this.appendDummyInput()
        .appendField('X-axis label')
        .appendField(new Blockly.FieldTextInput('Label'), 'XLabel');
    this.appendDummyInput()
        .appendField('Y-axis label')
        .appendField(new Blockly.FieldTextInput('Label'), 'YLabel');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Plot a boxplot');
    this.setHelpUrl('https://en.wikipedia.org/wiki/Box_plot');
    this.setColour(325);
  }
}
pythonGenerator.forBlock['boxplot'] = function(block, generator) {
  const orientation = block.getFieldValue('orientation') === 'TRUE';
  const notches = block.getFieldValue('notches') === 'TRUE';
  const data = generator.valueToCode(block, 'data', pythonGenerator.ORDER_NONE) || "[0]";
  const label_group = generator.valueToCode(block, 'label_group', pythonGenerator.ORDER_NONE) || "['null']";
  const labels = [block.getFieldValue('XLabel') || "X", block.getFieldValue('YLabel') || "Y"];
  const title = block.getFieldValue('title') || "Title";
  return `plt.boxplot(${data}, labels = ${label_group}, vert = ${orientation ? 'True' : 'False'}, notch = ${notches ? 'True' : 'False'})\n` +
  `plt.title('${title}')\n` +
  `plt.xlabel('${labels[0]}')\n` + 
  `plt.ylabel('${labels[1]}')\n`
}

//**GEOMETRY BLOCKS */
Blockly.Blocks['create_point'] = { 
  init: function() {
    this.appendValueInput('point')
        .setCheck('Coords')
        .appendField('Create point with coordinates');
    this.setOutput(true)
    this.setTooltip('Returns a Point() object with given coordinates');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.Point.html')
    this.setColour(150);
  }
};
pythonGenerator.forBlock['create_point'] = function(block, generator) {
  const coordinates = generator.valueToCode(block, 'point', pythonGenerator.ORDER_ATOMIC) || '(0, 0)';
  return [`Point${coordinates}`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['coords'] = { 
  init: function() {
    this.appendDummyInput()
        .appendField('(')
        .appendField(new Blockly.FieldNumber('0'), 'XCoord')
        .appendField(',')
        .appendField(new Blockly.FieldNumber('0'), 'YCoord')
        .appendField(')');
    this.setOutput(true, ['Coords']);
    this.setTooltip('Returns a pair of coordinates');
    this.setColour(150);
  }
};
pythonGenerator.forBlock["coords"] = function(block) {
  const X_Coord = block.getFieldValue('XCoord') || '0';
  const Y_Coord = block.getFieldValue('YCoord') || '0';
  return [`(${X_Coord}, ${Y_Coord})`, pythonGenerator.ORDER_ATOMIC]
};


Blockly.Blocks['buffer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Create circle buffer');
    this.appendValueInput('center')
        .appendField('Center coordinates');
    this.appendDummyInput('radius')
        .appendField('Radius')
        .appendField(new Blockly.FieldNumber(0), 'r');
    this.setOutput(true, 'Polygon');
    this.setInputsInline(false);
    this.setTooltip('Create a circle with its center and its radius');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.buffer.html')
    this.setColour(150);
  }
};
pythonGenerator.forBlock['buffer'] = function(block, generator) {
  const coordinates_circle = generator.valueToCode(block, 'center', pythonGenerator.ORDER_ATOMIC) || '(0, 0)';
  const number_rad = block.getFieldValue('r') || '1';
  return [`Point${coordinates_circle}.buffer(${number_rad})`, pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['line_segment'] = {
  init: function() {
    this.itemCount_ = 0
    this.appendDummyInput()
        .appendField('Create line segment');
    this.appendValueInput('element_0')
        .appendField('Coordinates')
        .setCheck('Coords');
    this.setInputsInline(false);
    const appendFieldPlusIcon = new Blockly.FieldImage(
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-plus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 5l0 14' /%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E",
      16,
      16,
      'Add',
      function (block) {
        block.sourceBlock_.appendArrayElementInput()
      }
    )
    this.appendDummyInput('close')
        .appendField(appendFieldPlusIcon);
    this.setColour(150);
    this.setOutput(true);
    this.setTooltip('Creates a line segment with given coordinates');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.LineString.html')
  },

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    }
  },

  loadExtraState: function(state) {
    this.itemCount_ = state['itemCount']
    this.updateShape()
  },

  appendArrayElementInput: function() {
    Blockly.Events.setGroup(true)
    const oldExtraState = getExtraBlockState(this)
    this.itemCount_ += 1
    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
    this.updateShape()
  },

  deleteArrayElementInput: function(inputToDelete) {
    const oldExtraState = getExtraBlockState(this)
    Blockly.Events.setGroup(true)
    var inputNameToDelete = inputToDelete.name
    var inputIndexToDelete = Number(inputNameToDelete.match(/\d+/)[0])
    var substructure = this.getInputTargetBlock(inputNameToDelete)
    if (substructure) substructure.dispose(true, true)
    this.removeInput(inputNameToDelete)
    this.itemCount_ -= 1
    for (var i = inputIndexToDelete + 1; i <= this.itemCount_; i++) {
      var input = this.getInput('element_' + i)
      input.name = 'element_' + (i - 1)
    }

    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
  },

  updateShape: function() {
    for (let i = 1; i < this.itemCount_; i++) {
      if (!this.getInput('element_' + i)) {
        const appended_input = this.appendValueInput('element_' + i).setCheck('Coords');

        var deleteArrayElementIcon = new Blockly.FieldImage(
          `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-minus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E`,
          16,
          16,
          'Remove',
          function (block) {
            block.sourceBlock_.deleteArrayElementInput(appended_input)
          }
        )
        appended_input.appendField(deleteArrayElementIcon, 'delete_' + i)

        this.moveInputBefore('element_' + i, 'close')
      }
    }
  },
}

pythonGenerator.forBlock['line_segment'] = function(block, generator) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    elements.push(generator.valueToCode(block, 'element_' + i, pythonGenerator.ORDER_NONE) || 'None');
  }
  return [`LineString([${elements.join(', ')}])`, pythonGenerator.ORDER_ATOMIC];
};

//**Polygon area */
Blockly.Blocks['polygon_area'] = {
  init: function() {
    this.appendValueInput('polygon')
        .setCheck('Polygon')
        .appendField('Polygon area');
    this.setOutput(true, 'Number');
    this.setTooltip('Compute the polygon area');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.area.html');
    this.setColour(150);
  }
};
pythonGenerator.forBlock['polygon_area'] = function(block, generator) {
  const polygon = generator.valueToCode(block, 'polygon', pythonGenerator.ORDER_ATOMIC);
  return [`${polygon}.area`, pythonGenerator.ORDER_ATOMIC];
}

//**Polygon perimeter */
Blockly.Blocks['polygon_perimeter'] = {
  init: function() {
    this.appendValueInput('polygon')
        .setCheck('Polygon')
        .appendField('Polygon perimeter');
    this.setOutput(true, 'Number');
    this.setTooltip('Compute the polygon perimeter');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.length.html');
    this.setColour(150);
  }
};
pythonGenerator.forBlock['polygon_perimeter'] = function(block, generator) {
  const polygon = generator.valueToCode(block, 'polygon', pythonGenerator.ORDER_ATOMIC);
  return [`${polygon}.length`, pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['geometry_type'] = {
  init: function() {
    this.appendValueInput('geom')
        .appendField('Geometry type');
    this.setOutput(true, null);
    this.setTooltip('Give the type of a geometry');
    this.setHelpUrl('https://autogis-site.readthedocs.io/en/latest/lessons/lesson-1/geometry-objects.html');
    this.setColour(150);
  }
};
pythonGenerator.forBlock['geometry_type'] = function(block, generator) {
  const geome = generator.valueToCode(block, 'geom', pythonGenerator.ORDER_ATOMIC);
  return [`${geome}.geom_type`, pythonGenerator.ORDER_ATOMIC];
}


//**Multipolygon */
Blockly.Blocks['multipolygon'] = {
  init: function() {
    this.appendDummyInput('')
      .appendField('MultiPolygon')
    this.appendValueInput('polygon1')
        .setCheck('Polygon')
        .appendField('Polygon1');
    this.appendValueInput('polygon2')
        .setCheck('Polygon')
        .appendField('Polygon2');
    this.appendDummyInput('')
        .appendField('Show multipolygon?')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'SHOW');
    this.appendDummyInput('')
      .appendField(new Blockly.FieldTextInput('multipolygon'), 'variable');
    this.setOutput(true, 'Polygon');
    this.setTooltip('Create a multipolygon from a sequel of polygons');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.MultiPolygon.html');
    this.setColour(150);
  }
};
  
pythonGenerator.forBlock['multipolygon'] = function(block, generator) {
  const value_polygon1 = generator.valueToCode(block, 'polygon1', pythonGenerator.ORDER_ATOMIC);
  const value_polygon2 = generator.valueToCode(block, 'polygon2', pythonGenerator.ORDER_ATOMIC);
  return [`MultiPolygon([${value_polygon1}, ${value_polygon2}])\n`, pythonGenerator.ORDER_ATOMIC];
}

//**Bounding box */
Blockly.Blocks['bounding_box'] = {
  init: function() {
    this.appendDummyInput('NAME')
      .appendField('Bounding box');
    this.appendDummyInput('minimum')
      .appendField('Min: x')
      .appendField(new Blockly.FieldNumber(0), 'min_x')
      .appendField(', y')
      .appendField(new Blockly.FieldNumber(0), 'min_y');
    this.appendDummyInput('maximum')
      .appendField('Max: x', 'MAX')
      .appendField(new Blockly.FieldNumber(0), 'max_x')
      .appendField(', y')
      .appendField(new Blockly.FieldNumber(0), 'max_y');
    this.setOutput(true, 'Polygon');
    this.setTooltip('Create a bounding box');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.box.html');
    this.setColour(150);
  }
};
pythonGenerator.forBlock['bounding_box'] = function(block) {
  const min_x = block.getFieldValue('min_x') || '0';
  const min_y = block.getFieldValue('min_y') || '0';
  const max_x = block.getFieldValue('max_x') || '0';
  const max_y = block.getFieldValue('max_y') || '0';
  return [`box(minx=${min_x}, miny=${min_y}, maxx=${max_x}, maxy=${max_y})`, pythonGenerator.ORDER_ATOMIC];
}

//**Polygon block */
Blockly.Blocks['polygon'] = {
  init: function() {
    this.itemCount_ = 0
    this.appendDummyInput()
        .appendField('Create a polygon');
    this.appendValueInput('element_0')
        .appendField('Coordinates')
        .setCheck('Coords');
    this.setInputsInline(false);
    const appendFieldPlusIcon = new Blockly.FieldImage(
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-plus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 5l0 14' /%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E",
      16,
      16,
      'Add',
      function (block) {
        block.sourceBlock_.appendArrayElementInput()
      }
    )
    this.appendDummyInput('close')
        .appendField(appendFieldPlusIcon);
    this.setColour(150);
    this.setOutput(true, 'Polygon');
    this.setTooltip('Creates a polygon with given coordinates');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.Polygon.html')
  },

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    }
  },

  loadExtraState: function(state) {
    this.itemCount_ = state['itemCount']
    this.updateShape()
  },

  appendArrayElementInput: function() {
    Blockly.Events.setGroup(true)
    const oldExtraState = getExtraBlockState(this)
    this.itemCount_ += 1
    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
    this.updateShape()
  },

  deleteArrayElementInput: function(inputToDelete) {
    const oldExtraState = getExtraBlockState(this)
    Blockly.Events.setGroup(true)
    var inputNameToDelete = inputToDelete.name
    var inputIndexToDelete = Number(inputNameToDelete.match(/\d+/)[0])
    var substructure = this.getInputTargetBlock(inputNameToDelete)
    if (substructure) substructure.dispose(true, true)
    this.removeInput(inputNameToDelete)
    this.itemCount_ -= 1
    for (var i = inputIndexToDelete + 1; i <= this.itemCount_; i++) {
      var input = this.getInput('element_' + i)
      input.name = 'element_' + (i - 1)
    }

    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
  },

  updateShape: function() {
    for (let i = 1; i < this.itemCount_; i++) {
      if (!this.getInput('element_' + i)) {
        const appended_input = this.appendValueInput('element_' + i).setCheck('Coords');

        var deleteArrayElementIcon = new Blockly.FieldImage(
          `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-minus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E`,
          16,
          16,
          'Remove',
          function (block) {
            block.sourceBlock_.deleteArrayElementInput(appended_input)
          }
        )
        appended_input.appendField(deleteArrayElementIcon, 'delete_' + i)

        this.moveInputBefore('element_' + i, 'close')
      }
    }
  },
}

pythonGenerator.forBlock['polygon'] = function(block, generator) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    elements.push(generator.valueToCode(block, 'element_' + i, pythonGenerator.ORDER_NONE) || '(0, 0)');
  }
  return [`Polygon([${elements.join(', ')}])`, pythonGenerator.ORDER_ATOMIC];
};

// Computing centroid
Blockly.Blocks["centroid"] = {
  init: function(){
    this.appendValueInput('CTR')
    .appendField('centroid of')
    .setCheck('Polygon');
    this.setOutput(true);
    this.setColour(150);
    this.setTooltip('Returns the centroid of a geometry');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.centroid.html');
  },
};
pythonGenerator.forBlock["centroid"] = function(block, generator) {
  const centroide = generator.valueToCode(block, 'CTR', pythonGenerator.ORDER_NONE);
  return [`${centroide}.centroid`, pythonGenerator.ORDER_ATOMIC];
};

//** Distance blocks */
//Distance Vincenty
Blockly.Blocks['distance_vinc'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Vincenty distance');
    this.appendValueInput('point1')
        .appendField('Point 1')
        .setCheck('GeoCoords');
    this.appendValueInput('point2')
        .appendField('Point 2')
        .setCheck('GeoCoords');
    this.setOutput(true, 'Number');
    this.setTooltip('Find the Vincenty distance: Geo coordinates in input. This distance is computed on a ellipsoid');
    this.setHelpUrl('https://geopy.readthedocs.io/en/stable/index.html?highlight=geodesic#geopy.distance.geodesic');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_vinc'] = function(block, generator) {
  const coord1 = generator.valueToCode(block, 'point1', pythonGenerator.ORDER_ATOMIC);
  const coord2 = generator.valueToCode(block, 'point2', pythonGenerator.ORDER_ATOMIC);
  return [`geodesic(${coord1}, ${coord2}).meters`, pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['distance_calc'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Distance');
    this.appendValueInput('point1')
        .appendField('Point 1')
        .setCheck('Coords');
    this.appendValueInput('point2')
        .appendField('Point 2')
        .setCheck('Coords');
    this.setOutput(true, 'Number');
    this.setTooltip('Find the distance between points');
    this.setHelpUrl('https://shapely.readthedocs.io/en/stable/reference/shapely.distance.html');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_calc'] = function(block, generator) {
  const coord1 = generator.valueToCode(block, 'point1', pythonGenerator.ORDER_ATOMIC);
  const coord2 = generator.valueToCode(block, 'point2', pythonGenerator.ORDER_ATOMIC);
  return [`Point${coord1}.distance(Point${coord2})`, pythonGenerator.ORDER_ATOMIC];
}

//Distance on a sphere
Blockly.Blocks['distance_sph'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Distance on a sphere');
    this.appendDummyInput()
        .appendField('Point 1: Lat:')
        .appendField(new Blockly.FieldNumber('0'), 'Lat1')
        .appendField(', Lon:')
        .appendField(new Blockly.FieldNumber('0'), 'Lon1');
    this.appendDummyInput()
        .appendField('Point 2: Lat:')
        .appendField(new Blockly.FieldNumber('0'), 'Lat2')
        .appendField(', Lon:')
        .appendField(new Blockly.FieldNumber('0'), 'Lon2');
    this.setOutput(true, 'Number');
    this.setTooltip('Find the distance on a sphere with latitude and longitude. Different of haversine distance');
    this.setHelpUrl('https://www.walter-fendt.de/html5/men/distancesphere_en.htm');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_sph'] = function(block) {
  const lat1 = block.getFieldValue('Lat1') || '0';
  const lat2 = block.getFieldValue('Lat2') || '0';
  const lon1 = block.getFieldValue('Lon1') || '0';
  const lon2 = block.getFieldValue('Lon2') || '0';
  return [`np.acos(np.sin(np.radians(${lat1})) * np.sin(np.radians(${lat2})) + np.cos(np.radians(${lat1})) * np.cos(np.radians(${lat2})) * np.cos(np.radians(${lon2} - ${lon1}))) * 6371e3`, pythonGenerator.ORDER_ATOMIC];
}

//Distance with rectangular approximation
Blockly.Blocks['distance_rect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Distance with rectangular approximation');
    this.appendDummyInput()
        .appendField('Point 1: Lat:')
        .appendField(new Blockly.FieldNumber('0'), 'Lat1')
        .appendField(', Lon:')
        .appendField(new Blockly.FieldNumber('0'), 'Lon1');
    this.appendDummyInput()
        .appendField('Point 2: Lat:')
        .appendField(new Blockly.FieldNumber('0'), 'Lat2')
        .appendField(', Lon:')
        .appendField(new Blockly.FieldNumber('0'), 'Lon2');
    this.setOutput(true, 'Number');
    this.setTooltip('Find the distance with rectangular approximation with lat and lon');
    this.setHelpUrl('');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_rect'] = function(block) {
  const lat1 = block.getFieldValue('Lat1') || '0';
  const lat2 = block.getFieldValue('Lat2') || '0';
  const lon1 = block.getFieldValue('Lon1') || '0';
  const lon2 = block.getFieldValue('Lon2') || '0';
  return [`6371e3 * np.sqrt((np.radians(${lon2} - ${lon1}) * np.cos(np.radians((${lat1} + ${lat2}) / 2)))**2 + (np.radians(${lat2} - ${lat1}))**2)`, pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['distance_manhattan'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Manhattan distance');
    this.appendDummyInput()
        .appendField('Point 1: Lat:')
        .appendField(new Blockly.FieldNumber('0'), 'Lat1')
        .appendField(', Lon:')
        .appendField(new Blockly.FieldNumber('0'), 'Lon1');
    this.appendDummyInput()
        .appendField('Point 2: Lat:')
        .appendField(new Blockly.FieldNumber('0'), 'Lat2')
        .appendField(', Lon:')
        .appendField(new Blockly.FieldNumber('0'), 'Lon2');
    this.setOutput(true, 'Number');
    this.setTooltip('Find the manhattan distance with lat and lon. Only for very short distances, maximum difference between coordinates in hundredths of degrees');
    this.setHelpUrl('https://en.wikipedia.org/wiki/Taxicab_geometry');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_manhattan'] = function(block) {
  const lat1 = block.getFieldValue('Lat1') || '0';
  const lat2 = block.getFieldValue('Lat2') || '0';
  const lon1 = block.getFieldValue('Lon1') || '0';
  const lon2 = block.getFieldValue('Lon2') || '0';
  return [`(abs(${lat2} - ${lat1}) * 111320) + (abs(${lon2} - ${lon1}) * 40075000 * np.cos(np.radians((${lat2} + ${lat1}) / 2)) / 360)`, pythonGenerator.ORDER_ATOMIC];
}

//Distance haversine
Blockly.Blocks['distance_haversine'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Haversine distance');
    this.appendDummyInput()
        .appendField('Point 1: Lat:')
        .appendField(new Blockly.FieldNumber('0'), 'Lat1')
        .appendField(', Lon:')
        .appendField(new Blockly.FieldNumber('0'), 'Lon1');
    this.appendDummyInput()
        .appendField('Point 2: Lat:')
        .appendField(new Blockly.FieldNumber('0'), 'Lat2')
        .appendField(', Lon:')
        .appendField(new Blockly.FieldNumber('0'), 'Lon2');
    this.setOutput(true, 'Number');
    this.setTooltip('Find the Haversine distance with lat and lon on a sphere.');
    this.setHelpUrl('https://en.wikipedia.org/wiki/Haversine_formula');
    this.setColour(60);
  }
};
pythonGenerator.forBlock['distance_haversine'] = function(block) {
  const lat1 = block.getFieldValue('Lat1') || '0';
  const lat2 = block.getFieldValue('Lat2') || '0';
  const lon1 = block.getFieldValue('Lon1') || '0';
  const lon2 = block.getFieldValue('Lon2') || '0';
  return [`6371e3 * 2 * np.atan2(np.sqrt((np.sin(np.radians(${lat2} - ${lat1}) / 2) ** 2 + np.cos(np.radians(${lat1})) * np.cos(np.radians(${lat2})) * np.sin(np.radians(${lon2} - ${lon1}) / 2) ** 2)), np.sqrt(1 - (np.sin(np.radians(${lat2} - ${lat1}) / 2) ** 2 + np.cos(np.radians(${lat1})) * np.cos(np.radians(${lat2})) * np.sin(np.radians(${lon2} - ${lon1}) / 2) ** 2)))`, pythonGenerator.ORDER_ATOMIC];
}

/****************
 * MAPS
 ****************/
Blockly.Blocks['GeoCoords'] = { 
  init: function() {
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldNumber('0'), 'XCoord')
        .appendField('°N,')
        .appendField(new Blockly.FieldNumber('0'), 'YCoord')
        .appendField('°E');
    this.setOutput(true, 'GeoCoords');
    this.setTooltip('Returns a pair of geo coordinates');
    this.setHelpUrl('https://en.wikipedia.org/wiki/Geographic_coordinate_system')
    this.setColour(300);
  }
};
pythonGenerator.forBlock['GeoCoords'] = function(block) {
  const X_Coord = block.getFieldValue('XCoord') || '0';
  const Y_Coord = block.getFieldValue('YCoord') || '0';
  return [`(${X_Coord}, ${Y_Coord})`, pythonGenerator.ORDER_ATOMIC]
};

Blockly.Blocks['folium_map'] = {
  init: function() {
    this.appendValueInput('center')
        .setCheck('GeoCoords')
        .appendField('Create a map centered on');
    this.appendDummyInput()
        .appendField('with zoom level')
        .appendField(new Blockly.FieldNumber(3), 'zoom');
    this.appendDummyInput()
        .appendField('using map style')
        .appendField(new Blockly.FieldDropdown([
          ['OSM Open Street Map', 'OpenStreetMap'],
          ['CartoDB Positron', 'CartoDB Positron'],
          ['CartoDB Dark Matter', 'CartoDB Dark Matter']
        ]), 'DROP');
    this.setNextStatement(true, null);
    this.setInputsInline(false);
    this.setTooltip('Use this block to initialise a map. You can choose the tiles type.');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/getting_started.html');
    this.setColour(230);
  }
};
pythonGenerator.forBlock['folium_map'] = function(block, generator) {
  const value_center = generator.valueToCode(block, 'center', pythonGenerator.ORDER_ATOMIC) || '(0, 0)';
  const zoom_level = block.getFieldValue('zoom') || 12;
  const map_style = block.getFieldValue('DROP') || 'OpenStreetMap';
  return `m = folium.Map(location=${value_center}, zoom_start=${zoom_level}, tiles='${map_style}')\n`;
}

Blockly.Blocks['folium_marker'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Create marker');
    this.appendValueInput('icon')
        .setCheck('Icon')
        .appendField('Icon');
    this.appendValueInput('position')
        .appendField('Coordinates');
    this.appendDummyInput()
        .appendField('Popup')
        .appendField(new Blockly.FieldTextInput('marker'), 'popup');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(false);
    this.setTooltip('Add a marker point on map. You can define an icon for this marker.');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/reference.html#folium.map.Marker');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['folium_marker'] = function(block, generator) {
  const value_position = generator.valueToCode(block, 'position', pythonGenerator.ORDER_ATOMIC) || '(0, 0)';
  const text_popup = block.getFieldValue('popup') || '';
  const icon = generator.valueToCode(block, 'icon', pythonGenerator.ORDER_ATOMIC) || '';
  return `folium.Marker(
    location=${value_position},
    popup='${text_popup}',
    icon=${icon}
).add_to(m)\n`;
}

Blockly.Blocks['folium_icon'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Icon')
        .appendField(new Blockly.FieldTextInput('info-sign'), 'icon')
    this.appendDummyInput()
        .appendField('Marker colour')
        .appendField(new Blockly.FieldTextInput('blue'), 'color');
    this.appendDummyInput()
        .appendField('Icon colour')
        .appendField(new Blockly.FieldTextInput('white'), 'IcColor');
    this.appendDummyInput()
        .appendField('Rotate icon')
        .appendField(new Blockly.FieldNumber(0), 'angle')
        .appendField('deg');
    this.setTooltip('Define an icon. To be used with marker block. Icons are glyphicon Bootstrap3 components.');
    this.setColour(300);
    this.setOutput(true, ['Icon']);
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/reference.html#folium.map.Icon');
  }
}
pythonGenerator.forBlock['folium_icon'] = function(block) {
  const icon = block.getFieldValue('icon') || 'info-sign';
  const mCol = block.getFieldValue('color') || 'blue';
  const iCol = block.getFieldValue('IcColor') || 'white';
  const angle = block.getFieldValue('angle') || '0';
  return [`folium.Icon(icon='${icon}', color='${mCol}', icon_color='${iCol}', angle=${angle}).add_to(m)`, pythonGenerator.ORDER_ATOMIC];
}

Blockly.Blocks['folium_polygon'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Create Polygon on map');
    this.appendValueInput('position')
        .setCheck('Array')
        .appendField('Summits of polygon');
    this.appendDummyInput()
        .appendField('Popup')
        .appendField(new Blockly.FieldTextInput('Polygon'), 'popup');
    this.appendDummyInput()
        .appendField('Colour')
        .appendField(new Blockly.FieldTextInput('green'), 'color');
    this.appendDummyInput()
        .appendField('Fill colour')
        .appendField(new Blockly.FieldTextInput('green'), 'fill_color');
    this.appendDummyInput()
        .appendField('Line weight')
        .appendField(new Blockly.FieldNumber(1), 'weight');
    this.appendDummyInput()
        .appendField('Tooltip')
        .appendField(new Blockly.FieldTextInput('Tooltip text'), 'tooltip');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Draw a Polygon on a map. This can be achieved by using a list of coordinates.');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/user_guide/vector_layers/polygon.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['folium_polygon'] = function(block, generator) {
  const polygon_shown = generator.valueToCode(block, 'position', pythonGenerator.ORDER_ATOMIC);
  const text_popup = block.getFieldValue('popup') || '';
  const color = block.getFieldValue('color') || 'green';
  const fill_color = block.getFieldValue('fill_color') || 'green';
  const weight = block.getFieldValue('weight') || '1';
  const tooltip = block.getFieldValue('tooltip') || '';
  return `folium.Polygon(
    locations=${polygon_shown},
    popup='${text_popup}',
    color='${color}',
    fillColor='${fill_color}',
    weight=${weight},
    tooltip='${tooltip}'
).add_to(m)\n`;
}

Blockly.Blocks['folium_polyline'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Create PolyLine on map');
    this.appendValueInput('position')
        .setCheck('Array')
        .appendField('Points of PolyLine');
    this.appendDummyInput()
        .appendField('Popup')
        .appendField(new Blockly.FieldTextInput('PolyLine'), 'popup');
    this.appendDummyInput()
        .appendField('Colour')
        .appendField(new Blockly.FieldTextInput('green'), 'color');
    this.appendDummyInput()
        .appendField('Line weight')
        .appendField(new Blockly.FieldNumber(1), 'weight');
    this.appendDummyInput()
        .appendField('Tooltip')
        .appendField(new Blockly.FieldTextInput('Tooltip text'), 'tooltip');
    this.appendDummyInput()
        .appendField('Smooth factor')
        .appendField(new Blockly.FieldNumber(10), 'smoothness');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Draw a PolyLine on a map. This can be achieved by using a list of coordinates.');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/user_guide/vector_layers/polyline.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['folium_polyline'] = function(block, generator) {
  const polygon_shown = generator.valueToCode(block, 'position', pythonGenerator.ORDER_ATOMIC);
  const text_popup = block.getFieldValue('popup') || '';
  const color = block.getFieldValue('color') || 'green';
  const weight = block.getFieldValue('weight') || '1';
  const tooltip = block.getFieldValue('tooltip') || '';
  const smoothness = block.getFieldValue('smoothness') || '0';
  return `folium.PolyLine(
    locations=${polygon_shown},
    popup='${text_popup}',
    color='${color}',
    weight=${weight},
    tooltip='${tooltip}',
    smooth_factor=${smoothness}
).add_to(m)\n`;
}

Blockly.Blocks['folium_rectangle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Create Rectangle on map');
    this.appendValueInput('firstCoord')
        .appendField('Opposite corners')
        .setCheck('GeoCoords');
    this.appendValueInput('secondCoord')
        .setCheck('GeoCoords');
    this.appendDummyInput()
        .appendField('Line weight')
        .appendField(new Blockly.FieldNumber(1), 'weight');
    this.appendDummyInput()
        .appendField('Popup')
        .appendField(new Blockly.FieldTextInput('Rectangle'), 'popup');
    this.appendDummyInput()
        .appendField('Colour')
        .appendField(new Blockly.FieldTextInput('green'), 'color');
    this.appendDummyInput()
        .appendField('Fill colour')
        .appendField(new Blockly.FieldTextInput('green'), 'fill_color');
    this.appendDummyInput()
        .appendField('Tooltip')
        .appendField(new Blockly.FieldTextInput('Tooltip text'), 'tooltip');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Draw a Rectangle on a map. This can be achieved by setting the coordinates of two opposite corners.');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/user_guide/vector_layers/rectangle.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['folium_rectangle'] = function(block, generator) {
  const pos1 = generator.valueToCode(block, 'firstCoord', pythonGenerator.ORDER_ATOMIC);
  const pos2 = generator.valueToCode(block, 'secondCoord', pythonGenerator.ORDER_ATOMIC);
  const weight = block.getFieldValue('weight') || '1';
  const text_popup = block.getFieldValue('popup') || '';
  const color = block.getFieldValue('color') || 'green';
  const fill_color = block.getFieldValue('fill_color') || 'green';
  const tooltip = block.getFieldValue('tooltip') || '';
  return `folium.Rectangle(
    bounds=[${pos1}, ${pos2}],
    weight=${weight},
    color='${color}',
    fill_color='${fill_color}',
    popup='${text_popup}',
    tooltip='${tooltip}'
).add_to(m)\n`;
}

Blockly.Blocks['folium_circle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Create Circle on map');
    this.appendValueInput('position')
        .appendField('Centre');
    this.appendDummyInput()
        .appendField('Radius')
        .appendField(new Blockly.FieldNumber(100), 'radius')
        .appendField('m');
    this.appendDummyInput()
        .appendField('Popup')
        .appendField(new Blockly.FieldTextInput('Circle'), 'popup');
    this.appendDummyInput()
        .appendField('Colour')
        .appendField(new Blockly.FieldTextInput('green'), 'color');
    this.appendDummyInput('fill_color')
        .appendField('Fill colour')
        .appendField(new Blockly.FieldTextInput('green'), 'fill_color');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Draw a Circle on a map. This can be achieved by setting the centre coordinates and radius.');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/user_guide/vector_layers/circle_and_circle_marker.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['folium_circle'] = function(block, generator) {
  const polygon_shown = generator.valueToCode(block, 'position', pythonGenerator.ORDER_ATOMIC);
  const radius = block.getFieldValue('radius') || '0';
  const text_popup = block.getFieldValue('popup');
  const color = block.getFieldValue('color');
  const fill_color = block.getFieldValue('fill_color');
  return `folium.Circle(
    location=${polygon_shown},
    radius=${radius},
    popup='${text_popup}',
    color='${color}',
    fill_color='${fill_color}',
).add_to(m)\n`;
}

Blockly.Blocks['saveAndDisplayMap'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Show map');
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'saveMap')
        .appendField('Save map as')
        .appendField(new Blockly.FieldTextInput('map', txt => txt.replace(/[<>:?*\\"|]/g, '')), 'path')
        .appendField('.html');
    this.setPreviousStatement(true);
    this.setColour(230);
    this.setHelpUrl('https://stackoverflow.com/questions/66140534/how-to-save-a-map-section-in-python-using-folium');
    this.setTooltip('Save and display map with a given name');
  }
};
pythonGenerator.forBlock['saveAndDisplayMap'] = function(block) {
  const path = block.getFieldValue('path') || 'map';
  const saveMap = block.getFieldValue('saveMap') === 'TRUE';
  return `m.save('${path}.html')\n${saveMap ? '' : '###DISPLAYONLY###\n'}`;
};

Blockly.Blocks['JSON_on_map'] = {
  init: function() {
    this.appendValueInput('json')
        .appendField('Add json on map');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('It\'s necessary to connect a JSON file');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/getting_started.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['JSON_on_map'] = function(block, generator) {
  const value_json = generator.valueToCode(block, 'json', pythonGenerator.ORDER_ATOMIC);
  return `\nfolium.GeoJson(${value_json}).add_to(m)\n`;
}

Blockly.Blocks['Choropleth_map'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Create choropleth map');
    this.appendValueInput('geo_data')
        .appendField('with geo data');
    this.appendValueInput('data')
        .appendField('and data');
    this.appendValueInput('columns_shown')
        .appendField('of columns')
        .setCheck('List');
    this.appendDummyInput('fill_color')
        .appendField('Fill colour')
        .appendField(new Blockly.FieldTextInput('YlGn'), 'fill_color');
    this.appendDummyInput()
        .appendField('Legend')
        .appendField(new Blockly.FieldTextInput('Legend'), 'legend_name');
    this.appendDummyInput()
        .appendField('Match Df with GeoJSON')
        .appendField(new Blockly.FieldTextInput('properties.name'), 'key_on');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Create a Folium choropleth map. This is a map that uses color to represent data values in different regions.');
    this.setHelpUrl('https://python-visualization.github.io/folium/latest/user_guide/geojson/choropleth.html');
    this.setColour(270);
  }
};
pythonGenerator.forBlock['Choropleth_map'] = function(block, generator) {
  const value_data = generator.valueToCode(block, 'data', pythonGenerator.ORDER_ATOMIC);
  const geo_data = generator.valueToCode(block, 'geo_data', pythonGenerator.ORDER_ATOMIC);
  const legend_name = block.getFieldValue('legend_name') || 'Legend';
  const key_on = block.getFieldValue('key_on') || 'properties.name';
  const columns_shown = generator.valueToCode(block, 'columns_shown', pythonGenerator.ORDER_ATOMIC);
  const fill_color = block.getFieldValue('fill_color');
  return `folium.Choropleth(
    geo_data=${geo_data},
    data=${value_data},
    columns=${columns_shown},
    fill_color='${fill_color}',
    fill_opacity=0.7,
    line_opacity=0.2,
    legend_name='${legend_name}',
    key_on='feature.${key_on}'
).add_to(m)\n`;
}

// Plotly Scatter Mapbox Block

Blockly.Blocks['plotly_scatter_mapbox'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Create and Show Scatter Map");
    this.appendValueInput("DATAFRAME")
        .setCheck('Array')
        .appendField("DataFrame");
    this.appendDummyInput()
        .appendField("Latitude column")
        .appendField(this.generateOptions(), "LAT_COL");
    this.appendDummyInput()
        .appendField("Longitude column")
        .appendField(this.generateOptions(), "LON_COL");
    this.appendDummyInput()
        .appendField("Hover column")
        .appendField(this.generateOptions(), "HOVER_COL");
    this.appendDummyInput()
        .appendField("Map style")
        .appendField(new Blockly.FieldDropdown([
          ["OSM OpenStreetMap", "open-street-map"],
          ["Carto Positron", "carto-positron"],
          ["Satellite", "satellite"],
        ]), "STYLE");
    this.appendDummyInput()
        .appendField("Zoom")
        .appendField(new Blockly.FieldNumber(5, 0, 20), "ZOOM");
    this.appendDummyInput()
        .appendField("Center Lat")
        .appendField(new Blockly.FieldNumber(0), "CENTER_LAT")
        .appendField("Lon")
        .appendField(new Blockly.FieldNumber(0), "CENTER_LON");
    this.appendDummyInput()
        .appendField('Display map as')
        .appendField(new Blockly.FieldTextInput('map', txt => txt.replace(/[<>:?*\\"|]/g, '')), 'path')
        .appendField('.html');
    this.appendDummyInput()
        .appendField('Save map?')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'saveMap');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip("Creates and shows a Plotly scatter map plot.");
    this.setHelpUrl("https://plotly.com/python-api-reference/generated/plotly.express.scatter_map.html");
  },

  generateOptions: function() {
    var options = [];
    try {
      console.log(globalThis.fileColumns)
      for(var x of globalThis.fileColumns) {
        options.push([x, x]);
      }
      return (new Blockly.FieldDropdown(options));
    } catch (e) {
      return (new Blockly.FieldTextInput('Latitude'));
    }
  }
};

pythonGenerator.forBlock['plotly_scatter_mapbox'] = function(block, generator) {
  const df = generator.valueToCode(block, 'DATAFRAME', pythonGenerator.ORDER_NONE) || 'gdf';
  const lat = block.getFieldValue('LAT_COL');
  const lon = block.getFieldValue('LON_COL');
  const hover = block.getFieldValue('HOVER_COL');
  const style = block.getFieldValue('STYLE');
  const zoom = block.getFieldValue('ZOOM');
  const centerLat = block.getFieldValue('CENTER_LAT');
  const centerLon = block.getFieldValue('CENTER_LON');
  const path = block.getFieldValue('path') || 'mapbox';
  const saveMap = block.getFieldValue('saveMap') === 'TRUE';
  return `
fig = px.scatter_map(
  ${df},
  lat="${lat}",
  lon="${lon}",
  hover_name="${hover}",
  map_style="${style}",
  center={"lat": ${centerLat}, "lon": ${centerLon}},
  zoom=${zoom}
)\nfig.write_html('${path}.html')\n${saveMap ? '' : '###DISPLAYONLY###\n'}`;
};

// Interpolation blocks

Blockly.Blocks['idw_interpolation'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("IDW Interpolation");
    this.appendValueInput("DATASET")
        .setCheck('Array')
        .appendField("Dataset with missing values");
    this.appendDummyInput()
        .appendField("X axis")
        .appendField(this.generateOptions(), "X");
    this.appendDummyInput()
        .appendField("Y axis")
        .appendField(this.generateOptions(), "Y");
    this.appendDummyInput()
        .appendField("Column")
        .appendField(this.generateOptions(), "COLUMN");
    this.appendDummyInput()
        .appendField("Power of the distance")
        .appendField(new Blockly.FieldNumber(2), "POWER");
    this.appendDummyInput()
        .appendField("Number of missing values")
        .appendField(new Blockly.FieldNumber(10), "NUM_MISSING");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("Perform Inverse Distance Weighting interpolation on missing values in a dataset");
    this.setHelpUrl("https://www.geo.fu-berlin.de/en/v/soga-r/Advances-statistics/Geostatistics/Inverse-Distance-Weighting-IDW/index.html")
  },

  generateOptions: function() {
    var options = [];
    try {
      console.log(globalThis.fileColumns)
      for(var x of globalThis.fileColumns) {
        options.push([x, x]);
      }
      return (new Blockly.FieldDropdown(options));
    } catch (e) {
      return (new Blockly.FieldTextInput('Latitude'));
    }
  }
};

pythonGenerator.forBlock['idw_interpolation'] = function(block, generator) {
  const datasetVar = generator.valueToCode(block, 'DATASET', pythonGenerator.ORDER_NONE) || 'df_copy';
  const x_position = block.getFieldValue('X') || 'x';
  const y_position = block.getFieldValue('Y') || 'y';
  const column = block.getFieldValue('COLUMN') || 'pop_density';
  const power = block.getFieldValue('POWER') || 2;
  const numMissing = block.getFieldValue('NUM_MISSING') || 4;
  const code = `
df_copy = ${datasetVar}.copy()
indices_to_replace = np.random.choice(df_copy.index, size=${numMissing}, replace=False)
df_copy.loc[indices_to_replace, '${column}'] = np.nan
df_interp = df_copy
known = df_interp[df_interp['${column}'].notna()]
unknown = df_interp[df_interp['${column}'].isna()]
xi = known['${x_position}'].values
yi = known['${y_position}'].values
zi = known['${column}'].values
xi_interp = unknown['${x_position}'].values
yi_interp = unknown['${y_position}'].values
zi_interp = idw_interpolation(xi, yi, zi, xi_interp, yi_interp, ${power})
df_interp.loc[df_interp['${column}'].isna(), '${column}'] = zi_interp

fig, ax = plt.subplots(1, 2, figsize=(10, 5))
${datasetVar}.plot(kind = "scatter", x="${x_position}", y="${y_position}", c="${column}", ax=ax[0], cmap='pink', colorbar=True, legend=True)
df_interp.plot(kind = "scatter", x="${x_position}", y="${y_position}", c="${column}", ax=ax[1], cmap='pink', colorbar=True, legend=True)
ax[0].set_title("Original", fontsize=12, pad=12)
ax[1].set_title("Interpolated", fontsize=12, pad=12)
for a in ax:
    a.axis('off')
`;
  return code;
};

//Neighbour interpolation
Blockly.Blocks['ppv_interpolation'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("NN Interpolation");
    this.appendValueInput("DATASET")
        .setCheck('Array')
        .appendField("Dataset with missing values");
    this.appendDummyInput()
        .appendField("X axis")
        .appendField(this.generateOptions(), "X");
    this.appendDummyInput()
        .appendField("Y axis")
        .appendField(this.generateOptions(), "Y");
    this.appendDummyInput()
        .appendField("Column")
        .appendField(this.generateOptions(), "COLUMN");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("Perform Nearest-Neighbor interpolation on missing values in a dataset");
    this.setHelpUrl("https://en.wikipedia.org/wiki/Nearest-neighbor_interpolation");
  },

  generateOptions: function() {
    var options = [];
    try {
      console.log(globalThis.fileColumns)
      for(var x of globalThis.fileColumns) {
        options.push([x, x]);
      }
      return (new Blockly.FieldDropdown(options));
    } catch (e) {
      return (new Blockly.FieldTextInput('Latitude'));
    }
  }
};

pythonGenerator.forBlock['ppv_interpolation'] = function(block, generator) {
  const datasetVar = generator.valueToCode(block, 'DATASET', pythonGenerator.ORDER_NONE) || 'df_copy';
  const x_position = block.getFieldValue('X') || 'x';
  const y_position = block.getFieldValue('Y') || 'y';
  const column = block.getFieldValue('COLUMN') || 'pop_density';

  const code = `
df_interp= ${datasetVar}.copy()
known = df_interp[df_interp['${column}'].notna()]
unknown = df_interp[df_interp['${column}'].isna()]
xi = known['${x_position}'].values
yi = known['${y_position}'].values
zi = known['${column}'].values
xi_interp = unknown['${x_position}'].values
yi_interp = unknown['${y_position}'].values
zi_interp = interp_ppv(xi, yi, zi, xi_interp, yi_interp)
df_interp.loc[df_interp['${column}'].isna(), '${column}'] = zi_interp

fig, ax = plt.subplots(1, 2, figsize=(10, 5))
${datasetVar}.plot(kind = "scatter", x="${x_position}", y="${y_position}", c="${column}", ax=ax[0], cmap='pink', colorbar=True, legend=True)
df_interp.plot(kind = "scatter", x="${x_position}", y="${y_position}", c="${column}", ax=ax[1], cmap='pink', colorbar=True, legend=True)
ax[0].set_title("Original", fontsize=12, pad=12)
ax[1].set_title("Interpolated", fontsize=12, pad=12)
for a in ax:
    a.axis('off')
`;
  return code;
};

//**BASIC FUNCTIONS */
/** Lambda func block */
Blockly.Blocks['lambda'] = {
  init: function() {
    this.appendValueInput('EXPR')
        .appendField('lambda')
        .appendField(new Blockly.FieldTextInput('x', (txt) => txt.match(/^[A-Za-z_][A-Za-z0-9_]*$/) ? txt : 'ERROR!'), 'LAMBDA')
        .appendField(':');
    this.setTooltip('Python lambda function. You can use multiple arguments by separating them with a comma.');
    this.setColour(120);
    this.setHelpUrl('https://www.w3schools.com/python/python_lambda.asp');
    this.setOutput(true);
  }
}

pythonGenerator.forBlock['lambda'] = function(block, generator) {
  const VAR = block.getFieldValue('LAMBDA') || '0';
  const EXPR = generator.valueToCode(block, 'EXPR', pythonGenerator.ORDER_NONE)
  return [`lambda ${VAR}: ${EXPR}`, pythonGenerator.ORDER_LAMBDA];
}

/**
 * Length of str (returns int)
 */
Blockly.Blocks["length_of_str"] = {
  init: function(){
    this.appendValueInput('STR')
    .appendField('length of')
    .setCheck('String');
    this.appendDummyInput();
    this.appendEndRowInput();
    this.setOutput(true, 'Number');
    this.setColour(90);
    this.setTooltip('Returns the length of a given string.');
    this.setHelpUrl('https://www.w3schools.com/python/ref_func_len.asp')
  },
};
pythonGenerator.forBlock["length_of_str"] = function(block, generator) {
  const length = generator.valueToCode(block, 'STR', pythonGenerator.ORDER_NONE) || '0';
  return [`len(${length})`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['list_access'] = {
  init: function() {
    this.appendDummyInput('NAME')
        .appendField(new Blockly.FieldVariable("VAR_NAME"), "LIST")
        .appendField('[');
    this.appendValueInput('CNAME');
    this.appendEndRowInput()
        .appendField(']');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Access an element in a given list');
    this.setColour(200);
  }
};
pythonGenerator.forBlock['list_access'] = function(block, generator) {
  const varName = block.getFieldValue('LIST') || '0';
  const getVar = block.workspace.getVariableById(varName);
  const listName = getVar ? getVar.name : 'undefined';
  const elem = generator.valueToCode(block, 'CNAME', pythonGenerator.ORDER_ATOMIC);
  return [`${listName}[${elem}]`, pythonGenerator.ORDER_ATOMIC]
};

/**
 * Block for creating a list
 */

Blockly.Blocks['list_create'] = {
  init: function() {
    this.itemCount_ = 1;
    this.appendValueInput('element_0')
        .appendField('create list');
    this.setInputsInline(false);
    const appendFieldPlusIcon = new Blockly.FieldImage(
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-plus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 5l0 14' /%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E",
      16,
      16,
      'Add',
      function (block) {
        block.sourceBlock_.appendArrayElementInput()
      }
    )
    this.appendDummyInput('close').appendField(appendFieldPlusIcon);
    this.setColour(230);
    this.setOutput(true, 'List');
    this.setTooltip('Create a Python list');
  },

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    }
  },

  loadExtraState: function(state) {
    this.itemCount_ = state['itemCount']
    this.updateShape()
  },

  appendArrayElementInput: function() {
    Blockly.Events.setGroup(true)
    const oldExtraState = getExtraBlockState(this)
    this.itemCount_ += 1
    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
    this.updateShape()
  },

  deleteArrayElementInput: function(inputToDelete) {
    const oldExtraState = getExtraBlockState(this)
    Blockly.Events.setGroup(true)
    var inputNameToDelete = inputToDelete.name
    var inputIndexToDelete = Number(inputNameToDelete.match(/\d+/)[0])
    var substructure = this.getInputTargetBlock(inputNameToDelete)
    if (substructure) substructure.dispose(true, true)
    this.removeInput(inputNameToDelete)
    this.itemCount_ -= 1
    for (var i = inputIndexToDelete + 1; i <= this.itemCount_; i++) {
      var input = this.getInput('element_' + i)
      input.name = 'element_' + (i - 1)
    }

    const newExtraState = getExtraBlockState(this)
    Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldExtraState, newExtraState))
    Blockly.Events.setGroup(false)
  },

  updateShape: function() {
    for (let i = 1; i < this.itemCount_; i++) {
      if (!this.getInput('element_' + i)) {
        const appended_input = this.appendValueInput('element_' + i)

        var deleteArrayElementIcon = new Blockly.FieldImage(
          `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-minus' width='60' height='60' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23ffffff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M5 12l14 0' /%3E%3C/svg%3E`,
          16,
          16,
          'Remove',
          function (block) {
            block.sourceBlock_.deleteArrayElementInput(appended_input)
          }
        )
        appended_input.appendField(deleteArrayElementIcon, 'delete_' + i)

        this.moveInputBefore('element_' + i, 'close')
      }
    }
  },
}
pythonGenerator.forBlock['list_create'] = function(block, generator) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    elements.push(generator.valueToCode(block, 'element_' + i, pythonGenerator.ORDER_NONE) || 'None');
  }
  return [`[${elements.join(', ')}]`, pythonGenerator.ORDER_ATOMIC];
};
function getExtraBlockState(block) {
  if (block.saveExtraState) {
    const state = block.saveExtraState()
    return state ? JSON.stringify(state) : ''
  } else if (block.mutationToDom) {
    const state = block.mutationToDom()
    return state ? Blockly.Xml.domToText(state) : ''
  }
  return ''
}


Blockly.Blocks['type'] = {
  init: function() {
    this.appendValueInput('TYPE')
        .appendField('check type of');
    this.setTooltip('Find the type of another block');
    this.setOutput(true, 'Type');
    this.setHelpUrl('https://www.w3schools.com/python/ref_func_type.asp')
    this.setColour(320);
  }
}
pythonGenerator.forBlock['type'] = function(block, generator) {
  const type = generator.valueToCode(block, 'TYPE', pythonGenerator.ORDER_ATOMIC);
  return [`type(${type})`, pythonGenerator.ORDER_ATOMIC];
}

//**OTHER BLOCKS */

Blockly.Blocks['while_loop'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("while");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Repeat while the condition is true");
    this.setHelpUrl("https://www.w3schools.com/python/python_while_loops.asp");
  }
};
pythonGenerator.forBlock['while_loop'] = function(block, generator) {
  const condition = generator.valueToCode(block, 'CONDITION', pythonGenerator.ORDER_NONE) || 'False';
  const statements = generator.statementToCode(block, 'DO');
  return `while ${condition}:\n${statements}`;
};

/**
 * Statement Input Block (loop)
 */
Blockly.Blocks["repeat_times"] = {
  init: function () {
    this.appendValueInput("TIMES")
        .setCheck("Number")
        .appendField("repeat");
    this.appendStatementInput("DO")
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Repeat N times");
    this.setHelpUrl('https://www.w3schools.com/python/ref_func_range.asp');
  },
};
pythonGenerator.forBlock["repeat_times"] = function (block, generator) {
  const times =
    generator.valueToCode(block, "TIMES", pythonGenerator.ORDER_NONE) || "0";
  const branch = generator.statementToCode(block, "DO");
  return `for i in range(${times}):\n${branch}`;
};

/**
 * Operators block
 */
Blockly.Blocks['operators'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck(['Boolean', 'Number']);
    this.appendValueInput('VALUE2')
        .setCheck(['Boolean', 'Number'])
        .appendField(new Blockly.FieldDropdown([
          ['XOR', 'XOR'],
          ['AND', 'AND'],
          ['OR', 'OR'],
          ['NOT', 'NOT']
        ]), 'NAME');
    this.setInputsInline(true)
    this.setOutput(true, 'Boolean');
    this.setTooltip('All the basic logical operators');
    this.setHelpUrl('https://www.w3schools.com/python/gloss_python_logical_operators.asp')
    this.setColour(0);
  }
};
pythonGenerator.forBlock['operators'] = function(block, generator) {
  
  const dropdown_name = block.getFieldValue('NAME');
  const valu = generator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC);
  const valu2 = generator.valueToCode(block, 'VALUE2', pythonGenerator.ORDER_ATOMIC);

  switch (dropdown_name) {
    case 'AND':
      return [`(${valu} & ${valu2})`, pythonGenerator.ORDER_LOGICAL_AND];
    case 'OR':
      return [`(${valu} | ${valu2})`, pythonGenerator.ORDER_LOGICAL_OR];
    case 'XOR':
      return [`(${valu} ^ ${valu2})`, pythonGenerator.ORDER_BITWISE_XOR];
    case 'NOT':
      return [`(not ${valu2})`, pythonGenerator.ORDER_LOGICAL_NOT];
  }
}

/**
 * Temporary variables
 * 
 * As these could represent a dangerous security
 * threat when compiling, they are limited to
 * one character so as to protect the compiler
 * from malware.
 */
Blockly.Blocks['temp_var'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('VAR_NAME', (txt) => txt.slice(0, 1)), 'var');
    this.setOutput(true);
    this.setTooltip('Use for temporary variables, oftenly one time.');
    this.setColour(315);
  }
};
pythonGenerator.forBlock['temp_var'] = function(block) {
  const varName = block.getFieldValue('var') || '0';
  return [varName, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['var_to_func'] = {
  init: function() {
    this.appendValueInput('var')
        .appendField('Use variable');
    this.appendDummyInput()
        .appendField('with argument(s)')
        .appendField(new Blockly.FieldTextInput(''), 'val');
    this.setInputsInline(true);
    this.setColour(230);
    this.setOutput(true);
    this.setTooltip('Use a variable as a function. This can be used with lambda functions.');
  }
};
pythonGenerator.forBlock['var_to_func'] = function(block, generator) {
  const variable = generator.valueToCode(block, 'var', pythonGenerator.ORDER_ATOMIC);
  const value = block.getFieldValue('val')
  return [`${variable}(${value})`, pythonGenerator.ORDER_ATOMIC];
};

/**
 * Line-break
 */

Blockly.Blocks['line_break'] = {
  init: function() {
    this.appendDummyInput('')
        .appendField('Line-break');
    this.setTooltip('Enter a line-break in code');
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setTooltip('Jump a line in the code')
    this.setColour('#888');
  }
};
pythonGenerator.forBlock['line_break'] = function() {
  return '\n'
}

Blockly.Blocks['arange'] = {
  init: function(){
    this.appendValueInput('start')
        .appendField('Generate values between');
    this.appendValueInput('stop')
        .appendField('and')
    this.appendValueInput('step')
        .appendField('with step');
    this.setTooltip('Generate a range of values between two numbers. Precise the step.');
    this.setInputsInline(false);
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.arange.html');
    this.setOutput(true, 'Array');
    this.setColour(100);
  },
};
pythonGenerator.forBlock['arange'] = function(block, generator) {
  const start = generator.valueToCode(block, 'start', pythonGenerator.ORDER_ATOMIC);
  const stop = generator.valueToCode(block, 'stop', pythonGenerator.ORDER_ATOMIC);
  const step = generator.valueToCode(block, 'step', pythonGenerator.ORDER_ATOMIC);
  return [`np.arange(${start}, ${stop}, ${step})`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['linspace'] = {
  init: function(){
    this.appendValueInput('number')
        .appendField('Generate');
    this.appendValueInput('start')
        .appendField('values between');
    this.appendValueInput('stop')
        .appendField('and');
    this.setTooltip('Generate a number of regular values between two numbers.');
    this.setInputsInline(false);
    this.setHelpUrl('https://numpy.org/doc/stable/reference/generated/numpy.linspace.html');
    this.setOutput(true, 'Array');
    this.setColour(100);
  },
};
pythonGenerator.forBlock['linspace'] = function(block, generator) {
  const start = generator.valueToCode(block, 'start', pythonGenerator.ORDER_ATOMIC);
  const stop = generator.valueToCode(block, 'stop', pythonGenerator.ORDER_ATOMIC);
  const number = generator.valueToCode(block, 'number', pythonGenerator.ORDER_ATOMIC);
  return [`np.linspace(${start}, ${stop}, num=${number})`, pythonGenerator.ORDER_ATOMIC];
};