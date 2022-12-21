import React from 'react'
import { useState } from "react";

import { TextField, Button, Chip, Grid } from '@mui/material';
export default function acutionCreate({item}) 
{
    return (
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name='title'
            label='Start Price'
            // value={item.title}
            // onChange={this.onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='descripion'
            label='Sale End'
            // value={item.descripion}
            // onChange={this.onChange}
            fullWidth
            multiline
            minRows={1}
          />
        </Grid>
        </Grid>

    )}