import React, {FC, memo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Checkbox, ActivityIndicator} from 'react-native-paper';

import styles from './dropdownStyle';
import {ListItemProp} from '../lib/types';
import {debounce} from 'lodash';

/**
 * made the ListItem wrapped in React memo to get it
 * memoized, just to make sure the component only rerenders
 * when the props passed are updated, as well as separated
 * the item renderer from the dropdown componenent for more
 * easier access.
 * :
 * @param {boolean} multiSelect
 * @param {function} handleSingleValueChange
 * @param {function} handleValueChange
 * @param {function} handleSelectAll
 * @param {any} val // could be any value
 * @param {Item} item
 * @param {boolean} isSelectAllActive
 * @param {boolean} hideCheckboxExtraOption
 */

const ItemDisplay: FC<ListItemProp> = ({
  multiSelect,
  handleSingleChange,
  handleValueChange,
  handleSelectAll,
  val,
  item,
  isSelectAllActive,
  hideCheckboxExtraOption,
}) => {
  const hideCheckbox = hideCheckboxExtraOption && item.value === -1;
  let valueToChange = multiSelect ? [] : {};
  let isSelected = false;
  const [isLoading, setLoading] = useState<boolean>(false);

  if (multiSelect) {
    if (val && typeof item.value !== 'object') {
      if (val?.includes(item.value)) {
        valueToChange = val.filter((i: any) => i !== item.value);
        isSelected = true;
      } else if (isSelectAllActive === true) {
        isSelected = true;
      } else {
        valueToChange = val.concat(item);
      }
    } else {
      valueToChange = [item];
    }
  } else {
    valueToChange = item;
    isSelected = val === item.value;
  }

  const handlePress = () => {
    setLoading(true);
    // this will select all the items
    if (item.value === -1 && multiSelect) {
      return handleSelectAll();
    }
    if (item.value === -1 && !multiSelect) {
      return handleSingleChange(valueToChange);
    }
    debounce(() => setLoading(false), 200);
    return multiSelect
      ? handleValueChange(valueToChange)
      : handleSingleChange(valueToChange);
  };
  return (
    <TouchableOpacity
      style={
        item?.parent
          ? [styles.dropdownListItem, {marginLeft: 30}]
          : styles.dropdownListItem
      }
      onPress={handlePress}>
      {!hideCheckbox ? (
        isLoading ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <ActivityIndicator style={{margin: 6}} size={'small'} />
        ) : (
          <Checkbox.Android
            status={
              isSelectAllActive
                ? 'checked'
                : (item.value !== -1 ? isSelected : isSelectAllActive)
                ? 'checked'
                : 'unchecked'
            }
          />
        )
      ) : (
        <></>
      )}
      <View style={styles.flexOne}>
        <Text style={styles.dropdownListItemLabel}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ItemDisplay);
