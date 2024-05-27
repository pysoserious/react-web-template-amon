import { Close } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";
import { shallowEqual, useSelector, useStore } from "react-redux";
import { hideAlert } from '../../redux/actions/AppActions';
import './Alert.css';

export const AlertBox = () => {

    const useStyles = makeStyles((theme: Theme) => ({

        icon: {
            fontSize: 20,
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        iconVariant: {
            opacity: 0.9,
            // marginRight: theme.spacing(1),
        },
    }));

    // /*eslint no-unused-vars: "warn"*/
    const { showAlert, alertMessage } = useSelector((state: any) =>
        state.appReducer, shallowEqual
    )
    const store = useStore();
    const classes = useStyles();
    return (
        <Snackbar
            open={showAlert && alertMessage && alertMessage !== ""}
            className="snackbar-wrapper"
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'top'
            }}
            message={
                <span id="client-snackbar" className={classes.message}>
                    {alertMessage}
                </span>
            }
            autoHideDuration={3000}
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                        store.dispatch(hideAlert())
                    }}
                >
                    <Close className={classes.icon} />
                </IconButton>,
            ]}
            onClose={handleClose}
        />
    );

    function handleClose(event: any, reason: string) {
        if (reason === 'clickaway') {
            return;
        }
        store.dispatch(hideAlert())
    }
}