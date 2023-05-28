import React from "react";

function Avatar({ src, size = "lg", username, containerStyle, widthClassName = "", heightClassName = "" }) {
    const [srcError, setSrcError] = React.useState(false);
    return (
        <div style={containerStyle} className='relative rounded-full'>
            {src?.length > 0 ? (
                srcError ? (
                    <div className={`avatar-${size} rounded-full bg-primary flex justify-center items-center  ${widthClassName} ${heightClassName}`}>
                        <span className='text-white text-lg'>{username?.charAt(0)?.toUpperCase()}</span>
                    </div>
                ) : (
                    <div className={`avatar-${size} ${widthClassName} ${heightClassName}`}>
                        <img
                            alt={username}
                            onError={(e) => {
                                e.target.onerror = null;
                                setSrcError(true);
                            }}
                            src={src}
                            className={`avatar-${size} rounded-full ${widthClassName} ${heightClassName}`}
                            loading='lazy'
                        />
                    </div>
                )
            ) : (
                <div className={`avatar-${size} rounded-full bg-primary flex justify-center items-center  ${widthClassName} ${heightClassName}`}>
                    <span className='text-white text-lg'>{username?.charAt(0)?.toUpperCase()}</span>
                </div>
            )}
        </div>
    );
}

export default Avatar;
