import React, {Component} from 'react';
import {connect} from 'react-redux';
import Channel from '../channel/Channel';
import { CardStack, Card } from 'react-cardstack';

class App extends Component {
    constructor(props) {
    super(props);
        this.state = {
            channels: ['eulcs1', 'riotgamesturkish'],
        };
    }

    componentDidMount() {
      document.addEventListener('click', () => {
          this.props.dispatch({
              type: 'ADD_COUNT'
          });
      });
    }
    getRandomColor () {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        return "#" + ("000000" + hex.toString(16)).substr(-6);
    }
    render() {
      const channelList = this.state.channels.map((item, key) =>
          <Card background={this.getRandomColor()} key={key}>
              <Channel channelName={item}/>
          </Card>
      );
      return (
    <CardStack
    height={200}
    width={200}
    hoverOffset={0}>
    {channelList}
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
