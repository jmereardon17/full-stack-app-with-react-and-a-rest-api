import React, { Component } from 'react';
import Data from '../../helpers/Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.userCookie = Cookies.get('currentUser');
    this.data = new Data();
    this.state = {
      currentUser: this.userCookie ? JSON.parse(this.userCookie) : null
    };
  }

  render() {
    const context = {
      data: this.data,
      currentUser: this.state.currentUser,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    };

    return <Context.Provider value={context}>{this.props.children}</Context.Provider>;
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);

    if (user) {
      this.setState(() => ({ currentUser: { ...user, password } }));
      Cookies.set('currentUser', JSON.stringify({ ...user, password }), { expires: 1 });
    }

    return user;
  };

  signOut = () => {
    this.setState(() => ({ currentUser: null }));
    Cookies.remove('currentUser');
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>{context => <Component {...props} context={context} />}</Context.Consumer>
    );
  };
}
