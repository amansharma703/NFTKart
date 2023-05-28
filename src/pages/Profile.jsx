import React, { Fragment, useContext, useState } from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";
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
import { NFT__DATA } from "../assets/data/data";
import NftCard from "../components/ui/Nft-card/NftCard";
import { StoreContext } from "../contexts/StoreContext";

const frontEndURL = "http://localhost:3000/";
const Profile = () => {
    const { state, dispatch } = useContext(StoreContext);
    const {
        auth: {
            user: { user },
            isFetching,
        },
    } = state;

    console.log("user: ", user);
    const [profile, setProfile] = useState({
        username: "AMAN Sharma",
        description: "I am a developer",
        walletAddress: " ajkdsopjopasjdsajopasjdopjsaop",
    });
    const ref = React.useRef(null);
    const [isAddressCopied, setIsAddressCopied] = useState(false);

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
                            <Avatar
                                src={"https://images.deso.org/9807f86a30a973ef397e37a340b8b2750899ad92fcde20275f6a0d3b16bf8bac.webp" || user.image}
                                username={user?.walletAddress}
                                size={isMobile() ? "lg" : "xl"}
                            />
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
                                                                    url={`${frontEndURL}/profile/${profile?._id} `}
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

                            {/* {profile?._id !== undefined && user?._id === profile?._id && <EditProfile />} */}
                        </div>
                    </div>
                    <div className='md:pt-7 pt-5 font-ubuntu '>
                        <div className='flex flex-col items-start gap-2 '>
                            {user.name && (
                                <p className='font-medium md:text-2xl text-xl text-frescoWhite flex gap-2 items-center'>
                                    <span>{user?.name}</span>
                                    <span>
                                        <Metamask ratio={26} />
                                    </span>
                                </p>
                            )}

                            <p className='font-medium  text-medium text-frescoWhite flex gap-2 items-center'>
                                <span className='font-bold'>Wallet Address</span>
                                <span>{user?.walletAddress}</span>
                                <span className='cursor-pointer relative' onClick={() => copyMetamaskAddress(profile.walletAddress)}>
                                    {isAddressCopied ? <PopOver text={"Copied"} /> : undefined}
                                    <Copy2 />
                                </span>
                            </p>
                        </div>

                        <p className='md:w-1/2 w-full text-base font-normal text-frescoWhite leading-[18px] -tracking-[-0.25px] pt-2 md:pr-10 max-w-md'>
                            <ReactLinkify componentDecorator={componentDecorator}>{user?.description}</ReactLinkify>
                        </p>
                    </div>
                </div>
            </div>
            <Row>
                <Col lg='12' className='mb-5'>
                    <h3 className='trending__title'>My NFTs</h3>
                </Col>

                {NFT__DATA.slice(0, 8).map((item, ind) => (
                    <Col lg='3' md='4' sm='6' key={item.id * ind} className='mb-4'>
                        <NftCard item={item} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Profile;
