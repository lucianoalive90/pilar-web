import React, { useState } from 'react';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Collapse,
    MenuItem as MenuItemMui
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'


const MenuItem = ({ item }) => {
    const navigate = useNavigate()
    const { children, title, path } = item
    const [open, setOpen] = useState(false)
    if (children) {
        return (
            <>
                <ListItem onClick={() => setOpen(status => !status)} >
                    <ListItemButton>
                        <ListItemText sx={{ fontWeight: 400 }} primary={item.title}
                            disableTypography />
                    </ListItemButton>
                    {open ? (<ExpandMoreIcon />) : (<ChevronRightIcon />)}
                </ListItem>
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            children.map((child, index) => {
                                return (
                                    <ListItem key={index}
                                        onClick={() => navigate(child.path)} disablePadding>
                                        <ListItemButton sx={{
                                            height: 42, fontWeight: '200',
                                            padding: th => th.spacing(0, 2.5, 0, 3)
                                        }} >
                                            <ListItemIcon sx={{
                                                width: 26, height: 26,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', padding:
                                                    th => th.spacing(0, 2, 0, 0)
                                            }} >
                                                <Box
                                                    component='span'
                                                    sx={{
                                                        width: 4, height: 4, display: 'flex',
                                                        borderRadius: '50%', alignItems: 'center', justifyContent: 'center',
                                                        backgroundColor: 'text.disabled'
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText sx={{ fontWeight: 400 }}
                                                primary={child.title} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Collapse>
            </>
        )
    }
    return (
        <>
            <ListItem onClick={() => navigate(path)} >
                <ListItemButton>
                    <ListItemText sx={{ fontWeight: 400 }} primary={title}
                        disableTypography />
                </ListItemButton>
            </ListItem>
        </>
    )
}

export default MenuItem