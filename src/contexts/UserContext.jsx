import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'



export const UserContext = createContext()



export const UserProvider = ({children}) => {
  const navigate = useNavigate()
  
  // Define the currently logged in user
  const [ loggedInUser, setLoggedInUser ] = useState("")
  // Read username from URL if a direct connection is attempted
  const [ urlUser, setUrlUser ] = useState()

  // logIn works as log out if username is not a string
  const logIn = (username) => {  
    if (typeof username !== "string") {
      // Will be an event object if called from the Log Out button
      // on the Personal page
      username = ""
    }

    setLoggedInUser(username)
    // Redirect either to the Welcome page ("/") or
    // the user's page ("/username")
    navigate(`/${username}`, { replace: true })
  }

  return (
    <UserContext.Provider
      value ={{
        loggedInUser,
        logIn,
        urlUser,
        setUrlUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
