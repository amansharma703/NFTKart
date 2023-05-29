import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";

// import Modal from "../Modal/Modal";

const NftCard = (props) => {
    const { name, _id, id, minBid, image, ownerId } = props.item;

    const [showModal, setShowModal] = useState(false);

    return (
        <div className='single__nft__card'>
            <div className='nft__img'>
                <Link to={`/market/${_id || id}`}>
                    <img src={image || "/img-09.jpg"} alt='' className='w-100' />
                </Link>
            </div>

            <div className='nft__content'>
                <h5 className='nft__title'>
                    <Link to={`/market/${_id || id}`}>{name}</Link>
                </h5>

                <div className='creator__info-wrapper d-flex gap-3'>
                    <div className='creator__img'>
                        <img src={ownerId?.profilePic || "ava-01.png"} alt='' className='w-100' />
                    </div>

                    <div className='creator__info w-100 d-flex align-items-center justify-content-between'>
                        <div>
                            <h6>Created By</h6>
                            <p>{ownerId?.name || ownerId?.walletAddress?.slice(0, 15) + "..." || "Trista Francis"}</p>
                        </div>

                        <div>
                            <h6>Min Bid Price</h6>
                            <p>{minBid} ETH</p>
                        </div>
                    </div>
                </div>

                <div className=' mt-3 d-flex align-items-center justify-content-between'>
                    <button className='bid__btn d-flex align-items-center gap-1' onClick={() => setShowModal(true)}>
                        <i className='ri-shopping-bag-line'></i> Place Bid
                    </button>

                    {showModal && <Modal setShowModal={setShowModal} />}

                    <span className='history__link'>
                        <Link to='#'>View History</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NftCard;
