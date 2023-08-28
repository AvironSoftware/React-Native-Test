/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';
import DropDown from './src/components/dropdown';
import {PaperProvider} from 'react-native-paper';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [testValue, setTestValue] = useState(null);
  const sampleItems = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Kiwi',
    'Lemon',
    'Mango',
    'Nectarine',
    'Orange',
    'Papaya',
    'Quince',
    'Raspberry',
    'Strawberry',
    'Tangerine',
    'Ugli Fruit',
    'Vanilla Bean',
    'Watermelon',
    'Xigua (Watermelon variant)',
    'Yellow Passion Fruit',
    'Zucchini',
    'Tomato',
    'Potato',
    'Carrot',
    'Onion',
    'Lettuce',
    'Broccoli',
    'Cabbage',
    'Peas',
    'Bell Pepper',
    'Corn',
    'Spinach',
    'Mushroom',
    'Parsley',
    'Cauliflower',
    'Ginger',
    'Chili',
    'Beans',
    'Lentils',
    'Rice',
    'Wheat',
    'Barley',
    'Oats',
    'Milk',
    'Eggs',
    'Cheese',
    'Butter',
    'Yogurt',
    'Cream',
    'Chicken',
    'Beef',
    'Pork',
    'Fish',
    'Tuna',
    'Salmon',
    'Shrimp',
    'Crab',
    'Mussels',
    'Oysters',
    'Lobster',
    'Turkey',
    'Bread',
    'Pasta',
    'Noodles',
    'Olive Oil',
    'Salt',
    'Pepper',
    'Sugar',
    'Tea',
    'Coffee',
    'Honey',
    'Vinegar',
    'Biscuits',
    'Cereal',
    'Jam',
    'Peanut Butter',
    'Soy Sauce',
    'Tomato Sauce',
    'Mustard',
    'Chocolate',
    'Ice Cream',
    'Cake',
    'Cookie',
    'Brownie',
    'Pudding',
    'Pie',
    'Candy',
    'Soda',
    'Juice',
    'Beer',
    'Wine',
    'Whiskey',
    'Vodka',
    'Rum',
    'Tequila',
    'Chips',
    'Popcorn',
    'Nuts',
    'Crackers',
  ];

  const items = sampleItems.map(item => ({
    label: item,
    value: item.toLowerCase().replace(/ /g, '_'),
  }));

  function onChangeTestValue(val: any) {
    setTestValue(val);
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <PaperProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Step One">
              <DropDown
                placeholder={'Test'}
                value={testValue}
                list={items}
                onChangeValue={val => onChangeTestValue(val)}
                modalTitle={'Test'}
                searchable={true}
                multiSelect
              />
            </Section>
            <Section title="See Your Changes">
              <Text>
                In the sample dropdown, an item moves to the top of the list
                after closing and opening
              </Text>
            </Section>
            <Section title="Debug">
              <Text>
                Refactor so that the item moves to the top of the list upon
                selection
              </Text>
            </Section>
            <Section title="Completion">
              Submit a PR to the repo once complete
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
