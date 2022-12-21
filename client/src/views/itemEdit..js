import React from 'react';
import ItemModel from '../models/itemModel';
import { TextField, Button, Chip, Grid } from '@mui/material';
import AuctionForm from '../Components/AuctionForm';
// import {useToken} from '../views/auth/useToken'

export default class ItemEdit extends React.Component{
    state = { item: { title: '', descripion: '', image_url: ''} };
    // auctionState = { auction: { start_price: '', sale_end: '' } };

    itemModel=null;
    id=0;

    constructor(props){
        super(props);
        this.itemModel= new ItemModel('item');
        this.onChange=this.onChange.bind(this);
        this.onSave=this.onSave.bind(this);
        this.onDelete=this.onDelete.bind(this);
        this.onSaveAuction=this.onSaveAuction.bind(this);

    }  
    reset(){

        this.setState({
        item: { title: '', descripion: '', image_url: ''} ,
        })
        
    }
    fetchItem(){
        this.id = this.props.match.params.id;
        const isValidId = !isNaN(this.id);
        if (isValidId) {
        this.itemModel.getById(this.id).then((item) => {
        this.setState({ item });
      });
    }else{
        this.reset();
    }
    }
    fetchAction(){
        this.id = this.props.match.params.id;
        const isValidId = !isNaN(this.id);
        if (isValidId) {
        this.itemModel.GetAuction(this.id).then((acution) => {
        this.setState({ acution });
      });
    }else{
        this.reset();
    }
    }
    
    componentDidMount(){
        this.fetchItem();
        this.fetchAction();
}
componentDidUpdate(prevProps){
    if(prevProps !== this.props ){
        this.fetchItem();
        
    }
    
}
onChange(e){
    const field = e.target.name;
    const value = e.target.value
    this.setState({
        item:{...this.state.item,[field]: value },
    })

}
onSave(){
    let usertoken = localStorage.getItem('token')

    if(this.id){
        this.itemModel.update(this.id,this.state.item,usertoken).then((result) => {
            console.log(result);
        });
    }else {
        console.log(usertoken)
        const ItemWithUserId = {...this.state.item};
        this.itemModel.create(ItemWithUserId,usertoken).then((result)=>{
            console.log('inlägget sparades')
        })
    }
}

onSaveAuction(auction){
    console.log(this.id)

    let usertoken = localStorage.getItem('token');
    this.itemModel.createAuction(this.id,auction,usertoken).then((result) => {
        
        });

}
onDelete() {
    let usertoken = localStorage.getItem('token')
    this.itemModel.remove(this.id,usertoken).then((result) => {
      console.log(result);
      window.location.href = '/';
    });
  }
    render() {
        const item = this.state.item
        return  (
            <Grid container spacing={2} sx={{padding:5}}>
              <Grid item xs={12}>
                <TextField
                  name='title'
                  label='Titel'
                  value={item.title}
                  onChange={this.onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='descripion'
                  label='Innehåll'
                  value={item.descripion}
                  onChange={this.onChange}
                  fullWidth
                  multiline
                  minRows={7}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='image_url'
                  label='Sökväg till bild'
                  value={item.image_url}
                  onChange={this.onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {item.auction?
                item.auction.bids.map(bid => 
               <Chip 
              onDelete={()=>console.log('Deleted')} 
              key={`item_${bid.id}`}
              label ={bid.amount} color='secondary' />
               ):<p></p>}
 
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'flex-end', gap: '.4rem' }}>
                <Button variant='contained' color='primary' onClick={this.onSave}>
                  Spara
                </Button>
                {!isNaN(this.id) && this.id > 0 && (
                  <Button variant='contained' color='error' onClick={this.onDelete}>
                    Ta bort
                  </Button>
                )}        
              </Grid>
              <AuctionForm onSave={this.onSaveAuction} ></AuctionForm>

            </Grid>
          );
      }

}