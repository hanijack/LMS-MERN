import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center space-y-6 justify-center w-full md:pt-32 pt-18 px-7 md:px-0 text-center bg-gradient-to-b from-blue-100/80'>
      
      <h1 className='font-bold mx-auto max-w-2xl text-gray-800'>Hero , Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque saepe nam nihil, nemo modi distinctio!</h1>
      <p className='text-gray-500 max-w-2xl mx-auto '> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit porro eos mollitia rerum?</p>
      <SearchBar/>
    </div>
  )
}

export default Hero