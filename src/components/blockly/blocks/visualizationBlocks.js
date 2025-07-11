import * as Blockly from "blockly";
import { FieldColour } from '@blockly/field-colour';
Blockly.fieldRegistry.register('field_colour', FieldColour);
Blockly.defineBlocksWithJsonArray([
    // BEGINNER BLOCKS
    {
        "type": "create_chart_beginner",
        "message0": "Create %1 %2 data %3 %4 color %5",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "CHART_TYPE",
                "options": [
                    ["Scatter Plot", "scatter"],
                    ["Bar Chart", "bar"],
                    ["Histogram", "histogram"],
                    ["Box Plot", "boxplot"],
                    ["Line Chart", "line"]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "DATA",
                "check": ["Variable", "Data", "Array"]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_colour",
                "name": "COLOR",
                "colour": "#4285F4"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#90A4AE",
        "tooltip": "Create a simple chart",
        "helpUrl": "",
        "extensions": ["chart_type_mutator_beginner"]
    },
    {
        "type": "create_xy_chart_beginner",
        "message0": "Create %1 %2 x data %3 %4 y data %5 %6 color %7",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "CHART_TYPE",
                "options": [
                    ["Scatter Plot", "scatter"],
                    ["Line Chart", "line"]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "X_DATA",
                "check": ["Variable", "Data", "Array"]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "Y_DATA",
                "check": ["Variable", "Data", "Array"]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_colour",
                "name": "COLOR",
                "colour": "#4285F4"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#90A4AE",
        "tooltip": "Create a chart with X and Y data",
        "helpUrl": ""
    },
    {
        "type": "add_to_chart_beginner",
        "message0": "Add %1 to existing chart %2 data %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "ADD_TYPE",
                "options": [
                    ["Points", "points"],
                    ["Line", "lines"]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "DATA",
                "check": ["Variable", "Data", "Array"]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#90A4AE",
        "tooltip": "Add data to existing chart",
        "helpUrl": "",
        "extensions": ["add_type_mutator_beginner"]
    },
    {
        "type": "chart_layout_beginner",
        "message0": "Show %1 charts in grid",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LAYOUT",
                "options": [
                    ["2", "1,2"],
                    ["4", "2,2"],
                    ["2 vertical", "2,1"],
                    ["3", "1,3"],
                    ["6", "2,3"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#90A4AE",
        "tooltip": "Arrange multiple charts in a grid",
        "helpUrl": ""
    },
    // ADVANCED BLOCKS
    {
        "type": "plot_advanced",
        "message0": "Plot %1 %2 settings %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PLOT_TYPE",
                "options": [
                    ["Scatter Plot", "scatter"],
                    ["Line Plot", "line"],
                    ["Bar Plot", "bar"],
                    ["Histogram", "histogram"],
                    ["Box Plot", "boxplot"],
                    ["Pie Chart", "pie"],
                    ["Density Plot", "density"],
                    ["Heatmap", "heatmap"],
                    ["Spatial Heatmap", "spatial_heatmap"]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "SETTINGS",
                "check": ["PlotSetting"]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#607D8B",
        "tooltip": "Create an advanced plot with custom settings",
        "helpUrl": "",
        "extensions": ["plot_type_mutator_advanced"]
    },
    {
        "type": "plot_data_setting",
        "message0": "data %1",
        "args0": [
            {
                "type": "input_value",
                "name": "DATA",
                "check": ["Variable", "Data", "Array"]
            }
        ],
        "previousStatement": "PlotSetting",
        "nextStatement": "PlotSetting",
        "colour": "#546E7A",
        "tooltip": "Set data for plot"
    },
    {
        "type": "plot_xy_setting",
        "message0": "x %1 y %2",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": ["Variable", "Data", "Array", "String"]
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": ["Variable", "Data", "Array", "String"]
            }
        ],
        "previousStatement": "PlotSetting",
        "nextStatement": "PlotSetting",
        "colour": "#546E7A",
        "tooltip": "Set X and Y data"
    },
    {
        "type": "plot_appearance_setting",
        "message0": "appearance %1 %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "OPTIONS",
                "check": "AppearanceOption"
            }
        ],
        "previousStatement": "PlotSetting",
        "nextStatement": "PlotSetting",
        "colour": "#546E7A",
        "tooltip": "Set appearance options"
    },
    {
        "type": "color_option",
        "message0": "color %1",
        "args0": [
            {
                "type": "input_value",
                "name": "COLOR",
                "check": ["String", "Colour"]
            }
        ],
        "previousStatement": "AppearanceOption",
        "nextStatement": "AppearanceOption",
        "colour": "#455A64",
        "tooltip": "Set color"
    },
    {
        "type": "symbol_option",
        "message0": "symbol %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "SYMBOL",
                "options": [
                    ["circle", "1"],
                    ["triangle", "2"],
                    ["plus", "3"],
                    ["cross", "4"],
                    ["diamond", "5"],
                    ["square", "0"]
                ]
            }
        ],
        "previousStatement": "AppearanceOption",
        "nextStatement": "AppearanceOption",
        "colour": "#455A64",
        "tooltip": "Set point symbol"
    },
    {
        "type": "line_type_option",
        "message0": "line type %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LINE_TYPE",
                "options": [
                    ["solid", "1"],
                    ["dashed", "2"],
                    ["dotted", "3"],
                    ["dot-dash", "4"]
                ]
            }
        ],
        "previousStatement": "AppearanceOption",
        "nextStatement": "AppearanceOption",
        "colour": "#455A64",
        "tooltip": "Set line type"
    },
    {
        "type": "size_option",
        "message0": "size %1",
        "args0": [
            {
                "type": "field_number",
                "name": "SIZE",
                "value": 1,
                "min": 0.1,
                "max": 5,
                "precision": 0.1
            }
        ],
        "previousStatement": "AppearanceOption",
        "nextStatement": "AppearanceOption",
        "colour": "#455A64",
        "tooltip": "Set size"
    },
    {
        "type": "plot_labels_setting",
        "message0": "labels %1 %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "LABELS",
                "check": "LabelOption"
            }
        ],
        "previousStatement": "PlotSetting",
        "nextStatement": "PlotSetting",
        "colour": "#546E7A",
        "tooltip": "Set plot labels"
    },
    {
        "type": "title_label",
        "message0": "title %1",
        "args0": [
            {
                "type": "input_value",
                "name": "TITLE",
                "check": "String"
            }
        ],
        "previousStatement": "LabelOption",
        "nextStatement": "LabelOption",
        "colour": "#455A64",
        "tooltip": "Set plot title"
    },
    {
        "type": "axis_label",
        "message0": "%1 axis label %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "AXIS",
                "options": [
                    ["x", "x"],
                    ["y", "y"]
                ]
            },
            {
                "type": "input_value",
                "name": "LABEL",
                "check": "String"
            }
        ],
        "previousStatement": "LabelOption",
        "nextStatement": "LabelOption",
        "colour": "#455A64",
        "tooltip": "Set axis label"
    },
    {
        "type": "plot_limits_setting",
        "message0": "axis limits %1 %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "LIMITS",
                "check": "LimitOption"
            }
        ],
        "previousStatement": "PlotSetting",
        "nextStatement": "PlotSetting",
        "colour": "#546E7A",
        "tooltip": "Set axis limits"
    },
    {
        "type": "axis_limit",
        "message0": "%1 axis from %2 to %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "AXIS",
                "options": [
                    ["x", "x"],
                    ["y", "y"]
                ]
            },
            {
                "type": "input_value",
                "name": "MIN",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "MAX",
                "check": "Number"
            }
        ],
        "previousStatement": "LimitOption",
        "nextStatement": "LimitOption",
        "colour": "#455A64",
        "tooltip": "Set axis limits"
    },
    {
        "type": "plot_legend_setting",
        "message0": "legend %1 position %2",
        "args0": [
            {
                "type": "field_checkbox",
                "name": "SHOW",
                "checked": true
            },
            {
                "type": "field_dropdown",
                "name": "POSITION",
                "options": [
                    ["top right", "topright"],
                    ["top left", "topleft"],
                    ["bottom right", "bottomright"],
                    ["bottom left", "bottomleft"],
                    ["center", "center"]
                ]
            }
        ],
        "previousStatement": "PlotSetting",
        "nextStatement": "PlotSetting",
        "colour": "#546E7A",
        "tooltip": "Configure legend"
    },
    {
        "type": "add_layer_advanced",
        "message0": "Add layer %1 %2 settings %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LAYER_TYPE",
                "options": [
                    ["Points", "points"],
                    ["Lines", "lines"],
                    ["Smooth line", "smooth"],
                    ["Regression line", "abline"],
                    ["Text", "text"]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "SETTINGS",
                "check": ["PlotSetting"]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#607D8B",
        "tooltip": "Add a layer to existing plot",
        "helpUrl": ""
    },
    {
        "type": "layout_advanced",
        "message0": "Layout %1 rows %2 columns %3 %4 margins %5",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "ROWS",
                "value": 1,
                "min": 1,
                "max": 5,
                "precision": 1
            },
            {
                "type": "field_number",
                "name": "COLS",
                "value": 2,
                "min": 1,
                "max": 5,
                "precision": 1
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_checkbox",
                "name": "ADJUST_MARGINS",
                "checked": false
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#607D8B",
        "tooltip": "Set advanced layout for multiple plots",
        "helpUrl": ""
    },
    {
        "type": "plot_spatial_data_setting",
        "message0": "spatial data %1",
        "args0": [
            {
                "type": "input_value",
                "name": "SPATIAL_DATA",
                "check": ["KrigingModel", "IDWModel", "Variable"]
            }
        ],
        "previousStatement": "PlotSetting",
        "nextStatement": "PlotSetting",
        "colour": "#546E7A",
        "tooltip": "Set spatial interpolation data (Kriging or IDW result)"
    },
    {
        "type": "color_palette_option",
        "message0": "color palette %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PALETTE",
                "options": [
                    ["blue-white-red (temperature)", "temp"],
                    ["terrain colors", "terrain"],
                    ["heat colors", "heat"],
                    ["rainbow", "rainbow"],
                    ["grayscale", "gray"],
                    ["blue gradient", "blues"],
                    ["green gradient", "greens"]
                ]
            }
        ],
        "previousStatement": "AppearanceOption",
        "nextStatement": "AppearanceOption",
        "colour": "#455A64",
        "tooltip": "Set color palette for heatmap"
    },
    {
        "type": "show_points_option",
        "message0": "show original points %1 with data %2",
        "args0": [
            {
                "type": "field_checkbox",
                "name": "SHOW",
                "checked": true
            },
            {
                "type": "input_value",
                "name": "POINT_DATA",
                "check": ["DataFrame", "Variable"]
            }
        ],
        "previousStatement": "AppearanceOption",
        "nextStatement": "AppearanceOption",
        "colour": "#455A64",
        "tooltip": "Show original measurement points on the heatmap"
    }
]);

