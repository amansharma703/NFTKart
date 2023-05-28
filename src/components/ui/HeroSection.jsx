import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./hero-section.css";

import heroImg from "../../assets/images/hero.jpg";

const HeroSection = () => {
    return (
        <section className='hero__section'>
            <Container>
                <Row>
                    <Col lg='6' md='6'>
                        <div className='hero__content'>
                            <h2>
                                Discover rare digital art and collect
                                <span>sell extraordinary</span> NFTs
                            </h2>
                            <p>
                                At NFTKart, we believe that everyone should have the freedom to earn, hold, spend, share and give their money - no
                                matter who you are or where you come from.
                            </p>

                            <div className='hero__btns d-flex align-items-center gap-4'>
                                <button className=' explore__btn d-flex align-items-center gap-2'>
                                    <i className='ri-rocket-line'></i> <Link to='/market'>Explore</Link>
                                </button>
                                <button className='create__btn d-flex align-items-center gap-2'>
                                    <i className='ri-ball-pen-line'></i>
                                    <Link to='/create'>Create</Link>
                                </button>
                            </div>
                        </div>
                    </Col>

                    <Col lg='6' md='6'>
                        <div className='hero__img'>
                            <img src={heroImg} alt='' className='w-100' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;
