import { useContext, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from  '../contexts/UserContext.js'


const RequireLogin = ({ children, redirectTo }) => {
  const { username } = useParams()
  const { loggedInUser, setUrlUser } = useContext(UserContext);

  console.log("username in RequireLogin", username);
  
  useEffect(() => setUrlUser(username))
  
  return loggedInUser
       ? children
       : <Navigate to={redirectTo} username={username} />;
}


export default RequireLogin