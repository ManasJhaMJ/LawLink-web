import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
import LawyerCard from './Components/LawyerCard'
import Connect from './Components/Connect'

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      
    </>
  )
}

export default App