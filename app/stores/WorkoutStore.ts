import {observable, action, makeObservable} from 'mobx';
import apiHandler from '../services/apiHandler';
import {WorkoutPlan} from '../models/WorkoutPlan';
import { FormatResponse } from '../helpers/FormatResponse';

export default class WorkoutStore {
  @observable
  workoutPlan?: WorkoutPlan;

  constructor() {
    makeObservable(this);
  }

  @action
  async getWorkoutPlan() {
    try {
      const response = await apiHandler.getWorkoutPlan();

      if (response.status === 200) {
        const formattedResponse = FormatResponse(response.data);
        this.workoutPlan = formattedResponse;
        return this.workoutPlan;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
  }
}
