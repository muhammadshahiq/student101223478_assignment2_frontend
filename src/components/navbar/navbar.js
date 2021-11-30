import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0),
        },

    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#000'
    }
}))
const Appbar = () => {

    const classes = useStyles();
    return (
        <div>
            <AppBar position="sticky"  className={classes.appBar}>
                <Toolbar>
                    <a className="text-white font-weight-bold" href="/"> Employee Management System</a>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Appbar