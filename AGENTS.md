# AGENTS.md

This document provides guidelines for agentic coding agents working on this React Native (Expo) basketball team comparison app.

## Build/Lint/Test Commands

This project uses Expo for React Native development.

### Development Server
- `npm start` or `expo start` - Start the Expo development server
- `npm run android` - Start app on Android emulator/device
- `npm run ios` - Start app on iOS simulator (macOS only)
- `npm run web` - Start app in web browser

### Running a Single Test
This project does not currently have a test suite. To add tests:
1. Install Jest: `npm install --save-dev jest @testing-library/react-native`
2. Add test script: `"test": "jest"`
3. Create `__tests__` directories with `.test.js` files

## Code Style Guidelines

### File Organization
- Main entry: `index.js`
- Main app component: `App.js`
- Screens in root directory: `MatchScreen.js`
- Data files in root: `equipos.js`
- Static assets in `assets/` folder
- Use PascalCase for component files (e.g., `MatchScreen.js`)
- Use camelCase for utility/data files (e.g., `equipos.js`)

### Imports
```javascript
// React and React Native core
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// Expo and Navigation
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Local imports
import MatchScreen from './MatchScreen';
import { equipos } from './equipos';
```

- Group imports by: React → React Native → Third-party → Local
- Use named exports for data: `export const equipos = [...]`
- Use default exports for components

### Component Structure
```javascript
// 1. Imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 2. Component definition (functional component)
export default function MatchScreen({ route, navigation }) {
    // 3. State hooks
    const [state, setState] = useState(initialValue);

    // 4. Effects
    useEffect(() => {
        // side effects
    }, []);

    // 5. Helper functions
    const handleAction = () => {
        // implementation
    };

    // 6. Render
    return (
        <View>
            <Text>Content</Text>
        </View>
    );
}

// 7. Styles at bottom
const styles = StyleSheet.create({
    // styles here
});
```

### Naming Conventions
- **Components**: PascalCase (e.g., `HomeScreen`, `TeamCard`)
- **Functions**: camelCase (e.g., `nextTeam`, `handleContinue`)
- **Variables**: camelCase (e.g., `p1Index`, `team1`)
- **Constants**: camelCase for data arrays (e.g., `equipos`)
- **Props**: camelCase (e.g., `playerName`, `accentColor`)
- **Styles**: camelCase (e.g., `container`, `continueButton`)

### Types
This is a plain JavaScript project (no TypeScript). Use JSDoc comments for complex objects:
```javascript
/**
 * @typedef {Object} Team
 * @property {number} id
 * @property {string} nombre
 * @property {require} imagen
 * @property {string[]} jugadores
 */
```

### Styling (StyleSheet)
```javascript
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    },
    // Group related styles together
    // Use consistent color palette (see below)
});
```

### Color Palette
This project uses a consistent color scheme:
- Background: `#2c3e50` (dark blue-gray)
- Card: `#34495e` (lighter blue-gray)
- Accents: `#e74c3c` (red), `#3498db` (blue), `#27ae60` (green)
- Text: `#ecf0f1` (off-white), `#bdc3c7` (gray), `#95a5a6` (light gray)

### Error Handling
- Validate route params: `const { team1, team2 } = route.params;`
- Handle undefined with default values where needed
- Use try/catch for async operations (not present but add when needed)

### React Hooks
- Use `useState` for local state
- Use `useEffect` for side effects
- Always include dependencies array in `useEffect`
- Use functional state updates: `setIndex((prev) => (prev + 1) % length)`

### Navigation
- Use React Navigation Stack: `createStackNavigator()`
- Screen options: `<Stack.Navigator screenOptions={{ headerShown: false }}>`
- Navigate with params: `navigation.navigate('Match', { team1, team2 })`
- Access params: `const { team1, team2 } = route.params;`

### Keys in Lists
**Important**: Currently uses array index for keys - refactor to use unique IDs:
```javascript
// Current (avoid):
{team.jugadores.map((player, index) => ( <Text key={index}>...))}

// Preferred:
{team.jugadores.map((player, id) => ( <Text key={player.id}>...))}
// Or use the player name as key if unique
```

### Platform-Specific Code
```javascript
import { Platform, StatusBar as RNStatusBar } from 'react-native';

// Android status bar height
paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0
```

### String Literals
- This project uses Spanish text in UI (e.g., "JUGADOR 1", "CONTINUAR", "VOLVER")
- Keep UI text in Spanish for consistency
- Use English for code, comments, and variable names

### Best Practices
- Keep components focused and single-purpose
- Extract repeated UI into reusable components (like `TeamCard` in App.js)
- Use SafeAreaView for notch/device edge protection
- Use `resizeMode="contain"` for images
- Maintain 2-space indentation
- No unnecessary comments (follow existing code style)
