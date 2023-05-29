import { useEffect } from "react";
import { getAllNFTs, isWallectConnected } from "./Blockchain.Services";
import Alert from "./components/Alert";
import Artworks from "./components/Artworks";
import CreateNFT from "./components/CreateNFT";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
import Header from "./components/Header/Header";
import Loading from "./components/Loading";
import ShowNFT from "./components/ShowNFT";
import UpdateNFT from "./components/UpdateNFT";
import "./app.css";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Contact from "./pages/Contact";
import Wallet from "./pages/Wallet";
import Market from "./pages/Market";
import Profile from "./pages/Profile";

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
                    <Route path='/market' element={<Market />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/wallet' element={<Wallet />} />
                    {/* <Route path='/market/:id' element={<NftDetails />} /> */}
                    <Route path='/profile/:walletAddress' element={<Profile />} />
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
