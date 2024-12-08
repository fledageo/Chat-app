import { useForm } from "react-hook-form"
import styles from "./Login.module.scss"
import { IUserData } from "../../lib/types"
import { login } from "../../lib/api"
import { useNavigate } from "react-router-dom"

export const Login = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IUserData>()
  const navigate = useNavigate()

  const handleEnter = async (data: IUserData) => {
    login(data)
      .then(res => {
        if (res.status == 'ok') {
          reset()
          navigate("/profile")        
        }
      })
  }

  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.container}`}>
        <div className={styles.login}>
          <h3 className={styles.title}>Log In</h3>
          <form className={styles.form} onSubmit={handleSubmit(handleEnter)}>
            <input
              type="text"
              placeholder="Username"
              className={`field`}
              {...register("username")}
            />
            <input
              type="text"
              placeholder="Password"
              className={`field`}
              {...register("password")}
            />
            <button className={"button"}>Log in</button>
          </form>
        </div>
      </div>
    </div>
  )
}
