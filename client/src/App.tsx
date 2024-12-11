import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "./components/complex/Layout/Layout"
import { Registration } from "./pages/Registration/Registration"
import { Login } from "./pages/Login/Login"
import { Profile } from "./pages/Profile/Profile"
import { Provider } from "react-redux"
import store, { useAppDispatch } from "./store/store"
import { useEffect } from "react"
import { verifyAuth } from "./lib/api"
// import { checkAuth } from "./store/actions/userActions"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/registration",
        element: <Registration />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/profile/:username",
        element: <Profile />
      },
    ]
  }
])

const App = () => {
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   verifyAuth()
  //     .then(res => {
  //       if (res.status == "ok") {
  //         dispatch(checkAuth(true))
  //       } else {
  //         dispatch(checkAuth(false))
  //       }

  //     })
  // }, [])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
export default App