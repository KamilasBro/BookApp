import React,{useState, useEffect} from "react";
import "./table.css"
export default function Table(props){
    //the whole app is builded on google books API 
    //unfortunetelly it is not ideal, it have it's flaws
    //but it is free and that will do for this project

    //state that will store our data from API
    const [APIdata, setAPIdata]=useState()
    //to determine when fetching is done and when our data should render on page(also this prevents error when app tries to render component before receiving data)
    const [isFetched, setIsFetched]=useState()
    //this state holds two object properties that will help us fetch the data properly
    const [currentFilter, setCurrentFilter]=useState({property: "", value:""})
    //we use useEffect to fetch data, it is ideal for this scenario because because we want it to run multiple times
    useEffect(()=>{
        //first we set the isFetched to false to rerender our data
        setIsFetched(false)
        //then we make very simple API call. I don't think this app need more complicated and secure way to fetch data
        //there is really no vulnerable data in here, that's why it is so simple and basic
        //I could use async/await but it is little trickier in react as far as I remember and I didn't thought about it when I was coding
        //Tt's working the same I believe

        //Ok, so our API require searching phrase to work so there is props.search then 
        //we are adding optional properties to API (ex. we select author from author column in the table and property will receive "inauthor" and value will receive author we selected)
        //then there is my token &key
        //however I found out that I can't call more than 40 books from API in single call and I can't really bypass that
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${props.search}+${currentFilter.property}:${currentFilter.value}&key=AIzaSyBYPziA9nmiIhQGRLC7ev5ZfYjdUHwEo8c&maxResults=40`)
        .then((res)=>res.json())
        .then((data)=>{
          setAPIdata(data.items)
          setIsFetched(true)//after fetching we set our state to true to render the data
        })
        .catch(err=>{
            alert(err)
            console.log("Error")
        })
    },[props.search,currentFilter])//use effect will run whenever there is another search or filters will change

    function handleBreadCrumb(prop, val){//function for API that will receive necessary data for addtional filters
        setCurrentFilter(prevState=>{
            return({...prevState,
                property: prop,value: val})
        })
    }
    return (
        <section className="table-wrap">
            {/*here is the breadcrumb*/}
            {/*it can have up to 3 hierarchy segments*/}
            {/*1st one is BookApp that on click will change our search to react
                and will clear breadcrumb to initial state
            (works as hard reset)*/}
            {/*2nd one is our searched phrase. It rerenders our searched phrase and clears the 3rd section*/}
            {/*3nd one is selected author or category. it's the last piece of our breadcrumb*/}
            <h1 className="breadcrumb">
                <span onClick={()=>{
                    props.setSearch("react")
                    setCurrentFilter(prevState=>{
                        return({...prevState,
                            property: "",value: ""})
                    })
                    }}>
                    BookApp/
                </span>
                <span onClick={()=>{
                    props.setSearch(prevState=>prevState)
                    setCurrentFilter(prevState=>{
                        return({...prevState,
                            property: "",value: ""})
                    })
                    }}>{props.search}/
                </span>
                {currentFilter.property!==""&&currentFilter.value!==""&&
                    <span>{currentFilter.value}/</span>
                }
            </h1>
            <table>
                <thead>
                    <tr className="head-tr">
                        <th>Index</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Publish Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/*isFetched was described in line 13*/}
                    {/*the APIdata condition however is to prevent another error when our API for some reason will receive data as undefined*/}
                    {/*some books have weird category that causes this problem*/}
                    {isFetched&&APIdata!==undefined&&
                    APIdata.map((e,index)=>{
                        //we are mapping data here but there are some important things
                        //if the book is not cantaining desired data we will replace that with none to fill the empty space in table
                        return(
                        <tr key={index}>
                            <td>{index+1}.</td>
                            <td>{!e.volumeInfo.title?"None":<span
                                onClick={()=>{props.setCurrentBook(prevState=>{
                                    //clicking the title of the book will make the book segment appear on screen
                                    return({
                                        //here we are checking if the data exists and update our state
                                        ...prevState,
                                        isShown: true,
                                        id: e.id, 
                                        title: !e.volumeInfo.title?"missing":e.volumeInfo.title, 
                                        author: !e.volumeInfo.authors?"unknown":e.volumeInfo.authors, 
                                        category: !e.volumeInfo.categories?"none":e.volumeInfo.categories, 
                                        publishDate: !e.volumeInfo.publishedDate?"unknown":e.volumeInfo.publishedDate,
                                        preview: !e.volumeInfo.previewLink?"missing":e.volumeInfo.previewLink, 
                                        subtitle: !e.volumeInfo.subtitle?"none":e.volumeInfo.subtitle,
                                        pages: !e.volumeInfo.pageCount?"unknown":e.volumeInfo.pageCount,
                                        image: !e.volumeInfo.imageLinks?"none":e.volumeInfo.imageLinks.thumbnail
                                    })
                                })}}
                            >{e.volumeInfo.title}</span>}</td>
                            <td>{!e.volumeInfo.authors?"None":e.volumeInfo.authors.map(e=>{
                                //some books have multiple authors and I used map to render all of them, however when i wrap every single one in span, I can target desired one
                                return(<span key={e} 
                                    onClick={()=>handleBreadCrumb("inauthor",e)}//explained in line 23
                                >{e+", "}</span>)//the commas after will seperate authors to make things more readable
                            })}</td>
                            <td>{!e.volumeInfo.categories?"None":<span
                                onClick={()=>handleBreadCrumb("subject",e.volumeInfo.categories)}//explained in line 23
                            >{e.volumeInfo.categories}</span>}</td>
                            <td>{!e.volumeInfo.publishedDate?"None":
                            e.volumeInfo.publishedDate}</td>
                        </tr>
                        )
                    })}
                </tbody>
        </table>
        </section>
    )
}