import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import Logout from "../Icons/Logout";
import UserIcon from "../Icons/UserIcon";
import Metamask from "../Icons/Metamask";
import { truncate } from "../../../store";

function UserMenu({ walletAddress }) {
    return (
        <div>
            <Menu as='button' className='relative inline-block text-left px-4 w-full mt-2'>
                {({ open }) => (
                    <div>
                        <Menu.Button
                            className={`${
                                open ? "bg-frescoWhite" : "hover:bg-frescoWhite "
                            } px-4 pt-1 pb-0.5 rounded-xl transition-all ease-in-out duration-75  w-full group`}
                        >
                            <div className='flex items-center space-x-3 cursor-pointer '>
                                <div className='relative'>
                                    <Avatar username={walletAddress} size='sm' />
                                </div>
                                <div>
                                    <p className='flex flex-col text-sm items-start font-normal tracking-wide m-0'>
                                        <span
                                            className={`text-base font-medium text-left text-frescoWhite group-hover:text-black ${
                                                open && "text-black"
                                            }`}
                                        >
                                            {truncate(walletAddress, 4, 4, 11)}
                                        </span>
                                        <div className='flex'>
                                            <span className='font-ubuntu text-darkGray'>Metamask</span>
                                            <span className='pl-0.5'>
                                                <Metamask ratio={16} />
                                            </span>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                        >
                            <Menu.Items className='absolute  w-180px top-[62px]  rounded-md  shadow-2xl  focus:outline-none z-50 flex flex-col gap-1'>
                                <div className='bg-white rounded-b-md ring-1 ring-black ring-opacity-5 shadow-xl  divide-y divide-gray-100'>
                                    <div className='px-1 py-1 '>
                                        <Menu.Item>
                                            <NavLink to={`/profile/${walletAddress}`} className='no-underline'>
                                                <div className={`group text-darkNight flex items-center justify-between w-full px-2 py-2 text-sm`}>
                                                    View Profile
                                                    <span className='pr-1'>
                                                        <UserIcon />
                                                    </span>
                                                </div>
                                            </NavLink>
                                        </Menu.Item>
                                    </div>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </div>
                )}
            </Menu>
        </div>
    );
}

export default UserMenu;
