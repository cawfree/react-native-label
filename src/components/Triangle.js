import React from "react";
import PropTypes from "prop-types";
import {View, StyleSheet} from "react-native";

const styles = StyleSheet.create({
  triangle: {
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopWidth: 0,
  },
});

const Triangle = ({width, height, color, ...extraProps}) => {
  return (
    <View
      {...extraProps}
      style={[
        styles.triangle,
        {
          width,
          height,
          borderRightWidth: width * 0.5,
          borderBottomWidth: height,
          borderLeftWidth: width * 0.5,
          borderColor: color,
        },
      ]}
    />
  );
};

Triangle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

Triangle.defaultProps = {
  width: 100,
  height: 100,
  color: "red",
};

export default React.memo(Triangle);
