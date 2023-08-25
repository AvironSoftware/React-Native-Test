import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const rawWidth = width;
const rawHeight = height;

const dropdownHeight = height > 800 ? 60 : 55;

export default {
  rawHeight,
  rawWidth,
  dropdownHeight,
};
