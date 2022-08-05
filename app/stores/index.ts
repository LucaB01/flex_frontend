
import UserStore from './UserStore';
import WorkoutQuestionStore from './WorkoutQuestionStore';
import WorkoutStore from './WorkoutStore';

const stores = {
  userStore: new UserStore(),
  workoutQuestionStore: new WorkoutQuestionStore(),
  workoutStore: new WorkoutStore()
};
export default stores;