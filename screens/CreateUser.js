import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button } from 'react-native';
import firebase from "../database/firebase";


const CreateUser = (props) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
    })

    const handeChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const AddUser = async () => {
        if (state.name === '') {
            alert('Please enter name!')
        }
        else if (state.email === '') {
            alert('Please enter email!')
        }
        else if (state.phone === '') {
            alert('Please enter phone!')
        } else {
            try {
                await firebase.db.collection('users').add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone,
                })
                alert("Saved Successfully!")
                props.navigation.navigate('UserList')
            } catch (error) {
                console.log(error);
            }
        }

    }
    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontWeight: 'bold' }}>Register</Text>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name"
                    onChangeText={(value) => handeChangeText('name', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email"
                    onChangeText={(value) => handeChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone"
                    onChangeText={(value) => handeChangeText('phone', value)} />
            </View>

            <View>
                <Button title='Save' onPress={() => { AddUser() }} />
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

export default CreateUser;