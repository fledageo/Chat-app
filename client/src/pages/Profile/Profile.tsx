import { useEffect } from 'react'
import { verifyAuth } from '../../lib/api'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
  const navigate = useNavigate()

  useEffect(() => {
    verifyAuth()
    .then(res => {
      console.log(res)
      if(res.status == "error"){
        navigate("/login")
      }
    })
  },[])
  return (
    <div>Profile</div>
  )
}
