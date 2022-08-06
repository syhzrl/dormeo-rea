import authSlice from 'redux/slices/auth';
import uiSlice from 'redux/slices/ui';
import userSlice from 'redux/slices/user';

export default {
    ...authSlice.actions,
    ...uiSlice.actions,
    ...userSlice.actions,
};