Blockly.Extensions.register('chart_type_mutator_beginner', function() {
    this.getInput('DATA').setCheck(['Variable', 'Data', 'Array']);
});

Blockly.Extensions.register('add_type_mutator_beginner', function() {
    const updateShape = function() {
        const addType = this.getFieldValue('ADD_TYPE');
        if (addType === 'lines') {
            this.getInput('DATA').setCheck(['Variable', 'Data', 'Array']);
        } else {
            this.getInput('DATA').setCheck(['Variable', 'Data', 'Array']);
        }
    };
    this.setOnChange(updateShape.bind(this));
});

Blockly.Extensions.register('plot_type_mutator_advanced', function() {
    const updateShape = function() {
        const plotType = this.getFieldValue('PLOT_TYPE');
    };
    this.setOnChange(updateShape.bind(this));
});

// GENERATORS - BEGINNER
Blockly.Generator.R.forBlock['create_chart_beginner'] = function(block, generator) {
    const chartType = block.getFieldValue('CHART_TYPE');
    const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
    const color = block.getFieldValue('COLOR');

    let code = '';

    switch(chartType) {
        case 'scatter':
            code = `plot(${data}, col = "${color}", pch = 19)\n`;
            break;
        case 'bar':
            code = `barplot(${data}, col = "${color}")\n`;
            break;
        case 'histogram':
            code = `hist(${data}, col = "${color}", main = "Histogram")\n`;
            break;
        case 'boxplot':
            code = `boxplot(${data}, col = "${color}")\n`;
            break;
        case 'line':
            code = `plot(${data}, type = "l", col = "${color}")\n`;
            break;
    }

    return code;
};

