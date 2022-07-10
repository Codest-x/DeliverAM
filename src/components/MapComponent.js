import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {theme} from '../constants/theme';
import {getTimeDifference} from '../utils/helperFunctions';

export default function MapComponent({domiciliaryMarkers, height}) {
  const getFirstFromName = fullname => {
    return fullname.split(' ')[0];
  };

  return (
    <MapView
      region={{
        latitude: 6.906058,
        longitude: -75.073825,
        latitudeDelta: 0.001,
        longitudeDelta: 0.01,
      }}
      loadingEnabled={true}
      loadingBackgroundColor={theme.colors.primaryColor}
      loadingIndicatorColor={theme.colors.accentColor}
      mapType="standard"
      showsUserLocation={false}
      moveOnMarkerPress={true}
      style={{width: '100%', height: height || 400}}>
      {domiciliaryMarkers.map(
        marker =>
          marker.lat &&
          marker.long && (
            <Marker
              key={marker._id}
              title={
                marker?.domiciliary?.nombres && marker?.domiciliary?.apellidos
                  ? `${getFirstFromName(
                      marker?.domiciliary?.nombres,
                    )} ${getFirstFromName(marker?.domiciliary?.apellidos)}`
                  : 'Domiciliario'
              }
              description={getTimeDifference(marker?.updatedAt)}
              coordinate={{
                latitude: marker?.lat,
                longitude: marker?.long,
              }}
              pinColor={'orange'}
              /* icon={require('../assets/images/repartidor.png')} */
            />
          ),
      )}
    </MapView>
  );
}
