// React
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';

// Components
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push('/')
      } else {
        this.props.history.push('/login')
        this.props.clearUser();
      }
    })
  }

  render() {
    return this.props.isLoading ? (
      <Spin tip="Loading..." /> 
    ) : (
      <Switch>
        <Route exact path="/" render={ (props) => <App {...props} isAuthed={true} /> } />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

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
