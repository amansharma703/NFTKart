import React from "react";
import CopyIcon from "../Icons/CopyIcon";
import Share from "../Icons/Share";
import PopOver from "../Popover";
import { isMobile } from "../../../utils/utils";

function CopyButton({
    bgColor,
    title,
    url,
    type = "icon",
    isHoverable = true,
    showCopyIcon = true,
    showIcon = true,
    forMobile = false,
    topPosition = "-top-11",
    leftPosition = "-left-8",
    text = "text-sm",
    cssClasses = "justify-between py-2",
    ratio = "h-9 w-9",
}) {
    const [copied, setCopied] = React.useState(false);
    const [showCopyText, setShowCopyText] = React.useState(false);

    const toggleCopyText = (isShow) => {
        if (isMobile()) {
            return;
        }
        setShowCopyText(isShow);
    };

    const handleCopyClick = () => {
        if (isMobile() && navigator.share) {
            navigator
                .share({
                    title: title,
                    url: url,
                })
                .catch(console.error);
        } else {
            const el = document.createElement("input");
            el.value = url;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    };

    const IconButton = () => (
        <div className='relative'>
            <button
                className={` ${ratio} flex justify-center rounded-full items-center bg-frescoWhite`}
                onMouseEnter={() => toggleCopyText(true)}
                onMouseLeave={() => toggleCopyText(false)}
                onClick={handleCopyClick}
            >
                {forMobile && isMobile() && navigator.share ? (
                    <div className='bg-white rounded-full p-1'>
                        <Share copied={copied} />
                    </div>
                ) : (
                    <CopyIcon copied={copied} color={bgColor} />
                )}
            </button>
            {isMobile() && navigator.share
                ? undefined
                : showCopyText && <PopOver text={copied ? "Copied!" : "Copy Link"} topPosition={topPosition} leftPosition={leftPosition} />}
        </div>
    );

    return (
        <div
            onClick={(e) => {
                if (type === "icon") {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }}
        >
            {type === "button" ? (
                <div className=''>
                    <button
                        onClick={handleCopyClick}
                        className={`group flex rounded-md items-center w-full pl-2 pr-1 ${cssClasses}  ${text}cursor-pointer`}
                    >
                        Copy Link{" "}
                        {showIcon ? (
                            <div>
                                <span onMouseEnter={() => toggleCopyText(true)} onMouseLeave={() => toggleCopyText(false)}>
                                    <CopyIcon copied={copied} color={bgColor} />
                                </span>
                            </div>
                        ) : null}
                    </button>
                </div>
            ) : isHoverable ? (
                showCopyIcon ? (
                    <IconButton />
                ) : undefined
            ) : (
                <IconButton />
            )}
        </div>
    );
}

export default CopyButton;
