const INITIAL = 1;


const pagination = ( state = INITIAL, action) => {

    switch(action.type) {
        case'PAGINATION':
            return action.payload;

        default: return state;
    }

}

export default pagination;

