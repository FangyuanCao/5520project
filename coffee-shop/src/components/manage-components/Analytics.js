// src/components/manage-components/Analytics.js
import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Divider } from '@mui/material';

const Analytics = () => {
    // 示例历史订单数据，可以替换为从 API 获取的数据
    const [orders, setOrders] = useState([
        { id: '1001', details: 'Product A - Size M', amount: 50.00 },
        { id: '1002', details: 'Product B - Size L', amount: 75.00 },
        { id: '1003', details: 'Product C - Size S', amount: -25.00 }, // 负数表示退款或损失
    ]);

    const [isOpen, setIsOpen] = useState(true); // 用于表示商店状态

    // 计算总盈亏
    const totalProfitLoss = orders.reduce((acc, order) => acc + order.amount, 0);

    // 处理开店/关店按钮点击
    const toggleStore = () => {
        setIsOpen(!isOpen);
        alert(isOpen ? 'Store is now closed!' : 'Store is now open!');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Analytics
            </Typography>
            <Typography variant="h6" gutterBottom>
                Order History
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Number</TableCell>
                            <TableCell>Order Details</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.details}</TableCell>
                                <TableCell>{order.amount >= 0 ? `$${order.amount.toFixed(2)}` : `-$${Math.abs(order.amount).toFixed(2)}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider sx={{ my: 3 }} />

            {/* 总盈亏显示 */}
            <Typography variant="h6">
                Total Profit/Loss: {totalProfitLoss >= 0 ? `$${totalProfitLoss.toFixed(2)}` : `-$${Math.abs(totalProfitLoss).toFixed(2)}`}
            </Typography>

            {/* 开店/关店按钮 */}
            <Button 
                variant="contained" 
                color={isOpen ? "secondary" : "primary"} 
                onClick={toggleStore} 
                sx={{ mt: 2 }}
            >
                {isOpen ? 'Close Store' : 'Open Store'}
            </Button>
        </Box>
    );
};

export default Analytics;
