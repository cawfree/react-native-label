import React from "react";
import PropTypes from "prop-types";
import {View, StyleSheet} from "react-native";

import {Triangle} from ".";

const styles = StyleSheet.create({
  peaks: {
    width: "100%",
    flexDirection: "row",
  },
  gap: {
    position: "absolute",
    bottom: 0,
    height: 1,
  },
});

const Tail = ({ style, width, height, color, ratio, extent, shadowProps, ...extraProps }) => {
  return (
    <View
      style={[style, {width, height}]}
    >
      <View
        style={{
          height: (1 - extent) * height,
        }}
      />
      <View
        style={{
          width,
          height: extent * height,
        }}
      >
        <View
          style={styles.peaks}
        >
          <Triangle
            width={width * 0.5}
            height={Math.ceil(height * ratio * extent)}
            color={color}
          />
          <Triangle
            width={width * 0.5}
            height={Math.ceil(height * ratio * extent)}
            color={color}
          />
        </View>
        <View
          style={shadowProps}
        >
          <View
            style={{
              width,
              height: (height * (1 - ratio)) * extent,
              backgroundColor: color,
            }}
          />
        </View>
      </View>
    </View>
  );
};

Tail.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  ratio: PropTypes.number,
  extent: PropTypes.number,
  shadowProps: PropTypes.shape({}),
};

Tail.defaultProps = {
  width: 100,
  height: 100,
  color: "orange",
  ratio: 0.5,
  extent: 1,
  shadowProps: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 48,
  },
};

export default React.memo(Tail);
