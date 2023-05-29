import React, { Fragment, useContext, useEffect, useState } from "react";
import Avatar from "../components/ui/Avatar";
import { isMobile } from "../utils/utils";
import { Menu, Transition } from "@headlessui/react";
import OptionButton from "../components/ui/Icons/OptionButton";
import CopyButton from "../components/ui/CopyButton";
import PopOver from "../components/ui/Popover";
import Copy2 from "../components/ui/Icons/Copy2";
import ReactLinkify from "react-linkify";
import Metamask from "../components/ui/Icons/Metamask";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import { Card } from "../components/Artworks";
import { useGlobalState } from "../store";

const frontEndURL = "http://localhost:3000";
const Profile = () => {
    const [connectedAccount] = useGlobalState("connectedAccount");
    const [nfts] = useGlobalState("nfts");
    const { walletAddress } = useParams();
    const [collection, setCollection] = useState([]);

    const excludeID = ["213", "212", "209", "208", "205", "204", "203", "194", "196", "192", "193", "185", "183", "178", "175"];

    const getCollection = () => {
        return nfts.filter((item) => !excludeID.includes(String(item.id)) && item.owner === walletAddress);
    };

    const ref = React.useRef(null);
    const [isAddressCopied, setIsAddressCopied] = useState(false);

    useEffect(() => {
        setCollection(getCollection());
    }, [nfts]);

    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target='_blank' className='text-primary text-weight-bold break-words' rel='noreferrer'>
            {text}
        </a>
    );

    const copyMetamaskAddress = async (address) => {
        navigator.clipboard.writeText(address);
        setIsAddressCopied(true);
        setTimeout(() => {
            setIsAddressCopied(false);
        }, 2000);
    };

    return (
        <Container>
            <div className={` md:h-64 h-48`}>
                <div className={`absolute left-0 w-full`}>
                    <div className='relative'>
                        <img src='/bg.jpg' alt='banner' className='w-full object-cover md:h-64 h-56' loading='lazy' />
                        <div className='absolute md:-bottom-16 -bottom-12 md:left-28 transform -translate-x-1/2 md:translate-x-0 left-1/2 p-1.5 bg-white rounded-full'>
                            <Avatar username={walletAddress} size={isMobile() ? "lg" : "xl"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='pb-5'>
                <div
                    className={`border-b border-matteGray pb-6 pt-4
            }`}
                >
                    <div className='flex items-center md:justify-end justify-start md:pt-0 pt-16 space-y-3 md:space-y-0 md:flex-row flex-col'>
                        <div className='flex space-x-3 z-10'>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}
                                className='ml-1'
                            >
                                <Menu as='div' className='relative inline-block text-left'>
                                    {({ open }) => (
                                        <>
                                            <div>
                                                <Menu.Button className='' ref={ref}>
                                                    <div
                                                        className={`w-9 h-9  bg-frescoWhite rounded-full flex items-center justify-center cursor-pointer`}
                                                    >
                                                        <OptionButton />
                                                    </div>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter='transition ease-out duration-100'
                                                enterFrom='transform opacity-0 scale-95'
                                                enterTo='transform opacity-100 scale-100'
                                                leave='transition ease-in duration-75'
                                                leaveFrom='transform opacity-100 scale-100'
                                                leaveTo='transform opacity-0 scale-95'
                                            >
                                                <Menu.Items
                                                    className='absolute 
                             md:-left-52 left-6 top-6"
                            w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
                                                >
                                                    <div className='px-1  '>
                                                        <Menu.Item>
                                                            <div className=' border-gray-600 cursor-pointer text-sm'>
                                                                <CopyButton
                                                                    title='Copy Profile URL'
                                                                    url={`${frontEndURL}/profile/${walletAddress} `}
                                                                    type='button'
                                                                    text='text-base'
                                                                />
                                                            </div>
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </>
                                    )}
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className='md:pt-7 pt-5 font-ubuntu '>
                        <div className='flex flex-col items-start gap-2 '>
                            {/* {user.name && (
                                <p className='font-medium md:text-2xl text-xl text-frescoWhite flex gap-2 items-center'>
                                    <span>{user?.name}</span>
                                    <span>
                                        <Metamask ratio={26} />
                                    </span>
                                </p>
                            )} */}

                            <p className='font-medium  text-medium text-frescoWhite flex gap-2 items-center'>
                                <span className='font-bold'>Wallet Address</span>
                                <span>{walletAddress}</span>
                                <span className='cursor-pointer relative' onClick={() => copyMetamaskAddress(walletAddress)}>
                                    {isAddressCopied ? <PopOver text={"Copied"} /> : undefined}
                                    <Copy2 />
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Row>
                <Col lg='12' className='mb-3'>
                    <h4 className='text-white text-3xl font-bold uppercase text-gradient'>
                        {connectedAccount === walletAddress ? "My NFTs" : "NFTs"}
                    </h4>
                </Col>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-3'>
                    {collection.map((nft, i) => (
                        <Card key={i} nft={nft} />
                    ))}
                </div>
            </Row>
        </Container>
    );
};

export default Profile;
