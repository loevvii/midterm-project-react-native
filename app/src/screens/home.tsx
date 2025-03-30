import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import JobList from '../screens/joblist'; // Import the JobList component
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGlobalContext } from '../context/globalContext'; // Import the global context

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // Access navigation object
  const { isDarkMode, toggleDarkMode } = useGlobalContext(); // Access theme state and toggle function

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Search Bar */}
      <View style={[styles.searchContainer, isDarkMode && styles.darkSearchContainer]}>
        <Ionicons name="search" size={20} color={isDarkMode ? '#aaa' : '#333'} style={styles.searchIcon} />
        <TextInput
          placeholder="Search for jobs"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.searchInput, isDarkMode && styles.darkSearchInput]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#999'}
        />
        {searchQuery.length > 0 && (
          <Pressable
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={18} color={isDarkMode ? '#aaa' : '#999'} />
          </Pressable>
        )}
      </View>

      {/* Job List */}
      <JobList searchQuery={searchQuery} />

      {/* Floating Action Button (FAB) */}
      <Pressable
        onPress={() => navigation.navigate('BookmarkedJobs')}
        style={styles.fab}
      >
        <Ionicons name="bookmark" size={24} color="#fff" /> {/* Bookmark icon */}
      </Pressable>

      {/* Theme Toggle Button */}
      <Pressable
        onPress={toggleDarkMode} // Toggle between light and dark mode
        style={styles.themeToggleButton}
      >
        <Ionicons
          name={isDarkMode ? 'sunny' : 'moon'} // Sun for light mode, moon for dark mode
          size={24}
          color={isDarkMode ? '#f5f5f5' : '#333'} // Adjust icon color based on theme
        />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Light mode background
  },
  darkContainer: {
    backgroundColor: '#121212', // Dark mode background
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Light mode search bar background
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 10,
    height: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkSearchContainer: {
    backgroundColor: '#1c1c1c', // Dark mode search bar background
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    color: '#333', // Light mode text color
  },
  darkSearchInput: {
    color: '#f5f5f5', // Dark mode text color
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  themeToggleButton: {
    position: 'absolute',
    top: 40, // Positioned near the top-right corner
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20, // Circular shape
    backgroundColor: '#e0e0e0', // Light gray background
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Home;