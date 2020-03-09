import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert
} from "react-native";
import * as Loaction from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import MapPreview from "../components/MapPreview";

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.navigation.getParam("pickedLocation");

  const { onLocationPicked } = props;
  
  useEffect(() => {
    setPickedLocation(mapPickedLocation);
    props.onLocationPicked(mapPickedLocation);
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status != "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permission to use this app.",
        [{ text: "Okey" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Loaction.getCurrentPositionAsync({
        timeout: 5000
      });
      console.log("sajhvhjv");
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lan: location.coords.latitude
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lan: location.coords.latitude
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No Loaction chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.action}>
        <Button
          title="Get User Loaction"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default LocationPicker;
