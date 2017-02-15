import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nalcs1: [],
        nalcs2: [],
        riotgamesturkish: [],
    };
  }

  pullLCSData(channel) {
      let url = 'https://api.twitch.tv/kraken/streams/' + channel + '?client_id=qf8via2w923otpjjcjo1jeg6slulq4'
      return fetch(url).then((response) => response.json())
  }
  componentDidMount() {
      document.addEventListener('click', () => {
          this.props.dispatch({
              type: 'ADD_COUNT'
          });
      });
    this.pullLCSData('nalcs1').then((response) => {
      this.setState({
          nalcs1: response.stream,
      });
      this.pullLCSData('nalcs2').then((response) => {
        this.setState({
            nalcs2: response.stream,
        });
        this.pullLCSData('riotgamesturkish').then((response) => {
          this.setState({
              riotgamesturkish: response.stream,
          });
        });
      });
    });
  }

  render() {
    return (
      <div>sdads sda a{this.state.riotgamesturkish.viewers}
          <div>Click Count: {this.props.count}
          </div>
          
          </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
