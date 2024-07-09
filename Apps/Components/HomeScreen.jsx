// 
import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../Utils/GlobalApi';
import Header from './Header';

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const resp = await GlobalApi.getCategory();
      console.log(resp);
      setCategories(resp.categories);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      {categories.length > 0 ? (
        categories.map(category => (
          <View key={category.id}>
            <Text>{category.name}</Text>
            <Text>{category.icon.url}</Text>
          </View>
        ))
      ) : (
        <Text>Loading categories...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
