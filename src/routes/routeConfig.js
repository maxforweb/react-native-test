
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import header from '../components/header.js';
import usersList from '../components/usersList';
import UserInfo from '../components/userInfo';
import changeUserData from '../components/editAndCreateUser.js';

const screens = {
    Home: {
        screen: usersList
    },
    User: {
        screen: UserInfo
    },
    Edit: {
        screen: changeUserData
    },
    Header: {
        screen: header
    }
}

const RouteConfig =  createStackNavigator(screens);

export default createAppContainer(RouteConfig);