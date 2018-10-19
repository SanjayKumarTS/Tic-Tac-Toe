import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import GameScreen from './Screens/gameScreen'
export default class App extends Component {
  render() {
    return (
      <GameScreen/>
    );
  }
}

const styles = StyleSheet.create({
});
