import React from 'react';
import { BirthdayApp } from './components/BirthdayApp';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <AudioProvider>
      <BirthdayApp />
    </AudioProvider>
  );
}

export default App;