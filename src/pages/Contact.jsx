"use strict";
import React, { useRef, useState } from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../styles/create-item.css";
import { setAlert } from "../store";

const Contact = () => {
    const [userData, setUserData] = useState({
        name: "",
        subject: "",
        email: "",
        message: "",
    });

    let name, value;

    const postUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUserData({ ...userData, [name]: value });
    };

    // connect with firebase
    const submitData = async (event) => {
        event.preventDefault();
        const { name, subject, email, message } = userData;

        if (name && subject && email && message) {
            const res = fetch("https://itm-parampara-default-rtdb.firebaseio.com/contact.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    subject,
                    email,
                    message,
                }),
            });

            if (res) {
                setUserData({
                    name: "",
                    subject: "",
                    email: "",
                    message: "",
                });
                setAlert("Your message sends successfully!", "green");
            } else {
                setAlert("plz fill the data correctly", "red");
            }
        } else {
            setAlert("plz fill the data", "red");
        }
    };

    return (
        <>
            <CommonSection title='Contact' />
            <section>
                <Container>
                    <Row>
                        <Col lg='6' md='6' className='m-auto text-center'>
                            <h2>Drop a Message</h2>
                            <p>Have a question or need assistance? Reach out to our team and we'll be happy to help you navigate the world of NFTs</p>
                            <div className='contact mt-4'>
                                <form onSubmit={submitData}>
                                    <div className='form__input'>
                                        <input type='text' name='name' placeholder='Enter your name' value={userData.name} onChange={postUserData} />
                                    </div>
                                    <div className='form__input'>
                                        <input
                                            type='email'
                                            name='email'
                                            placeholder='Enter your email'
                                            value={userData.email}
                                            onChange={postUserData}
                                        />
                                    </div>
                                    <div className='form__input'>
                                        <input
                                            type='text'
                                            name='subject'
                                            placeholder='Enter subject'
                                            value={userData.subject}
                                            onChange={postUserData}
                                        />
                                    </div>
                                    <div className='form__input'>
                                        <textarea
                                            rows='7'
                                            name='message'
                                            placeholder='Write message'
                                            value={userData.message}
                                            onChange={postUserData}
                                        ></textarea>
                                    </div>

                                    <button
                                        className='bg-white text-black'
                                        style={{
                                            border: "none",
                                            padding: "7px 25px",
                                            borderRadius: "5px",
                                            marginTop: "20px",
                                        }}
                                        // onClick={submitData}
                                    >
                                        Send a Message
                                    </button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Contact;
