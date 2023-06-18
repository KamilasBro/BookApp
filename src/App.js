import Table from "./components/Table"
import Book from "./components/Book"
import searchImg from "./images/searchIcon.png"
import React,{useState} from "react"
export default function App() {
  //we are creating state for searching phrases
  const [search, setSearch]=useState("react")
  //and state to contain more detailed information
  const [currentBook, setCurrentBook]=useState({
    isShown: false,//this will determine when the book component should render
    id:"", 
    title:"", 
    author:"", 
    category:"", 
    publishDate:"",
    preview:"", 
    subtitle:"",
    pages:"",
    image:""
  })
  function handleSearch(){
    //we receive value from the input and them trim it
    // trim method will remove all empty spaces in the string value
    // trim also prevents code from breaking when user for example
    // clicks the space 5 times and then will search it
    //then we check if the length is more that 0 (if the value is empty or not)
    //and if it's more than 0 we run code below
    if(document.querySelector(".search-bar-input").value.trim().length>0)
    setSearch(document.querySelector(".search-bar-input").value.toLowerCase())
    document.querySelector(".search-bar-input").value=""
  }
  return (
    <>
      <nav>
        <div className="inner-nav">
          <h1>BookApp</h1>
          <div className="search-bar">
              <input className="search-bar-input" placeholder="Search"
              onKeyDown={(event)=>{//run searching process with enter
                if(event.key==="Enter")
                handleSearch()
              }}/>
              <img src={searchImg} alt="search-icon" className="search-icon"
                onClick={handleSearch}//run searching process with image button
              />
          </div>
        </div>
      </nav>
      <main>
        {/*table needs search props to display then in the breadcrumb*/}
        {/*and book state changer to receive data for book component*/}
        <Table search={search} setSearch={setSearch} setCurrentBook={setCurrentBook}/>
        {currentBook.isShown&&
          //book receives book props to display them for user
          <Book currentBook={currentBook} setCurrentBook={setCurrentBook}/>
        }

      </main>
    </>
  )
}