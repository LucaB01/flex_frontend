import {observable, action, makeObservable} from 'mobx';
import apiHandler from '../services/apiHandler';
import {WorkoutQuestion} from '../models/WorkoutQuestion';
import {UserAnswer} from '../models/UserAnswer';
import {FormatResponse} from '../helpers/FormatResponse';

export default class WorkoutQuestionStore {
  @observable
  questionList?: WorkoutQuestion;

  @observable
  userAnswers?: UserAnswer[];

  constructor() {
    makeObservable(this);
  }

  @action
  async getQuestions() {
    try {
      const response = await apiHandler.getWorkoutQuestions();

      if (response.status === 200) {
        const formattedResponse = FormatResponse(response.data);
        this.questionList = formattedResponse;
        return this.questionList;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
  }

  @action
  async createUserAnswer() {
    if (!this.userAnswers) {
      return null;
    }
    try {
      const response = await apiHandler.createUserAnswer(this.userAnswers);

      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
  }
}
