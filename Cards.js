import * as React from 'react';
import { Text, View, StyleSheet, Button, FlashList,  } from 'react-native';
import Constants from 'expo-constants';
import decks from './flashcards';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
const Card = props => {
      if (props.flip === false) {
        return (
          <View>
            <Text style={styles.paragraph}> {props.cards.front} </Text>
            <Button onPress={props.onFlip} title="Flip" />
          </View>
        );
      } else {
        return (
          <View>
            <Text style={styles.paragraph}> {props.cards.back} </Text>
             <Button onPress={props.onRight} title="Right" />
             <Button onPress={props.onWrong} title="Wrong" />
             <Button onPress={props.onDelete} title="Delete this Card" />
             <Button onPress={props.onAdd} title="Add a Card to this deck" />
             <Button onPress={props.selected} title="Go Back to Decklist" />
          </View>
        );
      }
  
};

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flip: false, guessed: undefined, rightA: [], wrongA: [],
                  whichDeck: 1, whichCard: 0, cdeck: [],
                  selected: this.props.selected, goback: false};
  }

  flip = () => {
    this.setState({ flip: true });
  };

  add = (cardData) => {
    this.setState({ cdeck: this.state.cdeck.push(cardData) });
  }

  deleteCard = () => {
    this.setState({guessed: undefined}, ()=> {this.sort()});
  }

  right = () => {
    this.setState({guessed: true}, ()=> {this.sort()});
    
  };

  wrong = () => {
    this.setState({guessed: false }, ()=> {this.sort()});
    
  };

  sort = () => {
    console.log(this.state.guessed);
  
    if (this.state.guessed === true) {
      console.log("going into true");

      var valright = this.state.rightA.concat([decks[1].cards              [this.state.whichCard]]);
      this.setState({rightA: valright});

      //this.setState(prevState => ({
      //rightA: [decks[1].cards[this.state.whichCard], prevState.rightA]
      //}));
   
    } if (this.state.guessed === false) {
      console.log("going into false");
      var valwrong = this.state.wrongA.concat([decks[1].cards[this.state.whichCard]], );
      this.setState({wrongA: valwrong});



      //this.setState(prevState => ({
      //wrongA: [prevState.wrong, decks[1].cards[this.state.whichCard]]
      //}));
     // this.state.wrongA[this.state.wrongA.length] = decks[1].card[this.state.whichCard];
      
    }
    console.log("going into end of function");
    this.setState({whichCard: this.state.whichCard + 1}, () => {this.checker()});
    this.setState({flip: false});
    if (this.state.whichCard === decks[this.state.whichDeck].length) {
      this.finishSort();
    }
    
    //gives next card
  };

  checker = () => {
    console.log(this.state.rightA);
    console.log(this.state.wrongA);
  }


  finishSort = () => {
    console.log('finisher');
    var fullA = this.state.wrongA.concat(this.state.rightA);
    this.setState({cdeck: fullA});
    console.log('this the final deck: '+ this.state.cdeck);

    if (this.state.goback === true) {
      this.props.selected(this.state.selected);
      
    } else {
      this.setState({whichCard: 0});
      //set whichdeck? once i am communicating them properly?
    }

    //everything that needs to happen before we return to the decklist
  }

  goBack = () => {
    console.log('finisher');
    var fullA = this.state.wrongA.concat(this.state.rightA);
    this.setState({cdeck: fullA});
    console.log('this the final deck: '+ this.state.cdeck);
    this.setState({selected: false});
  }

  render() {
    var cdeck = decks[this.state.whichDeck];
    
    const oneCard = decks[1].cards[this.state.whichCard];
    const oneDeck = decks[1];

    return (
      <View>
        <Card
          flip={this.state.flip}
          guessed={this.state.guessed}
          cards={oneCard}
          onFlip={() => this.flip()}
          onRight={() => this.right()}
          onWrong={() => this.wrong()}
          onDelete={() => this.deleteCard()}
          selected={() => this.goBack()}
          onAdd={() => this.add({props.onSubmit})}
        />
      </View>
    );
  }
}

class CardAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state={front: '', back: '', showForm: true}
  }

  handleSubmit = () => {
	this.props.onSubmit({front: this.state.front, back: this.state.back});
  }
  changeFront = (front) => {
    this.setState({front: front});
  }
  changeBack = (back) => {
    this.setState({back: back});
  }


  render () {
      return (
        <View>
          <TextInput
            style={{height: 40}}
            onChangeText={(front) => this.changeFront(front)}
            value={this.state.front}
          />
          <TextInput
            style={{height: 40}}
            onChangeText={(back) => this.changeBack(back)}
            value={this.state.back}
          />
          <Button title="Add Card" onPress={this.handleSubmit} />
        </View>
      )
  }


const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
