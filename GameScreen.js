import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default function GameScreen({ route, navigation }) {
    const { team1, team2 } = route.params;
    
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    
    const addPoints = (team, points) => {
        if (team === 1) {
            setScore1(prev => prev + points);
        } else {
            setScore2(prev => prev + points);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.scoreBoard}>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreLabel}>{team1.nombre}</Text>
                        <Text style={styles.score}>{score1}</Text>
                    </View>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreLabel}>{team2.nombre}</Text>
                        <Text style={styles.score}>{score2}</Text>
                    </View>
                </View>

                <View style={styles.teamsContainer}>
                    <View style={styles.teamSection}>
                        <Image source={team1.imagen} style={styles.logo} resizeMode="contain" />
                        <Text style={styles.teamName}>{team1.nombre}</Text>
                        {team1.jugadores.map((player, index) => (
                            <View key={index} style={styles.playerRow}>
                                <Text style={styles.playerName}>{player}</Text>
                                <View style={styles.buttonGroup}>
                                    <TouchableOpacity style={styles.pointButton} onPress={() => addPoints(1, 2)}>
                                        <Text style={styles.buttonText}>+2</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.pointButton} onPress={() => addPoints(1, 3)}>
                                        <Text style={styles.buttonText}>+3</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.teamSection}>
                        <Image source={team2.imagen} style={styles.logo} resizeMode="contain" />
                        <Text style={styles.teamName}>{team2.nombre}</Text>
                        {team2.jugadores.map((player, index) => (
                            <View key={index} style={styles.playerRow}>
                                <View style={styles.buttonGroup}>
                                    <TouchableOpacity style={styles.pointButton} onPress={() => addPoints(2, 2)}>
                                        <Text style={styles.buttonText}>+2</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.pointButton} onPress={() => addPoints(2, 3)}>
                                        <Text style={styles.buttonText}>+3</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.playerName}>{player}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.finishButton}>
                    <Text style={styles.finishButtonText}>FIN</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    scrollContent: {
        padding: 20,
    },
    scoreBoard: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    scoreContainer: {
        alignItems: 'center',
    },
    scoreLabel: {
        color: '#ecf0f1',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    score: {
        color: '#e74c3c',
        fontSize: 48,
        fontWeight: 'bold',
    },
    teamsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    teamSection: {
        width: '48%',
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 10,
    },
    teamName: {
        color: '#ecf0f1',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    playerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#34495e',
        padding: 10,
        borderRadius: 5,
    },
    playerName: {
        color: '#ecf0f1',
        fontSize: 12,
        flex: 1,
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    pointButton: {
        backgroundColor: '#27ae60',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3,
        marginLeft: 3,
        minWidth: 40,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    finishButton: {
        backgroundColor: '#e74c3c',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    finishButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
