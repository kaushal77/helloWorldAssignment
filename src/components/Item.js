import React from 'react'
import './Item.css'

function Item(props) {
  return (
    
        <div className='card' >
            <img src={props.val.thumbnail} alt="" style={{width:'100%',height:'60%'}}></img>
            <div className='container' >
                <h6><b>{props.val.title}</b> </h6>
                <small>&#x20B9;<s>{props.val.price}</s> </small>
            </div>
            
        </div>
    
  )
}

export default Item