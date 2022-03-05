import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

// Provide global access to loggedInUser and setLoggedInUser
import { UserProvider } from './contexts/UserContext'

// Public routes
import Home from './routes/Home'
import Welcome from './routes/Welcome'
import Login from './routes/Login'
// Private routes
import RequireLogin from './routes/RequireLogin'
import Personal from './routes/Personal'



function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />}>
          <Route index element={<Welcome />} />
          <Route path="*" element={<Navigate to="/" />} />
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
        </Routes>
      </UserProvider>
    </Router>
  );
}



export default App;
