import Beacons from 'react-native-beacons-manager'
import {DeviceEventEmitter} from 'react-native';

const initializeIOS = (action) => {
    const region = {
        identifier: 'Estimotes',
        uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
    };
    Beacons.requestWhenInUseAuthorization();

    Beacons.startMonitoringForRegion(region);
    Beacons.startRangingBeaconsInRegion(region);

    Beacons.startUpdatingLocation();

    const subscription = DeviceEventEmitter.addListener(
        'beaconsDidRange',
        (data) => {
          // data.region - The current region
          // data.region.identifier
          // data.region.uuid
      
          // data.beacons - Array of all beacons inside a region
          //  in the following structure:
          //    .uuid
          //    .major - The major version of a beacon
          //    .minor - The minor version of a beacon
          //    .rssi - Signal strength: RSSI value (between -100 and 0)
          //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
          //    .accuracy - The accuracy of a beacon
        });
}

const initializeAndroid = (action) =>{
    Beacons.detectIBeacons()

    // Start detecting all iBeacons in the nearby
    try {
      Beacons.startRangingBeaconsInRegion('REGION1')
      console.log(`Beacons ranging started succesfully!`)
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`)
    }
    
    // Print a log of the detected iBeacons (1 per second)
    DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
        console.log('Found beacons!', data.beacons)
    })
}

export {initializeAndroid, initializeIOS}