import React, {useEffect} from 'react';

import './App.css';

import MainComponent from './components/MainComponent'
import {Provider} from 'react-redux';
import store from './redux/store/store'
import {loadUser} from './redux/actions/inputs'

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  })

  return (
    <div className="App">
      <Provider store={store}>
        <MainComponent/>
      </Provider>
    </div>
  );
}

export default App;
