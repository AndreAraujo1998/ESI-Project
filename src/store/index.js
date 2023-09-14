import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const store = createStore(
  // O estado da aplicação fica aqui dentro
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
