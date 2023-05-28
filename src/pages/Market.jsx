import React, { useContext, useEffect, useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import NftCard from "../components/ui/Nft-card/NftCard";

import { NFT__DATA } from "../assets/data/data";

import { Container, Row, Col } from "reactstrap";

import "../styles/market.css";
import { StoreContext } from "../contexts/StoreContext";
import { getAllNFT } from "../actions/nftActions";
import Loader from "../components/ui/Icons/Loader";

const Market = () => {
    const { state, dispatch } = useContext(StoreContext);
    const {
        nft: { nfts, isFetchingNFT },
    } = state;
    const [data, setData] = useState(nfts || NFT__DATA);

    const getAllNFTs = async () => {
        await getAllNFT(dispatch);
    };
    useEffect(() => {
        getAllNFTs();
    }, []);

    const handleCategory = () => {};

    const handleItems = () => {};

    // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
    const handleSort = (e) => {
        const filterValue = e.target.value;

        if (filterValue === "high") {
            const filterData = nfts.filter((item) => item.minBid >= 6);

            setData(filterData);
        }

        if (filterValue === "mid") {
            const filterData = nfts.filter((item) => item.minBid >= 2 && item.minBid < 4.5);

            setData(filterData);
        }

        if (filterValue === "low") {
            const filterData = nfts.filter((item) => item.minBid >= 0 && item.minBid < 2);

            setData(filterData);
        }
    };

    useEffect(() => {
        if (nfts) {
            setData(nfts);
        }
    }, [nfts]);

    return (
        <>
            <CommonSection title={"MarketPlace"} />

            <section>
                <Container>
                    <Row>
                        <Col lg='12' className='mb-5'>
                            <div className='market__product__filter d-flex align-items-center justify-content-between'>
                                <div className='filter__left d-flex align-items-center gap-5'>
                                    {/* <div className='all__category__filter'>
                                        <select onChange={handleCategory}>
                                            <option>All Categories</option>
                                            <option value='art'>Art</option>
                                            <option value='music'>Music</option>
                                            <option value='domain-name'>Domain Name</option>
                                            <option value='virtual-world'>Virtual World</option>
                                            <option value='trending-card'>Trending Cards</option>
                                        </select>
                                    </div> */}

                                    {/* <div className='all__items__filter'>
                                        <select onChange={handleItems}>
                                            <option>All Items</option>
                                            <option value='single-item'>Single Item</option>
                                            <option value='bundle'>Bundle</option>
                                        </select>
                                    </div> */}
                                </div>

                                <div className='filter__right'>
                                    <select onChange={handleSort}>
                                        <option>Sort By</option>
                                        <option value='high'>High Rate</option>
                                        <option value='mid'>Mid Rate</option>
                                        <option value='low'>Low Rate</option>
                                    </select>
                                </div>
                            </div>
                        </Col>
                        {isFetchingNFT ? (
                            <div>
                                <Loader />
                            </div>
                        ) : (
                            data &&
                            data?.map((item) => (
                                <Col lg='3' md='4' sm='6' className='mb-4' key={item._id}>
                                    <NftCard item={item} />
                                </Col>
                            ))
                        )}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Market;
