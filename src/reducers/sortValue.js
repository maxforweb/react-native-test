
const DEFAULT_STATE = "nameA"

const sortValue = ( state = DEFAULT_STATE, action ) => {

    switch( action.type ){

        case"CHANGED_VALUE":
            return action.payload;


        default: return state;
    }

}

export default sortValue;