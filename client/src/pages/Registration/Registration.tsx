import { useForm } from 'react-hook-form'
import { createUser } from '../../lib/api'
import { IUserData } from '../../lib/types'
import styles from './Registration.module.scss'
import { useNavigate } from 'react-router-dom'



export const Registration = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUserData>()
    const navigate = useNavigate()

    const handleCreate = async (data: IUserData) => {
        createUser(data)
            .then(res => {
                if (res.status === "ok") {
                    reset()
                    navigate("/login")
                }
            })
    }

    return (
        <div className={styles.wrapper}>
            <div className={`container ${styles.container}`}>
                <div className={styles.registration}>
                    <h3 className={styles.title}>Sign Up</h3>
                    <form className={styles.form} onSubmit={handleSubmit(handleCreate)}>
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
                        <button className={"button"}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