Blockly.Generator.R.forBlock['create_xy_chart_beginner'] = function(block, generator) {
    const chartType = block.getFieldValue('CHART_TYPE');
    const xData = generator.valueToCode(block, 'X_DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
    const yData = generator.valueToCode(block, 'Y_DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';
    const color = block.getFieldValue('COLOR');

    let code = '';

    switch(chartType) {
        case 'scatter':
            code = `plot(${xData}, ${yData}, col = "${color}", pch = 19)\n`;
            break;
        case 'line':
            code = `plot(${xData}, ${yData}, type = "l", col = "${color}")\n`;
            break;
    }

    return code;
};

Blockly.Generator.R.forBlock['add_to_chart_beginner'] = function(block, generator) {
    const addType = block.getFieldValue('ADD_TYPE');
    const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'NULL';

    let code = '';

    switch(addType) {
        case 'points':
            code = `points(${data}, pch = 19)\n`;
            break;
        case 'lines':
            code = `lines(${data})\n`;
            break;
    }

    return code;
};

Blockly.Generator.R.forBlock['chart_layout_beginner'] = function(block, generator) {
    const layout = block.getFieldValue('LAYOUT');
    const code = `par(mfrow = c(${layout}))\n`;
    return code;
};

// GENERATORS - ADVANCED
Blockly.Generator.R.forBlock['plot_advanced'] = function(block, generator) {
    const plotType = block.getFieldValue('PLOT_TYPE');

    let data = null;
    let xData = null;
    let yData = null;
    let title = null;
    let xlab = null;
    let ylab = null;
    let xlim = null;
    let ylim = null;
    let color = '"black"';
    let pch = '1';
    let lty = '1';
    let cex = '1';
    let showLegend = false;
    let legendPos = 'topright';
    let spatialData = null;
    let palette = 'temp';
    let showPoints = false;
    let pointData = null;

    let settingBlock = block.getInputTargetBlock('SETTINGS');
    while (settingBlock) {
        const settingType = settingBlock.type;

        switch(settingType) {
            case 'plot_data_setting':
                data = generator.valueToCode(settingBlock, 'DATA', Blockly.Generator.R.ORDER_ATOMIC);
                break;
            case 'plot_xy_setting':
                xData = generator.valueToCode(settingBlock, 'X', Blockly.Generator.R.ORDER_ATOMIC);
                yData = generator.valueToCode(settingBlock, 'Y', Blockly.Generator.R.ORDER_ATOMIC);
                break;
            case 'plot_appearance_setting':
                let optionBlock = settingBlock.getInputTargetBlock('OPTIONS');
                while (optionBlock) {
                    switch(optionBlock.type) {
                        case 'color_option':
                            color = generator.valueToCode(optionBlock, 'COLOR', Blockly.Generator.R.ORDER_ATOMIC) || '"black"';
                            break;
                        case 'symbol_option':
                            pch = optionBlock.getFieldValue('SYMBOL');
                            break;
                        case 'line_type_option':
                            lty = optionBlock.getFieldValue('LINE_TYPE');
                            break;
                        case 'size_option':
                            cex = optionBlock.getFieldValue('SIZE');
                            break;
                        case 'color_palette_option':
                            palette = optionBlock.getFieldValue('PALETTE');
                            break;
                        case 'show_points_option':
                            showPoints = optionBlock.getFieldValue('SHOW');
                            pointData = generator.valueToCode(optionBlock, 'POINT_DATA', Blockly.Generator.R.ORDER_ATOMIC);
                            break;
                    }
                    optionBlock = optionBlock.getNextBlock();
                }
                break;
            case 'plot_labels_setting':
                let labelBlock = settingBlock.getInputTargetBlock('LABELS');
                while (labelBlock) {
                    switch(labelBlock.type) {
                        case 'title_label':
                            title = generator.valueToCode(labelBlock, 'TITLE', Blockly.Generator.R.ORDER_ATOMIC);
                            break;
                        case 'axis_label':
                            const axis = labelBlock.getFieldValue('AXIS');
                            const label = generator.valueToCode(labelBlock, 'LABEL', Blockly.Generator.R.ORDER_ATOMIC);
                            if (axis === 'x') xlab = label;
                            else ylab = label;
                            break;
                    }
                    labelBlock = labelBlock.getNextBlock();
                }
                break;
            case 'plot_limits_setting':
                let limitBlock = settingBlock.getInputTargetBlock('LIMITS');
                while (limitBlock) {
                    if (limitBlock.type === 'axis_limit') {
                        const axis = limitBlock.getFieldValue('AXIS');
                        const min = generator.valueToCode(limitBlock, 'MIN', Blockly.Generator.R.ORDER_ATOMIC);
                        const max = generator.valueToCode(limitBlock, 'MAX', Blockly.Generator.R.ORDER_ATOMIC);
                        if (axis === 'x') xlim = `c(${min}, ${max})`;
                        else ylim = `c(${min}, ${max})`;
                    }
                    limitBlock = limitBlock.getNextBlock();
                }
                break;
            case 'plot_legend_setting':
                showLegend = settingBlock.getFieldValue('SHOW');
                legendPos = settingBlock.getFieldValue('POSITION');
                break;
            case 'plot_spatial_data_setting':
                spatialData = generator.valueToCode(settingBlock, 'SPATIAL_DATA', Blockly.Generator.R.ORDER_ATOMIC);
                break;
        }
        settingBlock = settingBlock.getNextBlock();
    }

    let code = '';
    let args = [];

    if (plotType === 'spatial_heatmap') {
        if (!spatialData) return 'print("Error: No spatial data provided")\n';

        let colorCode;
        switch(palette) {
            case 'temp':
                colorCode = 'colorRampPalette(c("blue", "white", "red"))';
                break;
            case 'terrain':
                colorCode = 'terrain.colors';
                break;
            case 'heat':
                colorCode = 'heat.colors';
                break;
            case 'rainbow':
                colorCode = 'rainbow';
                break;
            case 'gray':
                colorCode = 'gray.colors';
                break;
            case 'blues':
                colorCode = 'colorRampPalette(c("white", "lightblue", "darkblue"))';
                break;
            case 'greens':
                colorCode = 'colorRampPalette(c("white", "lightgreen", "darkgreen"))';
                break;
        }

        let code = `
{
  kriging_data <- ${spatialData}
  x_coords <- unique(coordinates(kriging_data)[,1])
  y_coords <- unique(coordinates(kriging_data)[,2])
  grid_dims <- kriging_data@grid@cells.dim
  z_matrix <- matrix(kriging_data$var1.pred, nrow = grid_dims[1], ncol = grid_dims[2])

  filled.contour(x_coords, y_coords, z_matrix,
                 color.palette = ${colorCode},`;

        if (title) code += `\n                 main = ${title},`;
        if (xlab) code += `\n                 xlab = ${xlab},`;
        if (ylab) code += `\n                 ylab = ${ylab},`;

        code += `
                 plot.axes = {
                   axis(1)
                   axis(2)`;

        if (showPoints && pointData) {
            code += `\n                   points(${pointData}$lng, ${pointData}$lat, pch = 21, bg = "black", cex = 1.2)`;
        }

        code += `
                 })
}\n`;

        return code;
    }

    switch(plotType) {
        case 'scatter':
            if (xData && yData) {
                args.push(xData, yData);
            } else if (data) {
                args.push(data);
            }
            args.push(`col = ${color}`, `pch = ${pch}`, `cex = ${cex}`);
            break;
        case 'line':
            if (xData && yData) {
                args.push(xData, yData);
            } else if (data) {
                args.push(data);
            }
            args.push('type = "l"', `col = ${color}`, `lty = ${lty}`);
            break;
        case 'bar':
            if (data) args.push(data);
            args.push(`col = ${color}`);
            code = `barplot(${args.join(', ')}`;
            break;
        case 'histogram':
            if (data) args.push(data);
            args.push(`col = ${color}`);
            code = `hist(${args.join(', ')}`;
            break;
        case 'boxplot':
            if (data) args.push(data);
            args.push(`col = ${color}`);
            code = `boxplot(${args.join(', ')}`;
            break;
        case 'pie':
            if (data) args.push(data);
            args.push(`col = rainbow(length(${data}))`);
            code = `pie(${args.join(', ')}`;
            break;
        case 'density':
            code = `plot(density(${data}), col = ${color}`;
            break;
        case 'heatmap':
            code = `heatmap(as.matrix(${data})`;
            break;
    }

    if (plotType === 'scatter' || plotType === 'line') {
        code = `plot(${args.join(', ')}`;
    }

    if (title) code += `, main = ${title}`;
    if (xlab) code += `, xlab = ${xlab}`;
    if (ylab) code += `, ylab = ${ylab}`;
    if (xlim) code += `, xlim = ${xlim}`;
    if (ylim) code += `, ylim = ${ylim}`;

    code += ')\n';

    if (showLegend && (plotType === 'scatter' || plotType === 'line')) {
        code += `legend("${legendPos}", legend = c("Data"), col = ${color}, pch = ${pch})\n`;
    }

    return code;
};

Blockly.Generator.R.forBlock['add_layer_advanced'] = function(block, generator) {
    const layerType = block.getFieldValue('LAYER_TYPE');

    let data = null;
    let xData = null;
    let yData = null;
    let color = '"black"';
    let pch = '1';
    let lty = '1';
    let cex = '1';

    let settingBlock = block.getInputTargetBlock('SETTINGS');
    while (settingBlock) {
        const settingType = settingBlock.type;

        switch(settingType) {
            case 'plot_data_setting':
                data = generator.valueToCode(settingBlock, 'DATA', Blockly.Generator.R.ORDER_ATOMIC);
                break;
            case 'plot_xy_setting':
                xData = generator.valueToCode(settingBlock, 'X', Blockly.Generator.R.ORDER_ATOMIC);
                yData = generator.valueToCode(settingBlock, 'Y', Blockly.Generator.R.ORDER_ATOMIC);
                break;
            case 'plot_appearance_setting':
                let optionBlock = settingBlock.getInputTargetBlock('OPTIONS');
                while (optionBlock) {
                    switch(optionBlock.type) {
                        case 'color_option':
                            color = generator.valueToCode(optionBlock, 'COLOR', Blockly.Generator.R.ORDER_ATOMIC) || '"black"';
                            break;
                        case 'symbol_option':
                            pch = optionBlock.getFieldValue('SYMBOL');
                            break;
                        case 'line_type_option':
                            lty = optionBlock.getFieldValue('LINE_TYPE');
                            break;
                        case 'size_option':
                            cex = optionBlock.getFieldValue('SIZE');
                            break;
                    }
                    optionBlock = optionBlock.getNextBlock();
                }
                break;
        }
        settingBlock = settingBlock.getNextBlock();
    }

    let code = '';

    switch(layerType) {
        case 'points':
            if (xData && yData) {
                code = `points(${xData}, ${yData}, col = ${color}, pch = ${pch}, cex = ${cex})\n`;
            } else if (data) {
                code = `points(${data}, col = ${color}, pch = ${pch}, cex = ${cex})\n`;
            }
            break;
        case 'lines':
            if (xData && yData) {
                code = `lines(${xData}, ${yData}, col = ${color}, lty = ${lty})\n`;
            } else if (data) {
                code = `lines(${data}, col = ${color}, lty = ${lty})\n`;
            }
            break;
        case 'smooth':
            if (xData && yData) {
                code = `lines(lowess(${xData}, ${yData}), col = ${color})\n`;
            }
            break;
        case 'abline':
            code = `abline(lm(${yData} ~ ${xData}), col = ${color})\n`;
            break;
        case 'text':
            if (xData && yData && data) {
                code = `text(${xData}, ${yData}, labels = ${data}, cex = ${cex})\n`;
            }
            break;
    }

    return code;
};

Blockly.Generator.R.forBlock['layout_advanced'] = function(block, generator) {
    const rows = block.getFieldValue('ROWS');
    const cols = block.getFieldValue('COLS');
    const adjustMargins = block.getFieldValue('ADJUST_MARGINS');

    let code = `par(mfrow = c(${rows}, ${cols})`;

    if (adjustMargins) {
        code += ', mar = c(4, 4, 2, 1)';
    }

    code += ')\n';

    return code;
};

// Helper blocks for settings
Blockly.Generator.R.forBlock['plot_data_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['plot_xy_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['plot_appearance_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['color_option'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['symbol_option'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['line_type_option'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['size_option'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['plot_labels_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['title_label'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['axis_label'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['plot_limits_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['axis_limit'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['plot_legend_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['plot_spatial_data_setting'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['color_palette_option'] = function(block, generator) {
    return null;
};

Blockly.Generator.R.forBlock['show_points_option'] = function(block, generator) {
    return null;
};
