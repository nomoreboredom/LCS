import React, {Component} from 'react';
import {connect} from 'react-redux';
import { CardStack, Card } from 'react-cardstack';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        channels: ['nalcs1', 'riotgamesturkish'],
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

  buildChannelData(channelLiveStatus, channelRequested, channelData) {
      let channelTempData = []
      if (channelLiveStatus) {
          channelTempData = channelData
      } else {
          channelTempData = this.pullOfflineChannelData(channelRequested)
      }
      this.renderChannels(channelTempData)
  }

  getData(channel) {
      return (
          <div>{channel} </div>
      );
      this.checkIfChannelOnline(channel).then((response) => {
          let status = response.stream
          if (status === null) {
              console.log('kapalı')
              this.buildChannelData(false, channel)
          } else {
              console.log(response.stream)
              this.buildChannelData(true, channel, response)
          }

      });
  }
  renderChannels(data) {
      const channelItem = this.state.channels.map((item, key) => {
        //let reference = 'content' + key
        return (
            <Card background={this.getRandomColor()} key={key}>
                <h1>Number cdsa sdsa sad1</h1>
                {this.getData(item)}
            </Card>
        );
    })
    return channelItem
  }

  componentDidMount() {
      document.addEventListener('click', () => {
          this.props.dispatch({
              type: 'ADD_COUNT'
          });
      });
    //  this.pullLCSData('nalcs1').then((response) => {
    //   this.setState({
    //       nalcs1: response.stream,
    //   });
    //   this.pullLCSData('nalcs2').then((response) => {
    //     this.setState({
    //         nalcs2: response.stream,
    //     });
    //     this.pullLCSData('riotgamesturkish').then((response) => {
    //       this.setState({
    //           riotgamesturkish: response.stream,
    //       });
    //     });
    //   });
    // });
  }
  getRandomColor () {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    return "#" + ("000000" + hex.toString(16)).substr(-6);
  }
  render() {

      return ( 
            <CardStack
                height={200}
                width={200}
                background={this.getRandomColor()}
                hoverOffset={0}>

                {this.renderChannels()}

            </CardStack>

      );


  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
