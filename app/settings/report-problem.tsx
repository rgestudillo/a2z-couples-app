import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ReportProblemScreen() {
    const [problemDescription, setProblemDescription] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('General');

    const handleSubmit = () => {
        if (!problemDescription.trim()) {
            Alert.alert('Error', 'Please describe the problem');
            return;
        }

        // This would normally send the data to a server
        Alert.alert(
            'Thank You',
            'Your problem report has been submitted. We\'ll look into it as soon as possible.',
            [{ text: 'OK', onPress: () => router.back() }]
        );
    };

    const categories = ['General', 'Account', 'Performance', 'Feature', 'Other'];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Report a Problem</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Help us understand the issue</Text>
                <Text style={styles.description}>
                    Please provide details about the problem you're experiencing. The more information you provide, the better we can help.
                </Text>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Problem Category</Text>
                    <View style={styles.categoryContainer}>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryButton,
                                    category === cat && styles.categoryButtonActive
                                ]}
                                onPress={() => setCategory(cat)}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        category === cat && styles.categoryTextActive
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Describe the Problem</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="What happened? What did you expect to happen?"
                        multiline
                        numberOfLines={6}
                        value={problemDescription}
                        onChangeText={setProblemDescription}
                        textAlignVertical="top"
                    />
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
                        We'll only use this to follow up on your report
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Submit Report</Text>
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
        minHeight: 120,
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
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
        marginBottom: 8,
    },
    categoryButtonActive: {
        backgroundColor: '#5E72E4',
    },
    categoryText: {
        fontSize: 14,
        color: '#555',
    },
    categoryTextActive: {
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