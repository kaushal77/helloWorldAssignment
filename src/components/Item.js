import React from 'react'
import './Item.css'

function Item(props) {
  const discountValue = props.val.price - Math.ceil((props.val.price*props.val.discountPercentage)/100);

  return (
    
        <div className='card' >
            <img src={props.val.thumbnail} alt="" style={{width:'100%',height:'60%'}}></img>
            <div className='container' >
                <h6><b>{props.val.title}</b> </h6>
                <small><b>&#x20B9;{discountValue}</b> &ensp;<s>&#x20B9;{props.val.price}</s> &ensp;<em style={{color:'green'}}>{props.val.discountPercentage} off</em></small> 
            </div>
            
        </div>
    
  )
}

export default Item