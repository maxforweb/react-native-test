import { combineReducers } from 'redux';
import users from './users.js';
import connect from  './connect.js';
import currentUser from "./currentUser";
import sortValue from './sortValue.js';
import pagination from './pagination.js';
import editUser from './editUser.js';
import modal from './modal.js';

const allReducers = combineReducers({
    users: users,
    currentUser: currentUser,
    sortValue: sortValue,
    connectApi: connect,
    pagination: pagination,
    editUser: editUser,
    modal: modal
})

export default allReducers;