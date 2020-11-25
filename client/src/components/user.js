import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/user.css';
import user_img from '../userImg.jpg';

function User (props){
    const img_src  = '../public/me.jpeg'
    let img_class = "user-img " + props.size ;  
    const d = Date (props.date) - Date.now(); 
    const url =  '/profile/' + props.username;
    return(
        <>
          <Link to = {url} >  <img className = {img_class} src = {user_img} /> </Link>
          <span>  <Link className ="user-name" to={url} > {props.username} </Link>
          <br></br>
          {props.showDate? <span className = "question-date">  {props.date} </span> : null  }
          </span>
        </>        

    )
}

export default User;