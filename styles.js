'use strict';
import { StyleSheet } from 'react-native';
import { colors } from './colors';

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },

  fullHeight: {
    height: '100%',
  },

  fullScreen: {
    height: '100%',
    width: '100%',
    display: 'flex',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
  },

  column: {
    flexDirection: 'column',
  },

  headerText: {
    backgroundColor: 'green',
  },

  primaryColor: {
    color: colors.primaryColor,
  },

  primaryColorBackground: {
    backgroundColor: colors.primaryColor,
  },

  whiteBackground: {
    backgroundColor: colors.white,
  },

  white: {
    color: colors.white,
  },

  flex1: {
    flex: 1,
  },

  flex0: {
    flex: 0,
  },

  bold: {
    fontWeight: 'bold',
  },

  opacity: {
    opacity: 1,
  },

  alignSelfCenter: {
    alignSelf: 'center',
  },

  borderRadius: {
    borderRadius: 16,
  },

  alignCenter: {
    alignItems: 'center',
  },

  justifyCenter: {
    justifyContent: 'center',
  },
});

export default styles;
