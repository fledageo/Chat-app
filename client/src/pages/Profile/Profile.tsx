import { useEffect } from 'react'
import { getUserByUsername, verifyAuth } from '../../lib/api'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setCurrentUser, updateAuth } from '../../store/actions/userActions'
import { IUserData } from '../../lib/types'

export const Profile = () => {
  const isAuth = useAppSelector(state => state.user.isAuth)
  const user = useAppSelector(state => state.user.currentUser)
  const dispatch = useAppDispatch()
  const {username} = useParams()


  useEffect(() => {
    verifyAuth().then(res => {
      if (res.status == "ok") {
        dispatch(updateAuth(true))
        if(username){
          getCurrentUser(username)
        }
        


        const ws = new WebSocket("http://localhost:5000")
        ws.onopen = () => {
          console.log("WebSocket connection established")
          ws.send(JSON.stringify({type:"auth",payload:username}))
        }
        ws.onmessage = (message) => {
          const data = JSON.parse(message.data) 
          console.log(data)
          console.log("namak")
          // console.log(data[1].username)
        }

        // return () => {
        //   ws.close();
        //   console.log("WebSocket closed on cleanup");
        // };

      } else {
        dispatch(updateAuth(false))
      }
    })
  },[])

  const getCurrentUser = (username:string) => {
      getUserByUsername(username)
      .then(res => {
        dispatch(setCurrentUser(res.data as IUserData))
      })
  }




  return (
    <div>Profile</div>
  )
}
