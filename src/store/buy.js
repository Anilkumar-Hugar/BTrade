import axios from "axios";


export const buy = {
    state: {
      buyData: [],
      
    },
    reducers: {
      setBuy: (state, payload) => {
        return {
          ...state,
          buyData: payload,
        };
      },
     
    },
effects: (dispatch) => ({
getBuyAsync: async ({ tick, Qty }, rootState) => {
try {
console.log(tick);
const url = `http://localhost:9090/getstock?symbol=${tick}&quantity=${Qty}`;
console.log(url);
const config = {
headers: {
"Content-Type": "application/json",
},
};

const response = await axios.get(url, config);
console.log(response);

const { data = undefined } = response;

if (data) {
dispatch.buy.setBuy(data);
}
} catch (error) {
console.log("Api > Error > Register >", error.response);
throw error;
}
},

}),
};