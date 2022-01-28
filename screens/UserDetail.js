import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import firebase from '../database/firebase'

const UserDetail = (props) => {
    const initialState = {
        id: '',
        name: '',
        email: '',
        phone: '',
    }
    const [user, setUser] = useState(initialState);

    const [loading, setLoading] = useState(true);

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id)
        const doc = await dbRef.get();
        const user = doc.data();

        setUser({
            ...user,
            id: doc.id,
        })
        setLoading(false);

    }

    useEffect(() => {
        getUserById(props.route.params.userId);
    }, [])

    const handeChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    }
    const deleteUser = async () => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate("UserList");
    }

    const confirmationAlert = () => {
        Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
            { text: 'Yes', onPress: () => deleteUser() },
            { text: 'No', onPress: () => console.log('Cancel') },
        ])
    }
    const updateUser = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.set({
            name:user.name,
            email:user.email,
            phone:user.phone,   
        })
        setUser(initialState)
        props.navigation.navigate('UserList')
    
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color=" #abb2b9 " />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name"
                    value={user.name}
                    onChangeText={(value) => handeChangeText('name', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email"
                    value={user.email}
                    onChangeText={(value) => handeChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone"
                    value={user.phone}
                    onChangeText={(value) => handeChangeText('phone', value)} />
            </View>
            <View>
                <Button
                    color="#dc7633"
                    title='Update' onPress={() => { updateUser() }} />
            </View>
            <View>
                <Button
                    color="#d31a00"
                    title='Delete' onPress={() => { deleteUser() }} />
            </View>

        </ScrollView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },

    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#AF7AC5"
    }
})

export default UserDetail;
