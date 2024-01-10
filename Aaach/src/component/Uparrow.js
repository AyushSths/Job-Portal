import React from "react";
import { useState, useEffect } from "react";
import up_arrow from "../assets/images/up-arrow-transformed.png"

export default function Uparrow() {

    const [uparrow, setUparrow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setUparrow(true)
            }
            else {
                setUparrow(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behaviour: "smooth"
        })
    }
    return (
        <>
            <div class="up-arrow" >
                {
                    uparrow &&
                    <button onClick={scrollUp}><img src={up_arrow} /></button>
                }
            </div>
        </>
    )
}
