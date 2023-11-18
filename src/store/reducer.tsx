// rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slice';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
