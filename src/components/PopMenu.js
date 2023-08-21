import React, {  useState, useRef } from 'react';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
import {
    Box,
    IconButton,
    Avatar,
    ListItemText,
    MenuItem as MenuItemMui
} from '@mui/material';
import { popMenu } from '../constants/menu'
import MenuPopover from '../components/MenuPopover'


const PopMenu = () => {
    const navigate = useNavigate()
    const menuRef = useRef(null)
    const [open, setOpen] = useState(false)
    return (
        <Box>
            <IconButton
                size="small"
                sx={{ ml: 2 }}
                onClick={() => setOpen(true)}
                ref={menuRef}
            >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <MenuPopover open={open} onClose={() => setOpen(false)}
                anchorEl={menuRef.current} sx={{
                    marginTop: 2.5, marginLeft: 0.5,
                    overflow: 'inherit', boxShadow: '1px, 1px, 2px, 2px rgb(0 0 0 / 20%)',
                    width: 320
                }} >
                {popMenu.map(item => (
                    <MenuItemMui key={item.title} to={item.path}
                        component={RouterLink} onClick={() => setOpen(false)} sx={{ py: 1, px: 2.5 }}
                    >
                        <ListItemText disableTypography>{item.title}</ListItemText>
                    </MenuItemMui>
                ))}
            </MenuPopover>
        </Box>
    )
}

export default PopMenu