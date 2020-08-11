import React, { useContext, useState, useEffect } from 'react';
import styles from '../css/cart.module.css'
import UserContext from './UserContext'
import firebase from '../config/Firebase'

const Cart = () => {
    const [Cart, setCart] = useState(null)
    const [Loading, setLoading] = useState(true)
    const { User } = useContext(UserContext)
    const db = firebase.firestore();
    const [Total, setTotal] = useState(0);


    useEffect(() => {
        if (User) {
            db.collection('users').doc(User.uid).get()
                .then((data) => {
                    setCart(data.data().cart)
                }).then(() => {
                    setLoading(false)
                })
        }
    }, [User])

    useEffect(() => {
        if (Cart) {
            db.collection('users').doc(User.uid).set({ cart: Cart }, { merge: true });
            console.log(Cart)
            Cart.forEach(e => {
                setTotal(e.product.price * e.quantity);
                console.log(Total)
            })
            setLoading(false)
        }
    }, [Cart])

    if (Loading) return <p>Loading</p>

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h2 className={styles.first}>Product</h2>
                <h2 className={styles.second}>Price</h2>
                <h2 className={styles.second}>Quantity</h2>
                <h2 className={styles.second}>Total</h2>
            </div>
            {Cart.map((product, i) => {

                const removeFromCart = () => {
                    setCart(Cart.filter((_, index) => { return index !== i }));
                }


                return (
                    <div className={styles.row}>
                        <div className={styles.first}>
                            <button onClick={removeFromCart}>x</button>
                            <img draggable='false' src={product.product.image} alt="product" />
                            <div>
                                <h3>{product.product.name}</h3>
                                <p>{product.size}</p>
                            </div>
                        </div>
                        <div className={styles.second}>${product.product.price.toFixed(2)}</div>
                        <div className={styles.second}>{product.quantity}</div>
                        <div className={styles.second}>${(product.quantity * product.product.price).toFixed(2)}</div>
                    </div>
                )
            })}
            <div className={styles.bill}>

                <div> Total: <h1>${Total.toFixed(2)}</h1></div>
            </div>
        </div>
    )
}

export default Cart
