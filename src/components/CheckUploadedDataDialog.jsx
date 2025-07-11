// This component displays a dialog showing a list of uploaded files.
// The list is fetched from the WebR virtual file system when the dialog opens.
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";

const CheckUploadedDataDialog = ({ open, onClose }) => {
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]); // Array of { filename, table }
  const [expandedPreviews, setExpandedPreviews] = useState({});
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch the list of files from WebR's file system when the dialog is opened
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const result = await webR.evalR(`list.files("/home/web_user")`);
        const jsResult = await result.toJs();
        const fileList = jsResult?.values || [];
        setFiles(fileList);

        if (fileList.length > 0) {
          const previews = await Promise.all(fileList.map(async (filename) => {
            const ext = filename.split('.').pop().toLowerCase();
            try {
              const fileRead = await webR.FS.readFile(`/home/web_user/${filename}`, { encoding: 'utf8' });
              const text = new TextDecoder().decode(fileRead);

              if (ext === 'csv') {
                const rows = text.split('\n').slice(0, 6).map(row => row.split(','));
                return { filename, table: rows };
              } else if (ext === 'geojson') {
                const geojson = JSON.parse(text);
                const features = geojson.features?.slice(0, 5) || [];
                const preview = features.map(f => ({
                  type: f.geometry?.type,
                  coords: Array.isArray(f.geometry?.coordinates) ? JSON.stringify(f.geometry.coordinates.slice(0, 2)) : '',
                  props: JSON.stringify(f.properties || {})
                }));
                const table = [['Geometry Type', 'Coordinates', 'Properties'], ...preview.map(p => [p.type, p.coords, p.props])];
                return { filename, table };
              } else if (ext === 'tif') {
                return { filename, table: [['Raster preview not available.']] };
              } else {
                return { filename, table: [] };
              }
            } catch (err) {
              console.warn(`Preview failed for ${filename}:`, err);
              return { filename, table: [['Preview failed for', filename]] };
            }
          }));
          setFilePreviews(previews);
          const initialExpanded = {};
          previews.forEach(p => { initialExpanded[p.filename] = false; });
          setExpandedPreviews(initialExpanded);
        }
      } catch (error) {
        console.error("Error when retrieving the files:", error);
      }
    };

    if (open) {
      fetchFiles();
    }
  }, [open]);

  // Render the dialog with a title, close button, and list of uploaded files
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "12px",
          padding: "16px",
          minWidth: "600px", // increased width
          maxHeight: "80vh",
          overflowY: "auto",
          overflowX: "hidden"
        },
        elevation: 4,
      }}
    >
      {/* Close icon in the top-right corner of the dialog */}
      <IconButton
        onClick={onClose}
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#888",
        }}
        size="small"
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}>
        Uploaded Files
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" style={{ textAlign: "center", marginBottom: "4px", color: "#555" }}>
          These are the files currently uploaded to the system. If you reload the page, you’ll need to upload them again.
        </Typography>
        <Typography variant="body2" style={{ textAlign: "center", marginBottom: "12px", color: "#555" }}>
          Use the copy icon to copy filenames into blocks.
        </Typography>
        {/* Render preview tables for each file if showPreview is true and previews exist */}
        {filePreviews.map((previewObj, idx) => (
          <div key={idx} style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "4px"
              }}
            >
              <Typography
                variant="subtitle2"
                title="Click filename to toggle preview"
                onClick={() => {
                  setExpandedPreviews(prev => ({
                    ...prev,
                    [previewObj.filename]: !prev[previewObj.filename],
                  }));
                }}
                style={{
                  fontWeight: expandedPreviews[previewObj.filename] ? "bold" : "normal",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  color: expandedPreviews[previewObj.filename] ? "#1976d2" : "#333",
                }}
              >
                {expandedPreviews[previewObj.filename] ? "▼ " : "▶ "} {previewObj.filename}
              </Typography>
              <IconButton
                size="small"
                title="Copy filename"
                onClick={() => {
                  navigator.clipboard.writeText(previewObj.filename);
                  setCopySuccess(true);
                }}
                style={{ padding: "2px", color: "#777" }}
              >
                <ContentCopyIcon style={{ fontSize: "16px" }} />
              </IconButton>
            </div>
            {expandedPreviews[previewObj.filename] && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ margin: "0 auto", fontSize: "0.85rem", borderCollapse: "collapse", borderSpacing: 0 }}>
                  <tbody>
                    {previewObj.table.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            style={{
                              border: "1px solid #ccc",
                              padding: "6px 10px",
                              backgroundColor: "#f9f9f9",
                              textAlign: "left",
                              fontFamily: "monospace"
                            }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </DialogContent>
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="Filename copied!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Dialog>
  );
};

export default CheckUploadedDataDialog;