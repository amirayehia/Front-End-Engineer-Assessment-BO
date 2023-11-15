import React, { useEffect, useState } from 'react';
import { fetchContent } from '../src/Store/ShipmentDataSlice';
import { useAppDispatch } from "../src/Store/store";
import './App.css';
import Progress from './components/Progress';
import SearchShipmemt from './components/SearchShipmemt';
import DetailsOfShipment from './components/DetailsOfShipment';
import Navbar from './components/Navbar';
import { useAppSelector } from "./Store/store";
import { useTranslation } from 'react-i18next';
import Error from './components/Error';

function App() {

  const [api_lang, setApi_Lang] = useState('?_en');
  const [searchHistory, setSearchHistory] = useState('')
  const contents = useAppSelector((state) => state.ShipmentData.contents);
  const isLoading = useAppSelector((state) => state.ShipmentData.isLoading)
  const error = useAppSelector((state) => state.ShipmentData.error);
  const [t, l18n] = useTranslation('global')
  const changeLanguage = (lang: string) => {
    console.log(lang)

    document.getElementsByTagName('html')[0].setAttribute('lang', lang);
    l18n.changeLanguage(lang);
    if (lang == 'en') {
      setApi_Lang('?_ar')
    } else {
      setApi_Lang('?_en')
    }
    getData(searchHistory)


  }

  const onclickHandler = (para: string) => {
    changeLanguage(para)
  }

  const dispatch = useAppDispatch();

  const getData = (shipmentNo: string) => {
    setSearchHistory(shipmentNo)
    if (shipmentNo.length > 0) {
      dispatch(fetchContent(`${shipmentNo}${api_lang}`));
    }

  }

  return (
    <div className="App">
      <Navbar t={t} onclickHandler={onclickHandler} />
      <SearchShipmemt t={t} getDataHandler={getData} />
      {
        isLoading ? <i className="fa-solid fa-spinner fa-spin text-8xl mt-40 text-gray-700"></i> : error?.length != 0 ?<Error t={t} /> : contents.CurrentStatus.state != '' ? <div><Progress t={t} /> <DetailsOfShipment t={t} /></div> : ''
      }


    </div>
  );
}

export default App;
