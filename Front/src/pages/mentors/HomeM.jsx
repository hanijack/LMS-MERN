import NavBar from '../../components/mentors/NavBar'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/mentors/SideBar'


const Home = () => {
  return (
    <div className='min-h-screen bg-white'>
        <NavBar/>
        <div className='flex'>
            <SideBar/>
           <div className='flex-1'>
             {<Outlet/>}
            </div>
        </div>
    </div>
  )
}

export default Home