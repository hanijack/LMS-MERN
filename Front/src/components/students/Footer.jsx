import logo from "../../assets/react.svg"


const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-32 text-left w-full mt-10 '>
        <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap:24 py-10 border-b border-white/40'>
            <div className="flex flex-col md:items-start items-center w-full">
                <img src={logo} alt="logo" />
                <p className="mt-6 text-center md:text-left text-sm text-white/70">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod sunt quis laborum enim suscipit porro nulla mollitia deleniti, cum rem consectetur officia.</p>

            </div>
            <div className="flex flex-col md:items-start items-center w-full">
                <h2 className="text-white font-semibold mb-4">Company</h2>
                <ul className="flex flex-col w-full justify-between text-sm text-white/70 gap-2 ">
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Courses</a></li>
                    <li><a href="">Contact us</a></li>
                </ul>
            </div>
            <div className="hidden md:flex flex-col items-start w-full ">
                <h2 className="font-semibold text-white mb-4">Subscribe </h2>
                <p className="text-sm text-white/80">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, adipisci! Optio, ipsum!</p>
                <div className="flex items-center gap-2 py-2">
                    <input type="email" placeholder="Enter your email"  className="border border-gray-500/30 bg-gray-700 text-gray-400 placeholder-gray-400 outline-none w-64 rounded h-8 px-2 text-sm"/>
                    <button className="bg-blue-600 w-24 text-white rounded h-8">Subscribe</button>
                </div>
            </div>
        </div>
        <p className="text-center text-xs md:text-sm py-4 text-white/50">Copyright 2025 Hani Darklt . All Right Reserved</p>
    </footer>
  )
}

export default Footer