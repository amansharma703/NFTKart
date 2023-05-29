import React, { useRef, useEffect, useState, useContext } from "react";
import "./header.css";
import { Container } from "reactstrap";
// import { loginWithMetamask } from "../../actions/authActions";
import { NavLink, useNavigate } from "react-router-dom";
// import { StoreContext } from "../../contexts/StoreContext";
// import UserMenu from "../ui/UserMenu";
import Loader from "../ui/Icons/Loader";
import { truncate, useGlobalState } from "../../store";
import { connectWallet } from "../../Blockchain.Services";
import UserMenu from "../ui/UserMenu";

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
        display: "Contact",
        url: "/contact",
    },
];

const Header = () => {
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const [connectedAccount] = useGlobalState("connectedAccount");

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

    // const onClickConnect = async () => {
    //     if (await !ethEnabled()) {
    //         alert("Please install MetaMask to use this dApp!");
    //     }

    //     // setWeb3Enabled(true);

    //     var accs = await web3.eth.getAccounts();

    //     const newAccounts = await Promise.all(
    //         accs.map(async (address) => {
    //             const balance = await web3.eth.getBalance(address);

    //             const tokenBalances = await Promise.all(
    //                 tokenAddresses.map(async (token) => {
    //                     const tokenInst = new web3.eth.Contract(tokenABI, token.address);

    //                     const balance = await tokenInst.methods.balanceOf(address).call();

    //                     return {
    //                         token: token.token,
    //                         balance,
    //                     };
    //                 })
    //             );

    //             return {
    //                 address,
    //                 balance: web3.utils.fromWei(balance, "ether"),
    //                 tokens: tokenBalances,
    //             };
    //         })
    //     );

    //     console.log(newAccounts);
    //     // setAccounts(newAccounts);
    // };

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
                        {connectedAccount ? (
                            <UserMenu walletAddress={connectedAccount} />
                        ) : (
                            <button className='btn d-flex gap-2 align-items-center'>
                                <span>
                                    <i className='ri-wallet-line'></i>
                                </span>
                                <div
                                    onClick={connectWallet}
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
