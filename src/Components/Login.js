import React, { useContext } from 'react'
import styles from '../css/login.module.css'
import 'aos/dist/aos.css';
import * as firebaseAuth from '../config/FirebaseAuth'
import UserContext from '../Components/UserContext'

const Login = (props) => {

    const { setUser } = useContext(UserContext);


    const HandleGoogleSignIn = async (e) => {
        e.preventDefault();
        const newUser = await firebaseAuth.GoogleSignIn();
        if (newUser.code === undefined) {
            setUser({
                name: newUser.user.displayName,
                email: newUser.user.email,
                uid: newUser.user.uid
            })
        }
        props.history.push('/shop');
    }

    // const HandleFacebookSignIn = async (e) => {
    //     e.preventDefault();
    //     const newUser = await firebaseAuth.FacebookSignIn();
    //     if (newUser.code === undefined) {
    //         setUser({
    //             name: newUser.user.displayName,
    //             email: newUser.user.email,
    //             uid: newUser.user.uid
    //         })
    //     }
    //     props.history.push('/shop');
    // }

    return (
        <div className={styles['login']}>
            <div className={styles['card-container']}>
                <div className={styles.card}>
                    <h1>Login</h1>
                    <p>Login to get exclusive member benifits and get instant updates to latest sales and discounts</p>
                    <button onClick={HandleGoogleSignIn} data-aos='fade-up' data-aos-duration='1000' data-aos-delay='100' className={styles.google}>Sign in with Google</button>
                    {/* <button onClick={HandleFacebookSignIn} data-aos='fade-up' data-aos-duration='1000' data-aos-delay='300' className={styles.facebook}>Sign in with Facebook</button> */}
                </div>
            </div>
            <div className={styles['right-col']} />

        </div >
    )
}

export default Login
