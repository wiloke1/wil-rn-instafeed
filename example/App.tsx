import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import InstaFeed from 'wil-rn-instafeed';

export default function App() {

  return (
    <ScrollView style={styles.container}>
      <InstaFeed username="jakeelko" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
