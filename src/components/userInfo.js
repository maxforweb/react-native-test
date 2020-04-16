import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';
import {
    Image,
    Card,
    Button
} from 'react-native-elements';
import {editUser} from '../actions/edit.js';
import {deleteUser} from '../actions/delete.js';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class UserInfo extends React.Component {

    render(){
        let user = this.props.info;
        let regexp = /[A-S]/gi;
        let image;
        user.registered.date = user.registered.date.slice(0,15);

        if ( user.registered.date.match(regexp) ) {
            user.registered.date
        }else{
            user.registered.date = user.registered.date.slice(0,10)
        }

        if ( user.picture.large ) {
            image = 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg';
        }else {
            image = '../assets/11-big.jpg';
        }

        user.dob.date = user.dob.date.slice(0,10);

        return(
            <ScrollView  style={styles.main}>
                <Card
                    title = {`${user.name.first} ${user.name.last}`}
                    image = { { uri: image} }
                    imageStyle = {{ width: 200, height: 200 }}
                    style={styles.container}
                >
                    <View style = {styles.textContainer} >
                        <Text style = {styles.text} > EMAIL: { user.email} </Text>
                        <Text style = {styles.text} > Phone: { user.cell } </Text>
                        <Text style = {styles.text} > Date of Birthday: { user.dob.date } </Text>
                        <Text style = {styles.text} > Date of registration: {user.registered.date}</Text>
                    </View>
                    <Button
                        buttonStyle ={ { marginTop:100 } }
                        title='Edit Profile'
                        onPress = {() => {
                            this.props.editUser(user);
                            this.props.navigation.navigate('Edit');
                        }}
                        />
                    <Button
                        style={styles.button}
                        buttonStyle = {{ backgroundColor: "red", marginTop: 20 }}
                        title='Delete Profile'
                        onPress = {() => {
                        this.props.deleteUser(user, this.props.connectApi);
                        this.props.navigation.navigate('Home');
                        }}
                        />
                </Card>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200
    },
    container: {
        height: 800,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        marginTop: 15
    },
    textContainer: {
        width: 700,
        margin: "auto",

    },
    button: {
        marginTop: 20,
    },

})

function mapStateToProps (state) {
    return{
        users: state.users,
        info: state.currentUser,
        connectApi: state.connectApi,
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators( { deleteUser: deleteUser, editUser: editUser}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

