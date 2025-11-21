
import { Link } from "react-router-dom"
import logo from "../../assets/react.svg"
import { useContext } from "react"
import { Provider } from "../../context/AppContext"

 const SideBar = () => {
    const {mentor} = useContext(Provider)
    const menu = [
        {name:"Dashboard" , path:"/mentor" , icon:logo},
        {name:"Add Courses" , path:"/mentor/add-courses" , icon:logo},
        {name:"My Courses" , path:"/mentor/my-courses" , icon:logo},
        {name:"Enrolled Students" , path:"/mentor/enrolled-students" , icon:logo},
    ]


  return mentor && (
    <div className="w-22 md:w-56 border-r min-h-screen border-gray-500 py-2 flex-col ">
        {menu.map(item =>(
            <Link key={item.name} to={item.path} className="flex items-center gap-2">
                <img src={item.icon} alt={`${item.name} icon`} className="w-6 h-6 my-2" />
                <p className="md:block hidden text-center">{item.name}</p>
            </Link>
        ))}
    </div>
  )
}
export default SideBar