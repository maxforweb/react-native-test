const EditUser = (state = null, action) => {
    switch(action.type){
        case"EDIT":
            return action.payload;

        case"CHANGE":
            if ( !action.user ){
                action.user = {
                    name: { first: '', last: '' },
                    email: '',
                    cell: '',
                    dob: { date: '' },
                    registered: {date: ''},
                    picture: {large: ''}
                }
            }
            if ( action.num == 1 ) {
                action.user.name.first = action.value;
            }
            else if ( action.num == 2 ) {
                action.user.name.last = action.value;
            }
            else if ( action.num == 3 ) {
                action.user.email = action.value;
            }
            else if ( action.num == 4 ) {
                action.user.cell = action.value;
            }
            else if ( action.num == 5 ) {
                action.user.dob.date = action.value;
            }
            return action.user;

        default:
            return state;
    }
}

export default EditUser;