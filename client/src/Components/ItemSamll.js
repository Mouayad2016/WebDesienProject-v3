import { Divider, Grid, Paper, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

import React from 'react'
import { Link } from 'react-router-dom'
import Bids from './BidsForm'
import UserItemSmall from './UserItemSmall'
import {toDateTimeString, truncate} from '../helpers/formatting'
import { PlaceHolderImage } from '../helpers/PlaceHolderComponents'
import BidsDisplay from './BidsDisplay'
export default function ItemSamll({item}) {
  return (
    <> 
    <Paper elevation={2} sx={{
        marginBottom:4 , 
        marginTop:4,
        backgroundColor: grey[50],
        padding:2,
        // paddingLeft: 20 
        }
        } >
            
        <Grid container spacing={2} alignItems='center' >
            <Grid item x2={12}>
                <UserItemSmall user={item.user}></UserItemSmall>
                    <Divider> </Divider>
                </Grid>
        </Grid>
        
        <Grid item xs={12} md={4}>
            <Link to ={`/item/${item.id}`}><PlaceHolderImage source={item}/> </Link> 
        </Grid>
        <Grid item xs ={12} md={8}> 
            <Grid container >
                <Typography variant='h6'>
                    <Link to ={`/item/${item.id}`}>
                        Title: {item.title}
                     </Link>
               </Typography>
            </Grid>
        <Grid item  xs={12}>
            {
            item.auction && 
            // (item.auctions.map(auction => 
                 
                <li>  </li>
                // )
            // )
            } 
        </Grid>
        <Grid item  xs={12}>
        <Paper elevation={2} sx={{
        marginBottom:4 , 
        marginTop:4,
        backgroundColor: grey[50],
        padding:2,
        // paddingLeft: 20 
        }
        } >
            <BidsDisplay item={item}></BidsDisplay>
        {
           item.auction ? 
           <div>
               <Grid margin={2}>
               <h2>Auction</h2>
               </Grid>
           <li>Authur : {item.user.fname}</li>
           <li>Strat Price :{item.auction.start_price}</li>
           <li> Date: {item.auction.createdAt}</li>
           <li> End att : {item.auction.sale_end}</li>
        
       <Bids item={item}></Bids>



           </div> :
           <h3> There is no acution to bid here</h3>
         } 
         </Paper>
        </Grid>
        <Grid item xs={12}>
            <Typography> 
                Item pubilshed at: {toDateTimeString(item.createdAt)}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography>
            Descripion: {truncate(item.descripion, 200)}
            </Typography>
            <Grid>
            </Grid>
          </Grid>
        </Grid>
        </Paper>
    </>
  )
}
