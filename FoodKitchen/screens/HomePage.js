import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';

// Item dishes
const courseData = {
    MainMeal: [
      { label: 'Grilled Peri-Peri Chicken - R300', value: 'Grilled Peri-Peri Chicken', fee: 300, description: 'A spicy grilled chicken marinated in a tangy and hot peri-peri sauce, served with roasted vegetables.' },
      { label: 'Beef Wellington - R550', value: 'Beef Wellington', fee: 550, description: 'Tender beef fillet wrapped in puff pastry with a layer of mushroom duxelles and prosciutto.' },
      { label: 'Spaghetti Carbonara - R180', value: 'Spaghetti Carbonara', fee: 180, description: 'Classic Italian pasta dish with creamy egg-based sauce, pancetta, and Parmesan cheese.' },
    ],
  
    Starter: [
      { label: 'Prawn Cocktail - R180', value: 'Prawn Cocktail', fee: 180, description: 'A classic appetizer featuring prawns tossed in a tangy cocktail sauce, served on a bed of lettuce.' },
      { label: 'Tom Yum Soup - R250', value: 'Tom Yum Soup', fee: 250, description: 'A hot and sour Thai soup made with shrimp, lemongrass, lime juice, and chili peppers.' },
      { label: 'Bruschetta - R120', value: 'Bruschetta', fee: 120, description: 'Toasted bread topped with a mixture of fresh tomatoes, basil, garlic, and olive oil.' },
    ],
  
    Dessert: [
      { label: 'Tiramisu - R100', value: 'Tiramisu', fee: 100, description: 'A classic Italian dessert made with layers of coffee-soaked ladyfingers, mascarpone, and cocoa powder.' },
      { label: 'Chocolate Lava Cake - R150', value: 'Chocolate Lava Cake', fee: 150, description: 'A warm, rich chocolate cake with a gooey molten center, served with vanilla ice cream.' },
      { label: 'Cheesecake - R120', value: 'Cheesecake', fee: 120, description: 'Creamy cheesecake with a graham cracker crust, topped with fresh berries and a strawberry glaze.' },
    ],
  };
  
const HomePage = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('Starter');
  const [selectedDish, setSelectedDish] = useState(null); // New state for selected dish
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('starter');
  const [price, setPrice] = useState('');
  const [menu, setMenu] = useState([]);
  const [menuData, setMenuData] = useState(courseData);

  const selectDish = (dish) => {
    setSelectedDish(dish);
  };

  const addMenuItem = () => {
    if (!dishName || !description || !price) {
      Alert.alert('Error', 'Please enter all the boxes.');
      return;
    }
    
    const newItem = { dishName, description, course, price };
    setMenuData({
      ...menuData,
      [selectedCategory]: [...menuData[selectedCategory], newItem],
    });
    setMenu([...menu, newItem]);
    navigation.navigate('MenuScreen', { menu: [...menu, newItem] });

    // This clears the input fields after adding the item
    setDishName('');
    setDescription('');
    setPrice('');
  };

  // OpenAI,2024
  const displayDishes = () => {
    return menuData[selectedCategory].map((dish, index) => (
      <TouchableOpacity key={index} style={styles.menuItem} onPress={() => selectDish(dish)}>
        <Text>{dish.label}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.logo}>Food Kitchen App. Feeding you till you are satisfied</Text>
        </View>

        {/* Menu Label */}
        <View style={styles.menuLabel}>
          <Text style={styles.menuText}>Menu</Text>
          <Text style={styles.menuNumber}>{menuData[selectedCategory].length}</Text>
        </View>

        {/* Course Selection Buttons */}
        <View style={styles.courseButtons}>
          <Button title="Starters" onPress={() => setSelectedCategory('Starter')} />
          <Button title="Main Meal" onPress={() => setSelectedCategory('MainMeal')} />
          <Button title="Dessert" onPress={() => setSelectedCategory('Dessert')} />
        </View>

        

        {/* Display selected dish description */}
        {selectedDish && (
          <View style={styles.selectedDish}>
            <Text style={styles.dishTitle}>{selectedDish.label}</Text>
            <Text style={styles.dishDescription}>{selectedDish.description}</Text>
          </View>
        )}

        <View style={{ padding: 20 }}>
          <Text>Food Title:</Text>
          <TextInput
            placeholder="Enter Your Food Title"
            value={dishName}
            onChangeText={setDishName}
            style={{ borderWidth: 2, marginBottom: 20, padding: 10 }}
          />

          <Text>Overview:</Text>
          <TextInput
            placeholder="see the overview for your food"
            value={description}
            onChangeText={setDescription}
            style={{ borderWidth: 2, marginBottom: 20, padding: 10 }}
          />

          <Text>Cost:</Text>
          <TextInput
            placeholder="Please enter the cost for the food"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={{ borderWidth: 2, marginBottom: 20, padding: 10 }}
          />

          <Button title="Add to Menu" onPress={addMenuItem} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98FF98', // Light greyish-blue background for a modern look
  },
  scrollContainer: {
    paddingBottom: 30, // Slightly more padding for smooth scrolling
  },
  header: {
    backgroundColor: '#ff7043', // A brighter shade of orange for a vibrant feel
    padding: 20, // Increased padding for a more spacious header
    alignItems: 'center',
    borderBottomLeftRadius: 15, // Rounded corners for a modern touch
    borderBottomRightRadius: 15,
  },
  logo: {
    fontSize: 32, // Increased size for better visibility
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2, // Spacing for a sleek effect
  },
  menuLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Slightly softer color for the border
    backgroundColor: '#f9f9f9',
  },
  menuText: {
    fontSize: 22,
    fontWeight: '600', // Slightly lighter for a refined look
    color: '#FF0000', // Darker grey for better contrast
  },
  menuNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff7043', // Matched to the header color for consistency
  },
  courseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Evenly spaced for a balanced layout
    marginVertical: 15, // More vertical spacing
    paddingHorizontal: 30, // More horizontal padding
  },
  selectedDish: {
    backgroundColor: '#CD5C5C', // Clean white background
    padding: 22,
    marginHorizontal: 25,
    marginBottom: 12,
    borderRadius: 12, // More rounded for a modern touch
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000', // Added shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Elevation for Android
  },
  dishTitle: {
    fontSize: 39,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 12,
  },
  dishDescription: {
    fontSize: 17,
    color: '#555', // Slightly darker text for better readability
  },
  menuItem: {
    padding: 18,
    backgroundColor: '#fafafa', // Slightly off-white for a clean, subtle look
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginHorizontal: 25,
  },
  inputLabel: {
    fontSize: 17,
    marginBottom: 6,
    color: '#666', // Light grey for a softer input label
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8, // More rounded for modern styling
    marginBottom: 22,
    backgroundColor: '#fff', // White background for input fields
  },
  addToMenuButton: {
    backgroundColor: '#FFA500', // Orange color for the add button
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',


  },
  addButtonText: {
    color: '#FFA500',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default HomePage;
