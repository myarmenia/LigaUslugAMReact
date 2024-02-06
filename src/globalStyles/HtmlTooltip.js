import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


export const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))
(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#fff',
        color:'#000',
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-end",
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        padding:0,
        // position:"relative",
        // left:"550px",
        // top:"160px",
      
    },
}));
