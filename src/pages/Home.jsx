import React, { useContext, useEffect } from "react";
import HeroSection from "../components/ui/HeroSection";
// import LiveAuction from "../components/ui/Live-auction/LiveAuction";
import SellerSection from "../components/ui/Seller-section/SellerSection";
// import Trending from "../components/ui/Trending-section/Trending";
import StepSection from "../components/ui/Step-section/StepSection";
import Artworks from "../components/Artworks";
import Transactions from "../components/Transactions";
import HotNfts from "../components/HotNfts";

const Home = () => {
    return (
        <>
            <HeroSection />
            <Artworks />
            <SellerSection />
            <Transactions />
            <HotNfts />
            <StepSection />
        </>
    );
};

export default Home;
