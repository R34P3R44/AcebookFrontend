import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.setSignedUp();
  }
  
  render() {
    return (
      <div className="header">
        <div className="logo">
          <h1 onClick={this.handleSubmit} href="#">Acebook</h1>
        </div>
      </div>
    )
  }
}

export default Header;