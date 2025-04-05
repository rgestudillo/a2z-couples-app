import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function RequestFeatureScreen() {
    const [featureDescription, setFeatureDescription] = useState('');
    const [useCase, setUseCase] = useState('');
    const [email, setEmail] = useState('');
    const [priority, setPriority] = useState('Medium');

    const handleSubmit = () => {
        if (!featureDescription.trim()) {
            Alert.alert('Error', 'Please describe the feature you\'d like to see');
            return;
        }

        // This would normally send the data to a server
        Alert.alert(
            'Thank You',
            'Your feature request has been submitted. We appreciate your input!',
            [{ text: 'OK', onPress: () => router.back() }]
        );
    };

    const priorities = ['Low', 'Medium', 'High'];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Request a Feature</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Help us improve the app</Text>
                <Text style={styles.description}>
                    We love hearing your ideas! Please describe the feature you'd like to see and how it would improve your experience.
                </Text>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Feature Description</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Describe the feature you'd like to see..."
                        multiline
                        numberOfLines={6}
                        value={featureDescription}
                        onChangeText={setFeatureDescription}
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Use Case</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="How would you use this feature? What problem would it solve for you?"
                        multiline
                        numberOfLines={4}
                        value={useCase}
                        onChangeText={setUseCase}
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>How important is this to you?</Text>
                    <View style={styles.priorityContainer}>
                        {priorities.map((pri) => (
                            <TouchableOpacity
                                key={pri}
                                style={[
                                    styles.priorityButton,
                                    priority === pri && styles.priorityButtonActive,
                                    pri === 'Low' && styles.lowPriority,
                                    pri === 'Medium' && styles.mediumPriority,
                                    pri === 'High' && styles.highPriority,
                                ]}
                                onPress={() => setPriority(pri)}
                            >
                                <Text
                                    style={[
                                        styles.priorityText,
                                        priority === pri && styles.priorityTextActive
                                    ]}
                                >
                                    {pri}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Your Email (optional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="email@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Text style={styles.helperText}>
                        We'll notify you if we implement your suggestion
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Submit Request</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginLeft: 10,
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        lineHeight: 20,
    },
    formSection: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#444',
        marginBottom: 8,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
        color: '#333',
        minHeight: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
        color: '#333',
    },
    helperText: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    priorityButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    priorityButtonActive: {
        backgroundColor: '#007AFF',
    },
    lowPriority: {
        backgroundColor: '#E9F7EF',
    },
    mediumPriority: {
        backgroundColor: '#FFF4E5',
    },
    highPriority: {
        backgroundColor: '#FFECEB',
    },
    priorityText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#555',
    },
    priorityTextActive: {
        color: '#fff',
    },
    submitButton: {
        backgroundColor: '#5E72E4',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 