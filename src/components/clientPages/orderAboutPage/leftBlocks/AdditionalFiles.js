import React from "react";
import Divider from "@mui/material/Divider";
import DownloadFileSvg2 from "../../../../assets/svg/DownloadFileSvg2";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IMAGE_TYPES } from "../../../../constants/images";

const AdditionalFiles = ({ state }) => {
  return (
    <Card>
      <Typography variant={"h2"}>Дополнительные файлы</Typography>
      <Divider color={"#808080"} style={{ margin: "10px 0" }} />
      <Box style={{ 
        paddingLeft: "20px",
        display:"flex",
        flexDirection:"column",
        gap:"8px",
        "& a":{
          
        }
         }}>
        {state?.image_tasks.map(({ image_name, id }) => {
          // if(image_name.includes('png') || image_name.includes('jpeg') || image_name)
          if (
            IMAGE_TYPES.some((el) => {
              return image_name.includes(el);
            })
          ) {
            return null;
          }
          return (
            <a
            download
            target={"_blank"}
            style={{textDecoration:"none",color:"#808080"}}
            href={`${process.env.REACT_APP_IMG_TASK}${image_name}`}
               key={id}
            ><DownloadFileSvg2 /> {image_name}</a>
          );
        })}
      </Box>
    </Card>
  );
};

export default AdditionalFiles;
