import React, {useState, useEffect} from 'react';
import Navbar from './navbar';
import axios from 'axios';
import useInput from '../hooks/input-hook';
import { disableBtn, enableBtn } from '../utils/toggleBtn';
import {Link} from 'react-router-dom';

const  baseUrl = 'https://ask-me-server.herokuapp.com/questions/' 

async function postAnswer(id , answer){
    const url = baseUrl + id ;
    console.log(url);
    try{
        await axios.put(url, {answer});
    }catch(err){
        console.log(err);
    }
} 

async function deleteQuestion(id, next){
    const url = baseUrl + id ;
    try{
        await axios.delete(url); 
        next();
    }catch(err){
        console.log(err);
    }
}



function InboxQuestion (props){
    const { value : answer , setValue: setAnswer, onChange, reset  } = useInput("");
    

    useEffect ( ()=>{
        if(answer.length) enableBtn("inbox-send");
        else if(props.active && !answer.length) disableBtn("inbox-send" );
    }, [answer] );

    function handleToggle(){
        if(props.active)  props.setActive(0);
        else  props.setActive(props.question._id);

    }
  
    function handleSubmit(e){
        e.preventDefault();
        postAnswer( props.question._id, answer);
        props.setActive(0);
        props.remove(props.question._id);
    }


    return (
        
    <div className = "inbox-question-box">
        {props.question.question}
        <p>             
        {!props.question.anonymous?  
            <Link className="inbox-question-from" to = {"/profile/"+props.question.from}> from {props.question.from} </Link>
        : null}    
        </p>             


        <button type = "button" className="inbox-answer" onClick = {handleToggle} href="#"> Answer </button>       
        <button className= "inbox-delete" onClick = {() => deleteQuestion(props.question._id, props.remove(props.question._id) )}>Delete</button>
        
        
        {props.active?
        <>
         <form onSubmit = {handleSubmit} >
         <textarea class="form-control inbox-form" rows = "4" onChange = {onChange} ></textarea>
         <button type="submit" class="inbox-send disabled" disabled> <i class="fa fa-paper-plane" aria-hidden="true"></i> </button>
         
         </form>
        </>
         : null} 


    </div>
   )

}

export default InboxQuestion;