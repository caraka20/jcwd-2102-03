import product_types from "./type";

const init_state = {
    value: false
}

const product_reducer = (state= init_state, action) => {
    if(action.type == post_types.PRODUCT_AUTORENDER) {
        return{
            ...state,
            value: action.payload.value
            
        }
    }
    return state
}

export default product_reducer