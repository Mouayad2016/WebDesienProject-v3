import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
// import { useEffect } from "react";
export default function AuctionForm({ onSave }) {
  const [start_price, setStart_price] = useState('');
  const [sale_end, setSale_end] = useState('');




  return (
    <>
      <Typography>Lägg till en kommentar</Typography>
      <TextField
        sx={{ margin: '1rem 0' }}
        name='start_price'
        label='Your Start Price'
        color='secondary'
        fullWidth
        value={start_price}
        onChange={(e) => setStart_price(e.target.value)}
      />
      <TextField
        name='sale_end'
        label='Your End price'
        color='secondary'
        fullWidth
        multiline
        minRows={3}
        value={sale_end}
        onChange={(e) => setSale_end(e.target.value)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => {
            onSave({ start_price, sale_end,});
            // setStart_price('');
            // setSale_end('');
          }}>
          add aucttion
        </Button>
      </Box>
    </>
  );
}
