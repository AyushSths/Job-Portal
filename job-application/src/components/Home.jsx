import React from 'react';
import { Link } from 'react-router-dom';
import home_image from '../assets/images/home_image.jpg'
import search from "../assets/images/search.png"
import accounting from "../assets/images/accounting.png"
import it from "../assets/images/information-technology.png"
import education from "../assets/images/education.png"
import engineer from "../assets/images/engineer.png"
import management from "../assets/images/management.png"
import medical from "../assets/images/medical-symbol.png"
import music from "../assets/images/music.png"
import research from "../assets/images/research.png"
import TopJobs from './pages/TopJobs';
import HotJobs from './pages/HotJobs'
import FeaturedJobs from './pages/FeaturedJobs'
import NormalJobs from './pages/NormalJobs'
import { useState } from 'react';

function Home() {
    const [showHotJobs, setShowHotJobs] = useState(false);
    const [showTopJobs, setShowTopJobs] = useState(true);
    const [showFeaturedJobs, setShowFeaturedJobs] = useState(false);
    const [showNormalJobs, setShowNormalJobs] = useState(false);

    const handleHotJobsClick = () => {
        setShowHotJobs(true);
        setShowTopJobs(false);
        setShowFeaturedJobs(false);
        setShowNormalJobs(false)
    };

    const handleTopJobsClick = () => {
        setShowHotJobs(false);
        setShowTopJobs(true);
        setShowFeaturedJobs(false);
        setShowNormalJobs(false)

    };

    const handleFeaturedJobsClick = () => {
        setShowHotJobs(false);
        setShowTopJobs(false);
        setShowFeaturedJobs(true);
        setShowNormalJobs(false)
    };

    const handleNormalJobsClick = () => {
        setShowHotJobs(false);
        setShowTopJobs(false);
        setShowFeaturedJobs(false);
        setShowNormalJobs(true)
    };
    return (
        <>
            <div className="home">
                <div className="container">
                    <img src={home_image} alt="" className='home_img' />
                    <div class="dark-overlay"></div>
                    <div className="info">
                        <h1 style={{ display: "block", textAlign: "center", fontSize: "60px" }}>Find your dream job!</h1>
                        <p style={{ fontSize: "30px" }}>A dream doesn't become reality through magic; it takes sweat, determination and hard work....</p>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search by job title, categorey, company" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit"><img src={search} alt="" /></button>
                        </form>
                    </div>
                </div>
                <div className="categorey">
                    <div className="cat_list">
                        <div className='cat_img'><img src={accounting} alt="" /></div>
                        <div className="cat_desc" style={{ marginTop: "10px" }}>
                            <p>Accounting / Finance</p>
                        </div>
                    </div>
                    <div className="cat_list">
                        <div className="cat_img"><img src={it} alt="" /></div>
                        <div className="cat_desc" style={{ marginTop: "10px" }}>
                            <p>Information technology</p>
                        </div>
                    </div>
                    <div className="cat_list">
                        <div className="cat_img"><img src={education} alt="" /></div>
                        <div className="cat_desc" style={{ marginTop: "10px" }}>
                            <p>Education / Training</p>
                        </div>
                    </div>
                    <div className="cat_list">
                        <div className="cat_img"><img src={research} alt="" /></div>
                        <div className="cat_desc" style={{ marginTop: "10px" }}>
                            <p>Reseach / Consultancy</p>
                        </div>
                    </div>
                    <div className="cat_list">
                        <div className="cat_img"><img src={management} alt="" /></div>
                        <div className="cat_desc" style={{ marginTop: "10px" }}>
                            <p>Human Resource</p>
                        </div>
                    </div>
                    <div className="cat_list">
                        <div className="cat_img"><img src={medical} alt="" /></div>
                        <div className="cat_desc" style={{ marginTop: "10px" }}>
                            <p>Medical / Pharmacy</p>
                        </div>
                    </div>
                    <div className="cat_list">
                        <div className="cat_img"><img src={music} alt="" /></div>
                        <div className="cat_desc" style={{ marginTop: "10px" }}>
                            <p>Music / Arts</p>
                        </div>
                    </div>
                    <div className="cat_list">
                        <div className="cat_img"><img src={engineer} alt="" /></div>
                        <div className="cat_desc" style={{ marginTop: "10px" }}>
                            <p>Engineer / Architects</p>
                        </div>
                    </div>
                </div>
                <div className="section-list">
                    <div className="section-titles">
                        <h4>Latest Jobs</h4>
                        <ul className="tab-menu" style={{ display: "flex" }}>
                            <li className="menu-item"><a className='item-link' href="#top-jobs" onClick={handleTopJobsClick}>Top jobs</a></li>
                            <li className="menu-item"><Link className='item-link' to="#hot-jobs" onClick={handleHotJobsClick}>Hot jobs</Link></li>
                            <li className="menu-item"><Link className='item-link' to="#featured-jobs" onClick={handleFeaturedJobsClick} >Featured jobs</Link></li>
                            <li className="menu-item"><Link className='item-link' to="#normal-jobs" onClick={handleNormalJobsClick}>Normal jobs</Link></li>
                        </ul>
                    </div>
                    <div className="jobs">
                        {showHotJobs && <HotJobs />}
                        {showTopJobs && <TopJobs />}
                        {showFeaturedJobs && <FeaturedJobs />}
                        {showNormalJobs && <NormalJobs />}
                    </div >
                </div>
            </div >

        </>

    )
}

export default Home
