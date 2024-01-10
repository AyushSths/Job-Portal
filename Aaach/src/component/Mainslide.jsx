import React from 'react'
import Slide_1 from "../assets/images/front_pricture-transformed.png"

function Mainslide() {
    return (
        <div class="container">
            <div class="row">
                <div class="col desc" >
                    <h1>Give Your Look</h1>
                    <h1> A New <span>FASHION!</span></h1>
                    <p>"Fashion is part of the daily air and
                        it changes all the time, with all the events.
                        You can even see the approaching of a
                        revolution in clothes. You can see and feel
                        everything in clothes." <b>—Diana Vreeland
                        </b></p>
                    <a href="#featured" className="explore">Explore now</a>
                </div>
                <div class="col">
                    <img class="d-block slides" src={Slide_1} alt="First slide" />
                </div>
            </div>
        </div>
    )
}

export default Mainslide
