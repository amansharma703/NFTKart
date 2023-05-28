import React from "react";

function Metamask({ ratio = 20 }) {
    return <img width={ratio} height={ratio} alt='metamaskIcon' style={{ height: ratio, width: ratio }} src='/metamask-fox.png' loading='lazy'></img>;
}

export default Metamask;
