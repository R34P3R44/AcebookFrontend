import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.loadHomePage();
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <h1 onClick={this.handleClick}>Acebook</h1>
        </div>
      </div>
    )
  }
}

export default Header;