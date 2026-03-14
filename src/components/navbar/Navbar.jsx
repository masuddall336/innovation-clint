import './Navbar.css'

import logo from '/logo/IPCL_logo.png'
import logo_name from '/logo/IPCL_name_logo.png'
import call from '/icon/phone-call.png'
import facebook from '/icon/facebook.png'
import linkdin from '/icon/linkDin.png'
import threeline from '/icon/threeLine.png'
import crossIcon from '/icon/crossicon.jpg'

import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../firebase/AuthContext'

import Contact_map from '../contatUsMap/Contat_map'

export default function Navbar() {
    const { user, signOutUser } = useContext(AuthContext)

    const [aboutOpen, setAboutOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [responsiveOpen, setResponsiveOpen] = useState(false)
    const [activePath, setActivePath] = useState('/')
    const [aboutActive, setAboutActive] = useState(false)
    const [animateDone, setAnimateDone] = useState(false)
    const [contactOpen, setContactOpen] = useState(false)

    const location = useLocation()

    const closeResponsive = () => setResponsiveOpen(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setActivePath(location.pathname)
        setAboutActive(['/qc-qa'].includes(location.pathname))
    }, [location.pathname])

    useEffect(() => {
        const hasAnimated = sessionStorage.getItem("navbarAnimated")
        if (!hasAnimated) {
            setAnimateDone(true)
            sessionStorage.setItem("navbarAnimated", "true")
        }
    }, [])

    const AnimatedLetters = ({ text }) => (
        <span className="letter-container">
            {text.split('').map((char, idx) => (
                <span
                    key={idx}
                    className={`letter ${animateDone ? 'animate' : ''}`}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                >
                    {char}
                </span>
            ))}
        </span>
    )

    const menuItems = [
        { path: '/', label: 'Home' },
        { path: '/sustainability', label: 'Sustainability' },
        { path: '/products', label: 'Product' },
        { path: '/contact-us', label: 'Location' },
    ]

    const aboutItems = [
        { path: '/qc-qa', label: 'QC & QA' },
        { path: '/contact-us', label: 'Contact-Us' }
    ]

    return (
        <div>
            {/* Overlay */}
            <div
                className={`overlay ${responsiveOpen ? 'show' : ''}`}
                onClick={closeResponsive}
            />

            <nav
                className={`fixed left-1/2 transform -translate-x-1/2 z-20 flex justify-between items-center 
                    transition-all duration-500 mobile-top-fix
                    ${scrolled
                        ? 'top-0 w-full rounded-none bg-white shadow-lg'
                        : 'top-11 w-[90%] rounded-xl bg-white'
                    }`}
            >
                {/* MOBILE MENU ICON */}
                <div id="threeline">
                    <img
                        className="w-8"
                        src={threeline}
                        alt="menu"
                        onClick={() => setResponsiveOpen(true)}
                    />
                </div>

                {/* MOBILE MENU */}
                <div id="responsive" className={responsiveOpen ? 'show' : ''}>
                    <div id="cross_icon" onClick={closeResponsive}>
                        <img className="w-7" src={crossIcon} alt="close" />
                    </div>

                    <img src={logo} alt="company logo" />

                    <ul id="reponsive_ul">
                        {menuItems.map((item, idx) => (
                            <li key={idx}>
                                {item.path === '/contact-us' ? (
                                    <button
                                        className={`mobile_link ${activePath === item.path ? 'active' : ''}`}
                                        onClick={() => { setContactOpen(true); closeResponsive() }}
                                    >
                                        <AnimatedLetters text={item.label} />
                                    </button>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`mobile_link ${activePath === item.path ? 'active' : ''}`}
                                        onClick={closeResponsive}
                                    >
                                        <AnimatedLetters text={item.label} />
                                    </Link>
                                )}
                            </li>
                        ))}

                        {/* ABOUT */}
                        <li className="mobile_about">
                            <div
                                className={`mobile_link ${aboutActive ? 'active' : ''}`}
                                onClick={() => setAboutOpen(!aboutOpen)}
                            >
                                <AnimatedLetters text="About" />
                                <span className={`arrow ${aboutOpen ? "down" : ""}`} />
                            </div>

                            <ul className={`mobile_about_ul ${aboutOpen ? "open" : ""}`}>
                                {aboutItems.map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={item.path}
                                            className="mobile_sublink"
                                            onClick={closeResponsive}
                                        >
                                            <AnimatedLetters text={item.label} />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* LOGO */}
                <div id="company_logo" className="flex items-center">
                    <Link to="/">
                        <img className="w-36" src={logo} alt="logo" />
                    </Link>
                    <img className="w-76 name_logo" src={logo_name} alt="name" />
                </div>

                {/* DESKTOP MENU */}
                <div className="main_nav Full_size">
                    <ul className="flex gap-3 items-center nav_main">
                        {menuItems.map((item, idx) => (
                            <li key={idx}>
                                {item.path === '/contact-us' ? (
                                    <span
                                        onClick={() => setContactOpen(true)}
                                        className={`desktop_link ${activePath === item.path ? 'active' : ''}`}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <AnimatedLetters text={item.label} />
                                    </span>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`desktop_link ${activePath === item.path ? 'active' : ''}`}
                                    >
                                        <AnimatedLetters text={item.label} />
                                    </Link>
                                )}
                            </li>
                        ))}

                        <li className="about">
                            <span className={`desktop_link ${aboutActive ? 'active' : ''}`}>
                                <AnimatedLetters text="About" />
                            </span>
                            <ul className="about_ul w-[300%]">
                                {aboutItems.map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={item.path}
                                            className={`desktop_link ${activePath === item.path ? 'active' : ''}`}
                                        >
                                            <AnimatedLetters text={item.label} />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* SOCIAL ICONS */}
                <div id="Social_icons" className="flex items-center gap-3 ml-3">
                    {user && (
                        <button
                            className='bg-[#fff] py-1 hover:scale-95 cursor-pointer px-2 rounded font-bold text-[#805555]'
                            onClick={signOutUser}
                        >
                            Sign Out
                        </button>
                    )}

                    <a href="tel:+88-01700-760511">
                        <img className="w-7 bg-white p-1" src={call} alt='Call' />
                    </a>

                    <a
                        href="https://www.facebook.com/share/1BRWKkPB49/?mibextid=wwXIfr"
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        <img className="w-7 bg-white p-1" src={facebook} alt='Facebook' />
                    </a>

                    <a href="#" rel="noopener noreferrer">
                        <img className="w-7 bg-white p-1" src={linkdin} alt="Linkedin" />
                    </a>
                </div>
            </nav>

            <Contact_map
                isOpen={contactOpen}
                onClose={() => setContactOpen(false)}
            />
        </div>
    )
}