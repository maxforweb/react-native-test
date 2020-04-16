import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
    Image,
    Card,
    Button
} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeSortValue} from '../actions/changeSortValue.js';


class Header extends React.Component {

    render() {
        return(
             <View style={ styles.container }>
                <Text style={ styles.text } > Sort by: </Text>
                <Picker
                    selectedValue={ this.props.value }
                    style={{ height: 50, width: 150 }}
                    onValueChange = { ( itemValue ) => this.props.changeSortValue( itemValue ) }
                >
                    <Picker.Item label="Name A-Z" value="nameA" />
                    <Picker.Item label="Name Z-A" value="nameZ" />
                    <Picker.Item label="Create date" value="create" />
                </Picker>
                <Button
                title = 'Create user'
                onPress = {() => this.props.navigation.navigate('Edit')}
                />
             </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    text: {
        fontSize: 16,
        fontWeight: "bold"
    }
})

function mapStateToProps ( state ) {
    return {
        value: state.sortValue
    }
}

function mapDispatchToProps ( dispatch ) {
    return bindActionCreators ( { changeSortValue: changeSortValue }, dispatch );
}


export default connect( mapStateToProps, mapDispatchToProps )( Header );