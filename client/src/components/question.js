import React, {useState} from 'react'
import User from './user'
import axios from 'axios'
import '../styles/question.css'


function Question (props){
    const [isLike, setIsLike]  = useState(props.question.isLike);
    const [likes, setLikes] = useState(props.question.likesCount); 
    async function like(){
        setIsLike(!isLike);
        setLikes(likes+1);
        const url  = `https://ask-me-server.herokuapp.com/like/${props.question._id}`;
        await axios.post(url);
    }
    async function unlike(){
        setIsLike(!isLike);
        setLikes(likes-1);
        const url  = `https://ask-me-server.herokuapp.com/like/${props.question._id}`;
        await axios.delete(url);
    }

 
    return(
        <div className = 'question-box'> 
            {props.question.question}
            {props.question.anonymous? null :  
            <span> <User size = "sm" username = {props.question.from} />  </span> 
            }
            <div className = "user-box"> <User showDate = {1} username = {props.question.to} date = {props.question.time} /> </div>
            <p className = "question-answer"> {props.question.answer} </p>
            {isLike? 
            <button className="question-like" onClick = {()=> unlike(props.question._id, setIsLike)} > <i class="fas fa-heart"></i> </button>
            : <button className="question-like" onClick = {()=> like(props.question._id, setIsLike)} > <i class="far fa-heart"></i> </button>
            }
            <span className="question-likes-cnt" > {likes} </span>           
         </div>
    )
}

export default Question; 