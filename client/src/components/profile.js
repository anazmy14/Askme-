import React, {useState, useEffect} from 'react';
import User from './user';
import '../styles/profile.css'
import QuestionList from './questionsList';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import useInput from '../hooks/input-hook'
import Navbar from './navbar';
import {disableBtn, enableBtn} from '../utils/toggleBtn';
import user_img from '../userImg.jpg';
import SwitchBtn from './switchBtn' 


const  baseUrl = 'https://ask-me-server.herokuapp.com/'

function follow(username , next){
    const url = baseUrl + "follow/" + username ;
    axios.post(url);
    next();
}

function unfollow(username, next){
    const url = baseUrl + "follow/" + username ;
    axios.delete(url);
    next();
}


async function fetchProfile(username, setUser, setIsFollow ){
    const url = baseUrl + "profiles/" + username;
    console.log(url);
    try{
        const res = await axios.get(url); 
        console.log(res);
        setUser(res.data.user);    
        setIsFollow(res.data.isFollow);  
    }catch(err){
        console.log(err);
    }  
}

async function fetchProfileQuestions(username , setQuestions){
    const url = baseUrl + "questions/?" + `to=${username}&answer=1` ;
    const res = await axios.get(url);
    console.log(res);
    const questions = res.data.questions; 
    setQuestions(questions)
}

async function ask( username, question, anonymous){
    try {
        const url = baseUrl + "questions/";
        await axios.post( url , {question, username, anonymous, data: Date.now() }); 
    }catch(err){
        console.log(err);                
    }
}



function Profile(props){
    const [redirect, setRedirect] = useState(0);
    const [user, setUser] = useState("");
    const {value : question , setValue: setQuestion, onChange : onChange, reset  } = useInput(""); 
    const [profileQuestions , setProfileQuestions] = useState([]) ; 
    const [isFollow , setIsFollow] = useState(0);
    const [anonymous, setAnonymous] = useState(false);
   
    useEffect( async () => {
        try{
           await fetchProfile(props.match.params.username, setUser, setIsFollow ) ; 
           await fetchProfileQuestions(props.match.params.username , setProfileQuestions);
        }catch{  
            setRedirect(1);
        }
           
    } , [props.match.params.username]);

    

    useEffect( ()=> question.length? enableBtn("profile-ask") : disableBtn("profile-ask")  , [question])
    
    if (redirect) return <Redirect to ="/"/> ;  

    function toggleFollow(){
        setIsFollow(!isFollow);
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        ask( user, question, anonymous);    
        reset();    
    }
   
    
    return(
        <>  
        <Navbar/>
        <div className = "padding">
        <div className = "profile-box padding">
            <div className = "row">
             <div className = "col-xs-6">
              <img className = "user-img profile-img" src = {user_img} />
           </div>
           <div className = "col-xs-6 profile-name-box">
               <p> @{user} </p>
               {isFollow?
               <button type="button" className="profile-follow profile-unfollow" onClick = {()=> unfollow(user , toggleFollow)} > unfollow <i className="fas fa-user-slash"></i></button>  
               : <button type="button" className="profile-follow" onClick = {()=> follow(user , toggleFollow)} > follow <i className="fas fa-user-plus"></i></button>
               } 
           </div>
           
           </div>
         </div>

           <div className="form-group  profile-form-box">
            <form onSubmit = {handleSubmit}>    
             <textarea className="form-control profile-form" rows = "4" onChange = {onChange} value = {question} ></textarea>
             <button type="submit" className="profile-ask"  > ASK  <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
            <span className = "profile-switch">
               <SwitchBtn  setAnonymous = {setAnonymous}/>
            </span>   

         
            
            </form> 
           </div>    

          </div> 

           <QuestionList questions = {profileQuestions}/>
        






           
        </>
    )

}

export default Profile;