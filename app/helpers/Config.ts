import { version } from '../../package.json';

const devConfig = {
  API_URL: 'http://192.168.0.213:1337',
  APP_VERSION: version as string,
};

const prodConfig = {
  API_URL: 'https://flexmotion.herokuapp.com/',
  APP_VERSION: version as string,
};

const returnConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    return devConfig;
  } else if (process.env.NODE_ENV === 'production') {
    return prodConfig;
  } else {
    return devConfig;
  }
};

export default returnConfig();
