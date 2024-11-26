// src/components/manage-components/OrderManage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const OrderManage = () => {
    // 示例订单数据，可以替换为从 API 获取的数据
    const [orders, setOrders] = useState([
        // { id: '1001', details: 'Product A - Size M', amount: '$50.00' },
        // { id: '1002', details: 'Product B - Size L', amount: '$75.00' },
        // { id: '1003', details: 'Product C - Size S', amount: '$25.00' },
    ]);

    // 
    useEffect ( () => {
        const token = localStorage.getItem('token');
        
        fetch('http://localhost:5000/all_transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            // body: JSON.stringify({
                
            // }),
            })
            .then((response) => response.json())
            .then((data) => setOrders(data.transactions || []))
            .catch((error) => console.error('Error fetching products:', error));

    },[]);

    // 处理发货按钮点击事件
    const handleShip = (orderId) => {
        alert(`Order ${orderId} has been shipped!`);
        const token = localStorage.getItem('token');
        
        
        fetch('http://localhost:5000/update_transaction_cooking_process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                'order_id':orderId,
                'cooking_progress':'order_complete'
            }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error fetching products:', error));

    };

    // 处理删除订单按钮点击事件
    const handleDelete = (orderId) => {
        setOrders(orders.filter(order => order.id !== orderId));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Order Management
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Number</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Order Details</TableCell>
                            {/* <TableCell>Amount</TableCell> */}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.uid}</TableCell>
                                <TableCell>{order.products.map((item)=>(
                                    <>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.selectedSize}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    </>
                                ))}</TableCell>
                                <TableCell>{order.cooking_process}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleShip(order.id)}
                                        sx={{ mr: 1 }}
                                    >
                                        Ship
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </Box>
    );
};

export default OrderManage;
