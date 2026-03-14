import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export default function Root() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}