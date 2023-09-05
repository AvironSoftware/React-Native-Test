import React, {useState, useEffect} from 'react';
import styles from './dropdownStyle';
import {Text, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Feather';
import {Checkbox} from 'react-native-paper';

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

const ListItem = (props: any) => {
  const {
    multiSelect,
    handleSingleChange,
    handleValueChange,
    handleSelectAll,
    val,
    item,
    isSelectAllActive,
    hideCheckboxExtraOption,
  } = props;
  let valueToChange = multiSelect ? [] : {};
  let isSelected = false;
  if (multiSelect) {
    if (val && typeof item.value !== 'object') {
      if (val?.includes(item.value)) {
        valueToChange = val.filter((i: any) => i !== item.value);
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
    if (item.value === -1 && multiSelect) {
      return handleSelectAll();
    }
    if (item.value === -1 && !multiSelect) {
      return handleSingleChange(valueToChange);
    }
    return multiSelect
      ? handleValueChange(valueToChange)
      : handleSingleChange(valueToChange);
  };

  const hideCheckbox = hideCheckboxExtraOption && item.value === -1;
  return (
    <TouchableOpacity
      style={
        item?.parent
          ? [styles.dropdownListItem, {marginLeft: 30}]
          : styles.dropdownListItem
      }
      onPress={() => handlePress()}>
      {!hideCheckbox ? (
        <Checkbox.Android
          status={
            (item.value !== -1 ? isSelected : isSelectAllActive)
              ? 'checked'
              : 'unchecked'
          }
        />
      ) : (
        <></>
      )}
      <View style={styles.flexOne}>
        <Text style={styles.dropdownListItemLabel}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

type DropDownProps = {
  value: any;
  onChangeValue: (selectedValue: any) => void;
  placeholder: string;
  list: any;
  searchable: boolean;
  disabled?: boolean;
  modalTitle: string;
  multiSelect?: boolean;
  hideDefaultPlaceholder?: boolean;
  label?: string;
  mode?: 'MODAL' | 'FLATLIST';
  noClear?: boolean;
  renderListItem?: any;
  hideCheckboxExtraOption?: boolean;
};

const DropDown: React.FC<DropDownProps> = ({
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
  const [open, setOpen] = useState(false);
  const [val, setValue] = useState(value ? value : []);
  const [items, setItems] = useState(list);
  const [isSelectAllActive, setIsSelectAllActive] = useState(false);

  const handleValueChange = (item: any) => {
    const values = item
      .map((i: any) => (i.value ? i.value : i))
      .filter((i: number) => i !== -1);
    if (isSelectAllActive && item.value !== -1) {
      setIsSelectAllActive(false);
    }
    onChangeValue(values);
  };

  const handleSingleChange = (item: any) => {
    const v = item.value;
    onChangeValue(v);
    setOpen(false);
  };

  const handleSelectAll = () => {
    setIsSelectAllActive(true);
    setValue([]);
  };

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

  const handleDropdownClose = () => {
    if (multiSelect) {
      if (isSelectAllActive) {
        setValue([]);
        onChangeValue([]);
      } else {
        setValue(val?.filter((i: any) => i !== -1));
        onChangeValue(val?.filter((i: any) => i !== -1));
      }
    }
    return;
  };

  useEffect(() => {
    reorderSelectedItems();
    if ((Array.isArray(value) && value.length === 0) || value === -1) {
      setValue([]);
      setIsSelectAllActive(true);
    } else {
      if (Array.isArray(value) && value.includes(-1)) {
        setValue(value.filter(i => i !== -1));
      } else {
        setValue(value);
      }
    }
  }, [value]);

  useEffect(() => {
    if (value === undefined && multiSelect) {
      setIsSelectAllActive(true);
    }
  },[]);


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
        onSelectItem={multiSelect ? handleValueChange : handleSingleChange}
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
          return <ListItem {...customProps} />;
        }}
      />
    </View>
  );
};
export default DropDown;
