import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'



export const UserContext = createContext()



export const UserProvider = ({children}) => {
  const navigate = useNavigate()
  
  // Define the currently logged in user
  const [ loggedInUser, setLoggedInUser ] = useState()
  // Read username from URL if a direct connection is attempted
  const [ urlUser, setUrlUser ] = useState()

  // logIn works as log out if userName is empty or undefined
  const logIn = (userName="") => {    
    setLoggedInUser(userName)
    // Redirect either to the Welcome page or the user's page
    navigate(`/${userName}`, { replace: true })
  }

  return (
    <UserContext.Provider
      value ={{
        loggedInUser,
        logIn,
        setUrlUser,
        urlUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
