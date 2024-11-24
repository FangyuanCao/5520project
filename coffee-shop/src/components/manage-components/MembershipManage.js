import React, { useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ApiUtil from '../../Utils/ApiUtil';
import{useEffect} from 'react'

const AdminMembership = () => {
    const [search, setSearch] = useState('');
    const [members, setMembers] = useState([]);
    
    useEffect(() => {
        fetch(ApiUtil.API_FETCH_ALL_CUSTOMERS, {
           method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Fetched members:', data); // 调试输出
            if (Array.isArray(data.user_emails)) {
                setMembers(data.user_emails);
            } else {
                console.error('Expected an array but got:', data);
            }
        })
        .catch((error) => console.error('Error fetching members:', error));
     }, []);

    const handleSearch = (e) => setSearch(e.target.value);

    const filteredMembers = members.filter(email =>
        email.toLowerCase().includes(search.toLowerCase())
    ); 

    
    return (
      <div>
          <TextField
              label="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              value={search}
              onChange={handleSearch}
          />
          <TableContainer component={Paper}>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>Email Address</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                  {filteredMembers.map((email, index) => (
                            <TableRow key={index}>
                                <TableCell>{email}</TableCell> 
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </div>
  );
};

export default AdminMembership;
