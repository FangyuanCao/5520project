import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminManagement = () => {
    const [admins, setAdmins] = useState([
        { name: 'Admin1', accountNumber: '1001' },
        { name: 'Admin2', accountNumber: '1002' },
        // 初始数据，可根据需要添加更多管理员
    ]);
    const [newName, setNewName] = useState('');
    const [newAccountNumber, setNewAccountNumber] = useState('');

    const handleAddAdmin = () => {
        if (newName && newAccountNumber) {
            setAdmins([...admins, { name: newName, accountNumber: newAccountNumber }]);
            setNewName('');
            setNewAccountNumber('');
        }
    };

    const handleDeleteAdmin = (index) => {
        setAdmins(admins.filter((_, i) => i !== index));
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
            <Button variant="contained" color="primary" onClick={handleAddAdmin}>
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
