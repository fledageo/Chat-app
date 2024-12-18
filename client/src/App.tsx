import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Layout } from "./components/complex/Layout/Layout"
import { useEffect } from "react"


const App = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/registration")
    }
  }, [])

  return (
    <>
      <Layout />
      <main>
        <Outlet />
      </main>
    </>
  )
}
export default App