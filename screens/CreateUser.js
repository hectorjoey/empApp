import React, { useState } from 'react';
import { View, Text, Buttn, TextInput, ScrollView, StyleSheet, Button } from 'react-native';

const CreateUser = () => {

    const [state, setState] = useState({
        name: '',
        emai: '',
        phone: '',
    })

    const handeChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }
    return (
        <ScrollView style={styles.container}>
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
                <Button title='Save' onPress={()=>console.log(state)} />
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
