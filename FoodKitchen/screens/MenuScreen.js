import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MenuItem = ({ item, index, deleteMenuItem }) => (
  <View style={styles.menuItem}>
    <Text style={styles.menuItemText}>Meal: {item.dishName}</Text>
    <Text>Overview: {item.description}</Text>
    <Text>Course: {item.course}</Text>
    <Text>Cost: R{item.price}</Text>
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteMenuItem(index)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const MenuScreen = ({ route, navigation }) => {
  const { menu } = route.params;
  const [menuItemsArray, setMenuItemsArray] = useState([...menu]);
  const [filteredMenu, setFilteredMenu] = useState({
    All: menu,
    Starters: [],
    Main: [],
    Desserts: [],
  });
  const [selectedCourse, setSelectedCourse] = useState('All');

  // Update filteredMenu when menuItemsArray changes
  useEffect(() => {
    const starters = menuItemsArray.filter((item) => item.course === 'Starters');
    const main = menuItemsArray.filter((item) => item.course === 'Main');
    const desserts = menuItemsArray.filter((item) => item.course === 'Desserts');

    setFilteredMenu({
      All: menuItemsArray,
      Starters: starters,
      Main: main,
      Desserts: desserts,
    });
  }, [menuItemsArray]);

  // Delete a menu item
  const deleteMenuItem = (index) => {
    Alert.alert(
      'Delete Menu Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedMenu = [...menuItemsArray];
            updatedMenu.splice(index, 1);
            setMenuItemsArray(updatedMenu);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The FoodKitchen Menu</Text>
      <Text style={styles.menuInfo}>Total Menu Items: {menuItemsArray.length}</Text>

      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      {/* Course Filter */}
      <Picker
        selectedValue={selectedCourse}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCourse(itemValue)}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      {/* Display the grouped menu items */}
      <FlatList
        data={filteredMenu[selectedCourse]}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={selectedCourse !== 'All' && (
          <Text style={styles.courseHeader}>{selectedCourse}</Text>
        )}
        renderItem={({ item, index }) => (
          <MenuItem item={item} index={index} deleteMenuItem={deleteMenuItem} />
        )}
      />

      {/* Add to Menu Button */}
      <TouchableOpacity
        style={styles.addToMenuButton}
        onPress={() => navigation.navigate('AddMenuItemScreen')}
      >
        <Text style={styles.buttonText}>Add to Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuInfo: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 5,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToMenuButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 15,
  },
  backButton: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default MenuScreen;
