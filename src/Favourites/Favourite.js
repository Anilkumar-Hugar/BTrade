import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RadioGroup, Radio } from "@mui/joy";
import { DarkMode, LightMode } from "@mui/icons-material";
import Divider from "@mui/joy/Divider";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { connect } from "react-redux";
import StopIcon from "@mui/icons-material/Stop";
import { getMockTickers } from "../data/GetMockTickers";
import PauseIcon from "@mui/icons-material/Pause";
import jwtDecode from "jwt-decode";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import makeStyles from "@mui/styles/makeStyles";
import { DeleteOutline } from "@mui/icons-material";
import Typography from "@mui/joy/Typography";
import { user } from "../store/user";
import { ExpandLess, Search } from "@mui/icons-material";
import { Switch } from "@mui/joy";
import { width } from "@mui/system";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    tabContainer: {
      position: "absolute",
      bottom: 0,
      width: "350px",
      marginBottom: "10px",
      marginLeft: "5px",
    },
    tickerActionsContainer: {
      display: "none",
      position: "absolute",
      left: "200.5px",
      width: "170px",
      height: "30px",
      "@media (max-width: 600px)": {
        width: "400px",
      },
    },
    gridItemHovered: {
      "& $tickerActionsContainer": {
        display: "block",
      },
    },

    tickerActionWrapper: {
      display: "flex",

      justifyContent: "space-between",
    },
    tickerActionButton: {
      backgroundColor: "transparent",
      cursor: "pointer",
    },
  };
});

