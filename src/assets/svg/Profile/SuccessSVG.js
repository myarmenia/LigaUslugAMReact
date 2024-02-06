import React from "react";

const SuccessSVG = ({size=16,margin ="0 10px 0 0"}) => {
    return(<div style={{margin:margin}}>
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" fill="#4B9A2D"/>
            <path d="M5 8.18182L7.57895 10L12 6" stroke="white" strokeLinecap="round"/>
        </svg>
        </div>
    )
}
export default SuccessSVG;
