import React, { Component } from 'react';
import { connect } from 'react-redux';

//material ui components
import Button from '@material-ui/core/Button';

class LoginForm extends Component {
  state = {
    loginInfo: {
      username: '',
      password: '',
    },
  };

  changeLoginInfo = (fieldKey) => (event) => {
    this.setState({
      loginInfo: {
        ...this.state.loginInfo,
        [fieldKey]: event.target.value,
      },
    });
  };

  clickLogin = (event) => {
    this.props.dispatch({
      type: 'LOGIN',
      payload: this.state.loginInfo,
    });

    // clear form
    this.setState({
      loginInfo: {
        username: '',
        password: '',
      },
    });
  };

  render() {
    return (
      <div>
        <input
          placeholder='username'
          type='text'
          onChange={this.changeLoginInfo('username')}
        />
        <input
          placeholder='password'
          type='password'
          onChange={this.changeLoginInfo('password')}
        />

        <div>
          <Button variant='contained' onClick={this.clickLogin}>
            Log In
          </Button>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(LoginForm);
