/**
 * If the visitor manually enters an address like...
 *   localhost:3000/whatever
 * ... into the browser's address bar, then ...
 *    <Route path=":username" />
 * ... will set the param `username` to "whatever".
 * This param can be accessed through useParams().
 * 
 * However, if the value of `loggedInUser` is an empty string,
 * then the <RequireLogin /> component will redirect the browser
 * to the redirectTo address (in this case "/login").
 * 
 * In order to access the "whatever" username in the <LogIn /> 
 * component, it must be made available to UserContext, via
 * setUrlUser.
 */

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