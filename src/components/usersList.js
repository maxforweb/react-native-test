import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {usersLoading} from '../actions/usersLoading.js';
import Header from "./header.js";
import TouchableScale from 'react-native-touchable-scale';
import {showUserInfo} from '../actions/showUser.js';
import {pagination} from '../actions/pagination.js';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

class UsersList extends React.Component {

    componentDidMount() {
        let newData = this.props.connectApi;
        newData.loading = true;

        axios
        .get(`https://randomuser.me/api/?page=${this.props.page}&results=10&seed=foobar`)
        .then( res => {
            newData.data =  res.data.results ;
            newData.error = res.error || null;
            newData.loading = false;
            newData.refreshing = false;
            this.props.usersLoading(newData);
        })

    }

    keyExtractor = (item, index) => index.toString()

    render(){
        let renderItem, renderFooter;
        const usersList  = this.props.connectApi.data;

        if (  this.props.value == 'nameA'){
            function sortBy (arr) {
                arr.sort( (a, b) => a.name.first > b.name.first ? 1 : -1 )
            }
            sortBy(usersList);
        }

        else if ( this.props.value == 'nameZ'){
            function sortBy (arr) {
                arr.sort( (a, b) => a.name.first < b.name.first ? 1 : -1 )
            }
            sortBy(usersList);
        }
        else if ( this.props.value == 'create'){
             function sortBy (arr) {
                 arr.sort( (a, b) => a.registered.date > b.registered.date ? 1 : -1 )
             }
             sortBy(usersList);
         }

         renderItem = ( { item } ) => (
              <ListItem
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
                bottomDivider
                topDivider
                Component={TouchableScale}
                  friction={90}
                  tension={100}
                  activeScale={0.95}
                onPress = { () => {
                    this.props.showUserInfo(item);
                    this.props.navigation.navigate('User');
                    }
                }
              />
         )

         renderFooter = (  ) => (
            <View style={styles.footer}>
                <Text style={styles.pagination, styles.active} onPress={() => this.props.pagination(1)}> 1 </Text>
                <Text style={styles.pagination} onPress={() => this.props.pagination(2)} > 2 </Text>
                <Text style={styles.pagination} onPress={() => this.props.pagination(3)} > 3 </Text>
                <Text style={styles.pagination} onPress={() => this.props.pagination(4)} > 4 </Text>
            </View>
         )

        return(
        <View style={ styles.container} >
            <Header navigation = {this.props.navigation}/>
            <FlatList
             contentContainerStyle={{ paddingBottom: 50}}
                keyExtractor={this.keyExtractor}
                data={this.props.connectApi.data}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
            />

        </View>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
    },
    pagination: {
        fontSize: 24,
        marginLeft: 5,
        marginTop: 10,
        marginRight: 5,
        padding: 5
    },
    active: {
        marginTop: 10,
        fontSize: 24,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    }


})

function mapStateToProps (state) {

    return{
        users: state.users,
        value: state.sortValue,
        connectApi: state.connectApi,
        page: state.pagination

    };
};

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ usersLoading: usersLoading, showUserInfo: showUserInfo, pagination: pagination }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);