import {
  Button,
  Grid,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";
import jwtDecode from "jwt-decode";

import { Link as RouterLink } from "react-router-dom";
import { Paper } from "@mui/material";
import { connect } from "react-redux";
import Illustration1 from "../assets/image/Illustration1.svg";
import Illustration2 from "../assets/image/Illustration2.svg";
import { theme } from "../index.js";

import { ThemeProvider } from "@mui/material/styles";

const useStyles = makeStyles((theme) => {
  return {};
});

const Admin = (props) => {
  const { login, getLoginAsync } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  
 
  const handleAdmin=()=>{
    navigate("/adminSignup");
  };
 
  
  const handleStocks=()=>{
   
  };
  const handleLogout=()=>{
   
   localStorage.removeItem("token");
  };
 
  

 

  return (
    <>
      <div className="signup1_container">
        <Paper className="signup1_form_container">
          <Typography
            textAlign="left"
            sx={{ marginBottom: "1em", fontSize: "25px", fontWeight: "bold" }}
          >
            Admin Page
          </Typography>

            <Button onClick={handleAdmin}sx={{marginTop:"20px",}}>add user</Button>
       
        <Button onClick={handleStocks}sx={{marginTop:"20px"}}>getstocksdata</Button> 
        <Box sx={{display:"flex",flexWrap:"wrap",gap:"20px",marginTop:"70px"}}>
        <Box display="flex" justifyContent="center"alignItems='center'>
            <Typography>
              Logout User?   <RouterLink to="/login" onClick={handleLogout}>
              Logout  </RouterLink>
            </Typography>
          </Box>
        <Box display="flex" justifyContent="center">
            <Typography>
              Existing User? <RouterLink to="/login">SignIn</RouterLink>
            </Typography>
          </Box>

          </Box>

          <div></div>
        
        </Paper>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  login: state.login,
});
const mapDispatchToProps = (dispatch) => ({
  getLoginAsync: dispatch.login.getLoginAsync,
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
