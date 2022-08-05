import { Image } from "./Image";
import { User } from "./User";
import { WorkoutExercise } from "./WorkoutExercise";

export interface Workout {
    id: number;
    user: User;
    type: string;
    workoutExercises: WorkoutExercise;
    icon: Image;
    day: string;
}

interface _workoutExercise {
    data: WorkoutExercise[];
}

interface _user {
    data: User;
}