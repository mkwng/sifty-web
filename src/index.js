// React
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';

// Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Collections from './components/Collections/Collections';
import Documents from './components/Documents/Documents';

// Styles
import { Spin } from 'antd';
import 'antd/dist/antd.css';

// Router
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

// Redux
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { setUser, clearUser } from './actions';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    let userRef = firebase.database().ref('users');
    firebase.auth().onAuthStateChanged(user => {
      if(userRef.off && typeof userRef.off === 'function') userRef.off();
      if (user) {
        userRef = firebase.database().ref(`users/${user.uid}`).on('value', snap => {
          this.props.setUser(snap.val())
        })
        this.props.history.push('/'+user.displayName)
      } else {
        this.props.history.push('/')
        this.props.clearUser();
      }
    })
  }

  render() {
    return this.props.isLoading ? (
      <Spin tip="Loading..." /> 
    ) : (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/:username/:collection" render={(routeProps) => {
              return this.props.user ? (
                <Documents {...routeProps} user={this.props.user} collection={this.props.collection}/>
              ) : (<div />);
            }} />
            <Route path="/:username" render={(routeProps) => {
              return this.props.user ? (
                <Collections {...routeProps} user={this.props.user} collection={this.props.collection}/>
              ) : (<div />);
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  user: state.user.user,
  collection: state.collection.collection
})


const RootWithAuth = withRouter(
  connect(
    mapStateToProps, 
    { setUser, clearUser }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <RootWithAuth />
  </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
