// components/MeetTheCreators.js
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const creators = [
  { id: 1, name: 'Creator 1', imageSrc: '/creator1.jpg', linkedinUrl: 'https://linkedin.com/in/creator1' },
  { id: 2, name: 'Creator 2', imageSrc: '/creator1.jpg', linkedinUrl: 'https://linkedin.com/in/creator2' },
  { id: 3, name: 'Creator 3', imageSrc: '/creator1.jpg', linkedinUrl: 'https://linkedin.com/in/creator3' },
];

const MeetTheCreators = () => {
  return (
    <Box
      textAlign="center"
      my={4}
      sx={{ 
        width: '100%', 
        maxWidth: '800px', 
        height: '400px', 
        overflow: 'auto', // Scroll if content overflows
        mx: 'auto' // Center the box
      }}
    >
      <Box
        sx={{
          mb: 4, // Margin-bottom to add space below the heading
          p: 2, // Padding around the heading
          border: '1px solid #ddd', // Light border
          borderRadius: '8px', // Rounded corners
          backgroundColor: '#f9f9f9' // Light background color
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Meet the Creators!
        </Typography>
      </Box>

      <Box
        height={60}
      >
      </Box>


      <Grid container spacing={6} justifyContent="center">
        {creators.map((creator) => (
          <Grid item xs={12} sm={6} md={4} key={creator.id}>
            <Box
              height="100px"
              width="100px"
              bgcolor="grey.200"
              borderRadius="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mx="auto"
              mb={2}
            >
              <Image
                src={creator.imageSrc}
                alt={`Creator ${creator.id}`}
                width={100}
                height={100}
                objectFit="cover"
              />
            </Box>
            <Typography variant="subtitle1" mt={1} fontWeight="medium">
              {creator.name}
            </Typography>
            <a href={creator.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </a>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MeetTheCreators;
