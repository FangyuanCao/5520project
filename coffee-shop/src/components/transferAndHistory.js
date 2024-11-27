// src/components/manage-components/OrderManage.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const OrderManage = () => {
    // 示例订单数据，可以替换为从 API 获取的数据
    const [orders, setOrders] = useState([
        // { id: '1001', details: 'Product A - Size M', amount: '$50.00' },
        // { id: '1002', details: 'Product B - Size L', amount: '$75.00' },
        // { id: '1003', details: 'Product C - Size S', amount: '$25.00' },
    ]);

    useEffect ( () => {
        const token = localStorage.getItem('token');
        
        fetch('http://localhost:5000/fetch_transaction_for_user', {
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

    // // 处理发货按钮点击事件
    // const handleShip = (orderId) => {
    //     alert(`Order ${orderId} has been shipped!`);
    // };

    // // 处理删除订单按钮点击事件
    // const handleDelete = (orderId) => {
    //     setOrders(orders.filter(order => order.id !== orderId));
    // };

    return (
        <Box sx={{ p: 3 }}>
            {/* <Typography variant="h4" gutterBottom>
                Order Management
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Number</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Order Details</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.details}</TableCell>
                                <TableCell>{order.amount}</TableCell>
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
            </TableContainer> */}
            <Typography variant="h4" gutterBottom>
                My order history
            </Typography>
            <TableContainer component={Paper} sx={{height:'72vh'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Number</TableCell>
                            {/* <TableCell>Username</TableCell> */}
                            <TableCell>Order Details</TableCell>
                            {/* <TableCell>Amount</TableCell> */}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
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
                                    {/* <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleShip(order.id)}
                                        sx={{ mr: 1 }}
                                    >
                                        Ship
                                    </Button> */}
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
