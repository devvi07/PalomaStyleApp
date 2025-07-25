import { BackHandler, Platform } from "react-native";
import { requestMultiple, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

export const requestAllPermissions = async () => {
  const permissions = Platform.select({
    ios: [
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    ],
    android: [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      //PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ],
  });

  if (!permissions) return;

  const statuses = await requestMultiple(permissions);

  console.log('Permisos solicitados:', statuses);

  if (
    statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED &&
    statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.GRANTED
    //statuses[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === RESULTS.GRANTED &&
    //statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED
  ) {
    console.log('Todo bien, todos los permisos otorgados');
  } else {

    /*if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'blocked') {
      handleBlockedLocationPermission();
    }*/
    console.log('Algunos permisos fueron denegados');
  }
};

export const disableBack = () => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    return true;
  });
  return () => backHandler.remove();
};

export const formatMiles = (number: string, conSimbolo: boolean) => {

    var negativo = parseFloat(number) < 0;
    let iNumber = Number(number);
    var currencySymbol = '$';
    var decimals = 2;
    var thousandsSeparator = ',';
  
    var numberStr, numberFormatted;
  
    if (!conSimbolo)
      decimals = 0
  
    if (negativo)
      iNumber = ((iNumber) * -1);
  
    iNumber = isNaN(iNumber) ? 0.00 : iNumber;
  
    if (Number(decimals) <= 0) {
      numberStr = parseFloat(number).toFixed(0).toString();
      numberFormatted = new Array(0);
    } else {
      numberStr = parseFloat(number).toFixed(decimals).toString();
      numberFormatted = new Array(numberStr.slice(-(Number(decimals) + 1)));
      numberStr = numberStr.substring(0, numberStr.length - (Number(decimals) + 1));
    }
  
    while (numberStr.length > 3) {
      numberFormatted.unshift(numberStr.slice(-3));
      numberFormatted.unshift(thousandsSeparator);
      numberStr = numberStr.substring(0, numberStr.length - 3);
    }
  
    numberFormatted.unshift(numberStr);
  
    if (conSimbolo)
      numberFormatted.unshift(currencySymbol + (negativo ? '-' : ''));
    else
      numberFormatted.unshift((negativo ? '-' : ''));
  
    return numberFormatted.join('');
}