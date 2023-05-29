export function isMobile() {
    var match = window.matchMedia || window.msMatchMedia;
    if (match) {
        var mq = match("(pointer:coarse)");
        return mq.matches;
    }
    return false;
}

export const shortenAddress = (address) => {
    if (typeof address !== "string") return "";
    return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};
