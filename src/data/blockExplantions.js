const blockDescriptions = {
  math_number: {
    infoText: "Contains a numeric value.",
    functions: [],
  },
  // boolean blocks
  convert_to_bool: {
    infoText: "Convert a value to TRUE or FALSE.",
    functions: ["as.logical()"],
  },
  boolean_true: {
    infoText: "Returns the logical constant TRUE.",
    functions: [],
  },
  boolean_false: {
    infoText: "Returns the logical constant FALSE.",
    functions: [],
  },
  // data blocks
  preview_head_n: {
    infoText: "Preview the first N rows of a dataframe.",
    functions: ["head()"],
  },
  structure_overview: {
    infoText: "Displays the structure of a dataframe using str().",
    functions: ["str()"],
  },
  data_summary: {
    infoText:
      "Get summary statistics of a dataset using the summary() function.",
    functions: ["summary()"],
    simpleText: "Summary statistics provide an overview of the data, including measures like mean, median, minimum, maximum, and quartiles. This block helps you understand the distribution and characteristics of your dataset.",
  },
  length_data: {
    infoText:
      "Get the length of a vector or the number of rows in a dataframe.",
    functions: ["length()"],
  },
  data_table: {
    infoText: " ",
    functions: [],
  },
  // example blocks
  plot_vector: {
    infoText: "This block can be used to plot a vector.",
    functions: ["plot()"],
  },
  create_vector: {
    infoText: "This block creates a vector with a set of numeric values.",
    functions: ["c()"],
  },
  rnorm_block: {
    infoText:
      "Generate random numbers from a normal distribution. The first argument defines the amount of values. The second argument defines the mean of teh generated values. The last argument defines the standard deviation of the generated values.",
    functions: ["rnorm()"],
  },
  text: {
    infoText: "A block containing text.",
    functions: [],
  },
  text_print: {
    infoText: "Print text to the console.",
    functions: ["print()"],
  },
  print_files: {
    infoText: "Print text to the console.",
    functions: ["print()", "list.files()"],
  },
  head_print: {
    infoText: "Print header of csv to the console.",
    functions: ["print()", "names()"],
  },
  x_to_y_mapping: {
    infoText: "Print header of csv to the console.",
    functions: ["(x:y)"],
  },

  ggplot_test: {
    infoText: "Create a ggplot test plot.",
    functions: [
      "data.frame()",
      "c()",
      "print()",
      "ggplot()",
      "aes()",
      "geom_point()",
      "ggtitle()",
      "theme_minimal()",
    ],
  },
  debug_packages: {
    infoText: "Shows all loaded packages and tries to load ggplot2.",
    functions: [
      "print()",
      "loadedNamespaces()",
      "tryCatch()",
      "library()",
      "paste()",
    ],
  },
  install_package: {
    infoText: "Install a specific package in R.",
    functions: ["webr::install()"],
  },
  plot_rgb: {
    infoText: "Plot an RGB image using terra::plotRGB.",
    functions: ["plot()", "terra::plotRGB()"],
  },
  calculate_area: {
    infoText: "Calculate the area of a SpatRaster or SpatVector object.",
    functions: ["terra::expanse()"],
  },
  // export blocks
  export_plot_png: {
    infoText: "Export the current plot to a PNG file.",
    functions: ["png()", "plot()", "dev.off()"],
    simpleText: "PNG is a type of image file — like a photo — that you can open on any computer. When you use this block, your chart will be saved as a PNG picture. After the code runs, the image file will appear in your browser's downloads. You can then open it, share it, or add it to a report or presentation.",
  },
  export_data_csv: {
    infoText: "Export a dataframe to a CSV file.",
    functions: ["write.csv()", "plot()", "dev.off()"],
  },
  save_workspace: {
    infoText: "Save the current R workspace.",
    functions: ["save.image()"],
  },
  st_centroid: {
    infoText: "Calculate centroids of geometries.",
    functions: [],
  },
  st_transform: {
    infoText: "Transform coordinate reference system.",
    functions: [],
  },
  st_buffer: {
    infoText: "Create buffer around geometries.",
    functions: [],
  },
  st_coords: {
    infoText: "Extract coordinates from geometry.",
    functions: ["st_coordinates()"],
  },
  st_point: {
    infoText: "Create a point geometry.",
    functions: ["st_point()"],
  },
  st_linestring: {
    infoText: "Create a linestring from a matrix.",
    functions: ["st_linestring()"],
  },
  st_polygon: {
    infoText: "Create a polygon from coordinates.",
    functions: ["st_polygon()"],
  },
  st_multipolygon: {
    infoText: "Create a multipolygon from a list of polygons.",
    functions: ["st_multipolygon()"],
  },
  st_distance: {
    infoText: "Calculate the distance between geometries.",
    functions: ["st_distance()"],
  },
  st_area: {
    infoText: "Calculate an area.",
    functions: ["st_area()"],
  },
  st_length: {
    infoText: "Calculate perimeter/length.",
    functions: ["st_length()"],
  },
  st_bbox: {
    infoText: "Get a bounding box.",
    functions: ["st_bbox()"],
  },
  st_crs: {
    infoText: "Get system infos for a coordinate reference.",
    functions: ["st_crs()"],
  },
  st_geometry_type: {
    infoText: "Get the geometry type.",
    functions: ["st_geometry_type()"],
  },
  // load data blocks
  load_geojson: {
    infoText: "Load a GeoJSON file.",
    functions: ["sf::st_read()"],
  },
  load_csv_r: {
    infoText: "Load a CSV file from WebR filesystem.",
    functions: ["read.csv()"],
    simpleText: "A CSV file is a simple text file where data is stored in a table format. Each line represents a row, and values are separated by commas (or sometimes semicolons). This block loads that kind of file into your project so that you can work with it, e.g. analyze, filter or plot the data.",
  },
  load_shapefile: {
    infoText: "Load a shapefile (.shp) from WebR filesystem.",
    functions: ["sf::st_read()"],
  },
  load_raster: {
    infoText: "Load a raster file using stars.",
    functions: ["rast()"],
  },
  load_txt: {
    infoText: "Load a text file.",
    functions: ["read.table()"],
  },
  load_json: {
    infoText: "Load a JSON file using jsonlite.",
    functions: [],
  },
  load_csv_url: {
    infoText: "Load a CSV file from a URL.",
    functions: [],
  },
  load_api_data: {
    infoText: "Load data from a REST API endpoint.",
    functions: [],
  },
  load_builtin_dataset: {
    infoText: "Load a built-in dataset like iris.",
    functions: ["library()", "data()"],
  },
  get_dataset: {
    infoText: "Reference a built-in dataset.",
    functions: [],
  },
  data_shape: {
    infoText: "Get the shape of a dataframe.",
    functions: [],
  },
  filter_rows: {
    infoText: "Filter rows from a dataframe.",
    functions: [],
  },
  access_column: {
    infoText: "Select specific columns from a dataframe.",
    functions: ["$"],
    simpleText: "This block lets you choose a single column from your data table. For example, if your data has a 'date' and a 'temperature' column, you can use this block to pick just the 'temperature' values for analysis or visualization.",
  },
  group_by_summarise: {
    infoText: "Group and summarise a dataset.",
    functions: [],
  },
  subset_rows: {
    infoText: "Subset rows of a dataset.",
    functions: [],
  },
  subset_column_range: {
    infoText: "Access a column range from a dataframe.",
    functions: [],
  },
  stack_data: {
    infoText: "Stack two data objects using rbind() or cbind().",
    functions: ["rbind()", "cbind()"],
  },
  append_array: {
    infoText: "Append a value to a vector using append().",
    functions: ["append()"],
  },
  create_array: {
    infoText: "Create an array from a dataset and a dimension vector.",
    functions: [],
  },
  sort_array: {
    infoText:
      "Sort an array by a specific column in ascending or descending order.",
    functions: [],
  },
  slice_file: {
    infoText: "Subset data by condition, like data[condition, ].",
    functions: ["append()"],
  },
  load_tif: {
    infoText: "Load a tif file.",
    functions: ["terra::rast()"],
  },
  // map blocks
  plot_map: {
    infoText: "Plot spatial data.",
    functions: [],
  },
  set_map_title: {
    infoText: "Set the main title of the map.",
    functions: [],
  },
  color_by_attribute: {
    infoText: "Color geometries by attribute.",
    functions: [],
  },
  create_map: {
    infoText: "Initialize an empty map.",
    functions: [],
  },
  create_marker: {
    infoText: "Add a marker to a map at specified coordinates.",
    functions: [],
  },
  create_polygon: {
    infoText: "Add a polygon to the map.",
    functions: [],
  },
  create_circle: {
    infoText: "Draw a circle on the map.",
    functions: [],
  },
  create_polyline: {
    infoText: "Add a polyline to the map.",
    functions: [],
  },
  create_rectangle: {
    infoText: "Add a rectangle to the map using bounds.",
    functions: [],
  },
  choropleth_map: {
    infoText: "Visualize data as a choropleth map.",
    functions: [],
  },
  add_geojson: {
    infoText: "Overlay a GeoJSON layer on the map.",
    functions: [],
  },
  // math blocks
  divide_values: {
    infoText: "Divide one value by another (x / y).",
    functions: [],
  },
  modulo_values: {
    infoText: "Modulo operation (x %% y).",
    functions: [],
  },
  round_value: {
    infoText: "Round a number to the nearest integer.",
    functions: [],
  },
  sum_vector: {
    infoText: "Sum of all elements in a vector.",
    functions: [],
  },
  vector_minus_scalar: {
    infoText: "Subtract a scalar from each element in the vector (x - y).",
    functions: [],
  },
  square_vector: {
    infoText: "Square each element in the vector (x^2).",
    functions: [],
  },
  sqrt_vector: {
    infoText: "Square root of a value or expression (sqrt(x)).",
    functions: ["sqrt()"],
  },
  exp_of: {
    infoText: "Exponential of a value (e^x).",
    functions: [],
  },
  log_of: {
    infoText: "Natural logarithm of a value (log(x)).",
    functions: ["log()"],
  },
  sin_of: {
    infoText: "Sine of an angle (in radians) (sin(x)).",
    functions: ["sin()"],
  },
  // modelling blocks
  linear_model_block: {
    infoText:
      "Create a linear model with specified dependent and independent variables.",
    functions: ["lm()"],
  },
  semivariogram: {
    infoText: "Compute a semivariogram.",
    functions: [],
  },
  kriging_interpolation: {
    infoText: "Perform kriging interpolation.",
    functions: [],
  },
  idw_interpolation: {
    infoText: "Perform interpolation using inverse distance weighting.",
    functions: [],
  },
  nn_interpolation: {
    infoText: "Perform interpolation using nearest neighbour.",
    functions: [],
  },
  // raster blocks
  crop_raster: {
    infoText: "Crop raster data.",
    functions: [],
  },
  aggregate_raster: {
    infoText: "Aggregate raster data.",
    functions: [],
  },
  // statistics blocks
  calculate_sd: {
    infoText: "Calculate standard deviation of a numeric column.",
    functions: ["sd()"],
  },
  quantile_column: {
    infoText: "Compute quantiles at given probabilities.",
    functions: ["quantile()"],
  },
  sorted_element_at: {
    infoText: "Access an element from sorted column.",
    functions: ["sort()"],
  },
  summarize_data: {
    infoText:
      "Generate a summary of the whole dataset or a specific column if provided.",
    functions: ["summary()"],
  },
  calculate_mean: {
    infoText: "Calculate mean of a numeric column.",
    functions: ["mean()"],
  },
  calculate_median: {
    infoText: "Calculate the median of a column.",
    functions: ["mean()"],
  },
  calculate_mse: {
    infoText: "Calculate the mean squared error of a column.",
    functions: ["mean()"],
  },
  calculate_max: {
    infoText: "Return the maximum value of a column.",
    functions: ["max()"],
  },
  calculate_min: {
    infoText: "Return the minimum value of a column.",
    functions: ["min()"],
  },
  calculate_sum: {
    infoText: "Return the sum of values in a column.",
    functions: ["sum()"],
  },
  // transform blocks
  convert_to_sf: {
    infoText:
      "Convert a DataFrame to an SF object with geographic coordinates.",
    functions: ["sf::st_as_sf()"],
  },
  convert_to_dataframe: {
    infoText: "Convert objects to a DataFrame.",
    functions: ["data.frame()"],
  },
  stack_data: {
    infoText: "Stack two data objects using rbind() or cbind().",
    functions: ["rbind()", "cbind()"],
  },
  append_array: {
    infoText: "Append a value to a vector using append().",
    functions: ["append()"],
  },
  create_array: {
    infoText: "Create an array from data with specified dimensions.",
    functions: ["array()"],
  },
  sort_array: {
    infoText: "Sort a vector or array in ascending or descending order.",
    functions: ["sort()"],
  },
  slice_file: {
    infoText: "Subset data by condition using bracket notation.",
    functions: [],
  },
  // variable blocks
  variables_set: {
    infoText: "Set a variable to a value.",
    functions: ["<-"],
    simpleText: "Variables are used to store values that you can use later in your code. This block allows you to create a variable and assign it a value, which can be a number, text, or even a more complex data structure like a dataframe.",
  },
  variables_change: {
    infoText: "Change a variable by a value.",
    functions: [],
  },
  variables_get: {
    infoText: "Get the value of a variable.",
    functions: ["name of the variable"],
    simpleText: "This block retrieves the value stored in a variable. You can use this value in other blocks.",
  },
  // visualization blocks
  create_chart_beginner: {
    infoText: "Create a simple chart.",
    functions: ["plot()", "barplot()", "hist()", "boxplot()"],
  },
  create_xy_chart_beginner: {
    infoText: "Create a chart with X and Y data.",
    functions: ["plot()"],
    simpleText: "This block creates a plot — a visual representation of your data. You provide X values (e.g. time) and Y values (e.g. temperature), and it shows how they relate. You can choose between a scatter plot (shows each point individually) or a line plot (connects the points with lines). It's useful to understand trends or patterns in your data.",
  },
  add_to_chart_beginner: {
    infoText: "Add data to existing chart.",
    functions: ["points()", "lines()"],
  },
  chart_layout_beginner: {
    infoText: "Arrange multiple charts in a grid.",
    functions: ["par()"],
  },
  plot_advanced: {
    infoText: "Create an advanced plot with custom settings.",
    functions: [
      "c()",
      "barplot()",
      "hist()",
      "boxplot()",
      "pie()",
      "plot()",
      "density()",
      "heatmap()",
      "as.matrix()",
    ],
  },
  plot_data_setting: {
    infoText: "Set data for plot.",
    functions: [],
  },
  plot_xy_setting: {
    infoText: "Set X and Y data.",
    functions: [],
  },
  plot_xy_setting: {
    infoText: "Set appearance options.",
    functions: [],
  },
  plot_appearance_setting: {
    infoText: "Set appearance options.",
    functions: [],
  },
  color_option: {
    infoText: "Set color.",
    functions: [],
  },
  symbol_option: {
    infoText: "Set point symbol.",
    functions: [],
  },
  line_type_option: {
    infoText: "Set line type.",
    functions: [],
  },
  size_option: {
    infoText: "Set size.",
    functions: [],
  },
  plot_labels_setting: {
    infoText: "Set plot labels.",
    functions: [],
  },
  title_label: {
    infoText: "Set plot title.",
    functions: [],
  },
  title_label: {
    infoText: "Set plot title.",
    functions: [],
  },
  axis_label: {
    infoText: "Set axis label.",
    functions: [],
  },
  plot_limits_setting: {
    infoText: "Set axis limits.",
    functions: [],
  },
  axis_limit: {
    infoText: "Set axis limits.",
    functions: [],
  },
  plot_legend_setting: {
    infoText: "Configure legend.",
    functions: [],
  },
  add_layer_advanced: {
    infoText: "Add a layer to existing plot.",
    functions: ["points()", "lines()", "lowess()", "abline()", "text()"],
  },
  layout_advanced: {
    infoText: "Set advanced layout for multiple plots.",
    functions: ["par()", "c()"],
  },

  //modelling and interpolation blocks
  linear_model_block: {
    infoText: "Create a linear regression model using the specified formula and dataset.",
    functions: ["lm()"],
  },
  logistic_regression_block: {
    infoText: "Fit a logistic regression model with a binomial response.",
    functions: ["glm(family = binomial)"],
  },
  kmeans_block: {
    infoText: "Perform K-means clustering on selected columns of the dataset.",
    functions: ["kmeans()"],
  },
  semivariogram: {
    infoText: "Compute an empirical semivariogram from spatial data.",
    functions: ["variogram()"],
  },
  kriging_interpolation: {
    infoText: "Interpolate values using ordinary kriging on a spatial grid.",
    functions: ["krige()", "variogram()", "fit.variogram()", "vgm()"],
  },
  idw_interpolation: {
    infoText: "Estimate spatial values using Inverse Distance Weighting (IDW).",
    functions: ["idw()", "coordinates()", "expand.grid()", "gridded()"],
  },
  random_forest_block: {
    infoText: "Train a random forest model for classification or regression.",
    functions: ["randomForest()"],
  },

  /* Python version */
  quantile: {
      infoText: "Compute quantiles at given probabilities.",
      functions: ["np.quantile()"],
  },
  select_column: {
    infoText: "Select a specific column of a dataframe.",
    functions: [],
  },
  load_sensebox: {
    infoText: "Get the CSV file of SenseBox data for specific box id, phenomenon & timestamps.\
    The period of time starts on the from-date day at 00:00:00 and ends on the to-date day at 23:59:59.",
    functions: ["pd.read_csv()", "get.requests()"],
  }
};
export default blockDescriptions;
