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
                    const { name, email, phone } = doc.data()
                    users.push({
                        id: doc.id,
                        name,
                        email,
                        phone
                    })
                });
                setUsers(users)
                console.log("users:::" + users)

            });
    }, []);

    return (
        <ScrollView>
            <Button title="Create User" onPress={() => { props.navigation.navigate('CreateUser') }} />
            {
                users.map(user => {
                    return (
                        <ListItem key={user.id} bottomDivider onPress={() => {
                            alert("userid: " + user.id)
                        }} >
                            <ListItem.Chevron />
                            <Avatar source={{ uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg' }} rounded />
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
};

export default UserList;