import { useForm } from 'react-hook-form'
import { createUser } from '../../lib/api'
import { IUserData } from '../../lib/types'
import styles from './Registration.module.scss'

export const Registration = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUserData>()

    const handleCreate = async (data: IUserData) => {
        createUser(data)
            .then(res => console.log(res))
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
