import React, {useState, useEffect} from 'react'
import QuestionsList from './questionsList'
import Navbar from './navbar';
import axios from 'axios';
const url = "https://ask-me-server.herokuapp.com/questions?answer=1&to=all"

async function fetchQuestions(setQuestions){
  console.log('home')
   try{      
      const res = await axios.get(url);
      console.log(res);
      setQuestions(res.data.questions);
   }catch(err){
     console.log(err);
   }
} 


function Home (){
    const [questions , setQuestions] = useState([]);
    useEffect( ()=> fetchQuestions(setQuestions), [] );

    return(
        <>
          <Navbar/>
          <QuestionsList questions = {questions}/>
        </> 
        
    )
}

export default Home;

