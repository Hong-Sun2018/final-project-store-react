import { Box, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, memo } from 'react';
import axios from 'axios';
import GetUrl from '../../Constants/API';

import { useDispatch } from 'react-redux';
import { setDialog } from '../../Redux/Reducer/DialogReducer';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(
  {
    root: {
      width: '60%',
      maxWidth: '400px',
      minWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'yellow'
    },
    input: {
      width: '100%',
      marginBottom: '12px',
      marginTop: '12px',
    },
    button: {
      marginTop: '15px',
      display: 'block',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
);

const SignUpView = () => {

  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [confirmPwd, setConfirmPwd] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleChangeConfirmPwd = (event) => {
    setConfirmPwd(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.keyCode == 13){
      handleSignUp();
    }
  }

  ////////// Sign Up Http ///////////
  const handleSignUp = () => {

    if (username.length == 0 || password.length == 0 ) {
      dispatch(setDialog({
        dialogMsg: 'Username or password cannot be empty.',
        isOpen: 'true'
      }));
      return;
    } 

    if (password != confirmPwd ) {
      dispatch(setDialog({
        dialogMsg: 'The .',
        isOpen: 'true'
      }));
      return;
    }

    const url = GetUrl('SignUp');
    const reqBody = {
      UserName: username,
      Password: password
    }

    console.log(url);
    console.log(reqBody);

    axios.post(url, reqBody)
      .then((res) => {
        dispatch(setDialog('New user has been registed'));
        navigate.push('/')
      })
      .catch( err => {
        if (err.response && err.response.status == '409'){
          dispatch(setDialog('Username is not available. '))
        }
        else {
          dispatch(setDialog('Unknow error. '))
        }
      });
  }

  return (
    <Box className={classes.root}> 
      <TextField className={classes.input} id={'username'} label={'Username'} variant={'filled'} onChange={handleChangeUsername} size={'small'} />
      <TextField className={classes.input} id={'password'} label={'Password'} variant={'filled'} type={'password'} onChange={handleChangePassword} size={'small'} />
      <TextField className={classes.input} id={'confirmPwd'} label={'Confirm Password'} variant={'filled'} type={'password'} onChange={handleChangeConfirmPwd} size={'small'} onKeyDown={handleKeyDown}/>
      
      <Button className={classes.button} sx={{ textTransform: 'none' }} variant={'contained'} onClick={handleSignUp}>
        Sign Up
      </Button>   
    </Box>
  );
}

export default memo(SignUpView);