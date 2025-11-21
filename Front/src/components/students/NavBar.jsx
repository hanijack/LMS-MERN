import { Link } from "react-router-dom";
import logo from "../../assets/react.svg";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { Provider } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import userIcon from "../../assets/user-icon.svg";


const NavBar = () => {

  const IsCourseList = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const {mentor , backendUrl , setMentor , getToken , navigate }=useContext(Provider)

  const becomeMentor = async()=>{
    try {
      if(mentor){
        navigate("/mentor")
        return 
      }
      const token =await getToken()
      const {data}= await axios.get(backendUrl + `/api/mentor/update-role` , {headers :{Authorization:`Bearer ${token}`}})
      if(data.success){
        setMentor(true)
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <nav
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        IsCourseList ? "bg-white" : "bg-blue-100/70"
      }`}
    >
      <img src={logo} alt="logo" className="w-12 lg:w-20 cursor-pointer" onClick={()=>navigate("/")}/>

      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-4">
          {user && (
            <>
              <button onClick={becomeMentor} className="cursor-pointer">{mentor ? "Mentor Dashboard" : "Become Mentor"}</button>|
              <Link to="./enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer hover:bg-blue-500 transition"
            onClick={() => openSignIn()}
          >
            Create Account
          </button>
        )}
      </div>
      <div className="flex md:hidden items-center gap-2 text-gray-500 ">
        <div className="flex gap-1 items-center max-sm:text-xs">
           {user && (
            <>
              <button onClick={becomeMentor} className="cursor-pointer">{mentor ? "Mentor Dashboard" : "Become Mentor"}</button>|
              <Link to="./enrollments">My Enrollments</Link>
            </>
          )}
        </div>
          {user ? <UserButton/> : <button onClick={()=>openSignIn()}><img src={userIcon} alt="user-icon" /></button>}
      </div>
    </nav>
  );
};

export default NavBar;
