import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts, sizes} from '../common';

const styles = StyleSheet.create({
  dropdown: {
    height: sizes.dropdownHeight,
    borderColor: colors.colorPrimary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: moderateScale(10),
  },
  opacity50P: {
    opacity: 0.5,
  },
  colorGray: {
    color: 'gray',
  },
  borderWidth1: {
    borderWidth: 1,
  },
  dropDownMainContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: moderateScale(15),
  },
  dropDownLabel: {
    marginTop: -2,
    marginBottom: -15,
    marginLeft: 8,
    top: -4,
    paddingTop: 0,
    zIndex: 99,
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    alignSelf: 'flex-start',
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
  dropDownLabelText: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 10,
    top: -6,
    zIndex: 999,
    paddingHorizontal: moderateScale(8),
    ...fonts.interRegular,
    fontSize: fonts.size.tiny,
    color: colors.neutral80,
    borderRadius: 5,
    overflow: 'hidden',
  },
  dropDownList: {
    backgroundColor: 'white',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 4,
    paddingBottom: 4,
    paddingTop: 4,
    height: 'auto',
  },
  dropDownTick: {
    margin: 10,
  },
  dropdownPlaceHolderStyle: {
    fontSize: 16,
  },
  input: {
    marginBottom: 12,
    marginTop: -6,
    backgroundColor: '#fff',
    ...fonts.interRegular,
    minHeight: 44,
    fontSize: 16,
  },
  multiSelector: {
    marginBottom: 12,
    borderColor: '#C3D4E2',
    borderWidth: 0.9,
    backgroundColor: '#FFF',
    minHeight: 50,
    height: 50,
    borderRadius: 4,
  },
  multiSelectText: {
    color: 'black',
    ...fonts.interRegular,
    fontSize: 16,
    marginTop: 5,
    fontWeight: '400',
    paddingBottom: 5,
    letterSpacing: 0,
    paddingHorizontal: 15,
  },
  multiSelectTextSelected: {
    color: 'black',
    ...fonts.interRegular,
    fontSize: 15,
    marginTop: 5,
    letterSpacing: 0,
    paddingHorizontal: 15,
  },
  inputText: {
    marginBottom: 4,
    backgroundColor: '#fff',
    ...fonts.interRegular,
  },
  backgroundColorAppGray: {
    backgroundColor: '#F5F5F5',
    ...fonts.interRegular,
  },
  backgroundWhite: {
    backgroundColor: '#fff',
    ...fonts.interRegular,
  },
  alignSelfCenter: {
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    ...fonts.interRegular,
  },
  ml20: {
    marginLeft: 20,
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  borderColorAppBlue: {
    borderColor: '#3B94DB',
  },
  fs16: {
    fontSize: 16,
    ...fonts.interRegular,
  },
  dropdownListItem: {
    backgroundColor: 'none',
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownListItemLabel: {
    fontSize: 16,
    textAlign: 'left',
    ...fonts.interRegular,
  },
  flexOne: {
    flex: 1,
  },
});
export default styles;
