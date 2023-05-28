import { setGlobalState, useGlobalState } from "../store";
import { FaRegTimesCircle } from "react-icons/fa";
import { BsCheck2Circle } from "react-icons/bs";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaTimes } from "react-icons/fa";

const Alert = () => {
    const [alert] = useGlobalState("alert");

    return (
        <Transition.Root show={alert.show} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-40 inset-0 overflow-y-auto'
                onClose={() => {
                    setGlobalState("alert", { show: false, msg: "", color: "green" });
                }}
            >
                <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 z-30'>
                    <Transition.Child
                        as={React.Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' />
                    </Transition.Child>

                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div className='inline-block min-w-min py-2.5 px-12 shadow-xl   bg-navyGray rounded-2xl text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle  font-ubuntu '>
                            <div className='flex flex-col justify-center items-center'>
                                {alert.color == "red" ? (
                                    <FaRegTimesCircle className='text-red-600 text-4xl' />
                                ) : (
                                    <BsCheck2Circle className='text-green-600 text-4xl' />
                                )}
                                <div className='text-white px-3 py-2'>{alert.msg}</div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Alert;
