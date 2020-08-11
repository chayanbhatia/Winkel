import React from 'react'
import styles from '../css/footer.module.css'
import twitterSvg from '../icons/twitter.svg'
import facebookSvg from '../icons/facebook.svg'
import instagramSvg from '../icons/instagram.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init()

const Footer = () => {
    return (
        <div style={{ backgroundColor: '#f7f7f7' }} className={styles['footer']}>
            <div>
                <h4>WINKEL</h4>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
                <div className={styles['socials']} data-aos='fade-up' data-aos-duration='1000'>
                    <div><img src={twitterSvg} alt="twitter" /></div>
                    <div> <img src={facebookSvg} alt="facebook" /></div>
                    <div> <img src={instagramSvg} alt="instagram" /></div>
                </div>
            </div>
            <div>
                <h4>MENU</h4>
                <p>Shop</p>
                <p>About</p>
                <p>Journal</p>
                <p>Contact Us</p>
            </div>
            <div>
                <h4>Help</h4>
                <p>Shipping Information</p>
                <p>Return & Exchange</p>
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
                <p>FAQs</p>
                <p>Contact</p>
            </div>
        </div>
    )
}

export default Footer
