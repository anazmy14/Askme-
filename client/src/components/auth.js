import React , {useEffect, useState, useContext} from 'react';
import '../styles/auth.css';
import axios from 'axios'; 
import useInput from '../hooks/input-hook';
import { Link, Redirect } from 'react-router-dom';
import {enableBtn, disableBtn} from '../utils/toggleBtn';
import {UserContext} from '../userContext' 

const baseUrl = 'https://ask-me-server.herokuapp.com/';
axios.defaults.withCredentials = true;;


async function postRequest(url , user, next){

    try{
        const res = await axios.post(url ,user);   
        console.log(res);
        next();  
    }catch(err){
        console.log(err);
    }    
}

function pageType (isRegister){
    if(isRegister) return {
        url : baseUrl + "register",
        title : "SIGN UP",
        button : "REGISTER"         
    }

    return {
        url : baseUrl + "login",
        title : "SIGN IN",
        button : "LOGIN"
    }
} 



function AuthForm (props){
    const { value : username , setValue : setUsername, onChange : onUsernameChange } = useInput("") ;
    const { value : password , setValue: setPassword, onChange : onPasswordChange } = useInput(""); 
    const { value : password2 , setValue: setPassword2, onChange : onPassword2Change } = useInput("") ; 
    const [ name,signUser] = useContext(UserContext);


    const [redirect, setRedirect] = useState(0);

    const page = pageType(props.isRegister);

    function validate(){
        if(props.isRegister && !password2.length) return false;
        if(password.length && username.length) return true ;
        else return false;
    } 

     useEffect(  () => validate()? enableBtn("auth-btn") : disableBtn("auth-btn"), [username, password,password2]  );

    

    async function handleSubmit(e){
        e.preventDefault();
        const user = { 
            username : username ,
            password : password 
        }
        
        postRequest(page.url , user, () => {
            signUser(username);
            setRedirect(1);
        });
        
    }


    if(redirect) return <Redirect to = "/"/>

    return(        
        <div className = "auth-box row" >

            <div className = "col-lg-6">
                <h1 className = "auth-logo"> ASKme </h1>
                <p > Curious? Just ask! Openly or anonymously. </p>
            </div>

            <div className = "auth-form col-lg-4 col-md-6">
             <div className = "form-group">
               <h3 className="auth-title"> {page.title} </h3>
             </div>

             <form onSubmit = {handleSubmit} >
               <div className = "form-group">
                <input type="text" className="form-control"  placeholder="Username" onChange = {onUsernameChange} value = {username} />
                </div>
                <div className = "form-group">
                 <input type="password" className="form-control"  placeholder="Password" onChange= {onPasswordChange} value = {password} />

                </div> 

                {
                props.isRegister? 
                <div className = "form-group">
                 <input type="password" className="form-control"  placeholder="Re-enter Password" onChange={onPassword2Change} value={password2} />
                </div>  
                : null 
                }

               <div className = "form-group">
                <button type="submit" className="auth-btn" >{page.button}</button>
                 { props.isRegister ? <p>  Already have an account? <Link to = "/login"> Sign In  </Link> </p> 
                 : <p> Don't hava an account? <Link to = "/register"> Sign Up  </Link> </p>   
                  }
                </div>
            </form>
            </div>
        </div>
    )

} 

export default AuthForm