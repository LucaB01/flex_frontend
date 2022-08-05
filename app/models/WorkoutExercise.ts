import { Exercise } from "./Exercise";
import { User } from "./User";

export interface WorkoutExercise {
    id: number;
    user: User;
    exercise: Exercise;
    repeats: number;
    rest: number;
}

interface _user {
    data: User;
}

interface _exercise {
    data: Exercise;
}