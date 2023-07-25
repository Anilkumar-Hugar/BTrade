import axios from "axios";


export const stock = {
    state: {
      stockData: [],
      
    },
    reducers: {
      setStock: (state, payload) => {
        return {
          ...state,
          stockData: payload,
        };
      },
     
    },
effects: (dispatch) => ({
getStockAsync: async ({ selectedSymbol, marketPattern }, rootState) => {
try {
console.log(selectedSymbol);
const url = `http://localhost:9090/getstock?symbol=${selectedSymbol}&function=${marketPattern}`;
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
dispatch.stock.setStock(data);
}
} catch (error) {
console.log("Api > Error > Stock >", error.response);
throw error;
}
},

}),
};