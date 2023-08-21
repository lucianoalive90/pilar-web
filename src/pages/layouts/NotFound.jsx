/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import NotFoundImg from '../../assets/images/404.png';
import {
    Grid,
    Paper,
    Box
} from '@mui/material';

const NotFound = () => {
      
        return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Box>
                        <img src={NotFoundImg} />
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
    
}
export default NotFound