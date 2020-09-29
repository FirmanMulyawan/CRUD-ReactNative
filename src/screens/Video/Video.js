/* eslint-disable no-shadow */
// https://www.youtube.com/watch?v=u7ZcVkpdEJE
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import ytdl from 'react-native-ytdl';
import Orientation from 'react-native-orientation-locker';

const samplevideo = require('./videoplayback.mp4');
const widthLandscape = Dimensions.get('window').height;
const heightLandscape = Dimensions.get('window').width;

import Modal from './Modal';

// Video Time
const VideoTime = timeInSeconds => {
  let pad = function(num, size) {
    return ('000' + num).slice(size * -1);
  };
  let time = parseFloat(timeInSeconds).toFixed(3);
  let minutes = Math.floor(time / 60) % 60;
  let seconds = Math.floor(time - minutes * 60);

  let result = `${pad(minutes, 2)}.${pad(seconds, 2)}`;
  return result;
};
// VideoSlider
const VideoSlider = ({value, maximumValue, onValueChange, ...props}) => {
  const percentage = (value / maximumValue) * 100;
  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderTrack}>
        <View style={[styles.sliderPrevTrack, {width: percentage + '%'}]} />
        <View style={[styles.sliderThumb, {left: percentage + '%'}]} />
        <View
          style={[styles.sliderNextTrack, {width: 100 - percentage + '%'}]}
        />
      </View>
      <Slider
        style={{position: 'absolute', right: 0, left: 0, height: 22}}
        minimumValue={0}
        maximumValue={maximumValue}
        value={value}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor="transparent"
        onValueChange={onValueChange}
        {...props}
      />
    </View>
  );
};

const VideoFull = ({isVisible, data, onRequestClose, source}) => {
  const [currentSec, setCurrentSec] = React.useState(data.minute);
  return (
    <Modal
      isVisible={isVisible}
      onRequestClose={() => onRequestClose(currentSec)}
      style={[styles.video, styles.videoFull]}
      swipeDirection={['down']}
      useNativeDriver={true}>
      <StatusBar animated hidden />

      <VideoPlayer
        data={data}
        fullscreen={true}
        source={source}
        onFullClose={() => onRequestClose(currentSec)}
        onFullProgress={time => setCurrentSec(time)}
      />
    </Modal>
  );
};

