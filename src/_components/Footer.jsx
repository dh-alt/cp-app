import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {alertActions, userActions} from '../_actions';

import MButton from '@material-ui/core/Button';
import MTextField from '@material-ui/core/TextField';
import MLink from '@material-ui/core/Link';
import MGrid from '@material-ui/core/Grid';
import MBox from '@material-ui/core/Box';
import MTypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MContainer from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';

import { primaryColor, secondaryColor } from "./main-style.js";

const useStyles = makeStyles((theme) => ({
  firstContainer: {
    marginTop: theme.spacing(8),
    color: "#ffffff",
    backgroundColor: "#343a40",
    "@media (min-width: 600px)":{
      padding: "3rem 1.5rem 6rem"
    },
    "& a":{
      color: "#ffffff",
      "&:hover":{
        color: "#ffb3b3"
      }
    },
  },
  social:{
    "& a":{
      textDecoration: "none",
    }
  },
  icon: {
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
    marginRight: "5px"
  },
  twitter: {
    height: ".85rem",
    width: ".85rem"
  },
  facebook: {
    height: ".5rem",
    width: ".5rem"
  },
  linkedin: {
    height: ".75rem",
    width: ".75rem"
  },
  secondContainer: {
    color: "#ffffff",
    backgroundColor: "#212529",
    "@media (max-width: 599px)":{
      padding: "1.5rem",
      textAlign: "center"
    },
    "@media (min-width: 600px)":{
      padding: "3rem 1.5rem 1.5rem 1.5rem",
    }
  },
  rightColumn:{
    "@media (min-width: 600px)":{
      textAlign: "right"
    },
  },
  title: {
    marginBottom: '1.5rem'
  }

}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment className={classes.footer}>
      <MContainer maxWidth="xl" className={classes.firstContainer}>
        <Grid container>
          <Grid item xs={12} sm={7}>
            <MTypography variant="h5" className={classes.title}>About</MTypography>
            <MTypography variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacus elit, egestas sit amet pharetra a, gravida a lorem. Donec justo lacus, commodo at consequat eu, posuere sit amet sem. </MTypography>
            <MTypography variant="body2">Morbi mi mauris, malesuada at venenatis mattis, posuere tempor leo. Cras venenatis condimentum turpis, vitae porttitor ante venenatis sit amet. </MTypography>
            <MTypography variant="body2">Aenean facilisis diam felis, non rutrum velit sollicitudin vestibulum.<a href="mailto:hello@email.com">hello@email.com</a>.</MTypography>
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={2} className={classes.social}>
            <MTypography variant="h5" className={classes.title}>Social</MTypography>
            <MTypography variant="body1">
              <a href="#" target="_blank">
                <span className={classes.icon + " " + classes.twitter}><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></span>
                {'  '}Twitter
              </a>
            </MTypography>
            <MTypography variant="body1">
              <a href="#" target="_blank">
                <span className={classes.icon + " " + classes.facebook}><svg class="svg-inline--fa fa-facebook-f fa-w-10" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></span>
                {'  '}Facebook
              </a>
            </MTypography>
            <MTypography variant="body1">
              <a href="#" target="_blank">
                <span className={classes.icon + " " + classes.linkedin}><svg class="svg-inline--fa fa-linkedin-in fa-w-14" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></span>
                {'   '}Linkedin
              </a>
            </MTypography>
          </Grid>
          <Grid item xs={12} sm={2} className={classes.social}>
            <MTypography variant="h5" className={classes.title}>Links</MTypography>
            <MTypography variant="body1">
              <a href="#" target="_blank">Privacy Policy</a>
            </MTypography>
            <MTypography variant="body1">
              <a href="#" target="_blank">Terms of Use</a>
            </MTypography>
          </Grid>
        </Grid>
      </MContainer>
      <MContainer component="footer" maxWidth="xl" className={classes.secondContainer}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <MTypography variant="body2">
              {'Copyright ©'}{new Date().getFullYear()}
            </MTypography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.rightColumn}>
            <MTypography variant="body2">
              {'809 Laurel Street #251, San Carlos, California 94070'}
            </MTypography>
          </Grid>
        </Grid>
      </MContainer>
    </React.Fragment>
  );
}

function mapState(state) {
}

const actionCreators = {
};

const connectedFooter = connect(mapState, actionCreators)(Footer);
export {connectedFooter as Footer};
