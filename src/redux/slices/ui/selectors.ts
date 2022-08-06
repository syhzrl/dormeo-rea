import { InitState } from 'redux/slices/ui';

const getSelectedLanguage = (state: InitState): string => state.selectedLanguage || '';
const getSelectedTabView = (state: InitState): string => state.selectedTabView || '';
const getModulesCreateModal = (state: InitState): boolean => state.modulesCreateModal || false;

export default {
    getSelectedLanguage,
    getSelectedTabView,
    getModulesCreateModal,
};
