import { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'


const Login = () => {  
  const { logIn, urlUser } = useContext(UserContext)
  const [ userName, setUserName ] = useState(urlUser)

  
  const updateUsername = (event) => {
    setUserName(event.target.value)
  }


  const checkForEnter = (event) => {
    if (event.key === "Enter") {
      logInUser()
    }
  }


  const logInUser = () => {
    logIn(userName)
  }


  return (
    <>
      <label htmlFor="login">
        Log in as: 
        <input
          type="text"
          name="login"
          id="login"
          value={userName}
          onChange={updateUsername}
          onKeyDown={checkForEnter}
        />
      </label>
      <br />
      <button
        onClick={logInUser}
      >
        Log In
      </button>
    </>
  )
}


export default Login