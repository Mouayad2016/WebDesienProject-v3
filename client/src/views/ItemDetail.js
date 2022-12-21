import React ,{useState,useEffect }from 'react';
import ItemModel from '../models/itemModel'
import ItemLarg from '../Components/ItemLarg';
export default function ItemDetail(props){
    const id = props.match.params.id
    const isVlaidId= !isNaN(id);
     

    const itemModel= new ItemModel('item');
    const [item,setItem] =useState({});
    let usertoken = localStorage.getItem('token')
    useEffect(()=>{
    if(isVlaidId)
     itemModel.getById(id,usertoken).then(item=>{
        setItem(item)
    })
    },[]);
    console.log(item.user)

    return(
    <ItemLarg item={item}></ItemLarg>
               
    );}