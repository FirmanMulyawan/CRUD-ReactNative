import React from 'react';
import {View, Text, Animated} from 'react-native';
import {
  PanGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import styles from './styles';

const Draggable = (props, ref) => {
  const {
    text,
    // onPress = () => {},
    onRelease = () => {},
    ...gestureProps
  } = props;

  const refPosition = React.useRef(undefined);

  const translate = React.useRef(new Animated.ValueXY()).current;
  const lastOffset = React.useRef({x: 0, y: 0}).current;

  React.useImperativeHandle(ref, () => ({
    setPosition: setPosition,
    getLastOffset: () => lastOffset,
    refPosition: refPosition.current,
  }));

  const setPosition = ({x, y}, animation = 'spring') => {
    translate.setOffset({x: 0, y: 0});
    translate.setValue({x: lastOffset.x, y: lastOffset.y});

    const config = {
      toValue: {x, y},
      useNativeDriver: true,
      overshootClamping: true,
    };
    const callback = ({finished}) => {
      if (!finished) {
        return;
      }

      lastOffset.x = x;
      lastOffset.y = y;

      translate.setOffset({x: lastOffset.x, y: lastOffset.y});
      translate.setValue({x: 0, y: 0});
    };

    Animated[animation](translate, config).start(callback);
  };

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translate.x,
          translationY: translate.y,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastOffset.x += event.nativeEvent.translationX;
      lastOffset.y += event.nativeEvent.translationY;

      translate.setOffset({x: lastOffset.x, y: lastOffset.y});
      translate.setValue({x: 0, y: 0});

      onRelease && onRelease(event.nativeEvent);
    }
  };
  return (
    <PanGestureHandler
      maxPointers={1}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}>
      <Animated.View
        style={[
          {
            transform: [{translateX: translate.x}, {translateY: translate.y}],
          },
        ]}>
        <View ref={refPosition}>
          <TouchableOpacity style={styles.draggable} activeOpacity={1}>
            <Text style={styles.draggableText}>{text}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default React.forwardRef(Draggable);
