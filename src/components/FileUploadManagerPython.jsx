import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Alert, 
  AlertTitle, 
  Typography,
  Box,
  CircularProgress,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Snackbar
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircle, Error, InsertDriveFile, Map, Forward } from '@mui/icons-material';
import { writeFile } from './workerApi.mjs';

if(!globalThis.files && !globalThis.fileColumns && !globalThis.fileContents) {
  globalThis.files = [];
  globalThis.fileColumns = [];
  globalThis.fileContents = {};
}

// Component for managing file uploads to WebR, including validation, preview, and usage instructions.
const FileUploadManager = ({ isDarkMode, open, onClose }) => {
  // State variables to track upload status, file details, and UI flags
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileType, setFileType] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [filePreview, setFilePreview] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  // Handles the file upload process: reading file and generating preview if applicable
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);
    
    // Determine file type based on extension
    const extension = file.name.toLowerCase().split('.').pop();
    setFileType(extension);
    const targetPath = file.name;
    try {
      if (extension === "csv") {
        const fileData = await file.text();
        globalThis.fileContents[file.name] = fileData;
        await writeFile(targetPath, fileData);
        globalThis.fileColumns.push('---');
        globalThis.fileColumns.push(...fileData.split('\n')[0].split(','));
      } else if(extension === "json" || extension === "geojson" || extension === "txt") {
        const fileData = await file.text();
        globalThis.fileContents[file.name] = fileData;
        await writeFile(targetPath, fileData);
      } else if (extension === "tif") {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        await writeFile(targetPath, uint8Array);
        globalThis.fileContents[targetPath] = uint8Array;
      } else {
        setUploadStatus('invalidtype');
        return;
      }

      setFilePath(targetPath);
      setUploadStatus('success');
      globalThis.files.push(file.name);

      // Generate preview for CSV files
      if (extension === 'csv') {
        const text = await file.text();
        const rows = text.split('\n').slice(0, 6).map(row => row.split(','));
        setFilePreview(rows);
        setShowPreview(true);
      } else if (extension === 'geojson') {
        const text = await file.text();
        try {
          const geojson = JSON.parse(text);
          const features = geojson.features?.slice(0, 5) || [];
          const preview = features.map(f => ({
            type: f.geometry?.type,
            coords: Array.isArray(f.geometry?.coordinates) ? JSON.stringify(f.geometry.coordinates.slice(0, 2)) : '',
            props: JSON.stringify(f.properties || {})
          }));
          const table = [['Geometry Type', 'Coordinates', 'Properties'], ...preview.map(p => [p.type, p.coords, p.props])];
          setFilePreview(table);
        } catch {
          setFilePreview([['Invalid GeoJSON']]);
        }
      } else if (extension === 'tif' || extension === 'tiff') {
        setFilePreview([['Raster preview not available.']]);
      } else {
        setFilePreview([]);
      }
    } catch (error) {
      console.error('File upload failed:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  // Resets all state and closes the dialog
  const handleClose = () => {
    setUploadStatus(null);
    setFileName('');
    setFilePath('');
    setIsUploading(false);
    setFileType('');
    setShowPreview(false);
    setFilePreview([]);
    onClose();
  };

  // Copies the filename to clipboard and shows confirmation snackbar
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileName);
    setCopySuccess(true);
  };

  // Returns appropriate icon based on file type
  const getFileIcon = () => {
    return fileType === 'geojson' || fileType === 'json' ? <Map /> : <InsertDriveFile />;
  };

  // Returns a Chip component indicating the file type
  const getFileTypeChip = () => {
    if (fileType === 'csv') {
      return <Chip label="CSV" size="small" color="primary" />;
    } else if (fileType === 'txt') {
      return <Chip label="txt" size="small" color="secondary" />;
    } else if (fileType === 'geojson' || fileType === 'json') {
      return <Chip label="GeoJSON" size="small" color="secondary" />;
    }
	else if (fileType === 'tif' || fileType === 'tiff'){
	  return <Chip label="Raster" size="small" color="secondary" />;
	}
    return null;
  };

  // Returns usage instructions string based on file type
  const getUsageInstructions = () => {
    if (fileType === 'csv' || fileType === 'txt') {
      return "Use this filename in your load_csv block:";
    } else if (fileType === 'geojson' || fileType === 'json') {
      return "Use this filename in your load_json block:";
    }
	else if (fileType === 'tif' || fileType === 'tiff') {
	  return "Use this filename in your load_raster block:";
	}
    return "Use this filename in your blocks:";
  };

  return (
    <Dialog 
      open={ open } 
      onClose={ handleClose }
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          bgcolor: isDarkMode ? '#2d2d2d' : '#ffffff',
        }
      }}
    >
      <DialogTitle
        sx={{
          color: isDarkMode ? '#ffffff' : '#000000',
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          position: 'relative',
          pr: 5
        }}
      >
        Upload Data File
        <IconButton
          aria-label="close"
          onClick={ handleClose }
          sx={{
            position: 'absolute',
            right: 12,
            top: 8,
            color: isDarkMode ? '#ffffff' : '#333333'
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        {/* Render file selection UI when no upload status and not uploading */}
        { !uploadStatus && !isUploading && (
          <Box>
            <Typography variant="body1" sx={{ mb: 2, color: isDarkMode ? '#ffffff' : '#000000' }}>
              Select a CSV, TXT, TIF or GeoJSON file to upload to Pyodide:
            </Typography>
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={async (e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (!file) return;
              
                const allowedExtensions = ['csv', 'txt', 'geojson', 'tif', 'json', 'tiff'];
                const extension = file.name.toLowerCase().split('.').pop();
              
                if (!allowedExtensions.includes(extension)) {
                  setFileName(file.name);
                  setUploadStatus('invalidtype');
                  return;
                }
              
                await handleFileUpload({ target: { files: [file] } });
              }}                           
              sx={{
                border: '2px dashed #aaa',
                borderRadius: 2,
                p: 2,
                mb: 2,
                textAlign: 'center',
                backgroundColor: isDarkMode ? '#3a3a3a' : '#fafafa',
                color: isDarkMode ? '#ccc' : '#666',
                cursor: 'pointer'
              }}
            >
              <Typography variant="body2">
                Drag & drop your CSV, TXT, GeoJSON or TIF file here or{ " " }
                <label htmlFor="file-upload" style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}>
                  choose a data file
                </label>.
              </Typography>
              <input
                accept=".csv, .geojson, .txt, .tif, .json, .tiff"
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                onChange={ handleFileUpload }
              />
            </Box>
          </Box>
        ) }

        {/* Render uploading progress indicator */}
         { isUploading && (
          <Box display="flex" alignItems="center" gap={ 2 }>
            <CircularProgress size={ 24 } />
            <Typography sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
              Uploading <span style={{ fontStyle: 'italic' }}>{ fileName }</span>...
            </Typography>
          </Box>
        ) }

        {/* Render success message, preview, and usage instructions */}
        { uploadStatus === 'success' && (
          <Box sx={{ bgcolor: '#e8f5e9', p: 3, borderRadius: 2, mb: 2 }}>
            <Box display="flex" alignItems="center" gap={ 1 } sx={{ mb: 2 }}>
              <CheckCircle color="success" />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                File uploaded successfully
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={ 1 } sx={{ mb: 1 }}>
              { getFileIcon() }
              <Typography variant="body2">
                { fileName }
              </Typography>
              { getFileTypeChip() }
            </Box>
            { showPreview && filePreview.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  File preview:
                </Typography>
                <TableContainer component={ Paper } sx={{ maxHeight: 200 }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        { filePreview[0].map((cell, idx) => (
                          <TableCell key={ idx }>{ cell }</TableCell>
                        )) }
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { filePreview.slice(1).map((row, i) => (
                        <TableRow key={ i }>
                          { row.map((cell, j) => (
                            <TableCell key={ j }>{ cell }</TableCell>
                          )) }
                        </TableRow>
                      )) }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            <Box mt={ 3 }>
              <Box display="flex" alignItems="center" gap={ 1 } sx={{ mb: 1 }}>
                <Forward color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Next: Use the file in your analysis
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Use the block <strong>{ (() => {
                  const match =  getUsageInstructions() .match(/load_\w+/);
                  return match ? match[0] : "load_block";
                })() }</strong> from the <strong>Load Data</strong> category. 
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Then paste the filename below into the block:
              </Typography>
              <Box 
                sx={{ 
                  bgcolor: '#f5f5f5', 
                  p: 1, 
                  borderRadius: 1, 
                  fontFamily: 'monospace',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography variant="body2" sx={{ color: '#000' }}>
                  { fileName }
                </Typography>
                <Button 
                  size="small" 
                  onClick={ copyToClipboard }
                  sx={{ ml: 1 }}
                >
                  Copy
                </Button>
              </Box>
            </Box>
          </Box>
        ) }

        {/* Render warning for unsupported file types */}
        { uploadStatus === 'invalidtype' && (
          <Alert severity="warning" icon={ <Error /> }>
            <AlertTitle>Unsupported File Format</AlertTitle>
            <Typography variant="body2">
              The file <strong>{ fileName }</strong> is not supported.<br />
              Please upload a CSV, TXT, GeoJSON or TIF file.
            </Typography>
          </Alert>
) }
        {/* Render error message on upload failure */}
        { uploadStatus === 'error' && (
          <Alert 
            severity="error" 
            icon={ <Error /> }
          >
            <AlertTitle>Upload Failed!</AlertTitle>
            <Typography variant="body2">
              There was an error uploading the file. Please try again.
            </Typography>
          </Alert>
        ) }
      </DialogContent>

      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="Filename copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Dialog>
  );
};

export default FileUploadManager;