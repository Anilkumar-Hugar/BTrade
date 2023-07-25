import { SessionTypes } from "../utils/sessionUtils";
export const user = {
    state: {
   
      paidSession: true,
      activeSessionType: SessionTypes.SELECT_DATE,
      date:"",
      scroll:"",
    },
    reducers: {
     
      setPaidSession: (state, payload) => {
        return {
          ...state,
          paidSession: payload,
        };
      },
      setActiveSessionType: (state, payload) => {
        return {
          ...state,
          activeSessionType: payload,
        };
      },
      
      setScroll: (state, payload) => {
        return {
          ...state,
          scroll: payload,
        };

      },
      setDate: (state, payload) => {
        return {
          ...state,
          date: payload,
        };},
      
    },
    effects: (dispatch) => ({
        loginAsync: async (payload, rootState) => {
          //TODO
        },
      }),
}