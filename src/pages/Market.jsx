import React, { useEffect, useState } from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../styles/market.css";
import { useGlobalState } from "../store";
import { Card } from "../components/Artworks";
import Loader from "../components/ui/Icons/Loader";

const Market = () => {
    const [nfts] = useGlobalState("nfts");
    const [end, setEnd] = useState(12);
    const [count] = useState(4);
    const [collection, setCollection] = useState([]);

    const excludeID = ["213", "212", "209", "208", "205", "204", "203", "194", "196", "192", "193", "185", "183", "178", "175"];

    const getCollection = () => {
        const filterData = nfts.filter((item) => !excludeID.includes(String(item.id)));
        return filterData.slice(0, end);
    };

    useEffect(() => {
        setCollection(getCollection());
    }, [nfts, end]);

    // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
    const handleSort = (e) => {
        const filterValue = e.target.value;

        if (filterValue === "Sort By") {
            setCollection(getCollection());
        }

        if (filterValue === "high") {
            const filterData = collection.filter(({ cost }) => Number(cost) >= 0.02);
            setCollection(filterData);
        }

        if (filterValue === "mid") {
            const filterData = collection.filter(({ cost }) => Number(cost) >= 0.00015 && Number(cost) < 0.02);
            setCollection(filterData);
        }

        if (filterValue === "low") {
            const filterData = collection.filter(({ cost }) => Number(cost) >= 0 && Number(cost) < 0.00015);
            setCollection(filterData);
        }
    };

    if (!nfts) {
        return <Loader />;
    }

    return (
        <>
            <CommonSection title={"MarketPlace"} />

            <section>
                <Container>
                    <Row>
                        <Col lg='12' className='mb-3'>
                            <div className='market__product__filter d-flex align-items-center justify-content-between'>
                                <div className='filter__left d-flex align-items-center gap-5'>
                                    <h4 className='text-white text-3xl font-bold uppercase  mb-3'>Collections</h4>
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
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5'>
                            {collection.map((nft, i) => (
                                <Card key={i} nft={nft} />
                            ))}
                        </div>

                        {collection.length > 0 && nfts.length > collection.length && (
                            <div className='flex justify-center'>
                                <button
                                    className='bid__btn shadow-lg shadow-black rounded-full cursor-pointer mt-4'
                                    onClick={() => setEnd(end + count)}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                        {/* {isFetchingNFT ? (
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
                        )} */}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Market;
