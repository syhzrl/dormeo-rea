import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UiReduxState } from './types';

const initialState: UiReduxState = {
    selectedLanguage: '',
    selectedTabView: '',
    modulesCreateModal: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.selectedLanguage = action.payload;
        },
        setTabView: (state, action: PayloadAction<string>) => {
            state.selectedTabView = action.payload;
        },
        setModulesCreateModal: (state, action: PayloadAction<boolean>) => {
            state.modulesCreateModal = action.payload;
        },
    },
});

export type InitState = typeof initialState;

export default {
    actions: uiSlice.actions,
    reducers: uiSlice.reducer,
};
