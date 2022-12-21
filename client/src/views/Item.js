import ItemSamll from '../Components/ItemSamll';
import React ,{useEffect, useState} from 'react';
import ItemModel from '../models/itemModel'

export default function Item() {
  const itemModel= new ItemModel('item');
  const [item,setItem] =useState([]);
  useEffect(()=>{
     itemModel.getAll().then(item=>{
       setItem(item)
     })
  },[]);


console.log(item);




  return (<ul>
      {item.length > 0 && item.map((item) => {
        return(  

          <ItemSamll item ={item}  key={`item_${item.id}`}/>
       
        )
      })}
      </ul>    
    )
}
