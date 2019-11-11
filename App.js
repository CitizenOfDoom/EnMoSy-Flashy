import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList, TextInput } from 'react-native';
import Constants from 'expo-constants';
import decks from './flashcards';
import Cards from './Cards.js';

// You can import from local files
import AssetExample from './components/AssetExample';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state={selected: false}
  }

  callbackFunction = (childData) => {
    this.setState({selected: childData})
  }

  render () {
      if (this.props.selected === true) {
        return (
          <View>
            <Text> Here is a text </Text>
            <Cards selected={() => this.callbackFunction()}/>
          </View>
        )
      } else {
        return (
          <View>
            <Text> Here is a different text </Text>
            <Decklist selected={() => this.callbackFunction()}/>
          </View>
        )
      }
      
  }
}

//Decklist comp, if a deck is selected switches to card-view, otherwise doesn't
class Decklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false, decks: decks, showEdit: false};
  }
  
  renderItem = ({item}) => {
  

    return (
      <View>
        <Text>{""+ item.name}</Text>
        
        <Button onPress={() => this.onEditName()} title="Edit Name" />
        {this.renderif(this.state.showEdit, <Editor />)}
        <Button onPress={() => this.onDelete(item)} title="Delete" />
      </View>
    )
  }

  onSelect = () => {
    this.setState({ selected: true });
    //maybe need ID? sort is still a giat question mark
    //and somehow hand information over to cards sort. wait. i can do the sort here? depends on whether or not I can "while" this
  }

  onEdit = () => {
    console.log("editing");
    this.setState({showEdit: true});
    //pop up for user to change name
  }
  renderif = (condition, component) => {
    if (condition) {
      return (component)
    } else {
      return null
    }
  }



  onDelete = (deckId) => {
    const newDecks = this.state.todos.filter(el => el.id !== deckId);
    this.setState({ decks: newDecks });
  }

  addDeck = () => {
    //pop up for user to add a name and add cards one by one
  }

  showCardAdder = () => {
    this.setState({showCardAdder: true});
  }

 
  //list of functions
  //const decks = (decks.map(deck => <Button {() => this.onSelect(item.name)} title="deck.name" /> )
  render() {
 
      return (
        <View style ={styles.container}>
          <Text style={styles.titleText}> Flashy </Text>
          <FlatList 
            data={this.state.decks}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.name}
          />
          
          <Button onPress={this.addDeck()} title="Add a Deck" />
        </View>
      );
    
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state={name: ''}
  }

  changeName = (name) => {
    this.setState({name: name},() => this.props.onEditName({name: name}));
  }
  render () {
    return (
      <View>
        <TextInput
          style={{height: 40}}
          onChangeText={(name) => this.changeName(name)}
          value={this.state.name}
        />
      </View>
    )
  }
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
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
    backgroundColor: '#ecf0f1',
  },
});
