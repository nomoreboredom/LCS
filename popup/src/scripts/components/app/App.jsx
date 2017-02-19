import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardStack, Card } from 'react-cardstack';
import Channel from '../channel/Channel';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: [ 'eulcs1', 'riotgamesturkish' ],
        };
    }

    componentDidMount() {
        document.addEventListener('click', () => {
            this.props.dispatch({
                type: 'ADD_COUNT',
            });
        });
    }

    getRandomColor() {
        const hex = Math.floor(Math.random() * 0xFFFFFF);
        return '#' + ('000000' + hex.toString(16)).substr(-6);
    }
    render() {
        const channelList = this.state.channels.map((item, key) => {
            const channelIndex = key;
            return (
                <Card background={this.getRandomColor()} key={channelIndex}>
                    <Channel channelName={item} />
                </Card>
            );
        });
        return (
            <CardStack
              height={200}
              width={200}
              hoverOffset={0}
            >
                {channelList}
            </CardStack>
        );
    }
}

const mapStateToProps = state => ({
    state: {
        count: state.count,
    },
});

export default connect(mapStateToProps)(App);
