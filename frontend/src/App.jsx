import Footer from "./components/Footer"
import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {
  

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />

    </>
  )
}

export default App
