import React, { useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminMembership = () => {
    const [search, setSearch] = useState('');
    const [members, setMembers] = useState([
        { name: 'Alice', accountNumber: '12345', email: 'alice@example.com' },
        { name: 'Bob', accountNumber: '67890', email: 'bob@example.com' },
        // 添加更多会员数据...
    ]);

    const handleSearch = (e) => setSearch(e.target.value);

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.accountNumber.includes(search) ||
        member.email.toLowerCase().includes(search.toLowerCase())
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
                          <TableCell>Name</TableCell>
                          <TableCell>Account Number</TableCell>
                          <TableCell>Email Address</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {filteredMembers.map((member, index) => (
                          <TableRow key={index}>
                              <TableCell>{member.name}</TableCell>
                              <TableCell>{member.accountNumber}</TableCell>
                              <TableCell>{member.email}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </div>
  );
};

export default AdminMembership;
