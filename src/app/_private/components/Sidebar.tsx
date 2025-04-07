import Link from 'next/link';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';

interface SidebarProps {
    open: boolean;
    handleDrawerToggle: () => void;
    routeMap: { [key: string]: { name: string, showInSidebar?: boolean } };
}

const Sidebar = ({ open, handleDrawerToggle, routeMap }: SidebarProps) => {
    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}>
            <List>
                {Object.keys(routeMap).map((path) => (
                    routeMap[path].showInSidebar !== false && (
                        <Link
                            key={path}
                            href={path}
                            passHref
                            legacyBehavior
                        >
                            <ListItemButton
                                component="a"
                                onClick={handleDrawerToggle}
                            >
                                <ListItemText primary={routeMap[path].name} />
                            </ListItemButton>
                        </Link>
                    )
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;