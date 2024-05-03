import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { AppBar, Button, IconButton } from '@mui/material';
import { match } from 'path-to-regexp';
// import { authClient } from '../../api/authClient';
import { To, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/logo.png'
import { AccountCircle } from '@mui/icons-material';

const drawerWidth = 240;

interface LayoutProps {
    children?: React.ReactNode; // define children as prop
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [currenPath, setCurrenPath] = useState('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    let navigate = useNavigate();

    //get current URL
    useEffect(() => {
        setCurrenPath(window.location.pathname)
    }, [window.location.pathname]);

    function handleLogout() {
        // authClient.logout().then(()=>{
        //     navigate('/auth/login')
        // })
        navigate('/auth/login')
    }

    const sideBarProp = [{
        text: 'Overview',
        path: ['/overview', '/'],
        icon: <DashboardIcon />
    }, {
        text: 'Real-time Data',
        path: ['/realtime'],
        icon: <InsertChartIcon />
    }, {
        text: 'Forecast Analytics',
        path: ['/forecast'],
        icon: <QueryStatsIcon />
    },]

    const sideBarClick = (path: To) => {
        navigate(path)
    }

    //judge which path is active
    const isPathActive = (activePaths: any[], currentPath: any) => {
        return activePaths.some(path => {
            let matchFn
            if (path == '/')
                matchFn = match(path, { end: true })
            else
                matchFn = match(path, { end: false })
            return !!matchFn(currentPath);
        });
    };

    const menuId = 'primary-search-account-menu';
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:'white' }}>
                <Toolbar>
                    <Box
                        component="img"
                        src={logoImage}
                        alt="Logo"
                        sx={{ height: 50, marginRight: 2 }}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex' }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {/* Left SideBar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {sideBarProp.map((prop, index) => (
                            <ListItem key={prop.text} disablePadding>
                                <ListItemButton onClick={() => sideBarClick(prop.path[0])} sx={{
                                    marginTop: 2,
                                    marginLeft: 3,
                                    borderRadius: '0.5rem 0 0 0.5rem',
                                    bgcolor: isPathActive(prop.path, currenPath) ? 'rgb(27, 41, 102)' : 'inherit',
                                    color: isPathActive(prop.path, currenPath) ? 'white' : 'inherit',
                                    '&:hover': {
                                        bgcolor: isPathActive(prop.path, currenPath) ? 'rgba(27, 41, 102,0.75)' : 'rgba(27, 41, 102,0.2)',
                                        color: isPathActive(prop.path, currenPath) ? 'white' : 'inherit',
                                    },
                                }}>
                                    <ListItemIcon sx={{ color: isPathActive(prop.path, currenPath) ? 'white' : 'inherit', }}>{prop.icon}</ListItemIcon>
                                    <ListItemText primary={prop.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <div className="blank_space" style={{ flexGrow: 1 }}></div>
                <Button variant="outlined" color="error" onClick={handleLogout} sx={{ margin: '8px' }}>
                    Logout
                </Button>
            </Drawer>
            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, paddingTop: 8 }}>{children}</Box>
        </Box>
    );
}

export default Layout
