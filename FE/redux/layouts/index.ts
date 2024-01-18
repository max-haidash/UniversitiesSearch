import { Action, handleActions } from 'redux-actions';
import {
    setPaginationAction,
    setErrorToastAction,
    setSuccessToastAction,
    setInfoToastAction,
    deleteToastAction,
    showLoaderAction,
    searchKeywordAction,
    setKeywordAction
} from './actions';
import { PaginationType } from '../../constants';

const initPagination = { limit: 25, offset: 0, sort: 'DESC', column: 'created_at', query: '' };

const initialState: State.Layouts = {
    pagination: {
        [PaginationType.UNIVERCITIES]: {
            ...initPagination,
            filters: {}
        }
    },
    isDataLoading: false,
    toasts: [],
    selectedLng: 'en',
    showEmailNotification: false,
    searchResults: [],
    searchKeyword: null
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS: any = {
    [setPaginationAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<{
            type: Type.PaginationType;
            modifier: Partial<Layouts.Pagination>;
        }>
    ): State.Layouts => ({
        ...state,
        pagination: {
            ...state.pagination,
            [action.payload.type]: {
                ...state.pagination[action.payload.type],
                ...action.payload.modifier
            }
        }
    }),
    [showLoaderAction]: {
        next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
            ...state,
            isDataLoading: action.payload
        })
    },
    [searchKeywordAction]: {
        next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
            ...state,
            searchResults: action.payload
        })
    },
    [setErrorToastAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<Layouts.ToastMessage>
    ): State.Layouts => ({
        ...state,
        toasts: [...state.toasts, { id: Date.now(), type: 'error', message: action.payload }]
    }),
    [setSuccessToastAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<Layouts.ToastMessage>
    ): State.Layouts => ({
        ...state,
        toasts: [...state.toasts, { id: Date.now(), type: 'success', message: action.payload }]
    }),
    [setInfoToastAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<Layouts.ToastMessage>
    ): State.Layouts => ({
        ...state,
        toasts: [...state.toasts, { id: Date.now(), type: 'info', message: action.payload }]
    }),
    [deleteToastAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<number>
    ): State.Layouts => ({
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload)
    }),
    [setKeywordAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<string | null>
    ): State.Layouts => ({
        ...state,
        searchKeyword: action.payload
    })
};

export {
    setPaginationAction,
    setErrorToastAction,
    setSuccessToastAction,
    setInfoToastAction,
    deleteToastAction,
    setKeywordAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
