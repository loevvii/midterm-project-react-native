import React, { useState } from 'react';
import { useGlobalContext } from '../context/globalContext';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ApplicationForm from '../screens/applicationform';

const JobList = () => {
  const { jobs, loading, bookmarkedJobs, addToBookmarks, removeFromBookmarks, theme } = useGlobalContext();

  const [showForm, setShowForm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  if (loading) {
    return <ActivityIndicator size="large" color={theme.dominant} />;
  }

  const handleSubmit = () => {
    Alert.alert('Success', 'Your application has been submitted successfully!', [
      { text: 'Okay', onPress: () => setShowForm(false) },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <View key={job.id} style={[styles.jobCard, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.title, { color: theme.text }]}>{job.title}</Text>
              <Text style={[styles.detail, { color: theme.text }]}>
                <Text style={[styles.bold, { color: theme.text }]}>Company:</Text> {job.companyName}
              </Text>
              <Text style={[styles.detail, { color: theme.text }]}>
                <Text style={[styles.bold, { color: theme.text }]}>Location:</Text> {job.locations.join(', ')}
              </Text>
              <Text style={[styles.detail, { color: theme.text }]}>
                <Text style={[styles.bold, { color: theme.text }]}>Salary:</Text> ${job.minSalary} - ${job.maxSalary}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedJobId(job.id);
                  setShowForm(true);
                }}
                style={[styles.applyButton, { backgroundColor: theme.dominant }]}
              >
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
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
                  color={bookmarkedJobs.includes(job.id) ? '#FFD700' : theme.text}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={[styles.noJobs, { color: theme.text }]}>No jobs available</Text>
        )}
      </ScrollView>

      {showForm && (
        <View style={styles.formContainer}>
          <View style={styles.formContent}>
            <ApplicationForm
              jobId={selectedJobId || ''}
              theme={theme}
              onSubmit={handleSubmit}
              onClose={() => setShowForm(false)}
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
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
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
    borderRadius: 8,
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
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  formContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    zIndex: 1,
  },
});

export default JobList;