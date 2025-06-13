import React, { useState } from 'react';
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
  Grid
} from '@mui/material';
import { CheckCircle, Error, UploadFile, Map } from '@mui/icons-material';

const FileUploadManager = ({ webRInstance, isDarkMode, open, onClose, onGeojsonUpload }) => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileType, setFileType] = useState('');

  const handleCSVUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);
    setFileType('CSV');
    
    try {
      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Define the path in WebR filesystem
      const targetPath = `/home/web_user/${file.name}`;
      
      // Write file to WebR filesystem
      await webRInstance.FS.writeFile(targetPath, uint8Array);
      
      setFilePath(targetPath);
      setUploadStatus('success');
    } catch (error) {
      console.error('CSV file upload failed:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGeojsonUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);
    setFileType('GeoJSON');

    try {
      const text = await file.text();
      // Validate JSON
      JSON.parse(text);
      
      // Create the R variable assignment
      const safeText = JSON.stringify(text);
      const geojsonVariable = `geojson_text <- ${safeText}`;
      
      // Call the callback to pass the variable to the parent
      if (onGeojsonUpload) {
        onGeojsonUpload(geojsonVariable, file.name);
      }
      
      setUploadStatus('success');
    } catch (error) {
      console.error('GeoJSON file upload failed:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setUploadStatus(null);
    setFileName('');
    setFilePath('');
    setFileType('');
    setIsUploading(false);
    onClose();
  };

  const copyToClipboard = () => {
    const textToCopy = fileType === 'GeoJSON' ? 'geojson_to_df(geojson_text)' : fileName;
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          bgcolor: isDarkMode ? '#2d2d2d' : '#ffffff',
        }
      }}
    >
      <DialogTitle sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
        Upload Files
      </DialogTitle>
      
      <DialogContent>
        {!uploadStatus && !isUploading && (
          <Box>
            <Typography variant="body1" sx={{ mb: 3, color: isDarkMode ? '#ffffff' : '#000000' }}>
              Select a file to upload:
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <input
                  accept=".csv"
                  style={{ display: 'none' }}
                  id="csv-upload"
                  type="file"
                  onChange={handleCSVUpload}
                />
                <label htmlFor="csv-upload">
                  <Button
                    variant="contained"
                    component="span"
                    fullWidth
                    startIcon={<UploadFile />}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      py: 1.5,
                      bgcolor: '#1976d2',
                      '&:hover': {
                        bgcolor: '#1565c0'
                      }
                    }}
                  >
                    Choose CSV File
                  </Button>
                </label>
              </Grid>
              
              <Grid item xs={6}>
                <input
                  accept=".geojson,.json"
                  style={{ display: 'none' }}
                  id="geojson-upload"
                  type="file"
                  onChange={handleGeojsonUpload}
                />
                <label htmlFor="geojson-upload">
                  <Button
                    variant="contained"
                    component="span"
                    fullWidth
                    startIcon={<Map />}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      py: 1.5,
                      bgcolor: '#ffffff',
                      color: '#000000',  
                      '&:hover': {
                        bgcolor: '#f5f5f5',
                        color: '#000000'
                      }
                    }}
                  >
                    Choose GeoJSON File
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Box>
        )}

        {isUploading && (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={24} />
            <Typography sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
              Uploading {fileName}...
            </Typography>
          </Box>
        )}

        {uploadStatus === 'success' && (
          <Alert 
            severity="success" 
            icon={<CheckCircle />}
            sx={{ mb: 2 }}
          >
            <AlertTitle>Upload Successful!</AlertTitle>
            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
              {fileType} file uploaded successfully!
            </Typography>
            
            {fileType === 'CSV' && (
              <>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Use this filename in your R code:
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
                    {fileName}
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={copyToClipboard}
                    sx={{ ml: 1 }}
                  >
                    Copy
                  </Button>
                </Box>
              </>
            )}
            
            {fileType === 'GeoJSON' && (
              <>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Use this code to convert to data frame:
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
                    geojson_to_df(geojson_text)
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={copyToClipboard}
                    sx={{ ml: 1 }}
                  >
                    Copy
                  </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                  The GeoJSON data is now available as 'geojson_text' variable in your R environment.
                </Typography>
              </>
            )}
          </Alert>
        )}

        {uploadStatus === 'error' && (
          <Alert 
            severity="error" 
            icon={<Error />}
          >
            <AlertTitle>Upload Failed!</AlertTitle>
            <Typography variant="body2">
              There was an error uploading the {fileType} file. Please try again.
            </Typography>
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button 
          onClick={handleClose}
          sx={{ 
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadManager;