import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class gameScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            gameState: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            currentPlayer: 1,
            winner: 0,
            count: 0
        }
    }
    renderIcon = (row, col)=>{
        var value = this.state.gameState[row][col];
        switch(value){
            case 1:
                return(<Icon name = "close" size={60}/>);
            case -1:
                return(<Icon name = "panorama-fish-eye" size={60}/>);
        }
    }
    renderReset = () =>{
        if(this.state.winner != 0)
            return (
                <View>
                    <Text style={{fontSize: 24}}>Winner is {(this.state.winner == 1)? "Cross":"Circle"}</Text>
                    <TouchableOpacity style={styles.reset} onPress={()=>{this.resetPress()}}> 
                        <Text style={{fontSize: 24}}>Reset</Text>
                    </TouchableOpacity>
                </View>
            );
        if(this.state.count == 9)
            return(
                <View>
                    <Text style={[{fontSize: 24},{alignSelf: 'center'}]}>It's a Draw!</Text>
                    <TouchableOpacity style={styles.reset} onPress={()=>{this.resetPress()}}> 
                        <Text style={{fontSize: 24}}>Reset</Text>
                    </TouchableOpacity>
                </View> 
            );
    }
    resetPress(){
       this.setState({
            gameState: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            currentPlayer: 1,
            winner: 0,
            count: 0
        })
    }
    _handlePress(row,col){
        if(this.state.gameState[row][col] != 0 || this.state.winner != 0)
            return;
        var arr = this.state.gameState.slice();
        var currentPlayer = this.state.currentPlayer;
        arr[row][col] = currentPlayer;
        var nextPlayer = (currentPlayer == 1)? -1: 1; 
        var winner = this.checkWinner();
        var count = this.state.count + 1;
        this.setState({
            gameState: arr,
            currentPlayer: nextPlayer,
            winner: winner,
            count: count
        })
        if(winner != 0)
            this.renderReset();
    }
    checkWinner(){
        var sum,sum,l_diag,r_diag;
        var arr = this.state.gameState.slice();
        l_diag = arr[0][0]+arr[1][1]+arr[2][2];
        r_diag = arr[0][2]+arr[1][1]+arr[2][0];
        if(l_diag == 3 || r_diag == 3)
            return 1;
        else if(l_diag == -3 || r_diag == -3)
            return 0;
        for(var i=0; i<3; i++){
            sum = arr[i][0]+arr[i][1]+arr[i][2];
            if(sum == 3)
                return 1;
            else if(sum == -3)
                return -1;
        }
        for(var i=0; i<3; i++){
            sum = arr[0][i]+arr[1][i]+arr[2][i];
            if(sum == 3)
                return 1;
            else if(sum == -3)
                return -1;
        }
        return 0;
    }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainbox}>
          <View style={styles.row}>
            <View style={styles.smallbox}>
              <TouchableOpacity style={[styles.buttonfill,{borderRightWidth: 3},{borderBottomWidth: 3}]} 
                onPress={()=>{this._handlePress(0,0);}}>
                {this.renderIcon(0,0)}
              </TouchableOpacity>
            </View>
            <View style={styles.smallbox}>
              <TouchableOpacity style={[styles.buttonfill,{borderLeftWidth: 3},{borderBottomWidth: 3},{borderRightWidth: 3}]} 
                onPress={()=>{this._handlePress(0,1);}}>
                {this.renderIcon(0,1)}
              </TouchableOpacity>
            </View>
            <View style={styles.smallbox}>
              <TouchableOpacity style={[styles.buttonfill,{borderLeftWidth: 3},{borderBottomWidth: 3}]} 
                onPress={()=>{this._handlePress(0,2);}}>
                {this.renderIcon(0,2)}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.smallbox}>
              <TouchableOpacity style={[styles.buttonfill,{borderTopWidth: 3},{borderBottomWidth: 3},{borderRightWidth: 3}]} 
                onPress={()=>{this._handlePress(1,0);}}>
                {this.renderIcon(1,0)}
              </TouchableOpacity>
            </View>
            <View style={styles.smallbox}>
              <TouchableOpacity style={[styles.buttonfill,{borderLeftWidth: 3},{borderBottomWidth: 3},{borderTopWidth: 3},{borderRightWidth: 3}]} 
                onPress={()=>{this._handlePress(1,1);}}>
                {this.renderIcon(1,1)}
              </TouchableOpacity>
            </View>
            <View style={styles.smallbox}>
              <TouchableOpacity style={[styles.buttonfill,{borderTopWidth: 3},{borderBottomWidth: 3},{borderLeftWidth: 3}]}
                onPress={()=>{this._handlePress(1,2);}}>
                {this.renderIcon(1,2)}
              </TouchableOpacity> 
            </View>
          </View>
          <View style={styles.row}> 
            <View style={styles.smallbox}>
              <TouchableOpacity style={[styles.buttonfill,{borderTopWidth: 3},{borderRightWidth: 3}]} 
                onPress={()=>{this._handlePress(2,0);}}>
                {this.renderIcon(2,0)}
              </TouchableOpacity> 
            </View>
            <View style={styles.smallbox}>
              <TouchableOpacity style={[styles.buttonfill,{borderLeftWidth: 3},{borderRightWidth: 3},{borderTopWidth: 3}]}
                onPress={()=>{this._handlePress(2,1);}}>
                {this.renderIcon(2,1)}
              </TouchableOpacity>
            </View>
            <View style={styles.smallbox}>
              <TouchableOpacity style={[styles.buttonfill,{borderLeftWidth: 3},{borderTopWidth: 3}]} 
                onPress={()=>{this._handlePress(2,2);}}>
                {this.renderIcon(2,2)}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.resetContainer}>
            {this.renderReset()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  mainbox:{
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  resetContainer:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reset:{
    marginVertical: 20,
    backgroundColor: 'pink',
    height: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  row:{
    flexDirection: 'row',
  },
  smallbox:{
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonfill:{
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'orange',
      justifyContent: 'center',
      alignSelf: 'stretch'
  }
});
