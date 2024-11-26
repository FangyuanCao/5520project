import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ApiUtil from '../Utils/ApiUtil';

const Input = styled('input')({
  display: 'none',
});

const UploadButton = styled(Button)({
  marginTop: '10px',
});

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [jsonDataList, setJsonDataList] = useState([]);
  const token = 'test_toke_1234'; 

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        setJsonDataList(json);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleUpload = async () => {
    for (const jsonData of jsonDataList) {
      const { name, type, price, options, status } = jsonData;
      try {
        const response = await fetch(ApiUtil.API_UPDATE_PRODUCTS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name,
            type,
            price,
            options,
            status,
          }),
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
        <Button variant="contained" component="span">
          Choose File
        </Button>
      </label>
      {file && (
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Selected file: {file.name}
        </Typography>
      )}
      {jsonDataList.length > 0  && (
        <Box style={{ marginTop: '10px' }}>
          <Typography variant="h6">JSON Data:</Typography>
          {jsonDataList.map((jsonData, index) => (
            <pre key={index}>{JSON.stringify(jsonData, null, 2)}</pre>))}
          <UploadButton variant="contained" onClick={handleUpload}>
            Upload
          </UploadButton>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;