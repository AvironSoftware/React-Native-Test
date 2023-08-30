import React, {useState, useEffect, FC, memo} from 'react';
import {Text, View} from 'react-native';
import {debounce} from 'lodash';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Feather';

import {DropDownProps, Item} from '../lib/types';
import ItemDisplay from './itemDisplay';
import styles from './dropdownStyle';

const defaultIcon = () => {
  return <Icon name="chevron-down" size={26} color="#3B94DB" />;
};

const renderCloseIcon = () => {
  return (
    <Icon
      style={styles.alignSelfCenter}
      name="close"
      size={30}
      color="#3B94DB"
    />
  );
};

const renderTickIcon = () => {
  return (
    <FIcon
      style={styles.alignSelfCenter}
      name="check-square"
      size={15}
      color="#3B94DB"
    />
  );
};

const DropDown: FC<DropDownProps> = ({
  value,
  onChangeValue,
  placeholder,
  list,
  searchable,
  disabled,
  modalTitle,
  multiSelect,
  hideCheckboxExtraOption = false,
  hideDefaultPlaceholder = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [val, setValue] = useState<string[] | any>(value ? value : []);
  const [items, setItems] = useState<Item[]>(list);
  const [isSelectAllActive, setIsSelectAllActive] = useState<boolean>(false);

  const valueChange = (selectedItems: Item[]) => {
    const selectedValues = selectedItems.map((item: Item) =>
      item.value ? item.value : item,
    );

    if (isSelectAllActive && selectedValues.includes(-1)) {
      setIsSelectAllActive(false);
    }
    onChangeValue(selectedValues);
    setValue(selectedValues);
    reorderSelectedItems();
  };

  /* I've added debounce just to
   * prevent spamming of checking/unchecking
   */
  const handleValueChange = debounce(valueChange, 500);

  const handleSingleChange = (item: any) => {
    const v = item.value;
    onChangeValue(v);
    setOpen(false);
  };

  const handleSelectAll = () => {
    if (isSelectAllActive === true) {
      setIsSelectAllActive(false);
      setValue([]);
    } else if (isSelectAllActive === false) {
      setIsSelectAllActive(true);
      handleValueChange(items);
    }
  };

  /*
   * this is the function that makes newly selected/checked
   * item to be moved to the top of the list.
   */
  const reorderSelectedItems = () => {
    let updatedItems: any = [...items];
    const selectedItems = Array.isArray(value) ? value : [value];
    selectedItems.forEach((selectedItem: number) => {
      const index = updatedItems.findIndex(
        (i: any) => i.value === selectedItem,
      );
      if (index !== -1) {
        const changedItem = updatedItems[index];
        updatedItems.splice(index, 1);
        updatedItems.unshift(changedItem);
      }
    });

    if (multiSelect) {
      updatedItems = updatedItems.filter((i: any) => i.value !== -1);
      if (updatedItems.findIndex((i: any) => i.value === -1) === -1) {
        updatedItems.unshift({value: -1, label: 'Select All'});
      }
    }

    setItems(updatedItems);
  };

  /*
   * modified the handleDropdownClose function to show all
   * items selected on the output if "select all" is checked
   */
  const handleDropdownClose = () => {
    if (multiSelect) {
      setValue(val?.filter((i: any) => i !== -1));
      onChangeValue(val?.filter((i: any) => i !== -1));
    }
    return;
  };

  /*
   * this will act as a checker if
   * "select all" item is selected
   * then we will highlight the selected all item
   */
  useEffect(() => {
    try {
      if (val && list) {
        if (val.length === list.length - 1) {
          setIsSelectAllActive(true);
        } else {
          setIsSelectAllActive(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [list, val]);

  /*
   * this is used to trigger the reorder of the selected items
   * - added val to its dependencies
   */
  useEffect(() => {
    if (open) {
      reorderSelectedItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, val]);

  /*
   * I think this is used to sync val
   * state with the incoming value prop
   */
  useEffect(() => {
    if ((Array.isArray(value) && value.length === 0) || value === -1) {
      setValue([]);
    } else {
      if (Array.isArray(value) && value.includes(-1)) {
        setValue(value.filter(i => i !== -1));
      } else {
        setValue(value);
      }
    }
  }, [value]);

  /*
   * I believe this is used to prepend the "Select All"
   * option to the list.
   */
  useEffect(() => {
    if (list && multiSelect) {
      if (list.findIndex((i: any) => i.value === -1) === -1) {
        list.unshift({value: -1, label: 'Select All'});
      }
    }
  }, [list, multiSelect]);

  return (
    <View style={styles.dropDownMainContainer}>
      <Text style={styles.dropDownLabelText} allowFontScaling={false}>
        {modalTitle}
      </Text>
      <DropDownPicker
        loading={!list}
        open={open}
        searchContainerStyle={styles.backgroundColorAppGray}
        searchTextInputStyle={styles.backgroundWhite}
        CloseIconComponent={renderCloseIcon}
        listItemContainerStyle={[styles.dropDownList, styles.rowReverse]}
        listChildLabelStyle={styles.ml20}
        selectedItemContainerStyle={[
          styles.borderColorAppBlue,
          styles.borderWidth1,
        ]}
        tickIconContainerStyle={styles.dropDownTick}
        TickIconComponent={renderTickIcon}
        modalContentContainerStyle={styles.backgroundColorAppGray}
        searchPlaceholder={`${modalTitle} ${
          !hideDefaultPlaceholder ? 'Search' : ''
        }`}
        placeholder={placeholder}
        placeholderStyle={styles.dropdownPlaceHolderStyle}
        value={val}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        textStyle={styles.fs16}
        style={styles.dropdown}
        zIndex={1}
        listMode={'MODAL'}
        searchable={searchable ? true : false}
        disabled={disabled ? true : false}
        modalTitle={modalTitle}
        flatListProps={{keyboardShouldPersistTaps: 'handled'}}
        disabledStyle={styles.opacity50P}
        ArrowDownIconComponent={defaultIcon}
        labelProps={{
          maxFontSizeMultiplier: 1.7,
        }}
        multiple={multiSelect}
        onClose={() => {
          handleDropdownClose();
          reorderSelectedItems();
        }}
        renderListItem={(props: any) => {
          const customProps = {...props};
          customProps.handleValueChange = handleValueChange;
          customProps.handleSingleChange = handleSingleChange;
          customProps.handleSelectAll = handleSelectAll;
          customProps.isSelectAllActive = isSelectAllActive;
          customProps.multiSelect = multiSelect;
          customProps.val = val;
          customProps.hideCheckboxExtraOption = hideCheckboxExtraOption;
          return <ItemDisplay {...customProps} />;
        }}
      />
    </View>
  );
};
export default memo(DropDown);
