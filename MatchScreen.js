import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function MatchScreen({ route, navigation }) {
    const { team1, team2 } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                {/* Team 1 */}
                <View style={styles.teamContainer}>
                    <Image source={team1.imagen} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.teamName}>{team1.nombre}</Text>
                    <Text style={styles.rosterTitle}>ROSTER</Text>
                    <View style={styles.playerList}>
                        {team1.jugadores.map((player, index) => (
                            <Text key={index} style={styles.playerText}>
                                {player}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* VS Separator */}
                <View style={styles.vsContainer}>
                    <Image source={require('./assets/VS.png')} style={styles.vsImage} resizeMode="contain" />
                </View>

                {/* Team 2 */}
                <View style={styles.teamContainer}>
                    <Image source={team2.imagen} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.teamName}>{team2.nombre}</Text>
                    <Text style={styles.rosterTitle}>ROSTER</Text>
                    <View style={styles.playerList}>
                        {team2.jugadores.map((player, index) => (
                            <Text key={index} style={styles.playerText}>
                                {player}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>VOLVER</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        paddingTop: 20,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    teamContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    teamName: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        height: 60, // Fixed height for alignment
    },
    rosterTitle: {
        color: '#95a5a6',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    playerList: {
        alignItems: 'center',
    },
    playerText: {
        color: '#bdc3c7',
        fontSize: 16,
        marginBottom: 4,
        textAlign: 'center',
    },
    vsContainer: {
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vsImage: {
        width: 120,
        height: 120,
    },
    backButton: {
        backgroundColor: '#e74c3c',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 50,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
