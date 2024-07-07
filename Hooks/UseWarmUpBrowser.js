import { View, Text } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
export default function UseWarmUpBrowser() {
    React.useEffect(()=>{
        void WebBrowser.warmUpAsync();
        return ()=>{
            void WebBrowser.coolDownAsync();
        };
},[]);

};