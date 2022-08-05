import { Image } from "react-native";
import { WorkoutAnswer } from "./WorkoutAnswer";

export interface WorkoutQuestion {
    id: number;
    question: string;
    workoutAnswer: WorkoutAnswer[];
    icon: any;
}

interface _workoutAnswer {
    data: WorkoutAnswer[];
}