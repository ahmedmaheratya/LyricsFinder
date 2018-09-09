import React, { Component } from 'react'
import { Consumer } from '../../context'
import Spinner from '../layouts/Spinner'
import Track from '../tracks/Track'

class Tracks extends Component {
  render() {
    return (
        <Consumer>
            {value=> {
                const { track_list } = value;
                console.log(value);
                if(track_list === undefined || track_list.length === 0) {
                    return <Spinner />
                } else {
                    return (
                        <React.Fragment>
                            {track_list.map(item => {
                                return <Track track={item.track} key={item.track.track_id} />
                            })}
                        </React.Fragment>
                    );
                }
            }}
        </Consumer>
    )
  }
}

export default Tracks