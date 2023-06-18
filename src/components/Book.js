import closeIcon from "../images/closeIcon.png"
import placeholder from "../images/placeholder.png"
export default function Book(props){
    // when the book section is visible to user we prevent him from scrolling
    document.querySelector("html").style.overflowY="hidden"
    return(
        <section className="book" style={{animation: "anim1 500ms"}}>{/*little slide in animation*}
            {/*the div mask is the way to prevent user from clicking things outside while this component is active*/}
            <div className="book-mask"/>
            <div className="inner-book">
                {/*the image below is working as button that will close this component*/}
                <img src={closeIcon} alt="close-icon" className="close-icon"
                onClick={()=>{
                    //after clicking we give the user back the scrolling possibility
                    document.querySelector("html").style.overflowY="auto"
                    //slide out animation
                    document.querySelector(".book").style.animation="anim2 500ms"
                    // and timeout that will cahnge our state just before animation is complete
                    setTimeout(()=>{
                        props.setCurrentBook(prevState=>{
                            return({...prevState, isShown: false})
                        })
                    },400)
                    }}/>
                <div className="book-info">
                    {/*more detailed data is here*/}
                    {/*notice that we also maps the authors like in the table*/}
                    <ul>
                        <li><span>Book Title: </span>{props.currentBook.title}</li>
                        <li><span>Book ID: </span>{props.currentBook.id}</li>
                        <li><span>Book Author: </span>{props.currentBook.author.map(e=>e+", ")}</li>
                        <li><span>Book Category: </span>{props.currentBook.category}</li>
                        <li><span>Publish Date: </span>{props.currentBook.publishDate}</li>
                        <li><span>Book Subtitle: </span>{props.currentBook.subtitle}</li>
                        <li><span>Pages: </span>{props.currentBook.pages}</li>
                    </ul>
                    <img //if the image is missing we replace it with placeholder
                        src={props.currentBook.image==="none"?placeholder:props.currentBook.image} 
                        alt="thumbnail"
                        className="book-thumbnail"
                    />
                </div>
                {/*and link for the preview of the book*/}
                <div className="btn-wrap">
                    <a href={props.currentBook.preview} target="_blank" rel="noreferrer"><button>Preview</button></a>
                </div>
            </div>
        </section>
    )
}