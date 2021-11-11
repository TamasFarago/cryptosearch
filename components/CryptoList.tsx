import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableNativeFeedback} from 'react-native'
import { SetStateAction } from 'react';
import { fetchData } from '../globalFunctions/FetchData';

const screenWidth: number = Dimensions.get("screen").width

interface fetchList {
    filteredList: [],
    setCurrentCrypto: SetStateAction<any>,
    setPrice: SetStateAction<any>
    setLoading: SetStateAction<any>,
    baseURL: string,
    setOpenList: SetStateAction<any>
    setQuery: SetStateAction<any>
}

const CryptoList: React.FC<fetchList> = ({filteredList, setCurrentCrypto, setPrice, setLoading, baseURL, setOpenList, setQuery}) =>{

    const select = async(item: any) => { 
      fetchData(setPrice, setCurrentCrypto, setLoading, baseURL, setOpenList, item.id)
      setQuery(item.name)
    }

    return (
        <View style={styles.container}>
        <ScrollView>
            {filteredList.map((item: any, index: number) => (
                <TouchableNativeFeedback onPress={() => select(item)} key={index}>
                <Text style={styles.item}>{item.name}</Text>
                </TouchableNativeFeedback>
            ))}
        </ScrollView>
        </View>
    )
}

export default CryptoList

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.8,
        backgroundColor: "rgba(60, 58, 102, 01)",
        maxHeight: 200,
        marginTop: 5,
        position: "absolute",
        zIndex: 999,
        top: 50
    },
    item: {
        fontSize: 16,
        color: "white",
        margin: 5
    }
})
