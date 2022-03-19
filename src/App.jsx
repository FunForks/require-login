import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

// Provide global access to loggedInUser, logIn,
// urlUser and setUrlUser
import { UserProvider } from './contexts/UserContext'

// Public routes
import Home from './routes/Home'
import Welcome from './routes/Welcome'
import Login from './routes/Login'
// Private routes
import RequireLogin from './routes/RequireLogin'
import Personal from './routes/Personal'



/**
 * Routes:
 * /          will display the public Welcome page
 * /login     will display a public Log In page
 * /whatever  will redirect to the public Log In page
 *            unless, the user "whatever" is logged in, in 
 *            which case user whatever's personal page will
 *            be shown
 * /any/thing/else will redirect to the public Welcome page
 */



function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />}>

            <Route index element={<Welcome />} />

            <Route path="login" element={<Login />} />

            <Route
              path=":username"
              element={
                <RequireLogin redirectTo="/login">
                  <Personal />
                </RequireLogin>
              }
            />
          
          </Route>

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}



export default App;
