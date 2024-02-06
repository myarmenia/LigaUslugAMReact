import { IconButton } from "@mui/material";
import React from "react";
import InstaSvg from "../../../assets/svg/footer/InstaSvg";
import OkSvg from "../../../assets/svg/footer/OkSvg";
import VkSvg from "../../../assets/svg/footer/VkSvg";
import YoutubeSvg from "../../../assets/svg/footer/YoutubeSvg";


const FooterIconsBar = () => {
    return (
           <div style={{display: 'flex', flexWrap: 'nowrap'}}>
               <IconButton>
                   <VkSvg/>
               </IconButton>
               <IconButton>
                    <OkSvg/>
               </IconButton>
               <IconButton>
                    <InstaSvg/>
               </IconButton>
               <IconButton>
                    <YoutubeSvg/>
               </IconButton>
               
           </div>
      )
      
  };
  export default FooterIconsBar;