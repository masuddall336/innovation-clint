import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import SafeCssRules from "./components/SafeCssRules.jsx";

const Navbar = lazy(() => import('./components/navbar/Navbar.jsx'));
const Footer = lazy(() => import('./components/footer/Footer.jsx'));

export default function Root() {
    return (
        <div>
            {/* Run the safe CSS rules check */}
            <SafeCssRules />

         
                <Navbar />
            <Suspense fallback={<div>Loading Navbar...</div>}>
                {/* Routed content */}
                <Outlet />
            </Suspense>
            {/* Lazy-loaded Footer */}
            <Suspense fallback={<div>Loading Footer...</div>}>
                <Footer />
            </Suspense>
        </div>
    )
}