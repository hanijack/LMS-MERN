import logo from "../../assets/react.svg"
import { UserButton , useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import userIcon from "../../assets/user-icon.svg"
const NavBar = () => {
    const {user} = useUser()

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-2'>
        <Link to="/">
        <img src={logo} alt="logo" className='w-22' />
        </Link>
        <div className="flex items-center gap-4 text-gray-500 ">
            <p>Hi! {user? user.fullName : "Mentors"}</p>
            {user ? <UserButton/> : <img className="max-w-8 " src={userIcon}/>}
        </div>
    </div>
  )
}

export default NavBar