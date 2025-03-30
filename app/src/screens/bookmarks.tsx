import React, { useState } from 'react';
import { useGlobalContext } from '../context/globalContext';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import ApplicationForm from './applicationform'; // Import the ApplicationForm component

const BookmarkedJobs = () => {
  const { jobs, bookmarkedJobs, removeFromBookmarks, theme } = useGlobalContext();

  // Filter jobs to show only bookmarked ones
  const bookmarkedJobList = jobs.filter(job => bookmarkedJobs.includes(job.id));

  // State for managing the application form
  const [showForm, setShowForm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

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

  // Handle form submission
  const handleSubmit = () => {
    Alert.alert('Success', 'Your application has been submitted successfully!', [
      { text: 'Okay', onPress: () => setShowForm(false) }, // Close the form
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Scrollable Content */}
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
              <TouchableOpacity
                onPress={() => {
                  setSelectedJobId(job.id); // Set the selected job ID
                  setShowForm(true); // Open the form
                }}
                style={styles.button}
              >
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

      {/* Application Form Overlay */}
      {showForm && (
        <View style={styles.formContainer}>
          <View style={styles.formContent}>
            <ApplicationForm
              jobId={selectedJobId || ''} // Pass the selected job ID
              theme={theme} // Pass the theme
              onSubmit={handleSubmit} // Handle form submission
              onClose={() => setShowForm(false)} // Close the form
            />
          </View>
        </View>
      )}
    </View>
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
  formContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400, // Limit the maximum width for better usability
    zIndex: 1, // Ensure the form is above other elements
  },
});

export default BookmarkedJobs;