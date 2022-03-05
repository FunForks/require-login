import { Outlet } from 'react-router-dom'

const Home = (props) => {
  return <>
    <h1>THIS IS YOUR SITE</h1>
    <Outlet />
  </>
}


export default Home