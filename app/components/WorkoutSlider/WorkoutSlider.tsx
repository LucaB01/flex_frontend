import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Background} from '..';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {inject} from 'mobx-react';
import WorkoutStore from '../../stores/WorkoutStore';
import reactotron from 'reactotron-react-native';
import {Text} from '../';
import image from '../../assets/images/deadlift.png';
import {GlassView} from '../GlassView/GlassView';
import s from '../../../styles';

interface WorkoutSliderProps {
  workoutStore?: WorkoutStore;
}

const WorkoutSlider: React.FC<WorkoutSliderProps> = ({
  workoutStore,
}: WorkoutSliderProps) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const carouselRef = useRef<any>(null);
  const navigation = useNavigation();
  const workoutPlan = workoutStore?.workoutPlan;

  const renderCard = ({item}) => {
    return item.image ? (
      <ImageBackground
        style={styles.imageContainer}
        imageStyle={{marginLeft: 16, marginRight: 15}}
        resizeMode="contain"
        source={{uri: item.image.url}}>
        <View style={styles.imageContentContainer}>
          <View style={styles.textContainer}>
            <Text preset="header">{item.day}</Text>
            <Text>{item.type}</Text>
          </View>
        </View>
      </ImageBackground>
    ) : (
      <View style={[s.fullScreen, s.center]}>
        <GlassView
          style={styles.cardContainer}
          overlayStyle={{width: '70%', height: '80%'}}>
          <Text preset="header">{item.day}</Text>
          <Text>{item.type}</Text>
        </GlassView>
      </View>
    );
  };

  if (workoutPlan) {
    return (
      <Carousel
        layout={'default'}
        ref={carouselRef}
        data={workoutPlan?.workouts}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width}
        renderItem={renderCard}
        onSnapToItem={index => {
          setActiveQuestionIndex(index);
        }}
      />
    );
  }

  return <></>;
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 60,
    marginRight: 60,
    height: '100%',
    width: '100%',
  },

  imageContainer: {
    width: '91%',
    height: '100%',
    alignSelf: 'center',
  },

  imageContentContainer: {
    marginLeft: 45,
    marginTop: 40,
    width: '75%',
    height: '80%',
  },

  textContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
});

export default inject('workoutStore')(WorkoutSlider);
