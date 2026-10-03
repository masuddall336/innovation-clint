import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";
import ScrollProgress from "./components/ScrollProgress";

export default function Root() {
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <Loading />;
    }

    return (
        <div>
            <ScrollProgress />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}