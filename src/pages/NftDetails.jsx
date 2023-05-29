import React, { useEffect, useMemo, useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../assets/data/data";

import LiveAuction from "../components/ui/Live-auction/LiveAuction";

import "../styles/nft-details.css";

import { Link } from "react-router-dom";
import { getNFTById } from "../services/nftService";
import Loader from "../components/ui/Icons/Loader";
import { isMobile, shortenAddress } from "../utils/utils";
import Avatar from "../components/ui/Avatar";
import Modal from "../components/ui/Modal/Modal";

const NftDetails = () => {
    const { id } = useParams();
    const [nft, setNft] = useState();
    const [showModal, setShowModal] = useState(false);

    const singleNft = useMemo(() => {
        return NFT__DATA.find((item) => item.id === id);
    }, [id]);

    useEffect(() => {
        if (singleNft) {
            setNft(singleNft);
        }
    }, [singleNft]);

    const getSingleNFT = async (id) => {
        try {
            const nftDetails = await getNFTById(id);
            setNft(nftDetails.data);
        } catch {}
    };

    useEffect(() => {
        if (id) {
            getSingleNFT(id);
        }
    }, [id]);

    return (
        <>
            <CommonSection title={nft?.name || ""} />

            <section>
                <Container>
                    {!nft ? (
                        <Loader />
                    ) : (
                        <Row className='px-12'>
                            <Col lg='6' md='6' sm='6'>
                                <img src={nft.image} alt='' className='w-100 single__nft-img' />
                            </Col>

                            <Col lg='6' md='6' sm='6'>
                                <div className='single__nft__content'>
                                    <h2>{nft.name}</h2>

                                    <div className=' d-flex align-items-center justify-content-between mt-4 mb-4'>
                                        <div className=' d-flex align-items-center gap-4 single__nft-seen'>
                                            <span>
                                                <i className='ri-eye-line'></i> 234
                                            </span>
                                            <span>
                                                <i className='ri-heart-line'></i> 123
                                            </span>
                                        </div>

                                        <div className=' d-flex align-items-center gap-2 single__nft-more'>
                                            <span>
                                                <i className='ri-send-plane-line'></i>
                                            </span>
                                            <span>
                                                <i className='ri-more-2-line'></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className='nft__creator d-flex gap-3 align-items-center'>
                                        <Avatar src={nft.ownerId?.profilePic} username={nft.ownerId?.walletAddress || nft.ownerId?.name} size='sm' />

                                        <div className='creator__detail'>
                                            <p>Created By</p>
                                            <h6>{nft.ownerId?.name || shortenAddress(nft.ownerId?.walletAddress)}</h6>
                                        </div>
                                    </div>

                                    <p className='my-4'>{nft.description}</p>
                                    <button
                                        className='singleNft-btn bid__btn d-flex align-items-center gap-2 w-100'
                                        onClick={() => setShowModal(true)}
                                    >
                                        <i className='ri-shopping-bag-line'></i>
                                        Place a Bid
                                    </button>
                                    {showModal && <Modal setShowModal={setShowModal} />}
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>

            <LiveAuction />
        </>
    );
};

export default NftDetails;
