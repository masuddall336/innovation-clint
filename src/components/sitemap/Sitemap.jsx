import React from 'react'
import ScrollTop from '../ScrollTop'
import './sitemap.css'
import { Link } from 'react-router-dom'

const Sitemap = () => {
    return (
        <main className="sitemap-page">
            <ScrollTop />
            <div className="sitemap-shell">
                <p className="sitemap-eyebrow">Explore Innovation Plastic Cans Ltd.</p>
                <h1>Website Sitemap</h1>
                <p className="sitemap-intro">Find every important page and company resource from one place.</p>
                <div className="sitemap-grid">
                    <section className="sitemap-card">
                        <h2>Company</h2>
                        <nav aria-label="Company pages">
                            <Link to="/">Home</Link>
                            <Link to="/sustainability">Sustainability</Link>
                            <Link to="/gallery">Gallery</Link>
                        </nav>
                    </section>
                    <section className="sitemap-card">
                        <h2>Business</h2>
                        <nav aria-label="Business pages">
                            <Link to="/products">Products</Link>
                            <Link to="/qc_qa">QC &amp; QA</Link>
                            <Link to="/contact_us">Contact Us</Link>
                        </nav>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Sitemap
