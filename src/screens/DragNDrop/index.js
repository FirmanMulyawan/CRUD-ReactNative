import React from 'react';
import {SafeAreaView, View, Text, Animated, StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import styles from './styles';
import Draggable from './draggable';

const dnd = () => {
  const draggableRef = React.useRef();
  const zoneRef = React.useRef();
  const [zonePosition, setZonePosition] = React.useState([]);

  React.useEffect(() => {
    setTimeout(() => {
      handleZonePosition();
    }, 100);
  }, []);

  const handleDraggableRelease = async data => {
    // console.log(data)
    if (
      data.absoluteX >= zonePosition.px &&
      data.absoluteX <= zonePosition.px + zonePosition.width &&
      data.absoluteY >= zonePosition.py &&
      data.absoluteY <= zonePosition.py + zonePosition.height
    ) {
      const {x, y} = draggableRef.current.getLastOffset();

      const config = {
        x: x + (data.absoluteX - zonePosition.px - zonePosition.x),
        y: y - (data.absoluteY - zonePosition.py - zonePosition.y),
      };

      draggableRef.current.setPosition(config, 'timing', {duration: 100});
    } else {
      draggableRef.current.setPosition({x: 0, y: 0});
    }
  };

  const handleZonePosition = () => {
    zoneRef.current.measure((fx, fy, width, height, px, py) => {
      const newZonePosition = {px, py, width, height};
      setZonePosition(newZonePosition);
    });
  };

  const renderDraggable = () => {
    const onRelease = data => handleDraggableRelease(data);

    return (
      <Draggable
        text="DRAG"
        onRelease={onRelease}
        ref={ref => (draggableRef.current = ref)}
      />
    );
  };
  console.log(zonePosition);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.zone} ref={ref => (zoneRef.current = ref)} />
      {renderDraggable()}
    </SafeAreaView>
  );
};

export default dnd;
