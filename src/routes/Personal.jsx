import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Personal = (props) => {
  const { username } = useParams()

  const { logIn } = useContext(UserContext)

  return (
    <>
      <h2>Welcome {username}</h2>
      <p>You can only see this page if you are logged in.</p>
      <button
        onClick={() => logIn()}
      >
        Log Out
      </button>
    </>
  )
}


export default Personal