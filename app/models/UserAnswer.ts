import { WorkoutAnswer } from "./WorkoutAnswer";
import { WorkoutQuestion } from "./WorkoutQuestion";

export interface UserAnswer {
    id: number;
    workoutQuestion: number;
    answer: string;
}