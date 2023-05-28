import React, { useRef, useEffect, useState, useContext } from "react";
import "./header.css";
import { Container } from "reactstrap";
import { loginWithMetamask } from "../../actions/authActions";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../contexts/StoreContext";
import UserMenu from "../ui/UserMenu";
import Loader from "../ui/Icons/Loader";
import Web3 from "web3";

const NAV__LINKS = [
    {
        display: "Home",
        url: "/",
    },
    {
        display: "Market",
        url: "/market",
    },
    {
        display: "Create",
        url: "/create",
    },
    {
        display: "Contact",
        url: "/contact",
    },
];

const Header = () => {
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const { state, dispatch } = useContext(StoreContext);
    const {
        auth: { user, isFetching },
    } = state;
    // Empty web3 instance
    let web3 = new Web3();

    const menuRef = useRef(null);

    useEffect(() => {
        const listener = () => {
            if (headerRef.current && (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80)) {
                headerRef.current.classList.add("header__shrink");
            } else {
                headerRef.current.classList.remove("header__shrink");
            }
        };
        window.addEventListener("scroll", listener);

        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);

    const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

    const handleMetamaskLogin = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                loginWithMetamask(accounts[0], "", dispatch);
            } catch (err) {
                console.log("metamask error: ", err);
            }
        } else {
            alert("Etherium Not Detected");
        }
    };

    const ethEnabled = async () => {
        if (typeof window.ethereum !== "undefined") {
            // Instance web3 with the provided information from the MetaMask provider information
            web3 = new Web3(window.ethereum);
            try {
                // Request account access
                await window.ethereum.enable();

                return true;
            } catch (e) {
                // User denied access
                return false;
            }
        }

        return false;
    };

    const tokenAddresses = [
        {
            address: "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39",
            token: "HEX",
        },
        {
            address: "0x3d658390460295fb963f54dc0899cfb1c30776df",
            token: "COVAL",
        },
        {
            address: "0x6b175474e89094c44da98b954eedeac495271d0f",
            token: "DAI",
        },
    ];

    const tokenABI = [
        {
            constant: true,
            inputs: [
                {
                    name: "_owner",
                    type: "address",
                },
            ],
            name: "balanceOf",
            outputs: [
                {
                    name: "balance",
                    type: "uint256",
                },
            ],
            payable: false,
            type: "function",
        },
    ];

    const onClickConnect = async () => {
        if (await !ethEnabled()) {
            alert("Please install MetaMask to use this dApp!");
        }

        // setWeb3Enabled(true);

        var accs = await web3.eth.getAccounts();

        const newAccounts = await Promise.all(
            accs.map(async (address) => {
                const balance = await web3.eth.getBalance(address);

                const tokenBalances = await Promise.all(
                    tokenAddresses.map(async (token) => {
                        const tokenInst = new web3.eth.Contract(tokenABI, token.address);

                        const balance = await tokenInst.methods.balanceOf(address).call();

                        return {
                            token: token.token,
                            balance,
                        };
                    })
                );

                return {
                    address,
                    balance: web3.utils.fromWei(balance, "ether"),
                    tokens: tokenBalances,
                };
            })
        );

        console.log(newAccounts);
        // setAccounts(newAccounts);
    };
    return (
        <header className='header' ref={headerRef}>
            <Container>
                <div className='navigation'>
                    <div className='logo'>
                        <h2
                            className=' d-flex gap-2 align-items-center '
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            <span>
                                <i className='ri-fire-fill'></i>
                            </span>
                            NFTKart
                        </h2>
                    </div>

                    <div className='nav__menu' ref={menuRef} onClick={toggleMenu}>
                        <ul className='nav__list'>
                            {NAV__LINKS.map((item, index) => (
                                <li className='nav__item' key={index}>
                                    <NavLink to={item.url} className={(navClass) => (navClass.isActive ? "active" : "")}>
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='nav__right d-flex align-items-center gap-5 '>
                        {user?.tokens ? (
                            <UserMenu user={user.user} />
                        ) : isFetching ? (
                            <div className='mr-24'>
                                <Loader />
                            </div>
                        ) : (
                            <button className='btn d-flex gap-2 align-items-center'>
                                <span>
                                    <i className='ri-wallet-line'></i>
                                </span>
                                <div
                                    onClick={onClickConnect}
                                    style={{
                                        color: "#fff",
                                    }}
                                >
                                    Connect Wallet
                                </div>
                            </button>
                        )}

                        <span className='mobile__menu'>
                            <i className='ri-menu-line' onClick={toggleMenu}></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
