import {styled} from "@mui/material/styles";
import React from "react";
import {Tooltip, tooltipClasses} from "@mui/material";

export const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        maxWidth: 150,
    },
}));
