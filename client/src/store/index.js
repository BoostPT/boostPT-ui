import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers';
import reduxPromise from 'redux-promise';
// import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const persistentReducer = persistReducer(persistConfig, rootReducer);

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);

export const store = createStoreWithMiddleware(persistentReducer);
export const persistor = persistStore(store);