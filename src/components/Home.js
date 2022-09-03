import React,{useEffect,useState,useRef, useCallback,memo} from 'react';
import axios from 'axios';
import Item from './Item';



function Home() {
  const [pageNumberLimit,setpageNumberLimit] = useState(5);
  const [skip,setSkip] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [wasLastList, setWasLastList] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const listInnerRef = useRef();

  

  
  // useEffect(() => {
  //       fetchData();
      
  // }, [skip])
  const fetchData = ()=>{
    axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${pageNumberLimit}`
    ).then((res)=>{
      console.log(res);
      // if (!res.data.products.length) {
      //   setWasLastList(true);
      //   return;
      // }
      // setPrevPage(currPage);
      setTotalData(res.data.total);
      if(itemData.length <= totalData)
      {
        setItemData([...new Set([...itemData,...res.data.products])]);
      }
      
    }
  )}
  

  const handleScroll = ()=>{
    console.log("inside handlescroll");
    // let scrolHeight = window.innerHeight + window.screenY;
    let bottomHeight = document.documentElement.offsetHeight;

    // if(scrollHeight >= bottomHeight)
    // {
    //   setSkip(skip=>skip+5);
    //   fetchData();
    // }
    if (listInnerRef.current) {
      console.log(listInnerRef.current)
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log(scrollTop, scrollHeight, clientHeight,bottomHeight);
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage => currPage + 1);
        setSkip(skip => skip +5);
        // console.log(skip)
        // setpageNumberLimit(pageNumberLimit=>pageNumberLimit+10);
        // fetchData();
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
      }
    }
  }

  useEffect(()=>{
    fetchData();
    window.addEventListener('scroll',handleScroll);
    setLoading(false);
  },[])

  useEffect(()=>{
    console.log(skip)
    
      fetchData();
    
    console.log(skip)
  },[skip])

  return (
    <div style={{display: 'flex',justifyContent: 'space-evenly',flexWrap: 'wrap'}} ref={listInnerRef} >
      {console.log(itemData)}
      {(itemData) ? (itemData.map((x)=>{
      return <Item val = {x} key={x.id} /> })) : <p>No data found</p>
      
      }
    <section>
        {/* <img src={require('../assets/Eden_logo.PNG')} alt="" style={{width:'100px', padding:'10px 0px',margin:'5% 0px 3% 0px'}} /> */}
        
        
    </section>
    </div>
  )
}

export default Home