import {Platform} from 'react-native';

interface FontFamilies {
  bold: string;
  semiBold: string;
  extraBold: string;
  regular: string;
  medium: string;
  thin: string;
  light: string;
  extraLight: string;
  black: string;
}

const fontFamilies: FontFamilies = {
  bold: 'Inter-Bold',
  semiBold: 'Inter-SemiBold',
  extraBold: 'Inter ExtraBold',
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  thin: 'Inter thin',
  light: 'Inter Light',
  extraLight: 'Inter ExtraLight',
  black: 'Inter Black',
};

const textInterBold = {fontFamily: fontFamilies.bold};
const textInterSemiBold = {fontFamily: fontFamilies.semiBold};
const textInterExtraBold = {fontFamily: fontFamilies.extraBold};
const textInterRegular = {fontFamily: fontFamilies.regular};
const textInterMedium = {fontFamily: fontFamilies.medium};
const textInterThin = {fontFamily: fontFamilies.thin};
const textInterLight = {fontFamily: fontFamilies.light};
const textInterExtraLight = {fontFamily: fontFamilies.extraLight};
const textInterBlack = {fontFamily: fontFamilies.black};

if (Platform.OS === 'ios') {
  textInterThin.fontFamily = 'Inter Thin';
  textInterLight.fontFamily = 'Inter Light';
  textInterExtraLight.fontFamily = 'Inter ExtraLight';
}

if (Platform.OS === 'android') {
  textInterThin.fontFamily = 'Inter-thin';
  textInterLight.fontFamily = 'Inter-Light';
  textInterExtraLight.fontFamily = 'Inter-ExtraLight';
}

const size = {
  h1: 36,
  h2: 32,
  h3: 30,
  h4: 26,
  h5: 24,
  h6: 20,
  input: 18,
  regular: 16,
  medium: 14,
  small: 12,
  tiny: 10,
  extraTiny: 8,
  label: 16,
};

export default {
  interThin: {
    ...textInterThin,
  },
  interLight: {
    ...textInterLight,
  },
  interExtraLight: {
    ...textInterExtraLight,
  },
  interBold: {
    ...textInterBold,
  },
  interSemiBold: {
    ...textInterSemiBold,
  },
  interExtraBold: {
    ...textInterExtraBold,
  },
  interRegular: {
    ...textInterRegular,
  },
  interMedium: {
    ...textInterMedium,
  },
  interBlack: {
    ...textInterBlack,
  },
  size,
};
