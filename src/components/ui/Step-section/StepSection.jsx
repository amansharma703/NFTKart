import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./step-section.css";

const STEP__DATA = [
    {
        title: "Setup your wallet",
        desc: "We can create an account on MetaMask wallet and connect it with our NFTKart marketplace ",
        icon: "ri-wallet-line",
    },

    {
        title: "Create your collection",
        desc: "To buy NFTs with the affordable price we can create your own collection in the marketplace ",
        icon: "ri-layout-masonry-line",
    },

    {
        title: "Add your NFTs",
        desc: "By creating an account on NFTKart, you will access to mint your own NFTs to our platform.",
        icon: "ri-image-line",
    },

    {
        title: "List them for sale",
        desc: "After adding your NFTs, you can trade your NFTs and make money out of that in real quick",
        icon: "ri-list-check",
    },
];

const StepSection = () => {
    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='mb-4'>
                        <h3 className='step__title text-gradient uppercase'>Create and sell your NFTs</h3>
                    </Col>

                    {STEP__DATA.map((item, index) => (
                        <Col lg='3' md='4' sm='6' key={index} className='mb-4'>
                            <div className='single__step__item'>
                                <span>
                                    <i className={item.icon}></i>
                                </span>
                                <div className='step__item__content'>
                                    <h5>
                                        <Link to='/wallet'>{item.title}</Link>
                                    </h5>
                                    <p className='mb-0'>{item.desc}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default StepSection;
