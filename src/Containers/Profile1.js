import React from "react";
import { useState } from "react";
import { Button, Typography,} from "@mui/material";
import { Box, Grid, } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Profile from "./Profile";
import { TextField } from "@mui/material";
import WebStoriesIcon from '@mui/icons-material/WebStories';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { connect } from "react-redux";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { ClassNames } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { SessionTypes } from "../utils/sessionUtils";
// import Select , { components }from "react-select";
import moment from "moment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useEffect } from "react";
import { Select } from "@mui/material";
import { MARKET_PATTERNS } from "../data/MarketPatterns";
import { MenuItem } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";
const useStyles = makeStyles((theme) => {
  return {
app:{
 
    height: "100vh",
    width: "100vw",
   
   
    display: "flex",
    flexdirection: "column"
  }
  

  };
});


//px, em, rem
//vh,

const Profile1 = (props) => {
  const classes = useStyles();
  const marketPatterns = MARKET_PATTERNS;
  const [marketPattern, setMarketPattern] = useState(marketPatterns[0]);
 const { user, setPaidSession, setActiveSessionType, setDate } = props;
  const [selectedBox, setSelectedBox] = useState(0);
  const [selectedSessionType, setSelectedSessionType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment());
  const customStyles = {
    control: (provided) => ({
      ...provided,
   width:"390px",
      height: "40px",
     marginBottom:"35px",
      borderRadius: "10px",
      border: "1px solid grey",
    }), }
  const options = [
    
      
     
    { value: "Up Trending", label: "Up Trending" },
    { value:  "Down Trending", label:  "Down Trending" },
    { value: "Flat", label:  "Flat" },
    { value:  "Up Trending with Down Close", label:  "Up Trending with Down Close" },
    { value:"Up Trending with Flat Close", label: "Up Trending with Flat Close",}
  



];
  
  const handleBoxClick = (boxIndex) => {
    // Update the selectedSessionType based on the selected box
    let sessionType;
    switch (boxIndex) {
      case 0:
        sessionType = SessionTypes.SELECT_DATE;
        break;
      case 1:
        sessionType = SessionTypes.SYSTEM_PICKED;
        break;
      case 2:
        sessionType = SessionTypes.MARKET_PATTERN;
        break;
      default:
        sessionType = null;
        break;
    }
    setSelectedBox(boxIndex);
    setSelectedSessionType(sessionType);
    setActiveSessionType(sessionType);
  };
  const handleMarketPatternChange = (e) => {
    setMarketPattern(e.target.value);
    
  };
 const handleContinue = () => {
    setPaidSession(false);
    setDate(marketPattern);
  };
  return (
    <>
   <div className={ClassNames.app}>
   <Box style={{ height: "100vh" }}>
      <Header />
      
<Profile/>
    </Box>
    <Dialog
          open={user.paidSession}
          classes={{ paper: classes.dialogPaper }}
        >
          <DialogTitle>Start your Session</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box
                sx={{
                  border:
                    selectedBox === 0 ? "2px solid #6ddac5" : "1px solid grey",
                  height: "100px",
                  borderRadius: "10px",
                  width: "100px",
                  margin: "8px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                onClick={() => handleBoxClick(0)}
              >
                <CalendarMonthIcon sx={{ fontSize: 32 }} />
                {SessionTypes.SELECT_DATE}
              </Box>
              <Box
                sx={{
                  border:
                    selectedBox === 1 ? "2px solid #6ddac5" : "1px solid grey",
                  height: "100px",
                  width: "100px",
                  margin: "8px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                onClick={() => handleBoxClick(1)}
              >
                <WebStoriesIcon sx={{ fontSize: 32 }} />
                {SessionTypes.SYSTEM_PICKED}
              </Box>
              <Box
                sx={{
                  border:
                    selectedBox === 2 ? "2px solid #6ddac5" : "1px solid grey",
                  height: "100px",
                  width: "110px",
                  margin: "8px 8px 0",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                onClick={() => handleBoxClick(2)}
              >
                <WaterfallChartIcon sx={{ fontSize: 32 }} />
               {SessionTypes.MARKET_PATTERN}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ flexDirection: "column", alignItems: "center" }}>
            {selectedBox === 0 && (
              <Select
              fullWidth
              variant="outlined"
              onChange={handleMarketPatternChange}
              value={marketPattern}
              menuplacement="bottom"
              menuposition="fixed" size="small" sx={{marginBottom:"10px"}}
            >
              {marketPatterns.map((marketPattern, index) => (
                <MenuItem key={index} value={marketPattern}>
                  {marketPattern}
                </MenuItem>
              ))}
            </Select>
             
            )}
            {selectedBox === 1 && (
              <Typography sx={{ marginBottom: "50px" }}>
                System will randomly pick a session for you.
              </Typography>
            )}
            {selectedBox === 2 && (
           <Select
           fullWidth
           variant="outlined"
           onChange={handleMarketPatternChange}
           value={marketPattern}
           menuplacement="bottom"
           menuposition="fixed" size="small" sx={{marginBottom:"10px"}}
         >
           {marketPatterns.map((marketPattern, index) => (
             <MenuItem key={index} value={marketPattern}>
               {marketPattern}
             </MenuItem>
           ))}
         </Select>
            )}

            <Button
              fullWidth
              style={{
                marginBottom:"5px",
                borderRadius: "10px",
                background: "#6ddac5",
                color: "#FCFCFC",
                textTransform: "none",
              }}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>
       
          </div>
    </>
  );
};

const mapStateToProps = (state) => ({
    user: state.user,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setPaidSession: dispatch.user.setPaidSession,
    setActiveSessionType: dispatch.user.setActiveSessionType,
    setDate: dispatch.user.setDate,
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile1);