import React, { Component } from 'react'
import axios from 'axios'

import { Consumer } from '../../context'

class Search extends Component {
  state = {
      trackTitle: '',
      btnText: 'SEARCH'
  }

  findTrack = (dispatch, e) => {
    e.preventDefault();
    if(this.state.trackTitle.length > 0) {
        this.setState({btnText: 'Loading...'})
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=4&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_LYRICS_KEY}`)
        .then(res => {
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
            });

            this.setState({ trackTitle: '' });
            this.setState({btnText: 'SEARCH'});
        })
        .catch(err => console.log(err))
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
        <Consumer>
            {value => {
                const { dispatch } = value;
                return (
                    <div className="search__content">
                        <h1 className="search__content--h1">
                        FIND THE LYRICS <br />
                        OF YOUR FAVORITE <br />
                        SONG.
                        </h1>
                        <p className="lead text-center"> 
                        condimentum quis elit id, eleifend t incidunt quam. Praesent 
                        fermentum  neque lacus, eget pellentesque. magna 
                        tellus, magna tellus, condimentum quis elit id.
                        </p>
                        <form onSubmit={this.findTrack.bind(this, dispatch)}>
                            <input 
                                type="text" 
                                placeholder="Song title..." 
                                className="form-control form-control-lg" 
                                name="trackTitle" 
                                value={this.state.trackTitle}
                                onChange={this.onChange}
                            />
                            <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">{this.state.btnText}</button>
                        </form>
                        <div className="search__content--icons">
                            <a href="/"><i className="fab fa-twitter"></i></a>
                            <a href="/"><i className="fab fa-soundcloud"></i></a>
                            <a href="/"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                );
            }}
        </Consumer>
    )
  }
}

export default Search