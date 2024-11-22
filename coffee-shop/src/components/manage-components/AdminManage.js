import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ApiUtil from '../../Utils/ApiUtil';
const AdminManagement = () => {
    const [admins, setAdmins] = useState([
        { name: 'Admin1', accountNumber: '1001' },
        { name: 'Admin2', accountNumber: '1002' },
        // 初始数据，可根据需要添加更多管理员
    ]);
    const [newName, setNewName] = useState('');
    const [newAccountNumber, setNewAccountNumber] = useState('');
    const [userType, setUserType] = useState('Admin');
    const token = 'test_toke_1234'; 
    const handleAddAdmin = () => {
        if (newName && newAccountNumber) {
            setAdmins([...admins, { name: newName, accountNumber: newAccountNumber }]);
            setNewName('');
            setNewAccountNumber('');
        }
    };
    
    const handleDeleteAdmin = async (index) => {
        const adminToDelete = admins[index];
        try {
          const response = await fetch(ApiUtil.API_DELETE_USER, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              user_name: adminToDelete.name,
              password: adminToDelete.accountNumber
            }),
          });
          const data = await response.json();
          if (data.status === 'success') {
            setAdmins(admins.filter((_, i) => i !== index));
          } else {
            console.error('Delete failed:', data.message);
          }
        } catch (error) {
          console.error('Error deleting admin:', error);
        }
      };
   
    const handleAdminSignUp = async (event)=>{
        if (newName && newAccountNumber) {
            setAdmins([...admins, { name: newName, accountNumber: newAccountNumber }]);
            setNewName('');
            setNewAccountNumber('');
        }
        event.preventDefault();
        try {
          const response = await fetch(ApiUtil.API_REGISTRATION, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              user_name: newName,
              password:newAccountNumber,
              user_type: userType
            }),
          });
          const data = await response.json();
          if (data.authentication) {
            localStorage.setItem('token', data.authentication);
            console.log('Token stored:', data.authentication);
          } else {
            console.error('Login failed:', data.status);
          }
          console.log(data);
        } catch (error) {
          console.error(' error !', error);
        }
      };

    return (
        <div>
            <h2>Admin Management</h2>
            
            <TextField
                label="Name"
                variant="outlined"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{ marginRight: 10 }}
            />
            <TextField
                label="Account Number"
                variant="outlined"
                value={newAccountNumber}
                onChange={(e) => setNewAccountNumber(e.target.value)}
                style={{ marginRight: 10 }}
            />
            <Button variant="contained" color="primary" onClick={handleAdminSignUp}>
                Add
            </Button>

            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Account Number</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins.map((admin, index) => (
                            <TableRow key={index}>
                                <TableCell>{admin.name}</TableCell>
                                <TableCell>{admin.accountNumber}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeleteAdmin(index)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AdminManagement;
