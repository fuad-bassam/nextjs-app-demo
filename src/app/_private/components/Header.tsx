"use client";

import { useState } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../Context/AuthContext';
import Sidebar from './Sidebar';
import useAuthService from '../helpers/AuthService';

const Header = () => {
    const { loginUser } = useAuth();
    const { logout } = useAuthService();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const handleDrawerToggle = () => setOpen(!open);

    const routeMap: { [key: string]: { name: string, showInSidebar?: boolean, showToolbar?: boolean } } = {
        '/': { name: 'Home' },
        '/home': { name: 'Home', showInSidebar: false },
        '/register': { name: 'Home', showInSidebar: false, showToolbar: false },
        '/login': { name: 'login', showInSidebar: false, showToolbar: false },
        '/dashboard': { name: 'Dashboard' },
        '/products': { name: 'Products' },
        '/product-create-update': { name: params.urlId ? 'Product Edit' : 'Product Creation', showInSidebar: false },
        '/category-create-update': { name: params.urlId ? 'Category Edit' : 'Category Creation', showInSidebar: false },
        '/variant-create-update': { name: params.urlId ? 'Variant Edit' : 'Variant Creation', showInSidebar: false },
        '/categories': { name: 'Categories' },
        '/variants': { name: 'Variants' },
    };

    const getCurrentPage = () => {
        const basePath = pathname.split('/')[1] || '';
        return routeMap[`/${basePath}`] ? routeMap[`/${basePath}`] : null;
    };

    const CurrentPage = getCurrentPage();
    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    return (
        <AppBar position="static" sx={{ marginLeft: 0 }}>
            {CurrentPage?.showToolbar == false || <Toolbar sx={{ boxShadow: 3, borderRadius: 1 }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {CurrentPage?.name || 'Unknown Page'}
                </Typography>

                {loginUser && (
                    <Box display="flex" gap={2} alignItems="center">
                        <Typography variant="subtitle1">
                            {loginUser.name}
                        </Typography>
                        <Button
                            onClick={handleLogout}
                            variant="text"
                            sx={{ color: 'white' }}
                        >
                            Logout
                        </Button>
                    </Box>
                )}

                <Sidebar
                    open={open}
                    handleDrawerToggle={handleDrawerToggle}
                    routeMap={routeMap}
                />
            </Toolbar>}
        </AppBar>
    );
};

export default Header;