import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import s from "../../../../styles";
import Carousel from "react-native-snap-carousel";
import { Fold } from "react-native-animated-spinkit";
import { colors } from "../../../../colors";
import WorkoutQuestionStore from "../../../stores/WorkoutQuestionStore";
import { inject } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import {
  GlassView,
  AnswerButton,
  Text,
  Pagination,
  PrimaryButton,
  SizedBox,
  Background,
} from "../../../components/index";
import { UserAnswer } from "../../../models/UserAnswer";
import Toast from "react-native-toast-message";

type QandA = {
  id: number;
  question: string;
  icon: any;
  answerList: Answer[];
};

type Answer = {
  clicked: boolean;
  title: string;
};

interface WorkoutQuestionsScreenProps {
  workoutQuestionStore: WorkoutQuestionStore;
}

const WorkoutQuestionsScreen: React.FC<WorkoutQuestionsScreenProps> = ({
  workoutQuestionStore,
}: WorkoutQuestionsScreenProps) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loadData, setLoadData] = useState(true);
  const [QandA, setQandA] = useState<QandA[]>([]);
  const [clickedAnswer, setClickedAnswer] = useState({ id: -1, answer: "" });
  const [clickedAnswers, setClickedAnswers] = useState<UserAnswer[]>([]);
  const carouselRef = useRef<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const response = await workoutQuestionStore.getQuestions();

    if (response) {
      fillQuestionCards(response);
    }

    setLoadData(false);
  };

  const setAnswer = () => {
    const tmpClickedAnswers = [...clickedAnswers];

    const alreadySettedIndex = tmpClickedAnswers.findIndex(
      (answ) => answ.id === activeQuestionIndex
    );

    const answer = {
      id: activeQuestionIndex,
      workoutQuestion: QandA[activeQuestionIndex].id,
      answer: clickedAnswer.answer,
    };

    if (alreadySettedIndex !== -1) {
      tmpClickedAnswers[alreadySettedIndex] = answer;
    } else {
      tmpClickedAnswers.push(answer);
    }

    setClickedAnswers(tmpClickedAnswers);
    return tmpClickedAnswers;
  };

  const checkIfClickedAnswer = () => {
    const tmpList = QandA[activeQuestionIndex].answerList.map((item) => {
      if (item.clicked) {
        return true;
      }
    });

    return tmpList.includes(true) ? false : true;
  };

  const fillQuestionCards = (questions) => {
    let tmpQandA = [] as QandA[];
    for (const q of questions) {
      let obj: QandA = {
        id: q.id,
        question: "",
        icon: undefined,
        answerList: [],
      };
      obj.question = q.question;
      if (q.icon) {
        obj.icon = q.icon;
      }
      for (const a of q.workoutAnswer) {
        obj.answerList.push({ clicked: false, title: a.answer });
      }
      tmpQandA.push(obj);
    }
    setQandA(tmpQandA);
  };

  const getClickedAnswer = (value, key, currentIndex) => {
    let existingIndex = QandA[activeQuestionIndex].answerList.find(
      (o) => o.title === value && o.clicked === true
    );

    if (!existingIndex) {
      const tmpArray = [...QandA];
      for (const answer of tmpArray[activeQuestionIndex].answerList) {
        if (answer.title === value) {
          answer.clicked = true;
          setClickedAnswer({ id: activeQuestionIndex, answer: answer.title });
          continue;
        }
        answer.clicked = false;
      }
      setQandA(tmpArray);
    }
  };

  const _renderItem = ({ item }) => {
    return (
      <View
        key={JSON.stringify(item)}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={styles.questionCard}>
          <GlassView>
            <Text style={{ fontSize: 30 }}>{item.question}</Text>
            {item.icon && (
              <Image
                source={{ uri: item.icon.url }}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            )}
          </GlassView>
        </View>
        <View style={styles.answerContainer}>
          {item.answerList &&
            item.answerList.length > 0 &&
            item.answerList.map((item, key) => {
              return (
                <AnswerButton
                  key={key}
                  answerId={key}
                  title={item.title}
                  clicked={item.clicked ? true : false}
                  getValue={getClickedAnswer}
                  activeIndex={activeQuestionIndex}
                />
              );
            })}
        </View>
      </View>
    );
  };

  const renderQuestions = () => {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination activeIndex={activeQuestionIndex} length={QandA.length} />
          <Carousel
            layout={"default"}
            ref={carouselRef}
            data={QandA as QandA[]}
            sliderWidth={Dimensions.get("screen").width}
            itemWidth={Dimensions.get("screen").width}
            renderItem={_renderItem}
            onSnapToItem={(index) => {
              setActiveQuestionIndex(index);
            }}
          />
        </View>
        {activeQuestionIndex !== 0 ? (
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="<"
              style={styles.backButton}
              textStyle={{ color: "white" }}
              onPress={() => {
                carouselRef.current?.snapToPrev();
              }}
            />
            <PrimaryButton
              title="Next"
              style={{ flex: 1, marginLeft: 10 }}
              disabled={checkIfClickedAnswer()}
              onPress={() => {
                if (checkIfClickedAnswer()) {
                  Toast.show({ text1: "Please select an answer" });
                  return;
                }
                const answerList = setAnswer();
                if (activeQuestionIndex === QandA.length - 1) {
                  if (answerList.length < activeQuestionIndex + 1) {
                    Toast.show({
                      text1: "Oops you forgot to answer a question!",
                    });
                    return;
                  }
                  workoutQuestionStore.userAnswers = answerList;
                  navigation.navigate("GenerateWorkoutLoadingScreen" as never);
                  return;
                }
                carouselRef.current?.snapToNext();
              }}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Next"
              disabled={checkIfClickedAnswer()}
              onPress={() => {
                if (checkIfClickedAnswer()) {
                  Toast.show({
                    text1: "Wähle bitte zuerst eine Antwort aus",
                    type: "info",
                  });
                  return;
                }
                setAnswer();
                carouselRef.current?.snapToNext();
              }}
            />
          </View>
        )}
      </>
    );
  };

  const renderLoading = () => {
    return (
      <View style={[s.fullScreen, s.center, s.column]}>
        <Fold size={25} color={colors.white} />
        <SizedBox height={10} />
        <Text>Loading questions...</Text>
      </View>
    );
  };

  return (
    <Background>{loadData ? renderLoading() : renderQuestions()}</Background>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 40,
  },

  questionCard: {
    backgroundColor: "transparent",
    borderRadius: 5,
    height: "45%",
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },

  backButton: {
    width: "20%",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
  },
});

export default inject("workoutQuestionStore")(WorkoutQuestionsScreen);
