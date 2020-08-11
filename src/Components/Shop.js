import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/shop.module.css'
import firebase from '../config/Firebase'
import AOS from 'aos';
import 'aos/dist/aos.css';
import UserContext from './UserContext';

AOS.init();

const Shop = () => {

    const [Loading, setLoading] = useState(true)
    const [Products, setProducts] = useState(null)
    const { User } = useContext(UserContext);

    const db = firebase.firestore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        db.collection('products').get().then((result) => {
            setProducts(result.docs);
            setLoading(false)
        });
    }, [db])

    // ADDING TO CART

    const addToCart = (product) => {
        db.collection('users').doc(User.uid).get().then(data => {
            const resultData = data.data();
            if (resultData.cart === null || resultData.cart === undefined) {
                db.collection('users').doc(User.uid).set({ cart: [{ product: [product], quantity: 1 }] }, { merge: true })
            } else {
                const updatedCart = resultData.cart;
                updatedCart.push({ product: [product], quantity: 1 });
                db.collection('users').doc(User.uid).set({ cart: updatedCart }, { merge: true })
            }
        })

    }

    return (
        <div style={{ backgroundColor: '#f7f7f7' }}>
            <div className={styles.head}>
                <h1>Products</h1>
                <p>Explore a wide range of products from our store.</p>
            </div>
            <div className={styles.shop}>
                <div className={styles['left-col']}>
                    <div>
                        <h2>CLOTHING</h2>
                        <p>Shirts</p>
                        <p>Tops</p>
                        <p>Jeans</p>
                        <p>Jackets</p>
                        <p>Winter Coats</p>
                        <p>Trousers</p>
                        <p>Hoodies</p>
                        <p>Jumpsuits</p>
                    </div>
                    <div>
                        <h2>JEANS</h2>
                        <p>Denims</p>
                        <p>Zara</p>
                        <p>Lee Cooper</p>
                        <p>BHS</p>
                    </div>
                    <div>
                        <h2>BAGS &<br /> ACCESSORIES</h2>
                        <p>Cluthes</p>
                        <p>Backpacks</p>
                        <p>Purses</p>
                    </div>
                    <div>
                        <h2>SHOES</h2>
                        <p>Nike</p>
                        <p>Adidas</p>
                        <p>Bahamas</p>
                        <p>Skechers</p>
                        <p>Puma</p>
                        <p>Reebok</p>
                        <p>Bata</p>
                        <p>Lapel</p>
                    </div>
                </div>
                <div className={styles['right-col']}>
                    {Loading && <p>Loading...</p>}
                    {Products && Products.map(product => {

                        return (
                            <div key={product.data().name} className={styles.card} data-aos='fade-up' data-aos-duration='800'>
                                <div>
                                    {/* <button onClick={() => {
                                        const productData = product.data();
                                        addToCart(productData);
                                    }}>
                                        ADD TO CART
                                    </button> */}
                                    <div style={{ backgroundImage: `url(${product.data().image}` }}></div>
                                </div>
                                <Link style={{ textDecoration: 'none' }} to={`/shop/${product.data().id}`}><h3>{product.data().name}</h3></Link>
                                <p>${product.data().price.toFixed(2)}</p>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div >
    )
}

export default Shop
