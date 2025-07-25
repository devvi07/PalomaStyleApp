import './gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Navigation } from './src/presentation/navigation/Navigation';

const App = () => {
  return (
      <PaperProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
  );
}

export default App;