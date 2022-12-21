import { Grid, Typography } from '@mui/material'
import React from 'react'
import { PlaceHolderAvatar } from '../helpers/PlaceHolderComponents'
export default function UserItemSmall({user}) {
  return (
      (user? 
    <Grid container spacing={3} alignItems='center' sx={{width: "100%"}}>
    <Grid item>
        <PlaceHolderAvatar user={user}></PlaceHolderAvatar>
    </Grid>
    <Grid item >
    <Typography variant='h6'>
            {user.username}
    </Typography>
    <Typography>
             {user.email}
    </Typography>
    </Grid>
    </Grid> : <p>There is no User</p>)
  )
}
