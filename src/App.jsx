import { useEffect } from "react";
import { getAllNFTs, isWallectConnected } from "./Blockchain.Services";
import Alert from "./components/Alert";
import Artworks from "./components/Artworks";
import CreateNFT from "./components/CreateNFT";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
import Header from "./components/Header/Header";
import Hero from "./components/Hero";
import Loading from "./components/Loading";
import ShowNFT from "./components/ShowNFT";
import Transactions from "./components/Transactions";
import UpdateNFT from "./components/UpdateNFT";
import HeroSection from "./components/ui/HeroSection";
import "./app.css";
import Footer from "./components/Footer/Footer";
import SellerSection from "./components/ui/Seller-section/SellerSection";
import StepSection from "./components/ui/Step-section/StepSection";

const App = () => {
    useEffect(async () => {
        await isWallectConnected();
        await getAllNFTs();
    }, []);

    return (
        <div className='min-h-screen'>
            {/* <div className='gradient-bg-hero'> */}
            <Header />
            <HeroSection />
            {/* <Hero /> */}
            {/* </div> */}
            <Artworks />
            <SellerSection />
            <Transactions />
            <StepSection />
            <CreateNFT />
            <ShowNFT />
            <UpdateNFT />
            <Footer />
            {/* <Footer /> */}
            <Alert />
            <Loading />
        </div>
    );
};

export default App;
