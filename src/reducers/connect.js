
const INITIAL_STATE = {
     loading: false,
     data: [],
     page: 1,
     seed: '',
     error: null,
     refreshing: false,
}

const usersBase = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case'USERS_INFO':
            const newData = action.payload;
            return newData;

        case'NEW':console.log(10)
            action.allUsers.data.push(action.user);
            return action.allUsers;

        case'DELETE':
        let updateUsers;
        let index = action.allUsers.data.indexOf(action.user)
        console.log(index)

        if ( index > -1 ){
            updateUsers = action.allUsers.data.splice(index, 1);
        }

        case'SAVE':
            let currentUser = action.allUsers.data.indexOf(action.user)



        default:
            return state
    }
}

export default usersBase;

