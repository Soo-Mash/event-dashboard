'use client';
import EventCardList from '@/components/EventCardList/EventCardList';
import { Container, Divider, Snackbar, SnackbarCloseReason } from '@mui/material';
import { useState } from 'react';

const HomePage = () => {
   const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

   const handleOpenSnackbar = () => {
      setSnackbarOpen(true);
   };

   const handleCloseSnackbar = (_, reason?: SnackbarCloseReason) => {
      if (reason === 'clickaway') return;
      setSnackbarOpen(false);
   };
   return (
      <Container maxWidth="xl" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
         <h2>Welcome back, Simon</h2>
         <Divider sx={{ marginBottom: 3 }} />
         <EventCardList hanndleOpenSnackbar={() => handleOpenSnackbar()} />
         <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            message="This is a dummy feature that has no functionality"
         />
      </Container>
   );
};
export default HomePage;
