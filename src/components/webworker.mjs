import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.27.6/full/pyodide.mjs";

let pyodideReadyPromise = loadPyodide({
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.6/full/",
}).then((pyodide) => {
  self.postMessage({ ready: true });
  return pyodide;
});

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

  await pyodide.loadPackagesFromImports(python);
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await micropip.install("plotly.express");
  await micropip.install("ssl");
  await micropip.install("geopy");
  await micropip.install("folium");

  const dict = pyodide.globals.get("dict");
  const globals = dict(Object.entries(context));
  try {
    const result = await pyodide.runPythonAsync(python, { globals });
    self.postMessage({ result: String(result), id });
  } catch (error) {
    self.postMessage({ error: error.message, id });
  }
};
