import { Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";
import ScrollProgress from "./components/ScrollProgress";

const IntroVideo = lazy(() => import("./components/video/Video"));

export default function Root() {
    const location = useLocation();
    const previousPath = useRef(`${location.pathname}${location.search}`);
    const [introComplete, setIntroComplete] = useState(() => {
        try {
            return window.sessionStorage.getItem("ipcl-intro-completed") === "true";
        } catch {
            return false;
        }
    });
    const [routeLoading, setRouteLoading] = useState(false);

    useEffect(() => {
        const currentRoute = `${location.pathname}${location.search}`;
        if (previousPath.current === currentRoute) return;
        previousPath.current = currentRoute;
        setRouteLoading(true);

        const timer = window.setTimeout(() => setRouteLoading(false), 650);
        return () => window.clearTimeout(timer);
    }, [location.pathname, location.search]);

    const completeIntro = () => {
        try {
            window.sessionStorage.setItem("ipcl-intro-completed", "true");
        } catch {
            // The intro can still finish when session storage is unavailable.
        }
        setIntroComplete(true);
    };

    useEffect(() => {
        const bootLoader = document.getElementById("site-boot-loader");
        if (bootLoader) {
            const elapsed = Date.now() - (window.__IPCL_BOOT_STARTED__ || Date.now());
            window.setTimeout(() => {
                bootLoader.classList.add("is-hidden");
                window.setTimeout(() => bootLoader.remove(), 300);
            }, Math.max(0, 2000 - elapsed));
        }
    }, []);

    return (
        <div>
            <ScrollProgress />
            <Navbar />
            {routeLoading && <Loading />}
            {introComplete ? (
                <>
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                    <Footer />
                </>
            ) : (
                <Suspense fallback={<Loading />}>
                    <IntroVideo onComplete={completeIntro} />
                </Suspense>
            )}
        </div>
    )
}
