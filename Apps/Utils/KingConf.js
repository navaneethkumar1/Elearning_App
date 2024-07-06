import Constants from './Constants';
import {KindeSDK} from '@kinde-oss/react-native-sdk-0-7x'
export const client = new KindeSDK(
    Constants.KINDE_ISSUER_URL, 
    Constants.KINDE_POST_CALLBACK_URL, 
    Constants.KINDE_CLIENT_ID,
     Constants.KINDE_POST_LOGOUT_REDIRECT_URL);