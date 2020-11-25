import React, {useState, useEffect, useContext} from 'react';
import '../styles/nav.css';
import {  Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../userContext' 

const baseUrl  = 'https://ask-me-server.herokuapp.com/';

const isSigned = async (next , setRedirect) => {
    try {
        const res = await axios.get(baseUrl);
        const username = res.data.user;
        next(username);
    }catch{
        setRedirect(1);
    }
} 

async function logout( next ){
    const url = baseUrl + 'login';
    await axios.delete(url);    
    next();
}



function Navbar(){
    const [user , setUser ] = useContext(UserContext)
    const [redirect,setRedirect] = useState(0);
    const [username, setUsername] = useState(""); 
    useEffect( fetchUser );

    async function fetchUser(){
        if(user){
            setUsername(user);
            console.log("11111");
        }else{
            await isSigned(setUser , setRedirect ) ; 
        }
        
    }  

   
    function handleClick(e){
        logout( () => setRedirect(1) );
    }

    if (redirect) return <Redirect to="/login"/> ;  


    return(        
      
       <div>           
           <nav className=" nav-box navbar navbar-light bg-light ml-auto fixed-top" >
                <Link className= "nav-logo" to="/">ASKme</Link>
                <Link className= "ml-auto nav-link" to='/' ><i class="fas fa-house-user"></i></Link>
                <Link className= "nav-link" to = "/questions"  ><i class="fas fa-question-circle"></i></Link>       
                <Link className= "nav-link" to = {"/profile/"+ username} ><i class="fas fa-user"></i></Link>    
                <Link className= "nav-link" onClick ={handleClick} > <i class="fas fa-sign-out-alt"></i> </Link>
           </nav>           
       </div>

  )
}

export default Navbar