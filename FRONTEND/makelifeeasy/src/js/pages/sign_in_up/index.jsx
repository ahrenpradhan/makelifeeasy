import React from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import SignIn from './signin';
import SignUp from './signup';
import { Route, Switch } from "react-router";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/signin">
        Make Life Easy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: "#00d096",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#343e4a',
    },
    secondary: {
      main: '#00D096',
    },
  },
});

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className="sign_in_up--root">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image + " sign_in_up--image"} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Switch>
          <Route exact path="/signin" component={()=><SignIn useStyles={useStyles} theme={theme} />} />
          <Route exact path="/signup" component={()=><SignUp useStyles={useStyles} theme={theme} />} />
        </Switch>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}
