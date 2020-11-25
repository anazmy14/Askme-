import React from 'react'
import User from './user'
import '../styles/question.css'

function Question (props){

    return(
        <div className = 'question-box'> 
            {props.question.question}
            {props.question.anonymous? null :  
            <span> <User size = "sm" username = {props.question.from} />  </span> 
            }
            <div className = "user-box"> <User showDate = {1} username = {props.question.to} date = {props.question.time} /> </div>
            <p className = "question-answer"> {props.question.answer} </p>

           
         </div>
    )
}

export default Question; 