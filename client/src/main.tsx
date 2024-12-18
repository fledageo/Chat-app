import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.scss'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Profile } from './pages/Profile/Profile.tsx'
import { Login } from './pages/Login/Login.tsx'
import { Registration } from './pages/Registration/Registration.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>

    </RouterProvider>
    </Provider>
  </StrictMode>,
)
