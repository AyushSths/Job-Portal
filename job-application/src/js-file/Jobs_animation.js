// import React from "react";
// import { useState, useEffect } from "react";

// export default function Jobs_animation() {

//     const [scroll, setscroll] = useState(false);
//     useEffect(() => {
//         window.addEventListener("scroll", () => {
//             if (window.scrollY > 100) {
//                 setscroll(true)
//             }
//             else {
//                 setscroll(false)
//             }
//         })
//     }, [])

//     const scrollUp = () => {
//         window.scrollTo({
//             top: 0,
//             behaviour: "smooth"
//         })
//     }
//     return (
//         <>
//             <div class="up-arrow" >
//                 {
//                     uparrow &&
//                     <button onClick={scrollUp}><img src={up_arrow} /></button>
//                 }
//             </div>
//         </>
//     )
// }
