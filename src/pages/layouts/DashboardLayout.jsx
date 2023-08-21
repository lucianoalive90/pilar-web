import React, {useState, useEffect } from 'react';
import { Outlet, useLocation} from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Container,
    Button,
    Drawer,

} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu"
import PopMenu from '../../components/PopMenu'
import MenuComponent from '../../components/Menu';
import { drawerMenu} from '../../constants/menu'


const drawerWidth = 240;

const SideMenu = ({ open, onClose }) => {
    const { pathname } = useLocation()
    useEffect(() => {
        if (open) {
            onClose()
        }
    }, [pathname])
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer open={open} onClose={onClose} sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}>
                <MenuComponent items={drawerMenu} />
            </Drawer>
        </Box>
    )
}

const DashboardLayout = () => {
    const [open, setOpen] = useState(false)
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute">
                <Toolbar
                    sx={{
                        pr: '24px',
                    }}
                >
                    <Button sx={{ color: '#FFF' }} onClick={() => setOpen(true)}>
                        <MenuIcon>

                        </MenuIcon>
                    </Button>
                    <SideMenu open={open} onClose={() => setOpen(false)} />

                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Pilarweb    
                    </Typography>
                    <PopMenu />
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    )
}

export default DashboardLayout
