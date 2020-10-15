import React, { FunctionComponent, useState } from 'react';
import { Avatar, Button, Typography, TextField, Box, Link as MaterialLink } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

  

export const Login: FunctionComponent = () => {
  
  const [sighnup, setsighnup] = useState(false);

    const classes = useStyles();
    return (
        <Box margin="auto">
            <form className={classes.form} action={"sighnup" ? "/login" : "/register"} method="post" noValidate>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="username"
                    label="Username"
                    required
                    autoFocus
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type="password"
                    name="password"
                    label="Password"
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Typography component={Link} to="/" variant="body2">
                        Forgot password?
                    </Typography>
                    </Grid>
                    <Grid item>
                    <MaterialLink variant="body2" onClick={() => setsighnup(!sighnup)}>
                        {sighnup ? "Don't have an account? Sign Up" : "Have account, Login In"}
                    </MaterialLink>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};