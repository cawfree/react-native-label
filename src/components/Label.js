import React, {useState, useCallback} from "react";
import PropTypes from "prop-types";
import {View, Animated, StyleSheet} from "react-native";
import {typeCheck} from "type-check";

import {Banner} from ".";
import {Orientation} from "../constants";

const styles = StyleSheet.create({
  [Orientation.TOP_LEFT]: {},
  [Orientation.TOP_RIGHT]: {right: 0},
  [Orientation.BOTTOM_LEFT]: {bottom: 0},
  [Orientation.BOTTOM_RIGHT]: {bottom: 0, right: 0},
});

const Label = ({children, orientation, distance, containerStyle, ...extraProps}) => {
  const [layout, setLayout] = useState(null);
  const onLayout = useCallback(
    ({nativeEvent: {layout}}) => setLayout(layout),
    [setLayout],
  );
  return (
    <View
      style={containerStyle}
    >
      {children}
      <View
        style={StyleSheet.absoluteFill}
        onLayout={onLayout}
        pointerEvents="box-none"
      >
        {typeCheck("{width:Number,height:Number,...}", layout) && (
          <Banner
            orientation={orientation}
            distance={distance}
            layout={layout}
            {...extraProps}
          />
        )} 
      </View>
    </View>
  );
};

Label.propTypes = {
  orientation: PropTypes.oneOf(Object.values(Orientation)),
  distance: PropTypes.number,
  containerStyle: PropTypes.shape({}),
};

Label.defaultProps = {
  orientation: Orientation.TOP_RIGHT,
  distance: 100,
  containerStyle: {flex:1},
};

export default React.memo(Label);
