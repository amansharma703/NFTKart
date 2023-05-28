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
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Contact from "./pages/Contact";

const App = () => {
    useEffect(async () => {
        await isWallectConnected();
        await getAllNFTs();
    }, []);

    return (
        <Router>
            <Header />
            <div>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    {/* <Route path='/market' element={<Market />} /> */}
                    {/* <Route path='/create' element={<Create />} /> */}
                    <Route path='/contact' element={<Contact />} />
                    {/* <Route path='/wallet' element={<Wallet />} /> */}
                    {/* <Route path='/market/:id' element={<NftDetails />} /> */}
                    {/* <Route path='/profile/:userId' element={<Profile />} /> */}
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </div>
            <Footer />
            <CreateNFT />
            <ShowNFT />
            <UpdateNFT />
            <Alert />
            <Loading />
        </Router>
    );
};

export default App;
