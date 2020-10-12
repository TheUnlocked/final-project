import React from 'react';
import { FunctionComponent } from "react";
import { Link } from 'react-router-dom';
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { handleChange } from '../util';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane';
import { ControlledEditor as Editor, monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { Send as SendIcon } from '@material-ui/icons';
import '../../css/react-split-pane.css';
import editorTypes from '!!raw-loader!../../assets/challengelib.d.ts';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslate, useLogin, useNotify, useSafeSetState } from 'ra-core';


monaco.config({
    paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs'
    }
})

monaco.init().then(async monaco => {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        ...monaco.languages.typescript.javascriptDefaults.getCompilerOptions(),
        lib: ["es2019"]
    });
    monaco.languages.typescript.javascriptDefaults.addExtraLib(editorTypes, "challengelib.d.ts");
});

interface Props {
    redirectTo?: string;
}

interface FormData {
    username: string;
    password: string;
}

const useStyles = makeStyles(
    (theme: Theme) => ({
        form: {
            padding: '0 1em 1em 1em',
        },
        input: {
            marginTop: '1em',
        },
        button: {
            width: '100%',
        },
        icon: {
            marginRight: theme.spacing(1),
        },
    }),
    { name: 'RaLoginForm' }
);

const Input = ({
    meta: { touched, error }, // eslint-disable-line react/prop-types
    input: inputProps, // eslint-disable-line react/prop-types
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

const LoginForm: FunctionComponent<Props> = props => {
    const { redirectTo } = props;
    const [loading, setLoading] = useSafeSetState(false);
    const login = useLogin();
    const translate = useTranslate();
    const notify = useNotify();
    const classes = useStyles(props);

    const validate = (values: FormData) => {
        const errors = { username: undefined, password: undefined };

        if (!values.username) {
            errors.username = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };

    const submit = values => {
        setLoading(true);
        login(values, redirectTo)
            .then(() => {
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                    'warning'
                );
            });
    };

    return (
        <Form
            onSubmit={submit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.form}>
                        <div className={classes.input}>
                            <Field
                                autoFocus
                                id="username"
                                name="username"
                                component={Input}
                                label={translate('ra.auth.username')}
                                disabled={loading}
                            />
                        </div>
                        <div className={classes.input}>
                            <Field
                                id="password"
                                name="password"
                                component={Input}
                                label={translate('ra.auth.password')}
                                type="password"
                                disabled={loading}
                                autoComplete="current-password"
                            />
                        </div>
                    </div>
                    <CardActions>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                            className={classes.button}
                        >
                            {loading && (
                                <CircularProgress
                                    className={classes.icon}
                                    size={18}
                                    thickness={2}
                                />
                            )}
                            {translate('ra.auth.sign_in')}
                        </Button>
                    </CardActions>
                </form>
            )}
        />
    );
};

LoginForm.propTypes = {
    redirectTo: PropTypes.string,
};

export default LoginForm;iv>);
};