import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


const MenuScreen = ({ route, navigation }) => { // w3schools.com
  const { menu } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>The FoodKitchen Menu </Text>
      <Text>Total Menu Items: {menu.length}</Text>

      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, borderBottomWidth: 1, paddingBottom: 10 }}>
            <Text>Meal: {item.dishName}</Text>
            <Text>Overview: {item.description}</Text>
            <Text>Course: {item.course}</Text>
            <Text>Cost: R{item.price}</Text>
          </View>
        )}
      />
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    backgroundColor: '#808000', 
  },
  title: {
    fontSize: 42, // Slightly larger for a more impactful title
    fontStyle: 'italic', // Italicized, not 'Italic' (corrected typo)
    fontWeight: '600', // Softer weight for a refined, elegant style
    marginBottom: 25,
    textAlign: 'center',
    color: '#3e2723', // Dark brown for a luxurious feel
    letterSpacing: 1, // Slight spacing for a more premium appearance
  },
  menuInfo: {
    fontSize: 18, // Slightly larger for readability
    marginBottom: 15,
    textAlign: 'center',
    color: '#7e7e7e', // Softer grey to create a subtle and classy look
    fontStyle: 'italic', // Added for an elegant touch
  },
  menuItem: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc', // Light, subtle borders
    paddingBottom: 15,
    backgroundColor: '#fff', // Clean white for the menu item background
    borderRadius: 10, // Rounded corners for a polished feel
    shadowColor: '#000', // Soft shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Elevation for Android
  },
  menuItemText: {
    fontSize: 18, // Slightly larger for emphasis
    color: '#333', // Dark grey for a classic look
    marginBottom: 8,
    fontWeight: '500', // Medium weight for readability and style
  },
  backButton: {
    backgroundColor: '#8b4513', // Rich brown color for a luxurious touch
    padding: 15,
    borderRadius: 30, // More rounded button for a premium feel
    marginTop: 25,
    alignItems: 'center',
    shadowColor: '#000', // Soft shadow for a lifted effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Elevation for Android
    
    addToMenuButton: {
      backgroundColor: '#FFA500', // Orange color for the add button
      padding: 15,
      borderRadius: 5,
      marginTop: 20,
      alignItems: 'center',
    },
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, // Larger text for a more impactful button
    fontWeight: 'bold', // Bold for emphasis
    letterSpacing: 1, // Spaced out letters for a refined look
  },

  
});

export default MenuScreen;
