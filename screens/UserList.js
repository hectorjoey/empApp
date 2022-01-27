import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements';

const UserList = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.db.collection("users")
            .onSnapshot(function (querySnapshot) {
                let users = [];
                querySnapshot.forEach(function (doc) {
                    users.push(doc.data());
                    console.log(doc.data());
                });
                setUsers(users)
                console.log("users:::" + users)
            });
    }, []);

    return (
        <ScrollView>
            <Button title="Create User" onPress={() => { props.navigation.navigate('CreateUser') }} />
            {
                users.map(users => {
                    return (
                        <ListItem key={users.id} >
                            <ListItem.Chevron />
                            <Avatar source={{ uri:'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg'}}/>
                            <ListItem.Content>
                                <ListItem.Title>{users.name}</ListItem.Title>
                                <ListItem.Subtitle>{users.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
};

export default UserList;
