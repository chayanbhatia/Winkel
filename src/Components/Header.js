import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from '../css/header.module.css';
import phoneSvg from '../icons/phone.svg'
import sendSvg from '../icons/send.svg'
import deliverySvg from '../icons/delivery.svg'
import cartSvg from '../icons/cart.svg'
import * as firebaseAuth from '../config/FirebaseAuth'

const Header = () => {
    const [Status, setStatus] = useState('Log In');
    const [IsOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        if (localStorage.getItem('authToken')) {
            setStatus('Log Out');
            firebaseAuth.logout();
        }
        else {
            setStatus('Log In');
        }
    }

    return (

        <div className={styles['header']}>
            {IsOpen &&
                <div className={styles['overlay']} onClick={() => {
                    setIsOpen(!IsOpen)
                }}></div>
            }
            <div className={styles['top-row']}>
                <p><img src={phoneSvg} alt="phone" /> + 1235 2355 98</p>
                <p><img src={sendSvg} alt="send" />YOUREMAIL@EMAIL.COM</p>
                <p><img src={deliverySvg} alt="delivery" />3-5 BUSINESS DAYS DELIVERY & FREE RETURNS</p>
            </div>
            <div className={styles['bottom-row']}>
                <h1>WINKEL</h1>
                <div className={styles['nav-items']}>
                    <Link to='/' className={styles.link}>HOME</Link>
                    <Link to='/shop' className={styles.link}>SHOP</Link>

                    {!localStorage.getItem('authToken') ? <Link to='/login' onClick={handleClick} className={styles.log}>Login</Link> : <Link to='/' onClick={handleClick} className={styles.log}>Logout</Link>}
                    <div>
                        <img src={cartSvg} alt="cart" /><div />
                    </div>
                </div>
                {!IsOpen &&
                    <div onClick={() => setIsOpen(!IsOpen)} className={styles.hamburger}>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                }
                {IsOpen &&
                    <div className={styles.drawer}>
                        <Link to='/' className={styles.link}>HOME</Link>
                        <Link to='/shop' className={styles.link}>SHOP</Link>
                        {!localStorage.getItem('authToken') ? <Link to='/login' onClick={() => {
                            setIsOpen(false);
                            handleClick()
                        }} className={styles.log}>{Status}</Link> : <Link to='/' onClick={handleClick} className={styles.log}>{Status}</Link>}
                        <div>
                            <img src={cartSvg} alt="cart" /><div />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header
