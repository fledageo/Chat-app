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
                if(res.status === "ok"){
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
                        <button className={"button"}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
