import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './fetch-character-epic';

import reducer from './reducer';

import FetchCharacters from './FetchCharacters';
import Characters from './Characters';

import './styles.scss';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(rootEpic);

const Application = () => {
  return (
    <div className="Application">
      <h1>Star Wars Autocomplete</h1>
      <FetchCharacters />
      <Characters />
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  rootElement,
);
