import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
    {
      type: "create_vector",
      message0: "vector with %1",
      args0: [
        {
          type: "field_input",
          name: "ELEMENTS",
          text: "1, 2, 3",
        },
      ],
      output: null,
      colour: 230,
      tooltip: "Create a numeric vector",
      helpUrl: "",
    },
  ]);
  
  Blockly.Generator.R.forBlock["create_vector"] = function (block) {
    const elements = block.getFieldValue("ELEMENTS");
    return [`c(${elements})`, Blockly.Generator.R.ORDER_ATOMIC];
  };
  
  Blockly.defineBlocksWithJsonArray([
    {
      type: "plot_vector",
      message0: "plot %1",
      args0: [
        {
          type: "input_value",
          name: "VECTOR",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: "160",
      tooltip: "Plot a vector using plot()",
      helpUrl: "",
    },
  ]);
  
  Blockly.Generator.R.forBlock["plot_vector"] = function (block, generator) {
    const vector =
      generator.valueToCode(block, "VECTOR", Blockly.Generator.R.ORDER_NONE) ||
      "c()";
    return `plot(${vector})\n`;
  };


// Generate random numbers from normal distribution
Blockly.defineBlocksWithJsonArray([
    {
        type: "rnorm_block",
        message0: "rnorm %1 values with mean %2 and standard deviation %3",
        args0: [
            {
                type: "input_value",
                name: "N",
                check: "Number",
            },
            {
                type: "input_value",
                name: "MEAN",
                check: "Number",
            },
            {
                type: "input_value",
                name: "SD",
                check: "Number",
            },
        ],
        output: "Array",
        colour: 160,
		colour: "#FF8A65",
        tooltip: "Generate random numbers from a normal distribution",
        helpUrl: "",
    },
]);

Blockly.Generator.R.forBlock["rnorm_block"] = function (block, generator) {
    const n = generator.valueToCode(block, "N", Blockly.Generator.R.ORDER_ATOMIC);
    const mean = generator.valueToCode(
        block,
        "MEAN",
        Blockly.Generator.R.ORDER_ATOMIC
    );
    const sd = generator.valueToCode(
        block,
        "SD",
        Blockly.Generator.R.ORDER_ATOMIC
    );

    return [
        `rnorm(${n}, mean = ${mean}, sd = ${sd})`,
        Blockly.Generator.R.ORDER_ATOMIC,
    ];
};

// Numeric literal
Blockly.Generator.R.forBlock["math_number"] = function (block) {
    const code = Number(block.getFieldValue("NUM"));
    return [code, Blockly.Generator.R.ORDER_ATOMIC];
};

// Text block
Blockly.defineBlocksWithJsonArray([
    {
        type: "text",
        message0: "%1",
        args0: [
            {
                type: "field_input",
                name: "TEXT",
                text: "",
            },
        ],
        output: "String",
        colour: "#0f45a3",
        tooltip: "A block containing text.",
        helpUrl: "",
    },
]);

Blockly.Generator.R.forBlock["text"] = function (block) {
    const text = block.getFieldValue("TEXT");
    return [`"${text}"`, Blockly.Generator.R.ORDER_ATOMIC];
};

// Print block
Blockly.defineBlocksWithJsonArray([
    {
        type: "text_print",
        message0: "print %1",
        args0: [
            {
                type: "input_value",
                name: "TEXT",
            },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#0f45a3",
        tooltip: "Print text to the console.",
        helpUrl: "",
    },
]);

Blockly.Generator.R.forBlock["text_print"] = function (block, generator) {
    const text =
        generator.valueToCode(block, "TEXT", Blockly.Generator.R.ORDER_NONE) ||
        '""';
    return `print(${text})\n`;
};

// Get Working Directory block
Blockly.defineBlocksWithJsonArray([
    {
    type: "print_files",
    message0: "print files",
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Print the files in the current working directory.",
    helpUrl: ""
    }
]);

Blockly.Generator.R.forBlock["print_files"] = function (block, generator) {
    return "print(list.files())\n";
};

Blockly.defineBlocksWithJsonArray([
    {
        type: "head_print",
        message0: "print header %1",
        args0: [
            {
                type: "input_value",
                name: "TEXT",
            },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 160,
        tooltip: "Print header of csv to the console.",
        helpUrl: "",
    },
]);

Blockly.Generator.R.forBlock["head_print"] = function (block, generator) {
    const text =
        generator.valueToCode(block, "TEXT", Blockly.Generator.R.ORDER_NONE) ||
        '""';
    return `print(names(${text}))\n`;
};


// x to y mapping block
Blockly.defineBlocksWithJsonArray([
	{
		type: "x_to_y_mapping",
		message0: "map %1 to %2",
		args0: [
			{
				type: "input_value",
				name: "X",
				check: "Number",
			},
			{
				type: "input_value",
				name: "Y",
				check: "Number",
			},
		],
		output: null,
		colour: "#FF8A65",
		tooltip: "Map x to y values.",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["x_to_y_mapping"] = function (block, generator) {
	const x = generator.valueToCode(block, "X", Blockly.Generator.R.ORDER_ATOMIC);
	const y = generator.valueToCode(block, "Y", Blockly.Generator.R.ORDER_ATOMIC);
	return [`(${x}:${y})`, Blockly.Generator.R.ORDER_ATOMIC];
};


Blockly.defineBlocksWithJsonArray([
	{
	  type: "ggplot_test",
	  message0: "create ggplot",
	  previousStatement: null,
	  nextStatement: null,
	  colour: 160,
	  tooltip: "Create a ggplot test plot.",
	  helpUrl: "",
	},
  ]);
  
  Blockly.Generator.R.forBlock["ggplot_test"] = function (block, generator) {
	generator.requirePackage('ggplot2');
	return `test_data <- data.frame(\n` +
	  `  x = 1:10,\n` +
	  `  y = c(2, 5, 3, 8, 6, 9, 7, 10, 12, 11)\n` +
	  `)\n` +
	  `print(ggplot(test_data, aes(x = x, y = y)) + \n` +
	  `  geom_point() + \n` +
	  `  ggtitle("Einfacher Testplot mit ggplot2") + \n` +
	  `  theme_minimal())\n`;
  };

  // debug packages
Blockly.defineBlocksWithJsonArray([
	{
		type: "debug_packages",
		message0: "require package",
		previousStatement: null,
		nextStatement: null,
		colour: 160,
		tooltip: "Require a package in R.",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["debug_packages"] = function (block, generator) {
	return `# Debug: Zeige geladene Pakete\n` +
	  `print("Loaded packages:")\n` +
	  `print(loadedNamespaces())\n` +
	  `\n` +
	  `# Versuche ggplot2 zu laden\n` +
	  `tryCatch({\n` +
	  `  library(ggplot2)\n` +
	  `  print("ggplot2 loaded successfully")\n` +
	  `}, error = function(e) {\n` +
	  `  print(paste("Error loading ggplot2:", e$message))\n` +
	  `})\n`;
  };

Blockly.Generator.R.forBlock["controls_if"] = function (block, generator) {
    let n = 0;
    let code = '';
  
    const condition = generator.valueToCode(block, 'IF0', Blockly.Generator.R.ORDER_NONE) || 'FALSE';
    const branch = generator.statementToCode(block, 'DO0');
    code += `if (${condition}) {\n${branch}}\n`;
  
    // Optional: else block
    if (block.getInput('ELSE')) {
      const elseBranch = generator.statementToCode(block, 'ELSE');
      code += `else {\n${elseBranch}}\n`;
    }
  
    return code;
  };
  

  Blockly.defineBlocksWithJsonArray([
	{
		type: "install_package",
		message0: "install %1 package",
		args0: [
			{
				type: "field_input",
				name: "PACKAGE",
				text: "package_name",
			},
		],
		previousStatement: null,
		nextStatement: null,
		colour: 160,
		tooltip: "Install a specific package in R.",
		helpUrl: "",
	},
]);

Blockly.Generator.R.forBlock["install_package"] = function (block, generator) {
	const packageName = block.getFieldValue("PACKAGE");
	return `print(proj4string(${packageName}))\n`;
};

Blockly.defineBlocksWithJsonArray([
	{
	  "type": "plot_rgb",
	  "message0": "plot RGB for data %1 with R %2 G %3 B %4",
	  "args0": [
		{
		  "type": "input_value",
		  "name": "DATA",
		  "check": null
		},
		{
		  "type": "input_value",
		  "name": "R",
		  "check": "Number"
		},
		{
		  "type": "input_value",
		  "name": "G",
		  "check": "Number"
		},
		{
		  "type": "input_value",
		  "name": "B",
		  "check": "Number"
		}
	  ],
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 160,
	  "tooltip": "Plot an RGB image using terra::plotRGB.",
	  "helpUrl": ""
	}
  ]);
  
  Blockly.Generator.R.forBlock["plot_rgb"] = function (block, generator) {
	generator.requirePackage("terra");
	const data = generator.valueToCode(block, "DATA", Blockly.Generator.R.ORDER_NONE) || "x";
	const r = generator.valueToCode(block, "R", Blockly.Generator.R.ORDER_NONE) || "3";
	const g = generator.valueToCode(block, "G", Blockly.Generator.R.ORDER_NONE) || "2";
	const b = generator.valueToCode(block, "B", Blockly.Generator.R.ORDER_NONE) || "1";
	return `plot(terra::plotRGB(${data}, r=${r}, g=${g}, b=${b}, stretch="LIN"))\n`;
  };


  Blockly.defineBlocksWithJsonArray([
	{
	  "type": "calculate_area",
	  "message0": "calculate area of %1 in unit %2",
	  "args0": [
		{
		  "type": "input_value",
		  "name": "OBJECT",
		  "check": null
		},
		{
		  "type": "field_dropdown",
		  "name": "UNIT",
		  "options": [
			["m", "m"],
			["km", "km"],
			["ha", "ha"]
		  ]
		}
	  ],
	  "output": null,
	  "colour": 160,
	  "tooltip": "Calculate the area of a SpatRaster or SpatVector object.",
	  "helpUrl": ""
	}
  ]);
  
  Blockly.Generator.R.forBlock["calculate_area"] = function (block, generator) {
	const object = generator.valueToCode(block, "OBJECT", Blockly.Generator.R.ORDER_NONE) || "x";
	const unit = block.getFieldValue("UNIT");
  
	return [`terra::expanse(${object}, unit="${unit}")`, Blockly.Generator.R.ORDER_ATOMIC];
  };
  
  
  // Test Block for Loading GeoJSON Date into a Leaflet Map
  /**
   * library(leaflet)
library(geojsonsf)
library(sf)

# Lade die GeoJSON-Datei
geojson_data <- geojson_sf("C:/Users/kgalb/Downloads/Spockly/traindata_rlp.geojson")

# Erstelle eine Leaflet-Karte
leaflet(data = geojson_data) |>
  addTiles() |>
  addMarkers()
   */

Blockly.defineBlocksWithJsonArray([
	{
		type: "load_geojson_to_leaflet",
		message0: "load GeoJSON %1 to Leaflet map",
		args0: [
			{
				type: "input_value",
				name: "GEOJSON_FILE",
				check: "String"
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 160,
		tooltip: "Load a GeoJSON file into a Leaflet map.",
		helpUrl: ""
	}

]);

Blockly.Generator.R.forBlock["load_geojson_to_leaflet"] = function (block, generator) {
	const geojsonFile = generator.valueToCode(block, "GEOJSON_FILE", Blockly.Generator.R.ORDER_NONE) || '"path/to/your/file.geojson"';
	return `
webr::install("leaflet")
webr::install("sf")

library(leaflet)
library(sf)

Sys.setenv(UDUNITS2_XML_PATH=system.file("share/udunits/udunits2.xml", package="units"))

# Load the GeoJSON file
geojson_data <- st_read(${geojsonFile})
# Create a Leaflet map
leaflet_map <- leaflet(data = geojson_data) %>%
addTiles() %>%
addMarkers()
`;
}

// Test Block for Loading CSV file
/**
 * library(leaflet)
library(readr)

# Lade die CSV-Datei
csv_data <- read_csv("C:/Users/kgalb/Downloads/Spockly/beispiel_abfall_schulhof.csv")

# Erstelle eine Leaflet-Karte
leaflet(data = csv_data) |>
  addTiles() |>
  addMarkers(lng = ~lon, lat = ~lat, popup = ~abfall_art)
 * 
 */

Blockly.defineBlocksWithJsonArray([
	{
		type: "load_csv_to_leaflet",
		message0: "load CSV %1 to Leaflet map",
		args0: [
			{
				type: "input_value",
				name: "CSV_FILE",
				check: "String"
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 160,
		tooltip: "Load a CSV file into a Leaflet map.",
		helpUrl: ""
	}
]);

Blockly.defineBlocksWithJsonArray([
	{
		"type": "krigging_temperature_interpolation",
		"message0": "Krigging temperature interpolation with data %1 grid resolution %2",
		"args0": [
			{
				"type": "input_value",
				"name": "DATA",
				"check": "String"
			},
			{
				"type": "field_dropdown",
				"name": "GRID_RESOLUTION",
				"options": [
					["25x25", "25"],
					["50x50", "50"],
					["75x75", "75"],
					["100x100", "100"],
					["150x150", "150"],
					["200x200", "200"]
				]
			}
		],
		"previousStatement": null,
		"nextStatement": null,
		"colour": 160,
		"tooltip": "Performs krigging interpolation on temperature data and displays heatmap",
		"helpUrl": ""
	}
]);

// Code generator
Blockly.Generator.R.forBlock['krigging_temperature_interpolation'] = function(block, generator) {
	const data = generator.valueToCode(block, 'DATA', Blockly.Generator.R.ORDER_ATOMIC) || 'data';
	const gridRes = block.getFieldValue('GRID_RESOLUTION');

	const code = `
# Load required packages
if (!requireNamespace("gstat", quietly = TRUE)) install.packages("gstat")
if (!requireNamespace("sp", quietly = TRUE)) install.packages("sp")
library(gstat)
library(sp)

# Rename columns
colnames(${data}) <- c("id", "temp", "date", "lng", "lat", "elevation")

# Clean data and remove duplicates
${data} <- ${data}[complete.cases(${data}[c("lat", "lng", "temp")]), ]
${data} <- ${data}[!duplicated(${data}[c("lat", "lng")]), ]

# Convert to numeric if needed
${data}$temp <- as.numeric(${data}$temp)
${data}$lat <- as.numeric(${data}$lat)
${data}$lng <- as.numeric(${data}$lng)

# Get data bounds
lat_range <- range(${data}$lat, na.rm = TRUE)
lng_range <- range(${data}$lng, na.rm = TRUE)

# Calculate extent in degrees
lat_extent <- diff(lat_range)
lng_extent <- diff(lng_range)

# Add 5% buffer for better interpolation at edges
lat_min <- lat_range[1] - lat_extent * 0.05
lat_max <- lat_range[2] + lat_extent * 0.05
lng_min <- lng_range[1] - lng_extent * 0.05
lng_max <- lng_range[2] + lng_extent * 0.05

# Create high-resolution grid for smooth interpolation
grid_size <- as.numeric(${gridRes})
lat_seq <- seq(lat_min, lat_max, length.out = grid_size)
lng_seq <- seq(lng_min, lng_max, length.out = grid_size)
grid <- expand.grid(lng = lng_seq, lat = lat_seq)

# Prepare spatial objects
coordinates(${data}) <- ~lng+lat
coordinates(grid) <- ~lng+lat

# Compute empirical variogram
vgm_exp <- variogram(temp ~ 1, ${data})
vgm_model <- fit.variogram(vgm_exp, vgm("Sph"))

# Ordinary Kriging interpolation
kriging_result <- krige(temp ~ 1, ${data}, grid, model = vgm_model)

# Add predicted values to grid
grid$temp_pred <- kriging_result$var1.pred

# Remove NA values
grid <- grid[!is.na(grid$temp_pred), ]

# Get temperature range for proper color scaling
temp_min <- min(grid$temp_pred, na.rm = TRUE)
temp_max <- max(grid$temp_pred, na.rm = TRUE)
temp_range <- temp_max - temp_min

# Create color palette
color_palette <- colorRampPalette(c(
	"#2166AC", "#4393C3", "#92C5DE", "#D1E5F0", "#F7F7F7",
	"#FDDBC7", "#F4A582", "#D6604D", "#B2182B"
))(256)

get_temp_color <- function(temp) {
	if (is.na(temp) || temp_range < 0.01) {
		return("#888888")
	}
	norm_temp <- (temp - temp_min) / temp_range
	norm_temp <- pmax(0, pmin(1, norm_temp))
	color_index <- round(norm_temp * 255) + 1
	return(color_palette[color_index])
}
grid$color <- sapply(grid$temp_pred, get_temp_color)
${data}$color <- sapply(${data}$temp, get_temp_color)

# Create plot window with proper aspect ratio
asp_ratio <- (lat_max - lat_min) / (lng_max - lng_min)
plot_width <- 10
plot_height <- plot_width * asp_ratio

par(mar = c(5, 5, 4, 6))
plot(1, type = "n", 
	xlim = c(lng_min, lng_max), 
	ylim = c(lat_min, lat_max),
	xlab = "Longitude", ylab = "Latitude",
	main = paste("Temperature Interpolation (Ordinary Kriging, ", grid_size, "x", grid_size, " grid)"))

# Add interpolated grid points as colored rectangles
lng_diff <- diff(unique(coordinates(grid)[,1]))[1] / 2
lat_diff <- diff(unique(coordinates(grid)[,2]))[1] / 2
for (i in 1:nrow(grid)) {
	rect(
		xleft = coordinates(grid)[i,1] - lng_diff,
		xright = coordinates(grid)[i,1] + lng_diff,
		ybottom = coordinates(grid)[i,2] - lat_diff,
		ytop = coordinates(grid)[i,2] + lat_diff,
		col = grid$color[i],
		border = NA
	)
}

# Add original measurement points
points(coordinates(${data})[,1], coordinates(${data})[,2], pch = 21, bg = ${data}$color, col = "black", cex = 1.2)

# Draw the path (route) as a line
lines(coordinates(${data})[,1], coordinates(${data})[,2], col="orange", lwd=2)

# Add color legend
legend_image <- as.raster(matrix(color_palette, ncol = 1))
legend("right", 
	legend = seq(temp_min, temp_max, length.out = 5),
	inset = c(-0.25, 0),
	xpd = TRUE,
	bty = "n",
	title = "Temperature (°C)")
rasterImage(legend_image, 
	xleft = lng_max + (lng_max - lng_min) * 0.05,
	xright = lng_max + (lng_max - lng_min) * 0.1,
	ybottom = lat_min,
	ytop = lat_max)

# Add scale bar
if (requireNamespace("fields", quietly = TRUE)) {
	fields::map.scale(x = lng_min + (lng_max - lng_min) * 0.1,
					y = lat_min + (lat_max - lat_min) * 0.05,
					ratio = FALSE,
					relwidth = 0.2)
}

title(sub = paste("Data points:", nrow(${data}), "| Grid resolution:", grid_size, "x", grid_size))
`;

	return code;
};
  