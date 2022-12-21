import { Paper } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Box } from '@mui/system'
import React from 'react'

export default function BidsDisplay({item}) {
  return (<>
  <h3>Cuurent Bids </h3>
    <Box elevation={2} 
    sx={{
        // flexDirection:'column-reverse',
        margin:5
    }}>

    
    {item.auction ? 
          (
              item.auction.bids.map(bid=> 
              <Paper elevation={5} sx={{
                  minWidth:30,
                  maxWidth:100,
                marginBottom:1 , 
                marginTop:1,
                backgroundColor: grey[50],
                padding:2, }} key={`item_${bid.id}`} > {bid.amount}</Paper>
              )
          ):<p></p>
          } 
    </Box>
    </>)
}
