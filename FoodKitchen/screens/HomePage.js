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
  const [selectedDish, setSelectedDish] = useState(null); // (OpenAI,2024)
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
    backgroundColor: '#f0f8ff', // Light, airy blue background for a refreshing look
  },
  scrollContainer: {
    paddingBottom: 30, // Sufficient padding for smoother scrolling
  },
  header: {
    backgroundColor: '#ff7043', // Vibrant orange for a warm and inviting feel
    padding: 25, // Increased padding for a spacious and modern header
    alignItems: 'center',
    borderBottomLeftRadius: 20, // Enhanced roundness for a stylish look
    borderBottomRightRadius: 20,
    elevation: 3, // Subtle shadow for a lifted effect
  },
  logo: {
    fontSize: 34, // Larger, more prominent logo font
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5, // Gentle letter spacing for sophistication
  },
  menuLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Softer border for a clean appearance
    backgroundColor: '#ffffff', // Bright white for contrast
  },
  menuText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333', // Dark gray for strong readability
  },
  menuNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff7043', // Matches header color for consistency
  },
  courseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  selectedDish: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dishTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff7043',
    marginBottom: 10,
  },
  dishDescription: {
    fontSize: 16,
    color: '#555', // Neutral tone for secondary text
  },
  menuItem: {
    padding: 18,
    backgroundColor: '#f9f9f9', // Subtle gray for differentiation
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666', // Muted gray for input labels
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  addToMenuButton: {
    backgroundColor: '#27ae60', // Vibrant green for call-to-action
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
});

export default HomePage;
