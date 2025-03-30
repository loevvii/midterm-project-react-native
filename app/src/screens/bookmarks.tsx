import React from 'react';
import { useGlobalContext } from '../context/globalContext';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const BookmarkedJobs = () => {
  const { jobs, bookmarkedJobs, removeFromBookmarks } = useGlobalContext();

  // Filter jobs to show only bookmarked ones
  const bookmarkedJobList = jobs.filter(job => bookmarkedJobs.includes(job.id));

  // Function to handle removing a bookmark
  const handleRemoveBookmark = (jobId: string) => {
    Alert.alert(
      'Remove Bookmark',
      'Are you sure you want to remove this job from bookmarks?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => removeFromBookmarks(jobId),
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {bookmarkedJobList.length > 0 ? (
        bookmarkedJobList.map(job => (
          <View key={job.id} style={styles.jobCard}>
            {/* Job Title */}
            <Text style={styles.title}>{job.title}</Text>

            {/* Company Name */}
            <Text>
              <Text style={styles.bold}>Company:</Text> {job.companyName}
            </Text>

            {/* Location */}
            <Text>
              <Text style={styles.bold}>Location:</Text> {job.locations.join(', ')}
            </Text>

            {/* Salary */}
            <Text>
              <Text style={styles.bold}>Salary:</Text> ${job.minSalary} - ${job.maxSalary}
            </Text>

            {/* Apply Now Button */}
            <TouchableOpacity onPress={() => console.log('Apply to:', job.applicationLink)} style={styles.button}>
              <Text style={styles.buttonText}>Apply Now</Text>
            </TouchableOpacity>

            {/* Remove Bookmark Button */}
            <TouchableOpacity
              onPress={() => handleRemoveBookmark(job.id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove Bookmark</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noJobs}>No bookmarked jobs available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  jobCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#3971ef',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noJobs: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4d', // Red background for removal
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BookmarkedJobs;