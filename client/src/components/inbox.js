import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/inbox.css';
import Navbar from  './navbar'
import InboxQuestion from './inboxQuestion';
const url = 'https://ask-me-server.herokuapp.com/questions/?answer=0&to=me'

async function fetchQuestions(setQuestions) {    
    try {
        const res = await axios.get(url);
        setQuestions(res.data.questions);
       }catch(err){
        console.log(err);
    }
}

function Inbox(){
    const [questions, setQuestions] = useState([]);
    const [activeQuestion, setActive] = useState("0");
    useEffect( () => fetchQuestions(setQuestions) , []  );
    function removeQuestion(id) {
        let newQuestions = questions.filter( (q) =>  q._id != id );
        setQuestions(newQuestions);
    }
    return (
        <div className = "inbox-box" >
            <Navbar/>
            <h3>  {questions.length} Questions! </h3>
            { questions.map( (q) => <InboxQuestion key={q._id} question ={q} active = { activeQuestion ==  q._id }  setActive = {setActive} remove={removeQuestion}  />  )  }
        </div>
    )
}

export default Inbox;