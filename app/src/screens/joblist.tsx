import React from 'react';
import { useGlobalContext } from '../context/globalContext';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For bookmark icon

// Define the props interface for JobList
interface JobListProps {
  searchQuery?: string; // Optional prop for search query
}

const JobList: React.FC<JobListProps> = ({ searchQuery }) => {
  const { jobs, loading, bookmarkedJobs, addToBookmarks, removeFromBookmarks, theme } = useGlobalContext();

  if (loading) {
    return <ActivityIndicator size="large" color={theme.dominant} />;
  }

  // Filter jobs based on searchQuery
  const filteredJobs = searchQuery
    ? jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : jobs;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      {filteredJobs.length > 0 ? (
        filteredJobs.map(job => (
          <View key={job.id} style={[styles.jobCard, { backgroundColor: theme.cardBackground }]}>
            {/* Job Title */}
            <Text style={[styles.title, { color: theme.text }]}>{job.title}</Text>

            {/* Company Name */}
            <Text style={[styles.detail, { color: theme.text }]}>
              <Text style={[styles.bold, { color: theme.text }]}>Company:</Text> {job.companyName}
            </Text>

            {/* Location */}
            <Text style={[styles.detail, { color: theme.text }]}>
              <Text style={[styles.bold, { color: theme.text }]}>Location:</Text> {job.locations.join(', ')}
            </Text>

            {/* Salary */}
            <Text style={[styles.detail, { color: theme.text }]}>
              <Text style={[styles.bold, { color: theme.text }]}>Salary:</Text> ${job.minSalary} - ${job.maxSalary}
            </Text>

            {/* Apply Now Button */}
            <TouchableOpacity
              onPress={() => Linking.openURL(job.applicationLink)}
              style={[styles.applyButton, { backgroundColor: theme.dominant }]}
            >
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>

            {/* Bookmark Button */}
            <TouchableOpacity
              onPress={() => {
                if (bookmarkedJobs.includes(job.id)) {
                  removeFromBookmarks(job.id);
                } else {
                  addToBookmarks(job.id);
                }
              }}
              style={styles.bookmarkButton}
            >
              <Ionicons
                name={bookmarkedJobs.includes(job.id) ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={bookmarkedJobs.includes(job.id) ? '#FFD700' : theme.text} // Yellow for bookmarked, gray for unbookmarked
              />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={[styles.noJobs, { color: theme.text }]}>No jobs available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  jobCard: {
    borderRadius: 10, // Rounded corners
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
    position: 'relative', // Ensure child elements are positioned relative to this container
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  applyButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8, // Rounded corners
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noJobs: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  bookmarkButton: {
    position: 'absolute', // Position the bookmark button in the top-right corner of the card
    top: 16,
    right: 16,
    padding: 4, // Small padding around the icon
  },
});

export default JobList;