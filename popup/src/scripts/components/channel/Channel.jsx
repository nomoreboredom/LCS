import React, {Component} from 'react';
import Avatar from '../avatar/Avatar';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        liveState: false,
    };
  }
  checkIfChannelOnline(channel) {
    let url = 'https://api.twitch.tv/kraken/streams/' + channel + '?client_id=qf8via2w923otpjjcjo1jeg6slulq4'
    return fetch(url).then((response) => response.json())
  }

  pullOfflineChannelData(channel) {
    let url = 'https://api.twitch.tv/kraken/channels/' + channel + '?client_id=qf8via2w923otpjjcjo1jeg6slulq4'
    return fetch(url).then((response) => response.json())
  }

  componentDidMount() {
      this.checkIfChannelOnline(this.props.channelName).then((response) => {
          let status = response.stream
          if (status === null) {
              this.pullOfflineChannelData(this.props.channelName).then((responseChannelQuery) => {
                  this.setState({
                      liveState: false,
                      data: responseChannelQuery
                  })
              }) 
          } else {
              console.log(response.stream)
              this.setState({
                  liveState: true,
                  data: response.stream
              })
          }
      })
  }
  render() {
      if (!this.state.data) {
          return null
      }
      return (
          <div>
              <h1>{this.props.channelName} </h1>
              <Avatar size={100} src={this.state.data.logo}/>
              <h2>{this.state.data.logo} </h2>
                <Avatar size={20}/>
          </div>
      );
  }
}
export default Channel
