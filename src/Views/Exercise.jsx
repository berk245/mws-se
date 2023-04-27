import React, {useState, useEffect} from 'react'
import useNotebooksList from '../Hooks/useNotebooksList'
import PreExercise from '../Components/PreExercise';
import CurrentExercise from '../Components/CurrentExercise';
import PostExercise from '../Components/PostExercise';
import {isUserAuthenticated} from '../utils'
import {useNavigate} from 'react-router-dom'
import './Exercise.css'

function Exercise() {
  const [username, setUsername] = useState('')
  const [currentView, setCurrentView] = useState('preExercise')
  const [exerciseData, setExerciseData] = useState({})
  const [exerciseResults, setExerciseResults] = useState({})
  const {userNotebooks, fetchError, fetchingData} = useNotebooksList()
  
  const navigate = useNavigate()

  useEffect(() => {
    if (!isUserAuthenticated()) navigate("/not-authorized");
    else {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      setUsername(userInfo.username)
    }
  }, []);


  if(fetchingData) return <p>Loading</p>
  return (
    <div className='exercise-view-main'>
      {currentView == 'preExercise' && <PreExercise userNotebooks={userNotebooks} setExerciseData={setExerciseData} setCurrentView={setCurrentView}/>}
      {currentView == 'exercise' && <CurrentExercise exerciseData={exerciseData} setExerciseResults={setExerciseResults} setCurrentView={setCurrentView}/>}
      {currentView == 'postExercise' && <PostExercise exerciseResults={exerciseResults}/>}
    </div>
  )
}

export default Exercise