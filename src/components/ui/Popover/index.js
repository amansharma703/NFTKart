import React from "react";

function PopOver({ text, size = 32, leftPosition = "-left-8", topPosition = "-top-11" }) {
    return (
        <>
            <div className={`absolute ${leftPosition} ${topPosition}  z-40`}>
                <div className='relative'>
                    <div
                        className={`font-medium py-1.5 px-2 text-sm bottom-full bg-darkNight dark:bg-frescoWhite rounded-lg  text-white dark:text-darkNight w-${size} min-w-fit min-h-fit`}
                    >
                        <div>
                            <p className='font-medium text-md text-center'>{text}</p>
                        </div>
                    </div>

                    <svg
                        className='absolute text-darkNight dark:text-frescoWhite h-5 w-full left-0 top-full'
                        x='0px'
                        y='0px'
                        aria-hidden='true'
                        focusable='false'
                        viewBox='0 0 255 255'
                    >
                        <polygon className='fill-current' points='0,0 127.5,127.5 255,0' />
                    </svg>
                </div>
            </div>
        </>
    );
}

export default PopOver;
