import { useContext, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from  '../contexts/UserContext'


const RequireLogin = ({ children, redirectTo }) => {
  const { username } = useParams()
  const { loggedInUser, setUrlUser } = useContext(UserContext);
  
  useEffect(() => setUrlUser(username))
  
  return loggedInUser
       ? children
       : <Navigate to={redirectTo} />;
}


export default RequireLogin