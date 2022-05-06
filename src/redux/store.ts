import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { userSlice } from './slices/user.slice';
import { createWrapper } from 'next-redux-wrapper';

export function makeStore() {
	return configureStore({
		reducer: {
			[userSlice.name]: userSlice.reducer,
		},
	});
}

export const store = makeStore();

export const wrapper = createWrapper<RootStore>(makeStore);

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
