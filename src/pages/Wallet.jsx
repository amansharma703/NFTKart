import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/wallet.css";

const wallet__data = [
    {
        title: "Bitcoin",
        desc: "Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network.",
        icon: "ri-bit-coin-line",
    },

    {
        title: "Coinbase",
        desc: "Coinbase is a American publicly traded company that operates a cryptocurrency exchange platform, It distributed company in which all employees operate via remote work ",
        icon: "ri-coin-line",
    },

    {
        title: "Metamask",
        desc: "MetaMask is a software cryptocurrency wallet used to interact with the Ethereum blockchain. It allows users to access their Ethereum wallet through a browser extension or mobile app",
        icon: "ri-money-cny-circle-line",
    },

    {
        title: "Trust Wallet",
        desc: "The Trust Wallet Browser Extension is a secure multi-chain crypto wallet and gateway to thousands of Web3 decentralized applications (dApps)",
        icon: "ri-bit-coin-line",
    },
];

const Wallet = () => {
    return (
        <>
            <CommonSection title='Connect Wallet' />
            <section>
                <Container>
                    <Row>
                        <Col lg='12' className='mb-5 text-center'>
                            <div className='w-50 m-auto'>
                                <h3 className='text-light'>Connect your wallet</h3>
                                <p>
                                    The first thing you’ll need to do is download the MetaMask wallet software onto your chosen device by visiting the
                                    official website{" "}
                                    <a
                                        href='https://metamask.io/'
                                        target='_blank'
                                        rel='noreferrer'
                                        style={{
                                            color: "#fff",
                                        }}
                                    >
                                        here
                                    </a>
                                </p>
                            </div>
                        </Col>

                        {wallet__data.map((item, index) => (
                            <Col lg='3' md='4' sm='6' key={index} className='mb-4'>
                                <div className='wallet__item'>
                                    <span>
                                        <i className={item.icon}></i>
                                    </span>
                                    <h5>{item.title}</h5>
                                    <p>{item.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Wallet;
