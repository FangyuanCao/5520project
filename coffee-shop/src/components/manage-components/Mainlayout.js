// src/components/manage-components/Mainlayout.js
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Box } from '@mui/material';
import MembershipManage from './MembershipManage';
import AdminManage from './AdminManage';
import OrderManage from './OrderManage';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

const drawerWidth = 240;

const Mainlayout = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        console.log('Token after removal:', localStorage.getItem('token'));
        navigate('/');
      };
    return (
        <div style={{ display: 'flex' }}>
            {/* 顶部导航栏 */}
            <AppBar position="fixed" style={{ zIndex: 1201, backgroundColor: '#3f51b5' }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                       coffee shop Admin 
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} /> {/* 占据剩余空间 */}
                    <Button 
                     variant="h6"
                     onClick={handleSignOut}  
                     sx={{ mb: 2 }}
                    >
        Sign out
      </Button>
                </Toolbar>
                
            </AppBar>

            {/* 左侧侧边栏 */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f4f6f8' },
                }}
            >
                <Toolbar />
                <List>
                    <ListItem button component={Link} to="/admin/membership">
                        <ListItemText primary="Membership Management" />
                    </ListItem>
                    <ListItem button component={Link} to="/admin/admins">
                        <ListItemText primary="setup new admin" />
                    </ListItem>
                    <ListItem button component={Link} to="/admin/orders">
                        <ListItemText primary="Order Management" />
                    </ListItem>
                </List>
            </Drawer>

            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1, 
                    bgcolor: '#eaeff1', 
                    p: 3, 
                    width: `calc(100% - ${drawerWidth}px)`, 
                    marginLeft: 0,
                    display: 'flex',
                    justifyContent: 'flex-start', 
                    alignItems: 'flex-start', 
                    minHeight: '100vh'
                }}
            >
                <Box sx={{ width: '100%', maxWidth: '90%', ml: 3, mt: 4 }}> 
                    <Routes>
                        <Route path="membership" element={<MembershipManage />} />
                        <Route path="admins" element={<AdminManage />} />
                        <Route path="orders" element={<OrderManage />} />
                    </Routes>
                </Box>
            </Box>
        </div>
    );
};

export default Mainlayout;
