import React,{useEffect,useState,useRef, useCallback} from 'react';
import axios from 'axios';
import Item from './Item';
import './Item.css';



function Home() {
  const [pageNumberLimit,setpageNumberLimit] = useState(10);
  const [skip,setSkip] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalData, setTotalData] = useState(1);
  
  const listInnerRef = useRef();
  var limit = 10;
  
  const fetchData = async()=>{
    setLoading(true);

    await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${pageNumberLimit}`
    ).then((res)=>{
      setTotalData(res.data.total);
      if(itemData.length <= totalData)
      {
         setItemData([...itemData,...res.data.products]);
      }
      setTimeout(()=>{
        setLoading(false);
      },500);
    }
  )
};
  

  const handleScroll = ()=>{
   
    let totalUserScrollHeight = window.innerHeight + Math.ceil(window.pageYOffset) ;
    if (listInnerRef.current) {
      
      const { scrollHeight } = listInnerRef.current;
      let scrollingHeight = scrollHeight;
      
      if (totalUserScrollHeight === scrollingHeight) {
        setSkip(prev => prev + limit);
        if(limit !== 5)
        {limit = 5;}
      }
      if(pageNumberLimit === 10 && skip === 0)
        {
           setpageNumberLimit(5);
        }
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
  },[])

  useEffect(()=>{
      if(skip <= totalData -1)
      {
        fetchData();
      }
  },[skip])

  return (
    <div className='datalist' ref={listInnerRef} >
      {(itemData) ? (itemData.map((x)=>{
        
      return <Item val = {x} key={x.id +`_`+x.title}  /> })) : <p>No data found</p>
      }
      {loading && <p style={{margin:'20px'}}>loading....</p>}
    </div>
  )
}

export default Home