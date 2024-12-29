import { useForm } from "react-hook-form"
import styles from "./Login.module.scss"
import { IUserData } from "../../lib/types"
import { login } from "../../lib/api"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../store/store"
import { updateAuth } from "../../store/actions/userActions"

export const Login = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IUserData>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleEnter = async (data: IUserData) => {
    login(data)
      .then(res => {
        if (res.status == 'ok') {
          reset()
          dispatch(updateAuth(true))
          navigate(`/profile/${data.username}`)
        }
      })
  }

  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.container}`}>
        <div className={styles.login}>
          <h3 className={styles.title}>Log In</h3>
          <form className={styles.form} onSubmit={handleSubmit(handleEnter)}>
            <div className={styles.fieldBlock}>
              <input
                type="text"
                placeholder="Username"
                className={`field`}
                {...register("username", {
                  required: "Username is required",
                  maxLength: { value: 15, message: "Username cannot exceed 15 characters" }
                })}
              />
              <p className={styles.helper}>{errors.username && errors.username.message}</p>
            </div>
            <div className={styles.fieldBlock}>
              <input
                type="password"
                placeholder="Password"
                className={`field`}
                {...register("password", {
                  required: "Password is required",
                  maxLength: { value: 20, message: "Password cannot exceed 20 characters" }
                })}
              />
              <p className={styles.helper}>{errors.password && errors.password.message}</p>
            </div>
            <button className={"button"}>Log in</button>
          </form>
        </div>
      </div>
    </div>
  )
}
