import React from 'react';
import {
    Modal,
    KeyboardAvoidingView,
    Platform,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import {
    Image,
    Card,
    Button
} from 'react-native-elements';
import {saveChanges} from '../actions/saveChanges.js';
import {saveNew} from '../actions/saveNew.js';
import {modal} from '../actions/modal.js';
import { connect } from 'react-redux';
import {inputChange} from '../actions/inputChange.js';
import {bindActionCreators} from 'redux';


class changeUserData extends React.Component {
    render() {
        var name, surname, email, cell, registered, dob;
        var errors = [];
        let formValidation;
        if(this.props.user){
            name = this.props.user.name.first;
            surname = this.props.user.name.last;
            email = this.props.user.email;
            cell = this.props.user.cell;
            dob = this.props.user.dob.date;
        }
        else{
            name = '';
            surname = '';
            email = '';
            cell = '';
            dob = '';
        }

        formValidation = () => {
            if ( name.length < 2 || surname.length < 2 ) {
                errors.push('Введите корректные имя и фамилию');
            }
            else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ){
                errors.push('Введите корректный адрес электронной почты');
            }
            else if ( !cell.match(/^[\d]{2}\([\d]{2,3}\)[\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/) ) {
                errors.push('Введите корректный номер телефона');
            }
             else if ( !dob.match(/^[\d]{4}-[\d]{2}-[\d]{2}$/) ) {
                errors.push('Введите корректную дату рождения');
            }

            if( errors.length > 0 ){
            console.log(errors)
                this.props.modal(true, errors);
                return
            }


            if ( this.props.allUsers.data.indexOf(this.props.user) >= 0 ) {
                this.props.saveChanges(this.props.allUsers, this.props.user)
            }else if (this.props.allUsers.data.indexOf(this.props.user) < 0){
                this.props.saveNew( this.props.allUsers, this.props.user );
            }

            this.props.navigation.navigate('Home');
        }

        return(
            <KeyboardAvoidingView
            behavior = {Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.key}
            >
            <ScrollView style={styles.scroll} >
                <View style={styles.container} >
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.modalVision.visibility}
                    >

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Форма заполнена неверно!!</Text>
                                <Text style={styles.modalText}> {this.props.modalVision.errors} </Text>
                                <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                this.props.modal(false);
                                }}
                                >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    <Text style={styles.text} > Name: </Text>
                    <TextInput
                    style = {styles.input}
                    value = {name}
                    onChangeText = { text => this.props.inputChange(text, this.props.user, 1)}
                    />
                    <Text style={styles.text} > Last name: </Text>
                    <TextInput
                    style = {styles.input}
                    value = {surname}
                    onChangeText = { text => this.props.inputChange(text, this.props.user, 2)}
                    />
                    <Text style={styles.text} > Email: </Text>
                    <TextInput
                    style = {styles.input}
                    value = {email}
                    onChangeText = { text => this.props.inputChange(text, this.props.user, 3)}
                    />
                    <Text style={styles.text} > Phone: </Text>
                    <TextInput
                    style = {styles.input}
                    value = {cell}
                    placeholder= {"38(000)000-00-00"}
                    onChangeText = { text => this.props.inputChange(text, this.props.user, 4)}
                    />
                    <Text style={styles.text} > Date of birthday: </Text>
                    <TextInput
                    style = {styles.input}
                    value = {dob}
                    placeholder = { 'yyyy-mm-dd' }
                    onChangeText = { text => this.props.inputChange(text, this.props.user, 5)}
                    />

                    <Button
                    buttonStyle = {{ marginTop: 20, width: 300}}
                    onPress = { () => {
                        let date = new Date();
                        date = String(date);
                        this.props.user.registered.date = date;
                        formValidation();

                        }}
                    title = "Save"
                    />
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
      input: {
        width: 300,
        borderWidth: 1,
        borderRadius: 2,
        padding: 10,
        marginTop: 10,
        marginBottom: 10
      },
      key: {
        flex: 1
      },
      container: {
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 100
      },
      scroll: {
        flex: 1
      },
      text: {
        fontSize: 16,

      },
       centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22
        },
        modalView: {
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5
        },
        openButton: {
          backgroundColor: "#F194FF",
          borderRadius: 20,
          padding: 10,
          elevation: 2
        },
        textStyle: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center"
        },
        modalText: {
          marginBottom: 15,
          fontSize: 24,
          textAlign: "center"
        }
})

function mapStateToProps (state) {
    return{
        users: state.users,
        user: state.editUser,
        allUsers: state.connectApi,
        modalVision: state.modal
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( { inputChange: inputChange, saveChanges: saveChanges, saveNew: saveNew, modal: modal }, dispatch )
}

export default connect(mapStateToProps,mapDispatchToProps)(changeUserData);