import{
    FETCH_ROOMS
} from '../actions/types.js';


const INITIAL_STATE ={
    results: [],
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_ROOMS:
            return { ...state,
            payload :action.payload}
        default: 
            return state;
    }
}