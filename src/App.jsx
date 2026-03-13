
import './App.css'
import Navbar from './components/navbar/Navbar'
import Carousel from './components/carousel/Carousel'
import MissionVision from './components/mi&vi/Misionvision'
import Aboutus from './components/aboutus/Aboutus'
import Goalprinciple from './components/Goal_Principal/Goalprinciple'
import ScrollTop from './components/ScrollTop'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ProductsScrolling from './components/ProductsScrolling'

function App() {

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>Home | Innovation Plastic Cans Ltd.</title>
        <meta name="description" content="High-quality plastic packaging solutions for businesses." />
        <meta name="keywords" content="Plastic, Packaging, Bottles, Factory, Containers, Pail, Lid, inner" />
        <link rel="canonical" href="https://www.innovation-plastic.com/" />
      </Helmet>
      <div>
        <ScrollTop></ScrollTop>
        <Navbar></Navbar>
        <Carousel></Carousel>
        <Aboutus></Aboutus>
        <ProductsScrolling></ProductsScrolling>
        <MissionVision></MissionVision>
        <Goalprinciple></Goalprinciple>
      </div>

    </>

  )
}

export default App
