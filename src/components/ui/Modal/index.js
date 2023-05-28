import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { FaTimes } from 'react-icons/fa';


function Modal({ isOpen, onClose, title, isClosable = true, content }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto" onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 z-30">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-overlay bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white dark:bg-navyGray rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-428px font-ubuntu">
              <div className="bg-white dark:bg-navyGray p-4 border-b border-frescoWhite dark:border-matteGray">
                <div className="flex justify-between items-center">
                  <div className="flex flex-row justify-start items-center">
                    <p className="font-medium text-lg text-black dark:text-frescoWhite">{title}</p>
                  </div>
                  {isClosable && (
                    <span className="bg-frescoWhite p-9px rounded-full cursor-pointer" onClick={onClose}>
                      <FaTimes className="text-gray-400" />
                    </span>
                  )}
                </div>
              </div>
              <div className="px-3 py-2">{content}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
