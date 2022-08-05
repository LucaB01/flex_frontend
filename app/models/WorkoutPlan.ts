import { User } from "./User";
import { Workout } from "./Workout";

export interface WorkoutPlan {
    id: number;
    workouts: Workout[];
}