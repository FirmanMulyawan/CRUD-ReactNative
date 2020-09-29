/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Image,
  Text,
  Animated,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import VideoBase from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import ytdl from 'react-native-ytdl';
import Modal from '../Modal';

import {widthPercentageToDP as width} from '../../utils/Responsive';
import {IMG} from '../../constants';
import {GSTYLES} from '../../styles';

import styles from './styles';

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
        style={{position: 'absolute', right: 0, left: 0, height: width(6)}}
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

  const getVideoUrl = async videos => {
    const youtubeURL = videos.includes('http')
      ? videos
      : 'http://www.youtube.com/watch?v=' + videos;
    const urls = await ytdl(youtubeURL, {quality: 'highest'});
    const {videoDetails} = await ytdl.getBasicInfo(youtubeURL);

    setSourceLink(urls[0].url);
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

  const handleBtnPausePress = () => {
    if (isFinish && currentSec !== 0) {
      handleSeekVideo(0);
    }

    handlePause();
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

  const handleVideoPress = () => {
    if (!isPause) {
      controlVideoAnim({toValue: 0}, true);
    } else {
      handlePause();
    }
  };

  const onReadyForDisplay = () => controlVideoAnim({toValue: 1, delay: 3600});

  const posTop = posControl.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width(12.5)],
  });
  const bottomTop = posControl.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width(12.5)],
  });

  return (
    <>
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
          {(source || sourceLink) && (
            <VideoBase
              ref={videoRef}
              paused={isPause}
              resizeMode="contain"
              style={styles.video}
              source={source ? source : {uri: sourceLink}}
              onLoad={handleLoad}
              onProgress={handleProgress}
              onBuffer={handleBuffer}
              onEnd={handlePause}
              onReadyForDisplay={onReadyForDisplay}
            />
          )}

          {isBuffering && (
            <ActivityIndicator
              style={[styles.loading, GSTYLES.overlay]}
              size="large"
              color={'#fff'}
            />
          )}

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
                    <Image style={GSTYLES.img} source={IMG.profile.share} />
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
                  <Image
                    style={GSTYLES.img}
                    source={
                      IMG.learn.videoPlayer[
                        isFinish ? 'replay' : isPause ? 'play' : 'pause'
                      ]
                    }
                  />
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
                  <Image
                    style={GSTYLES.img}
                    source={
                      IMG.learn.videoPlayer[
                        fullscreen ? 'outscreen' : 'fullscreen'
                      ]
                    }
                  />
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
    </>
  );
};

export default VideoPlayer;
