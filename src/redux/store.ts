import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { userSlice } from './slices/user.slice';

export function makeStore() {
	return configureStore({
		reducer: {
			[userSlice.name]: userSlice.reducer,
		},
	});
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
