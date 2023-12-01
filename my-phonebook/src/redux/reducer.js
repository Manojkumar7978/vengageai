const initialState = {
    user:[],
    contacts:[],
  };

  const reducer = (state = initialState, action) => {
    if(action.type=='USER'){
        return {
            ...state,
            user:action.payload
        }
    }
    if(action.type=='CONTACT'){
        return {
            ...state,
            contacts:action.payload
        }
    }
   
    return state
  };
  
  export { reducer };
  