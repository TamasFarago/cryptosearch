import axios from 'axios';
import { SetStateAction } from 'react';

export const fetchData = async(setPrice: SetStateAction<any>, setCurrentCrypto: SetStateAction<any>, setLoading: SetStateAction<any>, baseURL: string, setOpenList: SetStateAction<any>, query?: string, item?: any) => {
    setLoading(true)
    setOpenList(false)
    const param = query? query : item
      try {
        const response = await axios.get(`${baseURL}/simple/price?ids=${param}&vs_currencies=usd`);
        let data = response.data
        if(Object.keys(data).length !== 0){
          setPrice(Object.keys(data).map(k => data[k]))
          setCurrentCrypto(Object.keys(data)[0])
        }
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
      }
  }