const Favourite = (props) => {
  const date = "2000-02-29";
  const { user, setScroll ,getBuyAsync} = props;
  const [Ticker, setTicker] = useState(getMockTickers);
  const [Tick, setTick] = useState("");
  const [isBuying, setIsBuying] = useState(false);
  const [isSelling, setIsSelling] = useState(false);
  const [Qty, setQty] = useState("50");
  const [Qty1, setQty1] = useState("50");
  const [Price, setprice] = useState("");
  const navigate = useNavigate();
  
  const [hoveredItem, setHoveredItem] = useState(null);
  const classes = useStyles();

  const boxRef = useRef(null);
  useEffect(() => {
    setScroll(isBuying);
  }, [isBuying, setScroll]);
  const handleNewOrder = (orderType, tickerSymbol, tickerPrice) => {
    if (orderType === "BUY") {
      setIsBuying(true);
      setIsSelling(false);
      setTick(tickerSymbol);
      setprice(tickerPrice);
    } else if (orderType === "SELL") {
      setIsBuying(false);
      setIsSelling(true);
      setTick(tickerSymbol);
      setprice(tickerPrice);
    }
  };
  const handleItemHover = (index) => {
    setHoveredItem(index);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };
  const getTickerColor = (percentage) => {
    if (percentage > 0) {
      return "green";
    } else if (percentage < 0) {
      return "red";
    }
  };
  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };
  const handleQtyChange1 = (e) => {
    setQty1(e.target.value);
  };
  const handlePriceChange = (e) => {
    setprice(e.target.value);
  };
  const handleCancel = () => {
    setIsBuying(false);
  };
  const handleCancel1 = () => {
    setIsSelling(false);
  };
  const handleBuy =  async () => {
  
    try {
      const data = {
        tick:Tick,

 

        Qty:Qty,
      };
  
      await getBuyAsync(data);

toast.success("Order placed successfully!");
    } catch (error) {
     
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "360px",
          background: "#FCFCFC",
          marginLeft: "3px",
          marginTop: "2px",
          "@media (max-width: 600px)": {
            width: "610px",
            marginLeft: 0,
          },
        }}
      >
        <Box
          sx={{
            height: "69px",
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginLeft: "5px",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
            <Typography
              variant="span"
              level="body2"
              sx={{ fontWeight: "bold" }}
            >
              NIFTY 50
            </Typography>
            <Typography variant="span" level="body2">
              18197.67
            </Typography>
            <Typography variant="span" level="body2">
              0.51%
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
            <Typography
              variant="span"
              level="body2"
              sx={{ fontWeight: "bold" }}
            >
              BANK NIFTY
            </Typography>
            <Typography variant="span" level="body2">
              61167.45
            </Typography>
            <Typography variant="span" level="body2">
              -3.51%
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box>
          <TextField
            sx={{
              margin: "5px",
              width: "350px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "40px",
              },
              "& .MuiOutlinedInput-root:hover fieldset": {},
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#6ddac5",
              },
              "@media (max-width: 600px)": {
                width: "590px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ marginRight: "10px" }} />
                </InputAdornment>
              ),
            }}
            placeholder="Search eg:infy,nifty weekly"
          />
        </Box>

        <>
          {Ticker.map((item, index) => (
            <Grid
              container
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "20px",
              }}
              className={hoveredItem === index ? classes.gridItemHovered : ""}
              key={index}
              onMouseEnter={() => handleItemHover(index)}
              onMouseLeave={handleItemLeave}
            >
              <Grid item xs={5} sm={5}>
                <Typography
                  variant="span"
                  level="body2"
                  style={{ color: getTickerColor(item.percentage) }}
                >
                  {item["Meta Data"]["2. Symbol"]}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2}>
                <Typography
                  variant="span"
                  level="body2"
                  style={{ color: getTickerColor(item.percentage) }}
                >
                  {" "}
                  {item["Monthly Time Series"][date]["3. low"]}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2}>
                <ExpandLess
                  style={{ color: getTickerColor(item.percentage) }}
                />
              </Grid>
              <Grid item xs={1} sm={1}>
                <Typography
                  variant="span"
                  level="body2"
                  style={{ color: getTickerColor(item.percentage) }}
                >
                  {" "}
                  {item["Monthly Time Series"][date]["3. low"]}
                </Typography>
              </Grid>
              {hoveredItem === index && (
                <div className={classes.tickerActionsContainer}>
                  <div className={classes.tickerActionWrapper}>
                    <Box
                      sx={{
                        background: "blue",
                        width: "70px",
                        marginRight: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        "@media (max-width: 600px)": {
                          width: "50px",
                          marginLeft: "70px",
                        },
                      }}
                      onClick={() =>
                        handleNewOrder(
                          "BUY",

                        
                          item["Meta Data"]["2. Symbol"],
                          item["Monthly Time Series"][date]["3. low"],
                        )
                      }
                    >
                      B
                    </Box>
                    <Box
                      sx={{
                        background: "red",
                        width: "70px",
                        marginRight: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        "@media (max-width: 600px)": {
                          width: "50px",
                          marginLeft: "90px",
                        },
                      }}
                      onClick={() =>
                        handleNewOrder(
                          "SELL",
                          item["Monthly Time Series"][date]["3. low"],
                          item["Meta Data"]["2. Symbol"],
                          
                        )
                      }
                    >
                      S
                    </Box>
                    <div
                      style={{
                        background: "#f5f5f5",
                        width: "70px",
                        marginRight: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <DeleteOutline />
                    </div>
                  </div>
                </div>
              )}
            </Grid>
          ))}
        </>
        {isBuying && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,

              top: "71px",
              width: "300px",
              height: "88.5vh",
              background: "#FCFCFC",
              border: "1px solid #f5f5f5",
              zIndex: "10",
              "@media (max-width: 600px)": {
                top: "121px",
                position: "absolute",
                bottom: "0",
                left: "0",

                width: "602px",
              },
            }}
          >
            {" "}
            <Box
              sx={{
                background: "blue",
                height: "70px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "80px",
              }}
            >
              <>
                <Typography sx={{ marginLeft: "8px", color: "white" }}>
                  Buy {Tick} x {Qty}
                </Typography>{" "}
                <Switch
                  size="sm"
                  variant="soft"
                  sx={{
                    position: "absolute",
                    right: "0px",
                    marginRight: "10px",
                  }}
                  checked={isSelling}
                  onChange={() => {
                    setIsBuying(!isBuying);
                    setIsSelling(!isSelling);
                  }}
                />
              </>
            </Box>
            <RadioGroup
              defaultValue="Intraday"
              size="sm"
              style={{
                marginTop: "2em",
                justifyContent: "left",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <Radio value="Intraday" label=" Intraday MIS" />
              <Radio value="NRML" label=" Overnight NRML" />
            </RadioGroup>
            <TextField
              size="small"
              label="Qty"
              fullWidth
              type="number"
              value={Qty}
              onChange={handleQtyChange}
              inputProps={{
                min: 50,
                step: 10,
              }}
              style={{ marginTop: "2em" }}
            />
            <TextField
              size="small"
              label="Price"
              fullWidth
              value={Price}
              onChange={handlePriceChange}
              style={{ marginTop: "2em" }}
            />
            <RadioGroup
              defaultValue="market"
              size="sm"
              style={{
                marginTop: "2em",
                justifyContent: "left",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <Radio value="market" label="Market" />
              <Radio value="limit" label="Limit" />
            </RadioGroup>
            <Divider style={{ marginTop: "150px" }}></Divider>
            <Box sx={{ position: "absolute", bottom: "0px", margin: "20px" }}>
              <Button
                style={{
                  color: "#FCFCFC",
                  background: "blue",
                  width: "120px",
                  marginRight: "5px",
                  textTransform: "none",
                }}onClick={handleBuy}
              >
                Buy
              </Button>
              <Button
                style={{
                  color: "#6ddac5",
                  background: "#FCFCFC",
                  width: "120px",
                  border: "1px solid #6ddac5",
                  marginRight: "5px",
                  textTransform: "none",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
        {isSelling && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              top: "71px",
              width: "300px",
              height: "88.5vh",
              background: "#FCFCFC",
              border: "1px solid #f5f5f5",
              zIndex: "10",
              "@media (max-width: 600px)": {
                top: "121px",
                position: "absolute",
                bottom: "0",
                left: "0",

                width: "602px",
              },
            }}
          >
            {" "}
            <Box
              sx={{
                background: "red",
                height: "70px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "80px",
              }}
            >
              <>
                <Typography sx={{ marginLeft: "8px", color: "white" }}>
                  Sell {Tick} x {Qty}
                </Typography>{" "}
                <Switch
                  size="sm"
                  variant="soft"
                  sx={{
                    position: "absolute",
                    right: "0px",
                    marginRight: "10px",
                  }}
                  checked={isSelling}
                  onChange={() => {
                    setIsBuying(!isBuying);
                    setIsSelling(!isSelling);
                  }}
                />
              </>
            </Box>
            <RadioGroup
              defaultValue="Intraday"
              size="sm"
              style={{
                marginTop: "2em",
                justifyContent: "left",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <Radio value="Intraday" label=" Intraday MIS" />
              <Radio value="NRML" label=" Overnight NRML" />
            </RadioGroup>
            <TextField
              size="small"
              label="Qty"
              fullWidth
              type="number"
              value={Qty1}
              onChange={handleQtyChange1}
              inputProps={{
                min: 50,
                step: 10,
              }}
              style={{ marginTop: "2em" }}
            />
            <TextField
              size="small"
              label="Price"
              fullWidth
              value={Price}
              onChange={handlePriceChange}
              style={{ marginTop: "2em" }}
            />
            <RadioGroup
              defaultValue="market"
              size="sm"
              style={{
                marginTop: "2em",
                justifyContent: "left",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <Radio value="market" label="Market" />
              <Radio value="limit" label="Limit" />
            </RadioGroup>
            <Divider style={{ marginTop: "150px" }}></Divider>
            <Box
              sx={{
                position: "absolute",
                bottom: "0px",
                margin: "20px",
                textTransform: "none",
              }}
            >
              <Button
                style={{
                  color: "#FCFCFC",
                  background: "red",
                  width: "120px",
                  marginRight: "5px",
                  textTransform: "none",
                  "@media (max-width: 600px)": {
                    width: "220px",
                    background: "yellow",
                  },
                }}
              
              >
                Sell
              </Button>
              <Button
                style={{
                  color: "#6ddac5",
                  background: "#FCFCFC",
                  width: "120px",
                  border: "1px solid #6ddac5",
                  marginRight: "5px",
                  textTransform: "none",
                }}
                onClick={handleCancel1}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}

        <Box className={classes.tabContainer}>
          <Tabs defaultValue={1}>
            <TabList
              size="sm"
              variant="outlined"
              sx={{
                background: "#fcfcfc",
                "@media (max-width: 600px)": {
                  width: "590px",
                },
              }}
            >
              <Tab value={1}>1</Tab>
              <Tab value={2}>2</Tab>
              <Tab value={3}>3</Tab>
              <Tab value={4}>4</Tab>
              <Tab value={5}>5</Tab>
              <Tab value={6}>6</Tab>
              <Tab value={7}>7</Tab>
            </TabList>
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setScroll: dispatch.user.setScroll,
  getBuyAsync: dispatch.buy.getBuyAsync,

});
export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
