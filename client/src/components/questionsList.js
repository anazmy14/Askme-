import React from 'react'
import Question from './question'

function QuestionList (props) {
    

    return(
        <div className = " col-xs-12 questions-list padding">
            { props.questions.map( q => <Question anonymous = {0} question = {q}  />  ) }
        </div>
    )
    
}


export default QuestionList