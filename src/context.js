import React, { Component } from 'react'
import axios from 'axios'

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type){
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
      }
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    dispatch: action => this.setState(state => reducer(state, action))
  }
  componentDidMount() {
    axios.get('https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=6&country=us&f_has_lyrics=1&apikey=057f9a9af0f55209a22b2db1d8e0731d')
         .then(res => {
             this.setState({track_list: res.data.message.body.track_list});
         })
         .catch(err => console.log(err))
  }
  render() {
    return (
        <Context.Provider value={this.state}>
            {this.props.children}
        </Context.Provider> 
    )
  }
}

export const Consumer = Context.Consumer;