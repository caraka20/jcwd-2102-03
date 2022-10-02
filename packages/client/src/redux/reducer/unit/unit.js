import post_types from "./type";

const init_state = {
    value: false
}

const unit_reducer = (state= init_state, action) => {
    if(action.type == category_types.UNIT_RENDER) {
        return{
            ...state,
            value: action.payload.value
            
        }
    }
    return state
}

export default unit_reducer