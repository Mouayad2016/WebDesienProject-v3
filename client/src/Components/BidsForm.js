import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import ItemModel from "../models/itemModel"

export default function Bids({item}) {
  const itemModel= new ItemModel('bid');
  const [amount,setAmount] =useState('');


let usertoken = localStorage.getItem('token')
let bidss ={
  amount:amount,
  auction_id:item.auction.id,
}


function OnAddClicked () {
  itemModel.addBid(bidss,usertoken)
  console.log(bidss)

}

  return (<>
    <Box padding={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <TextField
    name='amount'
    label='Your End price'
    color='secondary'
    value={amount}
    onChange={e=>setAmount(e.target.value)}
    multiline
  />
    <Button onClick={OnAddClicked}>
        add bid
    </Button>
  </Box>
  </>
  )
}
