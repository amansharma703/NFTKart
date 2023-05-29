import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import NftCard from "../Nft-card/NftCard";
import "./live-auction.css";
import { StoreContext } from "../../../contexts/StoreContext";
import Loader from "../Icons/Loader";

const LiveAuction = () => {
    const { state } = useContext(StoreContext);
    const {
        nft: { nfts, isFetchingNFT },
    } = state;

    if (isFetchingNFT) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='mb-5'>
                        <div className='live__auction__top d-flex align-items-center justify-content-between '>
                            <h3>Live Auction</h3>
                            <span>
                                <Link to='/market'>Explore more</Link>
                            </span>
                        </div>
                    </Col>

                    {nfts &&
                        nfts?.slice(0, 4).map((item) => (
                            <Col lg='3' md='4' sm='6' className='mb-4' key={item._id}>
                                <NftCard key={item._id} item={item} />
                            </Col>
                        ))}
                </Row>
            </Container>
        </section>
    );
};

export default LiveAuction;
