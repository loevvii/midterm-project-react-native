import React from 'react';
import { useGlobalContext } from '../context/globalContext';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Linking } from 'react-native';

const JobList = () => {
  const { jobs, loading } = useGlobalContext();

  if (loading) {
    return <ActivityIndicator size="large" color="#3971ef" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {jobs.length > 0 ? (
        jobs.map(job => (
          <View key={job.id} style={styles.jobCard}>
            <Text style={styles.title}>{job.title}</Text>
            <Text><Text style={styles.bold}>Company:</Text> {job.companyName}</Text>
            <Text><Text style={styles.bold}>Location:</Text> {job.locations.join(', ')}</Text>
            <Text><Text style={styles.bold}>Salary:</Text> ${job.minSalary} - ${job.maxSalary}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(job.applicationLink)} style={styles.button}>
              <Text style={styles.buttonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noJobs}>No jobs available</Text>
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
});

export default JobList;
