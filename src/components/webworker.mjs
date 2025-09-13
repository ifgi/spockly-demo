import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.27.6/full/pyodide.mjs";

let pyodideReadyPromise = loadPyodide().then((pyodide) => {
  self.postMessage({ ready: true });
  return pyodide;
});

let iter = 0;
self.onmessage = async (event) => {
  const pyodide = await pyodideReadyPromise;
  const { type, filename, data, id } = event.data;

  if (type === "writeFile") {
    try {
      pyodide.FS.writeFile(filename, data, { encoding: "utf8" });
      self.postMessage({ id, result: "File written" });
    } catch (error) {
      self.postMessage({ id, error: error.message });
    }
    return;
  }

  const { _ID, python, context } = event.data;

  if (iter === 0) {
    await pyodide.loadPackagesFromImports(python);
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
  
    //  load co2 csv for basic usecase tutorial
    try {
      console.log('Loading co2.csv');
  
      if(!globalThis.files && !globalThis.fileColumns && !globalThis.fileContents) {
        globalThis.files = [];
        globalThis.fileColumns = [];
        globalThis.fileContents = {};
      }
  
      const file = await fetch("../data/co2.csv");
      const fileData = await file.text();
      globalThis.fileContents['co2.csv'] = fileData;
  
      pyodide.FS.writeFile('co2.csv', fileData, { encoding: "utf8" });
      // self.postMessage({ type: 'writeFile', filename: 'co2.csv', data: fileData });
  
      globalThis.fileColumns.push(...fileData.split('\r')[0].split('\n')[0].split(','));
      globalThis.files.push('co2.csv');
  
      self.postMessage({ type: 'fileLoaded', files: globalThis.files, contents: globalThis.fileContents });
      console.log("Loaded co2.csv");
  
    } catch (err) {
      self.postMessage({ id, error: err.message });
      console.error("Error loading co2.csv:\n", err);
    }
  
    console.log(globalThis.files, globalThis.fileColumns, globalThis.fileContents);
  
    await micropip.install('plotly.express');
    await micropip.install("ssl");
    await micropip.install('geopy');
    await micropip.install('folium');
    await micropip.install('matplotlib');
  }
  
  const dict = pyodide.globals.get("dict");
  const globals = dict(Object.entries(context));
  try {
    const result = await pyodide.runPythonAsync(python, { globals });
    self.postMessage({ result: String(result), id });
  } catch (error) {
    self.postMessage({ error: error.message, id });
  }

  iter++;
};