import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface ApplicationFormProps {
  onSubmit: () => void; // Callback when the form is submitted
  onClose: () => void; // Callback to close the form
  theme: any; // Pass the theme from the global context
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSubmit, onClose, theme }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    contactNumber: Yup.string().required('Contact number is required'),
    reason: Yup.string().required('Reason is required'),
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      {/* Back Button */}
      <Text onPress={onClose} style={[styles.backButtonText, { color: theme.dominant }]}>
        Cancel
      </Text>

      {/* Title */}
      <Text style={[styles.title, { color: theme.text }]}>Apply for Job</Text>

      <Formik
        initialValues={{ name: '', email: '', contactNumber: '', reason: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          Alert.alert('Success', 'Your application has been submitted successfully!', [
            { text: 'Okay', onPress: () => onSubmit() },
          ]);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            {/* Name Field */}
            <Text style={[styles.label, { color: theme.text }]}>Name</Text>
            <TextInput
              style={[
                styles.input,
                errors.name && touched.name ? styles.errorInput : null,
              ]}
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
            {errors.name && touched.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            {/* Email Field */}
            <Text style={[styles.label, { color: theme.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                errors.email && touched.email ? styles.errorInput : null,
              ]}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor="#999"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Contact Number Field */}
            <Text style={[styles.label, { color: theme.text }]}>Contact Number</Text>
            <TextInput
              style={[
                styles.input,
                errors.contactNumber && touched.contactNumber ? styles.errorInput : null,
              ]}
              value={values.contactNumber}
              onChangeText={handleChange('contactNumber')}
              onBlur={handleBlur('contactNumber')}
              keyboardType="phone-pad"
              placeholder="Enter your contact number"
              placeholderTextColor="#999"
            />
            {errors.contactNumber && touched.contactNumber && (
              <Text style={styles.errorText}>{errors.contactNumber}</Text>
            )}

            {/* Reason Field */}
            <Text style={[styles.label, { color: theme.text }]}>Why should we hire you?</Text>
            <TextInput
              style={[
                styles.input,
                styles.multilineInput,
                errors.reason && touched.reason ? styles.errorInput : null,
              ]}
              value={values.reason}
              onChangeText={handleChange('reason')}
              onBlur={handleBlur('reason')}
              placeholder="Tell us why you're the best candidate"
              multiline
              numberOfLines={4}
              placeholderTextColor="#999"
            />
            {errors.reason && touched.reason && (
              <Text style={styles.errorText}>{errors.reason}</Text>
            )}

            {/* Submit Button */}
            <Button title="Submit Application" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff', // Default to white if theme.dominant is not set
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // Default to white if theme.text is not set
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 16,
    color: '#fff', // Default to white if theme.text is not set
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#f5f5f5',
  },
  errorInput: {
    borderColor: 'red',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default ApplicationForm;