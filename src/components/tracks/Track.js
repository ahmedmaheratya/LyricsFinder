import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Track extends Component {
  state = {
    lyrics: {},
    background: ""
  }
  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.track.track_id}&apikey=${process.env.REACT_APP_LYRICS_KEY}`)
    .then(res => {
        this.setState({lyrics: res.data.message.body.lyrics});
        return axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${this.props.track.artist_name}&count=1&mkt=en-us`, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.REACT_APP_BING_KEY
          }
        })
        .then(res => {
          this.setState({ background: res.data.value[0].contentUrl});
        })
    })
    .catch(err => console.log(err))
  }
  render() {
    const track = this.props.track;
    const {lyrics, background} = this.state;
    function showLyrics () {
      if(lyrics === undefined || Object.keys(lyrics).length === 0) {
          return <p className="track-lyrics">loading lyrics...</p>
      } else {
          return (
            <p className="track-lyrics">{lyrics.lyrics_body.substring(0, 120)}...</p>
          );
      }
    }
    function showArtist () {
      if(track.artist_name.length > 20) {
        return `${track.artist_name.substring(0, 18)}...`;
      } else {
        return track.artist_name;
      }
    }
    function showBG() {
      if(background.length > 0) {
        return <img src={background} alt="artist" />
      }
    }
    return (
      <div className="tracks">
        <div className="background">
          {showBG()}
        </div>
        <div className="track-body">
            <h1><strong><Link to={`lyrics/track/${track.track_id}`}>{track.track_name}</Link></strong> <br/> <span className="track-by">by</span> <span className="track-artist">{showArtist()}</span></h1>
            {showLyrics()}
            <div className="track-text">
              <div className="track-info">
                <p>
                  <strong><i className="fas fa-compact-disc"></i> Album Name:</strong> <span>{track.album_name}</span>
                </p>
                <p>
                <strong>{track.explicit === 1 ? <i className="fas fa-frown-open"></i> : <i className="fas fa-grin-beam"></i> } Kid Friendly:</strong> <span>{track.explicit === 0 ? 'Yes' : 'No' }</span>
                </p>
              </div>
            </div>
            <div className="view-lyrics">
              <Link to={`lyrics/track/${track.track_id}`}>
                <i className="fas fa-angle-double-right"></i> View Lyrics
              </Link>
            </div>
        </div>
      </div>
    )
  }
}

export default Track