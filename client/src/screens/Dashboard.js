import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import WebView from "react-native-webview";

export default function Dashboard({ navigation, route }) {
  const webviewRef = useRef(null);
  const redirect_url = process.env.BACKEND_URL + "/redirect/";
  let data = route.params.param;
  const url =
    process.env.BACKEND_URL +
    `/fd/?amount=${data.amount}&tenure=${data.months}&email=${data.email}&mobile=${data.number}`;
  console.log(url);

  const onNavigation = (navState) => {
    if (navState.url === redirect_url) {
      navigation.navigate("Complete");
    }
  };

  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{
            uri: url,
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.flexContainer}
            />
          )}
          ref={webviewRef}
          onNavigationStateChange={onNavigation}
          style={styles.margin}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  margin: {
    marginTop: 50,
  },
});
