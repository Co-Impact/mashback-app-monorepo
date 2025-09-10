import { Drawer, Toolbar, Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import Sidebar from './SideBar';
import TopAppBar from './TopAppBar';

const drawerWidth = 260;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false); // open state for temporary drawer

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopAppBar collapsed={!open} setCollapsed={toggleDrawer} />
            <Drawer
                variant="temporary"
                open={open}
                onClose={toggleDrawer}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    [`& .MuiDrawer-paper`]: {
                         width: drawerWidth,
                        boxSizing: 'border-box',
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#555',
                        },

                    },
                }}
            >
                <Toolbar />
                <Sidebar collapsed={!open} />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default AppLayout;
