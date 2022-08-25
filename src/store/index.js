import { configureStore, combineReducers } from '@reduxjs/toolkit'
import ArticleReducer from './ArticleSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage,
}

const storeReducer = combineReducers({
    articleReducer: ArticleReducer
})

const persistedReducer = persistReducer({ ...persistConfig, blacklist: ["articleReducer"] }, storeReducer)

const data = () => {
    let store = configureStore({
      reducer: persistedReducer,
      middleware: [thunk]
    })
    let persistor = persistStore(store)
    return { store, persistor }
}

export const store = data().store
export const persistor = data().persistor