import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useSelector} from "react-redux";
import {styled} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import TermsOfUsePage from "../termsOfUsePage/TermsOfUsePage";

const documentsList = [
    {
        name: "Գաղտնիության քաղաքականություն",
        href: "../terms_of_use"
    },
    {
        name: "Օգտվելու կանոններ",
        href: "../privacy_policy"
    },
    {
        name: "Հանրային առաջարկ",
        href: "../public_offer"
    }
]

export const CustomTypography = styled(Typography)`
  cursor: pointer;
  :after {
    padding-left: 10px;
    padding-right: 10px;
    content: "\u2192";
  }
`

const DocumentsPage = () => {
    const {auth} = useSelector(state => state.auth);
    const navigate = useNavigate();
    return (
        <div style={{marginTop: auth ? '120px' : '30px'}}>
             <Container maxWidth="lg">
                <Box sx={{display: "flex"}}>
                    <CustomTypography onClick={() => navigate('/')}>Հիմնական</CustomTypography>
                    <Typography>Իրավաբանական փաստաթղթեր</Typography>
                </Box>
                <Typography pt={2} pb={2} component="h1" variant="h4" sx={{
                    fontWeight: "500"
                }}>
                    Իրավաբանական փաստաթղթեր
                </Typography>
                <Box>
                    {documentsList.map((el, index) => (
                        <Typography mt={2} mb={2} key={index} sx={{
                            cursor: "pointer"
                        }} onClick={() => navigate(el.href)}>
                            {el.name}
                        </Typography>
                    ))}
                </Box>
            </Container>
        </div>
    )
}

export default DocumentsPage;
