import {AxiosResponse} from 'axios';
import {User} from '../models/User';
import {Auth} from '../models/Auth';
import Axios from '../services/axios';
import {UserAnswer} from '../models/UserAnswer';
const qs = require('qs');

const query = qs.stringify(
  {
    populate: '*'
  },
  {
    encodeValuesOnly: true,
  },
);

export default class apiHandler {
  public static getCurrentUser(): Promise<AxiosResponse> {
    return Axios.get('/api/users/me');
  }

  public static signUpWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<AxiosResponse<Auth>> {
    return Axios.post('/api/auth/local/register', {
      username: email,
      email: email.toLowerCase(),
      password: password,
    });
  }

  public static signInWithEmailPassword(
    email: string,
    password: string,
  ): Promise<AxiosResponse<Auth>> {
    return Axios.post('/api/auth/local', {
      identifier: email.toLowerCase(),
      password: password,
    });
  }

  public static verify(code: string): Promise<AxiosResponse<Auth>> {
    return Axios.get('/api/auth/email-confirmation?confirmation=' + code);
  }

  public static resend(email: string): Promise<AxiosResponse<Auth>> {
    return Axios.post('/api/auth/send-email-confirmation', {
      email: email.toLowerCase(),
    });
  }

  public static resetPassword(
    code: string,
    password: string,
    repeatedPassword: string,
  ): Promise<AxiosResponse> {
    return Axios.post('/api/auth/reset-password', {
      code: code,
      password: password,
      passwordConfirmation: repeatedPassword,
    });
  }

  public static forgotMyPassword(email: string): Promise<AxiosResponse> {
    return Axios.post('/api/auth/forgot-password', {
      email: email,
    });
  }

  public static updateUser(user: User): Promise<AxiosResponse> {
    return Axios.put(`/api/users/${user.id}`, user);
  }

  public static getWorkoutQuestions(): Promise<AxiosResponse> {
    return Axios.get(`/api/workout-questions`);
  }

  public static getWorkoutPlan(): Promise<AxiosResponse> {
    return Axios.get(`/api/workout-plans?populate=*`);
  }

  public static createUserAnswer(
    userAnswers: UserAnswer[],
  ): Promise<AxiosResponse> {

    return Axios.post('/api/user-answers', userAnswers);
  }
}
