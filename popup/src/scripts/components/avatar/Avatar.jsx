import React, { Component } from 'react';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: this.props.src,
      size: this.props.size,
      round: this.props.name,
  };
  }
  render() {
      const size = this.props.size;
      const round = this.props.round;
      const alt = this.props.name;
      const imageStyle = {
          maxWidth: '100%',
          width: size,
          height: size,
          borderRadius: (round ? 500 : 0)
      };
      return (
          <img width={this.props.size}
              height={this.props.size}
              style={imageStyle}
              src={this.state.src}
              alt={alt}
              onError={this.fetch} />
      );
  }
}
export default Avatar
