import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { equipos } from './equipos';
import MatchScreen from './MatchScreen';
import GameScreen from './GameScreen';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [p1Index, setP1Index] = useState(0);
  const [p2Index, setP2Index] = useState(1);

  const nextTeam = (setIndex) => {
    setIndex((prev) => (prev + 1) % equipos.length);
  };

  const prevTeam = (setIndex) => {
    setIndex((prev) => (prev - 1 + equipos.length) % equipos.length);
  };

  const handleContinue = () => {
    navigation.navigate('Match', {
      team1: equipos[p1Index],
      team2: equipos[p2Index]
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>VS MODE</Text>
      </View>

      <View style={styles.selectionArea}>
        {/* Player 1 Section */}
        <TeamCard
          playerName="JUGADOR 1"
          team={equipos[p1Index]}
          onNext={() => nextTeam(setP1Index)}
          onPrev={() => prevTeam(setP1Index)}
          accentColor="#e74c3c"
        />

        {/* Divider */}
        <View style={styles.divider} />

        {/* Player 2 Section */}
        <TeamCard
          playerName="JUGADOR 2"
          team={equipos[p2Index]}
          onNext={() => nextTeam(setP2Index)}
          onPrev={() => prevTeam(setP2Index)}
          accentColor="#3498db"
        />
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>CONTINUAR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TeamCard = ({ playerName, team, onNext, onPrev, accentColor }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={[styles.playerHeader, { backgroundColor: accentColor }]}>
        <Text style={styles.playerTitle}>{playerName}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Image style={styles.logo} source={team.imagen} resizeMode="contain" />
        <Text style={styles.teamName}>{team.nombre}</Text>

        <Text style={styles.rosterTitle}>ROSTER '16</Text>
        <View style={styles.playerList}>
          {team.jugadores.map((player, index) => (
            <Text key={index} style={styles.playerText}>
              • {player}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={[styles.button, { borderColor: accentColor }]} onPress={onPrev}>
          <Text style={[styles.buttonText, { color: accentColor }]}>{"<"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { borderColor: accentColor }]} onPress={onNext}>
          <Text style={[styles.buttonText, { color: accentColor }]}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  headerTitle: {
    color: '#ecf0f1',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  selectionArea: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#34495e',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  // Divider
  divider: {
    width: 2,
    backgroundColor: '#7f8c8d',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  // Sub-components
  playerHeader: {
    padding: 10,
    alignItems: 'center',
  },
  playerTitle: {
    color: 'white',
    fontWeight: '900',
    fontSize: 18,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  teamName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    height: 50, // Fixed height for alignment
  },
  rosterTitle: {
    color: '#95a5a6',
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  playerList: {
    width: '100%',
  },
  playerText: {
    color: '#ecf0f1',
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'left',
    paddingLeft: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 50,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

