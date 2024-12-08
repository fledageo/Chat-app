import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "./components/complex/Layout/Layout"
import { Registration } from "./pages/Registration/Registration"
import { Login } from "./pages/Login/Login"
import { Profile } from "./pages/Profile/Profile"

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {
        path:"/registration",
        element:<Registration/>
      },
      {
        path:"/login", 
        element:<Login/>
      },
      {
        path:"/profile", 
        element:<Profile/>
      },
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
export default App