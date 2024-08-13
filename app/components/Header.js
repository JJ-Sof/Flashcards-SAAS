import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
    return (
        <Box sx={{
            padding: '10px',
            display: 'flex',
            height: '60px',
            backgroundColor: 'lightblue',
        }}>
            <Typography
                variant='h4'
                sx={{
                    flex: 1,
                }}>
                Logo
            </Typography>
            <Button
                size='small'
                variant='contained'>
                Login/Signup
            </Button>
        </Box>
    )
}

export default Header