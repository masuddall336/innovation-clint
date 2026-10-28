import { Outlet } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";
import ScrollProgress from "./components/ScrollProgress";

const IntroVideo = lazy(() => import("./components/video/Video"));

export default function Root() {
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        const bootLoader = document.getElementById("site-boot-loader");
        if (bootLoader) {
            bootLoader.classList.add("is-hidden");
            window.setTimeout(() => bootLoader.remove(), 300);
        }
    }, []);

    if (!introComplete) {
        return (
            <Suspense fallback={<Loading />}>
                <IntroVideo onComplete={() => setIntroComplete(true)} />
            </Suspense>
        );
    }

    return (
        <div>
            <ScrollProgress />
            <Navbar />
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
            <Footer />
        </div>
    )
}
