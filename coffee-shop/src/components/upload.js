import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Input = styled('input')({
  display: 'none',
});

const UploadButton = styled(Button)({
  marginTop: '10px',
});

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState(null);
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
  
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setJsonData(json);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(selectedFile);
    };

    const handleUpload = async () => {
        if (jsonData) {
          try {
            const response = await fetch('http://localhost:5000/api/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(jsonData),
            });
            if (response.ok) {
              console.log('Data uploaded successfully');
            } else {
              console.error('Failed to upload data');
            }
          } catch (error) {
            console.error('Error uploading data:', error);
          }
        }
      };
  return (
    <Box>
      <Typography variant="h6">Upload File</Typography>
      <label htmlFor="upload-file">
        <Input
          accept=".json"
          id="upload-file"
          type="file"
          onChange={handleFileChange}
        />
        <UploadButton variant="contained" component="span">
          Choose File
        </UploadButton>
      </label>
      {file && (
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Selected file: {file.name}
        </Typography>
      )}
      {jsonData && (
        <Box style={{ marginTop: '10px' }}>
          <Typography variant="h6">JSON Data:</Typography>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;