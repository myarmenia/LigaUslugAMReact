import {makeStyles} from "@material-ui/core";

export const useProfileCardStyles = makeStyles({
    root:{
        background: '#FFFFFF',
        borderRadius: "20px",
        padding: "26px 30px",
        "& .MuiTypography-h6":{
            fontWeight: 500,
            fontSize:17,
        },
        "& .MuiTypography-h5":{
            color: "#808080",
            fontSize: 14,
            display:"flex",
            margin:10
        },
        "& .MuiTypography-h4":{
            color: "#808080",
            fontSize: 14,
            display:"flex",
            margin: 0
        }
    },
    titleWrap:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title:{fontWeight: "500 !important",
        fontSize: '18px !important',
        marginBottom:'10px !important'
    },
    textBtn:{
        cursor:"pointer",
        "&:hover":{
            fontWeight:600
        }
    },
    orderSubBlockSpaceBetween: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexWrap:"wrap",
        gap:"12px"
    },

})
