
import React from 'react'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
  } from '@mui/material';
  import { grey } from '@mui/material/colors';
  import { Link } from 'react-router-dom';
  import { toDateTimeString } from '../helpers/formatting';
  import UserItemSmall from './UserItemSmall';
import {useUser} from '../views/auth/useUser';
import BidsDisplay from './BidsDisplay';


export default function ItemLarg({item}) {
    const user=useUser();

  return (<>
      { item ? 
    <Card
    sx={{
      maxWidth: 700,
      padding: 2,
      margin: '0 auto',
      backgroundColor: grey[50]
    }}>    
    <CardContent>
      <UserItemSmall user={item.user} />
    </CardContent>

    <CardHeader
      title={item.title}
      subheader={`Skrivet: ${toDateTimeString(item.createdAt)}`}
    />
    <CardMedia
      component='img'
      image={
        item.image_url
          ? item.image_url
          : `${process.env.PUBLIC_URL}/images/img-placeholder.svg`
      }
      alt={`Bild till inlägget ${item.title}`}
    />
    <CardContent>
      <Typography variant='body1'>{item.body}</Typography>
    </CardContent>
    <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>





        { user.id === item.user_id ?
      <Button variant='contained' color='secondary'>
        <Link to={`/item/${item.id}/edit`}>Ändra</Link>
      </Button> 
      
      : <p></p>}

     
    </CardActions>
    {
           item.auction ? 
           <p> 
           <li>Authur : {item.user.fname}</li>
           <li>Strat Price :{item.auction.start_price}</li>
           <li> Date: {item.auction.createdAt}</li>
           <li> End att : {item.auction.sale_end}</li>
           </p> :
           <p></p>
         } 
    
    <Card sx={{
        marginTop:10
    }} ><BidsDisplay item={item} />  </Card>
  </Card> 
  
  : <p></p>}</>
  
  )
}
