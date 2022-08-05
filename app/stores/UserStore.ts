import AsyncStorage from '@react-native-async-storage/async-storage';
import {observable, action, makeObservable} from 'mobx';
import axios from 'axios';
import {User} from '../models/User';
import Toast from 'react-native-toast-message';
import apiHandler from '../services/apiHandler';
import translate from '../assets/translations/translation_config';

export default class UserStore {
  @observable
  currentUser?: User;

  constructor() {
    makeObservable(this);
    this.init().catch(err => {
      console.log(err);
    });
  }

  async init(): Promise<void> {
    const localUser = await AsyncStorage.getItem('token');
    if (localUser) {
      // this.currentUser = JSON.parse(localUser) as User;
    }
  }

  @action
  async getCurrentUser(notShowToast?: boolean): Promise<User | undefined> {
    try {
      const response = await apiHandler.getCurrentUser();
      if (response.status === 200) {
        this.currentUser = response.data as User;
        return this.currentUser;
      }
      console.log('err');
    } catch (err) {
      console.log(err);
      if (!notShowToast) {
        Toast.show({
          type: 'error',
          text1: translate('toast.ups'),
          text2: translate('toast.somethingWrong'),
          visibilityTime: 3000,
        });
      }
    }
  }


  @action
  async signIn(email: string, password: string): Promise<string> {
    try {
      const response = await apiHandler.signInWithEmailPassword(
        email,
        password,
      );
      if (response.status === 200) {
        const {jwt, user} = response.data;
        await AsyncStorage.setItem('token', jwt);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        this.currentUser = user;

        if (user.setupCompleted) {
          return 'true';
        }
        return 'setupNotCompleted'
      } else {
        return 'false';
      }
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        console.log(
          JSON.stringify(err.response).indexOf('Auth.form.error.confirmed'),
        );
        if (
          err.response &&
          JSON.stringify(err.response).indexOf('Auth.form.error.confirmed') > -1
        ) {
          return 'confirm';
        }
      }
      Toast.show({
        type: 'error',
        text1: 'Cant login',
        text2: 'Wrong Input',
        visibilityTime: 3000,
      });
      return 'false';
    }
  }

  @action
  async signUp(email: string, password: string): Promise<boolean> {
    try {
      const response = await apiHandler.signUpWithEmailAndPassword(
        email,
        password,
      );
      if (response.status === 200) {
        const {user} = response.data;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        this.currentUser = user;
        return true;
      }
    } catch (err: any) {
      console.log(err);
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.message[0] &&
        err.response.data.message[0].messages &&
        err.response.data.message[0].messages[0] &&
        err.response.data.message[0].messages[0].id ===
          'Auth.form.error.email.taken'
      ) {
        // Toast.show({
        //   type: 'error',
        //   text1: translate('toast.cantSignUp'),
        //   text2: translate('toast.emailInUse'),
        //   visibilityTime: 3000,
        // });
        return false;
      }
      // Toast.show({
      //   type: 'error',
      //   text1: translate('toast.cantSignUp'),
      //   text2: translate('toast.somethingWrong'),
      //   visibilityTime: 3000,
      // });
      return false;
    }
    return false;
  }

  @action
  async updateUser(user: User): Promise<boolean> {
    try {
      const response = await apiHandler.updateUser(user);
      if (response.status === 200) {
        this.currentUser = response.data;
        return response.data;
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Ups',
        text2: 'Something went wrong',
        visibilityTime: 3000,
      });
      return false;
    }
    return false;
  }

  @action
  async forgotPassword(email: string): Promise<boolean> {
    try {
      const response = await apiHandler.forgotMyPassword(email);
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Email sent',
          text2: 'You received an email from us',
          visibilityTime: 3000,
        });
        return true;
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Ups',
        text2: 'Something went wrong',
        visibilityTime: 3000,
      });
      return false;
    }
    return false;
  }

  @action
  async resetPassword(code: string, password: string, repeatedPassword: string): Promise<boolean> {
    try {
      const response = await apiHandler.resetPassword(code, password, repeatedPassword);
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'You changed your password successfully',
          visibilityTime: 3000,
        });
        return true;
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Ups',
        text2: 'Something went wrong',
        visibilityTime: 3000,
      });
      return false;
    }
    return false;
  }

  @action
  async verify(code: string): Promise<boolean> {
    if (this.currentUser) {
      const response = await apiHandler.verify(code);
      if (response.status === 200) {
        if (response.data.toString() === 'token.timedout') {
          Toast.show({
            type: 'error',
            text1: 'To late',
            text2: 'Code expired',
            visibilityTime: 3000,
          });
          return false;
        }
        Toast.show({
          type: 'success',
          text1: 'Nice',
          text2: 'Now you are able to log in',
          visibilityTime: 3000,
        });
        return true;
      }
      return false;
    }
    return false;
  }
}
