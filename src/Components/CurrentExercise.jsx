import React, {useState} from 'react'
import {completeExercise} from '../utils'

function CurrentExercise({exerciseData, setExerciseResults, setCurrentView}) {
    const exerciseId = exerciseData.exerciseId
    const [exerciseQuestions, setExerciseQuestions] = useState(exerciseData.exerciseQuestions)
    const [resultsError, setResultsError] = useState(false)
    const updateAnswer = (answer, questionIndex) => {
        let newObj = [...exerciseQuestions]
        newObj[questionIndex].userAnswer = answer
        setExerciseQuestions(newObj)
    }

    const submitExercise = async() => {
        let postObj = {exerciseId: exerciseId, exerciseData: exerciseQuestions}
        
        let completeRequest = await completeExercise(postObj)

        if(completeRequest.error){
            setResultsError('Could not complete exercise. Please check your internet connection and try again.')
            return
        }

        setExerciseResults(exerciseQuestions)
        setCurrentView('postExercise')
    }

    const goBack = () => {
        let confirmed = window.confirm('This will end the exercise. Are you sure?')
        if(!confirmed) return
        
        setCurrentView('preExercise')
    }   


    return (
    <div>
        <button className='btn go-back-button' onClick={goBack}>Go back</button>
        <h2>Exercise</h2>
        {resultsError && <p>{resultsError}</p>}
        <div className="questions-box">
        {exerciseQuestions.map((question, index) => {
            return(
                <div key={index} className="exercise-question">
                    <span className='question-word'>Q{index+1}): {question.WordOriginal}</span>
                    <input className='number-input user-answer' placeholder='Type in your answer here' type="text" onChange={(e) => updateAnswer(e.target.value, index)}/>
                </div>
            )
        })}
        </div>
        
        <button className='btn' onClick={submitExercise}>Submit Answers</button>
    </div>
  )
}

export default CurrentExercise;