const VideoPlayer = ({
  navigation,
  data,
  fullscreen,
  onFullClose,
  onFullProgress,
  source,
}) => {
  let {video, title, url, minute} = data;
  const posControl = React.useRef(new Animated.Value(0)).current;
  const videoRef = React.useRef();
  const [videoLenght, setVideoLenght] = React.useState(0);
  const [currentSec, setCurrentSec] = React.useState(0);
  const [isPause, setPause] = React.useState(false);
  const [isBuffering, setBuffering] = React.useState(true);
  const [isFullscreen, setFullscreen] = React.useState(false);
  const [sourceLink, setSourceLink] = React.useState(url);
  const [otherTitle, setotherTitle] = React.useState(null);
  const isFinish = Math.floor(currentSec) === Math.floor(videoLenght);

  React.useEffect(() => {
    if (sourceLink === undefined) {
      getVideoUrl(video);
    }
  }, []);

  const getVideoUrl = async video => {
    const youtubeURL = video.includes('http')
      ? video
      : 'http://www.youtube.com/watch?v=' + video;
    const url = await ytdl(youtubeURL, {quality: 'highest'});
    const {videoDetails} = await ytdl.getBasicInfo(youtubeURL);

    setSourceLink(url[0].url);
    if (!title) {
      setotherTitle(videoDetails?.title ?? '');
    }
  };

  const controlVideoAnim = (data = {}, autoClose) => {
    Animated.timing(posControl, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      ...data,
    }).start(() => {
      if (autoClose) {
        controlVideoAnim({toValue: 1, delay: 3600});
      }
    });
  };

  const handleSeekVideo = time => {
    videoRef.current?.seek(Number(time));
    controlVideoAnim();
  };

  const handleSeekVideoComplete = time => {
    setCurrentSec(time);
    if (!isPause) {
      controlVideoAnim({toValue: 1, delay: 1800});
    }
  };

  const handleBtnPausePress = () => {
    if (isFinish && currentSec !== 0) {
      handleSeekVideo(0);
    }

    handlePause();
  };

  const handlePause = () => {
    controlVideoAnim({toValue: !isPause ? 1 : 0, delay: 1800});
    setPause(!isPause);
  };

  const handleLoad = ({duration}) => {
    setBuffering(false);
    setVideoLenght(duration);
    if (minute) {
      handleSeekVideo(minute);
    }
  };

  const handleProgress = ({currentTime}) => {
    setCurrentSec(currentTime);
    onFullProgress && onFullProgress(currentTime);
    isBuffering && setBuffering(false);
  };

  const handleVideoPress = () => {
    if (!isPause) {
      controlVideoAnim({toValue: 0}, true);
    } else {
      handlePause();
    }
  };

  const handleBtnFullscreenPress = minute => {
    if (!fullscreen) {
      if (!isFullscreen) {
        Orientation.lockToLandscape();
        if (!isPause) {
          handlePause();
        }
      } else {
        Orientation.lockToPortrait();
        handleSeekVideo(minute + 0.3834309997558594);
        handlePause();
      }

      setFullscreen(!isFullscreen);
    } else {
      Orientation.lockToPortrait();
      handlePause();
      onFullClose && onFullClose();
    }
  };

  const handleBuffer = ({isBuffering}) => {
    setBuffering(isBuffering);
  };

  const onReadyForDisplay = () => controlVideoAnim({toValue: 1, delay: 3600});

  const posTop = posControl.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -46],
  });
  const bottomTop = posControl.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 46],
  });

  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleVideoPress}
          style={[
            styles.container,
            fullscreen && {height: '100%', borderRadius: 0},
          ]}>
          <View
            style={[
              styles.videoContainer,
              fullscreen && styles.videoContainerFullScreen,
            ]}>
            {/* sourceLink  */}
            {(source || sourceLink) && (
              <Video
                ref={videoRef}
                paused={isPause}
                resizeMode="contain"
                style={styles.video}
                source={samplevideo}
                onLoad={handleLoad}
                onProgress={handleProgress}
                onBuffer={handleBuffer}
                onEnd={handlePause}
                onReadyForDisplay={onReadyForDisplay}
              />
            )}
            {/* akhir sourceLink  */}

            {/* isBuffering  */}
            {isBuffering && (
              <ActivityIndicator
                style={[styles.loading, styles.overlay]}
                size="large"
                color={'#fff'}
              />
            )}
            {/* akhir isBuffering  */}
            {videoLenght ? (
              <>
                <Animated.View
                  style={[
                    styles.titleContainer,
                    {top: 0, transform: [{translateY: posTop}]},
                  ]}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.title} numberOfLines={1}>
                      {title ? title : otherTitle ? otherTitle : ''}
                    </Text>
                  </View>
                  {fullscreen && (
                    <View style={styles.icon}>
                      <Image
                        style={styles.img}
                        source={require('./Images/shere.png')}
                      />
                    </View>
                  )}
                </Animated.View>
                <Animated.View
                  style={[
                    styles.controlContainer,
                    {bottom: 0, transform: [{translateY: bottomTop}]},
                  ]}>
                  <TouchableOpacity
                    onPress={handleBtnPausePress}
                    activeOpacity={0.8}
                    style={styles.icon}>
                    {/* <Image
                      style={styles.img}
                      source={
                        IMG.learn.videoPlayer[
                          isFinish ? 'replay' : isPause ? 'play' : 'pause'
                        ]
                      }
                    /> */}
                  </TouchableOpacity>
                  <View style={styles.minuteContainer}>
                    <Text style={styles.minute}>{VideoTime(currentSec)}</Text>
                  </View>
                  <VideoSlider
                    maximumValue={videoLenght}
                    value={currentSec}
                    onValueChange={handleSeekVideo}
                    onSlidingComplete={handleSeekVideoComplete}
                  />
                  <TouchableOpacity
                    onPress={handleBtnFullscreenPress}
                    activeOpacity={0.8}
                    style={styles.icon}>
                    {/* <Image
                      style={styles.img}
                      source={
                        IMG.learn.videoPlayer[
                          fullscreen ? 'outscreen' : 'fullscreen'
                        ]
                      }
                    /> */}
                  </TouchableOpacity>
                </Animated.View>
              </>
            ) : (
              <View />
            )}
          </View>
        </TouchableOpacity>
        {!fullscreen && (
          <VideoFull
            data={{
              ...data,
              url: sourceLink,
              minute: currentSec,
              title: title ? title : otherTitle,
            }}
            source={source}
            isVisible={isFullscreen}
            onRequestClose={handleBtnFullscreenPress}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
  },
  sliderContainer: {
    flex: 1,
    height: 22,
    marginLeft: 11,
    marginRight: 17,
    justifyContent: 'center',
  },
  sliderTrack: {
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderPrevTrack: {
    height: 3,
    width: '0%',
    backgroundColor: '#32C0EE',
  },
  videoContainer: {
    // backgroundColor: 'transparent',
    // aspectRatio: 1.8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    elevation: 8,
    backgroundColor: '#727272',
  },
  videoContainerFullScreen: {
    height: heightLandscape,
    aspectRatio: widthLandscape / heightLandscape,
    alignSelf: 'center',
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  video: {
    width: '100%',
    height: '100%',
  },

  videoFull: {
    backgroundColor: '#000',
    // paddingVertical: width(3)
  },
  sliderThumb: {
    position: 'absolute',
    width: 11,
    aspectRatio: 1,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 1,
  },
  sliderNextTrack: {
    height: 3,
    width: '100%',
    backgroundColor: '#DFDFDF',
  },

  titleContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingVertical: 11,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
  },
  controlContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingVertical: 6,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  minuteContainer: {
    width: 48,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  minute: {
    color: '#fff',
  },
  icon: {
    width: 18,
    aspectRatio: 1,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
export default VideoPlayer;
