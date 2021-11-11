import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform, 
  TextInput, 
  SafeAreaView, 
  Dimensions, 
  TouchableOpacity,
  KeyboardAvoidingView,
 } from 'react-native';
import axios from 'axios';
import CryptoList from './components/CryptoList';
import { fetchData } from './globalFunctions/FetchData';
import { ActivityIndicator } from 'react-native-paper';

const screenWidth: number = Dimensions.get("screen").width
const screenHeight: number = Dimensions.get("screen").height
const baseURL: string = "https://api.coingecko.com/api/v3"


export default function App() {
  const [query, setQuery] = useState<string>("")
  const [price, setPrice] = useState<any>()
  const [currentCrypto, setCurrentCrypto] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [list, setList] = useState<any>([])
  const [openList, setOpenList] = useState<boolean>(false)

  // FETCHES THE SEARCHED CRYPTO'S PRICE

  const getPrice = (): void => {
      fetchData(setPrice, setCurrentCrypto, setLoading, baseURL, setOpenList, query,)
  }

  // FETCHES A LIST OF CRYPTOS WHEN THE COMPONENT MOUNTS

  const fetchBulk = async() =>{
    try{
      const response = await axios.get(`${baseURL}/coins/markets?vs_currency=usd&per_page=100&page=1`);
      setList(response.data)
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBulk()
  }, [])

  // RUNS WHEN A USER IS TYPING

  const handleType = (text: string): void => {
    setOpenList(true)
    setQuery(text)
  }

  const filteredList = list.filter((coin: any) => coin.id.toLowerCase().includes(query.toLowerCase()))


  return (
    <>
    <SafeAreaView style={{backgroundColor: '#1a1845', flex: 1}}>
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios'? 'padding' : "height"}>
      <View style={{top: Platform.OS == "android"? 40 : 0}}>
        <TextInput 
          value={query}
          style={styles.textInput}
          onChangeText={text => handleType(text)}
          placeholder="Search for a crypto"
          placeholderTextColor="rgba(255,255,255,0.3)"
          />
        {openList && query !== "" &&
        <CryptoList 
          filteredList={filteredList}
          setLoading={setLoading}
          setPrice={setPrice}
          setCurrentCrypto={setCurrentCrypto}
          baseURL={baseURL}
          setOpenList={setOpenList}
          setQuery={setQuery}
          /> 
        }
      </View> 
     
      {price && !loading && 
      <View style={styles.priceContainer}>
        <Text style={styles.infoText}>{currentCrypto}'s current price is:</Text>
        <Text style={styles.price}>
          ${price[0].usd}
        </Text>
      </View>
      }
      {loading && <ActivityIndicator color="white"/>}

      <TouchableOpacity activeOpacity={0.8} disabled={!query.length} onPress={getPrice}>
          <View style={[styles.button, {opacity: !query.length? 0.5 : 1}]}>
              <Text style={styles.buttonText}>Search</Text>
          </View>
      </TouchableOpacity>

      </KeyboardAvoidingView> 
    </SafeAreaView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1845',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 50,
    width: screenWidth*0.8,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(227, 227, 227, 0.7)",
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 5
  },
  button: {
    width: screenWidth*0.8,
    height: 40,
    borderRadius: 16,
    backgroundColor: "rgba(109, 207, 135, 1)",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600"
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: -9,
    height: screenHeight * 0.3,
    width: screenWidth,
  },
  price: {
    color: "white",
    fontSize: 30,
    fontWeight: "500",
    position: "relative",
    zIndex: 9,
  },
  contentContainer: {
    height: screenHeight*0.3, 
    width: screenWidth, 
    justifyContent: "center"
  },
  infoText: {
    color: "white", 
    fontSize: 20, 
    marginBottom: 20
  },
  list: {
    width: screenWidth * 0.8,
  }
});
