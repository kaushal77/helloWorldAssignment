import React,{useEffect,useState,useRef, useCallback,memo} from 'react';
import axios from 'axios';
import Item from './Item';



function Home() {
  const [pageNumberLimit,setpageNumberLimit] = useState(10);
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
  const fetchData = async()=>{
    setLoading(true);

    await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${pageNumberLimit}`
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
      setTimeout(()=>{
        setLoading(false);
      },1000);
      
      
    }
  )
  
}
  

  const handleScroll = ()=>{
    // console.log("inside handlescroll");
    let totalUserScrollHeight = window.innerHeight + Math.ceil(window.pageYOffset) -30 ;
    // let bottomHeight = document.documentElement.offsetHeight;

    // if(scrollHeight >= bottomHeight)
    // {
    //   setSkip(skip=>skip+5);
    //   fetchData();
    // }
    if (listInnerRef.current) {
      // console.log(listInnerRef.current)
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      let scrollingHeight = scrollHeight -30;
      // console.log(scrollTop, scrollHeight, clientHeight,bottomHeight,window.pageYOffset,window.innerHeight , window.screenY);
      if (totalUserScrollHeight === scrollingHeight) {
        // let updatedSkip = updatedSkip + skip + pageNumberLimit;
        if(pageNumberLimit != 5)
        {
           setpageNumberLimit(prev=>prev -5);
           console.log('limit=',pageNumberLimit)
        }
        
        setSkip(prev => prev + pageNumberLimit);
        // console.log(skip)
        
        
        // fetchData();
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
      }
    }
  }

  useEffect(()=>{
    // fetchData();
    window.addEventListener('scroll',handleScroll);
    
  },[])

  useEffect(()=>{
    console.log(skip)
      
      fetchData();
    
    console.log('skip = ',skip)
  },[skip])

  return (
    <div style={{display: 'flex',justifyContent: 'space-evenly',flexWrap: 'wrap'}} ref={listInnerRef}  >
      {console.log(itemData)}
      {(itemData) ? (itemData.map((x)=>{
      return <Item val = {x} key={x.title}  /> })) : <p>No data found</p>
      }
      {loading && <p style={{margin:'20px'}}>loading....</p>}
    <section>
        {/* <img src={require('../assets/Eden_logo.PNG')} alt="" style={{width:'100px', padding:'10px 0px',margin:'5% 0px 3% 0px'}} /> */}
        
        
    </section>
    </div>
  )
}

export default Home