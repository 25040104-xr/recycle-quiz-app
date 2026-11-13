import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
    const [answers, setAnswers] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '' });

    const bins = [
        { label: 'Select a bin...', value: '' },
        { label: 'Blue Recycling Bin', value: 'Blue' },
        { label: 'General Waste Bin', value: 'General' },
        { label: 'E-waste Bin', value: 'Ewaste' },
    ];

    const questions = [
        {
            id: 1,
            title: 'Empty plastic water bottle',
            image: require('./img/bottle.jpg'),
            hint: 'Make sure it is empty before recycling!',
            correct: 'Blue',
        },
        {
            id: 2,
            title: 'Flattened cardboard box',
            image: require('./img/cardboard.jpg'),
            hint: 'Flatten it to save space in the recycling bin.',
            correct: 'Blue',
        },
        {
            id: 3,
            title: 'Takeaway box with leftover food',
            image: require('./img/takeaway.webp'),
            hint: 'Food-contaminated packaging cannot go into recycling.',
            correct: 'General',
        },
        {
            id: 4,
            title: 'Old mobile phone',
            image: require('./img/phone.jpg'),
            hint: 'Electronic devices need special disposal.',
            correct: 'Ewaste',
        },
        {
            id: 5,
            title: 'Rinsed drink can',
            image: require('./img/can.jpg'),
            hint: 'Clean cans can be recycled!',
            correct: 'Blue',
        },
    ];

    const answeredCount = Object.values(answers).filter(answer => answer !== '').length;

    function updateAnswer(id, value) {
        setAnswers(previous => ({ ...previous, [id]: value }));
    }

    function checkAnswers() {
        if (answeredCount !== 5) {
            Alert.alert('Almost there! 🌱', 'Please answer all 5 questions before checking your results.');
            return;
        }

        let score = 0;
        questions.forEach(question => {
            if (answers[question.id] === question.correct) {
                score++;
            }
        });

        let message = '';
        if (score === 5) {
            message = 'Amazing! You are a Recycling Pro! 🌍';
        } else if (score >= 3) {
            message = 'Good effort! Keep learning how to recycle correctly.';
        } else {
            message = 'Keep practising! Small actions make a big difference.';
        }

        Alert.alert(`🌿 ${score} / 5 Correct!`, message, [
            { text: 'Try Again', onPress: resetQuiz },
            { text: 'Done', style: 'cancel' },
        ]);
    }

    function resetQuiz() {
        setAnswers({ 1: '', 2: '', 3: '', 4: '', 5: '' });
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#174C3C" barStyle="light-content" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* HEADER */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <View style={styles.logoCircle}>
                            <Text style={styles.logo}>♻</Text>
                        </View>
                        <Text style={styles.headerLabel}>ECOLOOP • GO GREEN</Text>
                    </View>

                    <Text style={styles.headerTitle}>
                        RECYCLE{'\n'}<Text style={styles.titleHighlight}>RIGHT.</Text>
                    </Text>
                    <Text style={styles.headerDescription}>
                        Small choices. Big impact.{'\n'}Let's make our planet a better place!
                    </Text>

                    <View style={styles.headerBottom}>
                        <Text style={styles.headerTag}>🌎 5 QUESTIONS</Text>
                        <Text style={styles.headerTag}>🌱 SAVE OUR PLANET</Text>
                    </View>

                    <View style={styles.decorCircle1} />
                    <View style={styles.decorCircle2} />
                </View>

                {/* SECTION TITLE */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>Sort It Out!</Text>
                        <Text style={styles.sectionSubtitle}>Choose the correct bin for each item.</Text>
                    </View>
                    <Text style={styles.sectionEmoji}>🗑️</Text>
                </View>

                {/* QUESTION CARDS */}
                {questions.map(question => (
                    <View key={question.id} style={styles.card}>
                        <View style={styles.cardTop}>
                            <View style={styles.questionNumber}>
                                <Text style={styles.numberText}>{String(question.id).padStart(2, '0')}</Text>
                            </View>
                            <View style={styles.questionInfo}>
                                <Text style={styles.questionLabel}>QUESTION {question.id}</Text>
                                <Text style={styles.questionTitle}>{question.title}</Text>
                            </View>
                            <Text style={styles.checkIcon}>{answers[question.id] !== '' ? '✓' : '○'}</Text>
                        </View>

                        <View style={styles.imageFrame}>
                            <Image source={question.image} style={styles.image} resizeMode="contain" />
                        </View>

                        <View style={styles.hintContainer}>
                            <Text style={styles.hintIcon}>💡</Text>
                            <Text style={styles.hintText}>{question.hint}</Text>
                        </View>

                        <Text style={styles.selectLabel}>SELECT YOUR BIN</Text>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerIcon}>♻️</Text>
                            <Picker
                                selectedValue={answers[question.id]}
                                onValueChange={value => updateAnswer(question.id, value)}
                                style={styles.picker}
                                dropdownIconColor="#174C3C"
                            >
                                {bins.map(bin => (
                                    <Picker.Item key={bin.value} label={bin.label} value={bin.value} color="#244C3D" />
                                ))}
                            </Picker>
                        </View>
                    </View>
                ))}

                {/* BUTTONS */}
                <TouchableOpacity style={styles.button} onPress={checkAnswers} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>CHECK MY ANSWERS</Text>
                    <Text style={styles.buttonArrow}>→</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.resetButton} onPress={resetQuiz} activeOpacity={0.7}>
                    <Text style={styles.resetText}>↻  RESET QUIZ</Text>
                </TouchableOpacity>

                {/* FOOTER */}
                <View style={styles.footer}>
                    <Text style={styles.footerEmoji}>🌍 🌱 ♻️</Text>
                    <Text style={styles.footerTitle}>THERE IS NO PLANET B.</Text>
                    <Text style={styles.footerText}>
                        Every small action counts.{'\n'}Recycle today for a greener tomorrow.
                    </Text>
                    <Text style={styles.footerCredit}>ECOLOOP • MAKE EVERY CHOICE COUNT</Text>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5EC',
    },
    scrollContent: {
        paddingBottom: 20,
    },

    // HEADER
    header: {
        backgroundColor: '#174C3C',
        paddingHorizontal: 25,
        paddingTop: 30,
        paddingBottom: 35,
        overflow: 'hidden',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    logoCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#C5E86C',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    logo: {
        fontSize: 25,
        color: '#174C3C',
    },
    headerLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: '#C5E86C',
    },
    headerTitle: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFFFFF',
        lineHeight: 53,
        letterSpacing: 2,
    },
    titleHighlight: {
        color: '#C5E86C',
    },
    headerDescription: {
        fontSize: 15,
        lineHeight: 23,
        color: '#D7E9DB',
        marginTop: 15,
    },
    headerBottom: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 25,
    },
    headerTag: {
        color: '#174C3C',
        backgroundColor: '#C5E86C',
        fontSize: 10,
        fontWeight: 'bold',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 8,
        marginBottom: 5,
    },
    decorCircle1: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 25,
        borderColor: 'rgba(197,232,108,0.08)',
        right: -65,
        top: 70,
    },
    decorCircle2: {
        position: 'absolute',
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(255,255,255,0.04)',
        right: 25,
        bottom: -25,
    },

    // SECTION TITLE
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 22,
        marginTop: 25,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: '900',
        color: '#174C3C',
    },
    sectionSubtitle: {
        fontSize: 12,
        color: '#82968A',
        marginTop: 5,
    },
    sectionEmoji: {
        fontSize: 30,
    },

    // QUESTION CARDS
    card: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 18,
        padding: 14,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E5EBDD',
        elevation: 2,
        shadowColor: '#174C3C',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 13,
    },
    questionNumber: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: '#EAF2E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#39754F',
    },
    questionInfo: {
        flex: 1,
        paddingHorizontal: 12,
    },
    questionLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#8AA393',
        marginBottom: 4,
    },
    questionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#244C3D',
        lineHeight: 21,
    },
    checkIcon: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#65A66F',
        marginLeft: 5,
    },
    imageFrame: {
        height: 190,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5EBDD',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    hintContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F7ED',
        padding: 11,
        borderRadius: 10,
        marginTop: 13,
    },
    hintIcon: {
        fontSize: 17,
        marginRight: 8,
    },
    hintText: {
        flex: 1,
        fontSize: 11,
        color: '#557563',
        lineHeight: 17,
    },
    selectLabel: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.2,
        color: '#557563',
        marginTop: 17,
        marginBottom: 5,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F7F1',
        borderWidth: 1,
        borderColor: '#DCE7D7',
        borderRadius: 12,
        paddingLeft: 10,
        overflow: 'hidden',
    },
    pickerIcon: {
        fontSize: 19,
    },
    picker: {
        flex: 1,
        height: 52,
        color: '#244C3D',
    },

    // BUTTONS
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#174C3C',
        marginHorizontal: 20,
        marginTop: 10,
        paddingVertical: 18,
        borderRadius: 14,
        elevation: 4,
        shadowColor: '#174C3C',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
    buttonArrow: {
        color: '#C5E86C',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 12,
    },
    resetButton: {
        alignItems: 'center',
        paddingVertical: 18,
    },
    resetText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#64816E',
        letterSpacing: 1,
    },

    // FOOTER
    footer: {
        backgroundColor: '#E8EFE2',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    footerEmoji: {
        fontSize: 25,
        marginBottom: 12,
    },
    footerTitle: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1.5,
        color: '#174C3C',
    },
    footerText: {
        fontSize: 12,
        lineHeight: 20,
        color: '#64816E',
        textAlign: 'center',
        marginTop: 10,
    },
    footerCredit: {
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#8AA393',
        marginTop: 20,
    },
});