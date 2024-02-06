import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import logo from "../../../assets/image/LogoFooter.png";
import FooterIconsBar from "./FooterIconsBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


const Footer = () => {
  return (
      <Box style={{backgroundColor: '#EBEBEB'}}>
        <Container maxWidth="lg">
          <Grid pb={'50px'} container spacing={9}>
            <Grid item xs={12} md={6} lg={3}>
              <Typography mb={'10px'} style={{fontSize: '26px', fontWeight: '500'}}>Lorem ipsum</Typography>
              <Typography style={{fontSize: '18px'}}>dolor sit amet
                consectetur adipiscing
                Suspendisse quis
                fermentum lectus
                Curabitur vehicula tellus
                in enim temporat
                congue dui temporenatis
                variusollicitudin sem
                iaculis iaculis.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography mb={'10px'} style={{fontSize: '26px', fontWeight: '500'}}>Lorem ipsum</Typography>
              <Typography style={{fontSize: '18px'}}>dolor sit amet
                consectetur adipiscing
                Suspendisse quis
                fermentum lectus
                Curabitur vehicula tellus
                in enim temporat
                congue dui temporenatis
                variusollicitudin sem
                iaculis iaculis.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography mb={'10px'} style={{fontSize: '26px', fontWeight: '500'}}>Lorem ipsum</Typography>
              <Typography style={{fontSize: '18px'}}>dolor sit amet
                consectetur adipiscing
                Suspendisse quis
                fermentum lectus
                Curabitur vehicula tellus
                in enim temporat
                congue dui temporenatis
                variusollicitudin sem
                iaculis iaculis.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Box>
                <img src={logo} alt="" />
              </Box>
              <FooterIconsBar/>
              <Typography style={{fontSize: '18px'}}>dolor sit amet
                consectetur adipiscing
                Suspendisse quis
                fermentum lectus
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Box style={{backgroundColor: '#5A7287', height: '67px'}}/>
      </Box>
  );
};
export default Footer;
