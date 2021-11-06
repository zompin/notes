import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export interface IStore {
}

const reducers = combineReducers<IStore>({
});

export const store = createStore(reducers, {}, applyMiddleware(thunk));
