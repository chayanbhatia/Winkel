import React, { useState, useEffect } from 'react'
import styles from '../css/home.module.css'
import manJpg from '../icons/man.jpg'
import womanJpg from '../icons/woman.jpg'
import newWomanJpg from '../icons/new-woman.jpg'
import shipmentJpg from '../icons/shipment.jpg'
import pageSelctedSvg from '../icons/pageSelected.svg'
import pageUnselectedSvg from '../icons/pageUnselected.svg'
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Home = () => {

    const [Display, setDisplay] = useState(1);

    var to;

    const changeDisplay = (slide) => {

        if (Display !== slide) setDisplay(slide);
        window.clearTimeout(to);
    }

    useEffect(() => {
        to = window.setTimeout(() => {
            Display === 1 ? setDisplay(2) : setDisplay(1);
        }, 6000);

    }, [Display])

    useEffect(() => {
        AOS.init();
    }, [])


    return (
        <div>
            <div className={styles['display']}>
                {Display === 1 &&
                    <div className={styles['display-slides']}>
                        <div className={`${styles['display-left-col']} ${styles['display-left-col-1']}`} >
                            <div data-aos="fade-right" data-aos-duration="1000">

                                <h1 style={{ fontSize: '3rem', fontWeight: '500' }}>Catch Your Own <div style={{ fontWeight: 'bold' }}>Stylish Look</div></h1>
                                <p style={{ fontSize: '1.2rem' }}>A small inspirational designs taken from the niagra falls is the blue color which we implied into the jacket.</p>
                                <button>Discover Now</button>

                            </div>
                        </div>
                        <div data-aos='fade-left' data-aos-duration="1000" className={styles['display-right-col']}><img src={manJpg} alt="man" /></div>
                    </div>
                }
                {Display === 2 &&
                    <div className={styles['display-slides']}>
                        <div className={`${styles['display-left-col']} ${styles['display-left-col-2']}`} >
                            <div data-aos="fade-right" data-aos-duration="1000">

                                <h1 style={{ fontSize: '3rem', fontWeight: '500' }}>A Thoroughly <div style={{ fontWeight: 'bold' }}>Modern Woman</div></h1>
                                <p style={{ fontSize: '1.2rem' }}>Inspired from the Siberian snow, this our new snow white collection.</p>
                                <button>Shop Now</button>

                            </div>
                        </div>
                        <div data-aos='fade-left' data-aos-duration="1000" className={styles['display-right-col']}><img src={womanJpg} alt="woman" /></div>
                    </div>
                }
                <div className={styles['page-dots']}>
                    <div>{Display === 1 ? <img src={pageSelctedSvg} alt='.' /> : <img src={pageUnselectedSvg} alt='.' onClick={() => changeDisplay(1)} />}</div>
                    <div>{Display === 2 ? <img src={pageSelctedSvg} alt='.' /> : <img src={pageUnselectedSvg} alt='.' onClick={() => changeDisplay(2)} />}</div>
                </div>
            </div>


            <div className={styles["shipment"]}>
                <div className={styles['shipment-left-col']}><img src={shipmentJpg} alt="boxes" /></div>
                <div className={styles['shipment-right-col']} data-aos-duration="1000" data-aos="fade-up">
                    <h2>Better Way to Ship Your Products</h2>
                    <p>But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
                    <div className={styles['shipment-col']} >
                        <div>
                            <h3>Refund Policy</h3>
                            <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                        </div>
                        <div>
                            <h3>Premium Packaging</h3>
                            <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                        </div>
                        <div>
                            <h3>Superior Quality</h3>
                            <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* <div className={styles['best-sellers']}>
                <h1>Best Sellers</h1>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
            </div> */}
            <div style={{ margin: '30px auto' }} className={styles['new-collection']}>
                <div className={styles['collection-top']}>
                    <img src={newWomanJpg} alt="woman" />
                    <div>
                        <div data-aos="fade-up" data-aos-duration="1000">

                            <h1>
                                NEW WOMEN'S CLOTHING SUMMER COLLECTION 2019
                                </h1>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                            <button>Shop Now</button>

                        </div>
                    </div>
                </div>
                <div className={styles['collection-bottom']}>
                    <div>
                        <div data-aos="fade-up" data-aos-duration="1000">

                            <h1>NEW MEN'S CLOTHING SUMMER COLLECTION 2019</h1>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                            <button>Shop Now</button>

                        </div>
                        <img src={manJpg} alt="man" />
                    </div>
                </div>
            </div>
            {/* <div className={styles['products']}>
                <h1>Products</h1>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
            </div> */}
            <div className={styles['counters']}>
                <div data-aos="fade-up" >

                    <div>
                        <CountUp end={23468} redraw={true}>
                            {({ countUpRef, start }) => (
                                <VisibilitySensor onChange={start} delayedCall>
                                    <span ref={countUpRef} />
                                </VisibilitySensor>
                            )}
                        </CountUp>
                        <p>Happy Customers</p>

                    </div>
                    <div>
                        <CountUp end={26} redraw={true}>
                            {({ countUpRef, start }) => (
                                <VisibilitySensor onChange={start} delayedCall>
                                    <span ref={countUpRef} />
                                </VisibilitySensor>
                            )}
                        </CountUp>
                        <p>Branches</p>

                    </div>
                    <div>
                        <CountUp end={126} redraw={true}>
                            {({ countUpRef, start }) => (
                                <VisibilitySensor onChange={start} delayedCall>
                                    <span ref={countUpRef} />
                                </VisibilitySensor>
                            )}
                        </CountUp>
                        <p>Partners</p>

                    </div>
                    <div>
                        <CountUp end={73} redraw={true}>
                            {({ countUpRef, start }) => (
                                <VisibilitySensor onChange={start} delayedCall>
                                    <span ref={countUpRef} />
                                </VisibilitySensor>
                            )}
                        </CountUp>
                        <p>Awards</p>

                    </div>

                </div>
            </div>
            <div className={styles['newsletter']} data-aos="fade-up" data-aos-duration="1000">

                <h1>Subscribe to our Newsletter</h1>
                <div>
                    <input placeholder="ENTER YOUR EMAIL ADDRESS" type="email" name="email" id="email" />
                    <button>SUBSCRIBE</button>
                </div>


            </div>
        </div>
    )
}

export default Home
