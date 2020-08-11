import React, { useState, useEffect, useContext } from 'react'
import styles from '../css/product.module.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import firebase from '../config/Firebase'
import UserContext from './UserContext'


AOS.init();

const Product = ({ match }) => {
    const [Loading, setLoading] = useState('true');
    const [Product, setProduct] = useState(null);
    const [SelectedSize, setSelectedSize] = useState(null);
    const [Quantity, setQuantity] = useState(1);
    const { User } = useContext(UserContext)

    // GETTING DATA
    const db = firebase.firestore();

    useEffect(() => {
        db.collection('products').doc(match.params.pid).get().then((data) => {
            setProduct(data.data());
            setSelectedSize(data.data().sizes[0]);

        });

    }, [db, match.params.pid])

    useEffect(() => {
        if (User && Product) {
            setLoading(false)
        }
    }, [User, Product])


    // QUANTITY FUNTIONALITY

    const handleChange = (e) => {
        if (e.target.value === '') {
            setQuantity('')
        }
        else if (parseInt(e.target.value) <= SelectedSize.quantity) {
            setQuantity(e.target.value);
        }
        else
            setQuantity(SelectedSize.quantity)
    }

    const add = () => {
        let quant = Quantity;
        if (quant < SelectedSize.quantity)
            setQuantity(++quant)
    }

    const subtract = () => {
        let quant = Quantity;
        if (quant > 1)
            setQuantity(--quant);
    }

    // SELECTING SIZE

    const handleSize = (e) => {
        Product.sizes.map((size) => {
            if (size.size === e.target.value)
                setSelectedSize(size);
        })
        setQuantity(1);
    }


    // ADDIGN TO CART

    const addToCart = async () => {
        const data = await db.collection('users').doc(User.uid).get();
        const user = data.data();
        const cart = user.cart;

        if (cart === null || cart === undefined) {
            db.collection('users').doc(User.uid).set({
                cart: [{ product: Product, quantity: Quantity, size: SelectedSize.size }]
            }, { merge: true });
        } else {
            var flag = false;
            cart.forEach((item) => {
                if (item.product.id === Product.id) {
                    item.quantity += Quantity;

                    flag = true
                    return
                }
            })
            if (flag === false) {

                cart.push({ product: Product, quantity: Quantity, size: SelectedSize.size });
            }
            db.collection('users').doc(User.uid).set({ cart }, { merge: true });
            console.log(cart)
        }
    }


    if (Loading) return <div>Loading...</div>

    return (
        <div className={styles.product}>
            <div className={styles['left-col']} data-aos='fade-down' data-aos-duration='1000'>
                <img draggable='false' src={Product.image} alt="man" />
            </div>
            <div className={styles['right-col']} data-aos='fade-up' data-aos-duration='1000'>
                <div>
                    <h1>{Product.name}</h1>

                    <div className={styles.price}>
                        <h3>${Product.price.toFixed(2)}</h3>
                    </div>
                    <p className={styles['description']}>
                        {Product.description}
                    </p>
                    <div className={styles['size-border']}>
                        <select onChange={(e) => { handleSize(e) }} name="size" id="size">
                            {Product.sizes.map((size) => {

                                if (size.quantity > 0) return <option key={size.size} value={size.size}>{size.size}</option>

                            })}
                        </select>
                    </div>
                    <div className={styles.quantity}>
                        <button onClick={subtract}>-</button>
                        <input type="number" onChange={(e) => handleChange(e)} value={Quantity} />
                        <button onClick={add}>+</button>
                    </div>
                    <p className={styles.availability}>{SelectedSize.quantity} piece available</p>
                    {Quantity === SelectedSize.quantity && <p style={{ color: 'red', marginTop: '-10px' }}>maximum quantity selected!</p>}
                    <button className={styles['add-to-cart']} onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product
