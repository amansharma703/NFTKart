import React from "react";

function PopOver({ text, size = 32, leftPosition = "-left-12", topPosition = "-top-12" }) {
    return (
        <>
            <div className={`absolute ${leftPosition} ${topPosition}  z-40`}>
                <div className='relative'>
                    <div className={`font-medium  px-2 text-sm bottom-full bg-frescoWhite rounded-lg  text-black w-${size} min-w-fit min-h-fit`}>
                        <p className='font-medium text-md text-black text-center'>{text}</p>
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
