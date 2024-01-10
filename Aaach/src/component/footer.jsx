import React from "react";
import insta from "../assets/images/logo_insta.jpg"
import facebook from "../assets/images/logo-facebook.jpg"
import twitter from "../assets/images/logo-twitter.jpg"
import cococola from "../assets/images/logo-coca-cola.png"
import godrej from "../assets/images/logo-godrej.png"
import oppo from "../assets/images/logo-oppo.png"
import paypal from "../assets/images/logo-paypal.png"
import philips from "../assets/images/logo-philips.png"

export default function Footer() {
    return (
        <>
            <footer>
                <div class="about">
                    <h3 class="title" id="about">About Us</h3>
                    <p>E-commerce has evolved over the past few years and since it’s easier and more convenient, it is evident
                        that customers are
                        actually switching to the trend of online shopping. Aacchh, the Nepali shopping store, brings a whole
                        new concept by showcasing
                        a number of famous brands under one roof.We provide all kinds of brands that you are looking for not
                        only men and women but kinds
                        also. Not only clothing producta we provide other kinds of producta also like watch,sunglasses,wallets
                        and a lot more.
                        Aacchh is the ultimate Nepali eCommerce website that offers a solution for all needs of the customers.
                        It has a wide and assorted
                        range of products including clothing, electronics, mobile phones, home and living, health and beauty and
                        much more.</p>
                </div>
                <div class="brands">
                    <div class="small-container">
                        <div class="row-brand">
                            <div class="col-5"><img src={cococola} /></div>
                            <div class="col-5"><img src={godrej} /></div>
                            <div class="col-5"><img src={oppo} /></div>
                            <div class="col-5"><img src={paypal} /></div>
                            <div class="col-5"><img src={philips} /></div>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div class="footer-text">
                        <p id="contact">Contact us</p>
                        <p>9832424564,9845236718</p>
                    </div>
                    <ul class="footer-logo">
                        <li><a href="https://www.facebook.com" target="_blank"><img src={facebook} /></a></li>
                        <li><a href="#"><img src={insta} /></a></li>
                        <li><a href="#"><img src={twitter} /></a></li>
                    </ul>
                    <div class="footer-text">
                        <p>TermsFeed © 2022</p>
                    </div>
                    <div class="footer-text">
                        <p>Disclaimer: Legal information is not legal advice, read the disclaimer. The information
                            provided on this site is not legal advice, does not constitute a lawyer referral service, and no
                            attorney-client
                            or confidential relationship is or will be formed by use of the site.

                            <h5>Copyright &copy; 2022 - All rights reserved</h5>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}