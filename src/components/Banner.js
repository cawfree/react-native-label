import React, {useState, useCallback} from "react";
import PropTypes from "prop-types";
import {View, Animated, StyleSheet, PixelRatio} from "react-native";
import {typeCheck} from "type-check";

import {Tail, Reveal} from ".";
import {Orientation} from "../constants";

const hyp = (a, b) => Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

const defaultStyle = Object.freeze({
  fontSize: 30,
  color: 'white',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
});

const createStyles = (layout, distance) => {
  const {width, height} = layout;
  const baseProps = {
    width,
    height,
  };
  return StyleSheet.create({
    [Orientation.TOP_LEFT]: {
      ...baseProps,
      transform: [
        {translateX: -0.5 * width},
        {translateY: -0.5 * height},
        {rotate: '-45deg'},
        {translateY: 0.5 * (height + distance)},
      ],
    },
    [Orientation.TOP_RIGHT]: {
      ...baseProps,
      transform: [
        {translateX: 0.5 * width},
        {translateY: -0.5 * height},
        {rotate: '45deg'},
        {translateY: 0.5 * (height + distance)},
      ],
    },
    [Orientation.BOTTOM_LEFT]: {
      ...baseProps,
      justifyContent: 'flex-end',
      transform: [
        {translateX: -0.5 * width},
        {translateY: 0.5 * height},
        {rotate: '45deg'},
        {translateY: -0.5 * (height + distance)},
      ],
    },
    [Orientation.BOTTOM_RIGHT]: {
      ...baseProps,
      justifyContent: 'flex-end',
      transform: [
        {translateX: 0.5 * width},
        {translateY: 0.5 * height},
        {rotate: '-45deg'},
        {translateY: -0.5 * (height + distance)},
      ],
    },
  });
};

const createEnterStyles = (layout, {height}, distance) => {
  const baseProps = {position: "absolute"};
  const dist = hyp(distance, distance) * 0.5;
  const dim = hyp(height, height) * -1;
  return StyleSheet.create({
    [Orientation.TOP_LEFT]: {
      ...baseProps,
      transform: [{rotate: '270deg'}],
      top: dist,
      left: dim,
    },
    [Orientation.TOP_RIGHT]: {
      ...baseProps,
      top: dim,
      right: dist,
    },
    [Orientation.BOTTOM_LEFT]: {
      ...baseProps,
      bottom: dim,
      left: dist,
      transform: [{rotate: '180deg'}],
    },
    [Orientation.BOTTOM_RIGHT]: {
      ...baseProps,
      bottom: dim,
      right: dist,
      transform: [{scale: -1}],
    },
  });
};

const createExitStyles = (layout, {height}, distance) => {
  const baseProps = {position: "absolute"};
  const dist = hyp(distance, distance) * 0.5;
  const dim = hyp(height, height) * -1;
  return StyleSheet.create({
    [Orientation.TOP_LEFT]: {
      ...baseProps,
      left: dist,
      top: dim,
    },
    [Orientation.TOP_RIGHT]: {
      ...baseProps,
      transform: [{rotate: '90deg'}],
      right: dim,
      top: dist,
    },
    [Orientation.BOTTOM_LEFT]: {
      ...baseProps,
      transform: [{rotate: '270deg'}],
      left: dim,
      bottom: dist,
    },
    [Orientation.BOTTOM_RIGHT]: {
      ...baseProps,
      transform: [{rotate: '90deg'}],
      right: dim,
      bottom: dist,
    }
  });
};

const Banner = ({orientation, distance, layout, shadowProps, title, color, style: extraStyle, ratio, extent, ...extraProps}) => {
  const [childLayout, setChildLayout] = useState(null);
  const {[orientation]: style} = createStyles(layout, distance);
  const {width:w, height:h} = layout;
  const width = Math.sqrt(Math.pow(layout.width, 2) + Math.pow(layout.height, 2));
  const Component = typeCheck("Function", title) && title;
  const childStyle = [{...defaultStyle, ...extraStyle}, shadowProps, {width, backgroundColor: color}];
  const onLayout = useCallback(({nativeEvent:{layout}}) => setChildLayout(layout), [setChildLayout]);
  return (
    <Animated.View
      pointerEvents="none"
      key={orientation}
      style={{
        flex: 1,
      }}
    >
      {typeCheck("Object", childLayout) &&  (
        <>
          <Tail
            style={createEnterStyles(layout, childLayout, distance)[orientation]}
            width={hyp(childLayout.height, childLayout.height)}
            height={hyp(childLayout.height, childLayout.height)}
            color={color}
            ratio={ratio}
            extent={extent}
          />
          <Tail
            style={createExitStyles(layout, childLayout, distance)[orientation]}
            width={hyp(childLayout.height, childLayout.height)}
            height={hyp(childLayout.height, childLayout.height)}
            color={color}
            ratio={ratio}
            extent={extent}
          />
        </>
      )} 
      <Animated.View
        pointerEvents="box-none"
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
      > 
        <Animated.View
          pointerEvents="box-none"
          style={[
            style,
            {
              alignItems: 'center',
              opacity: !!childLayout ? 1 : 0,
            },
          ]}
        >
          {typeCheck("String", title) && (
            <Animated.Text
              onLayout={onLayout}
              pointerEvents="none"
              style={childStyle}
              children={title}
            />
          )}
          {(!!Component) && (
            <Animated.View
              onLayout={onLayout}
              pointerEvents="box-none"
              style={childStyle}
            >
              <Component
                {...extraProps}
              />
            </Animated.View>
          )}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

Banner.propTypes = {
  orientation: PropTypes.oneOf(Object.values(Orientation)).isRequired,
  distance: PropTypes.number.isRequired,
  shadowProps: PropTypes.shape({}),
  style: PropTypes.shape({}),
  color: PropTypes.string,
  ratio: PropTypes.number,
  extent: PropTypes.number,
};

Banner.defaultProps = {
  shadowProps: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 24,
  },
  style: defaultStyle,
  color: "#C2185B",
  ratio: 0.8,
  extent: 0.5,
};

export default React.memo(Banner);
