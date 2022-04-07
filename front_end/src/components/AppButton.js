import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";


TouchableOpacity.defaultProps = { activeOpacity: 0.6 };

const AppButton = ({title, style, onPress, opacity}) => (
  <TouchableOpacity style={style} onPress={onPress} activeOpacity={opacity}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default AppButton


const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});