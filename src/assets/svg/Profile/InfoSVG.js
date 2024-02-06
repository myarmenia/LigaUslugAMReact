import React from "react";

const InfoSVG = ({size = 16,color="#DF040A",margin ="0 10px 0 0"}) => {
    return(<div style={{margin:margin}}>
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" fill={color}/>
        </svg>
        </div>
    )
}
export default InfoSVG;
