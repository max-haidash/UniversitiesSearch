import { createAction } from 'redux-actions';
import axios from 'axios';
import { authHeader } from '../../lib/functions';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;

// ------------------------------------
// Actions
// ------------------------------------
export const searchKeywordAction: any = createAction(
    'layout/SEARCH_RESULT',
    async (keyword: string) =>
        (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{
            searchResults: any;
        }> => {
            const state = getState();
            dispatch(showLoaderAction(true));
            dispatch(setKeywordAction(keyword));
            return axios
                .get(`${baseUrl}/universities?search=${keyword}`, {
                    headers: {
                        ...authHeader(state.user.user.name)
                    }
                })
                .then((res: any) => {
                    dispatch(showLoaderAction(false));
                    // dispatch(searchKeywordAction(keyword));
                    return {
                        searchResults: res.data.data.universities
                    };
                });
        }
);
export const setPaginationAction: any = createAction('layouts/SET_PAGINATION');

export const showLoaderAction: any = createAction('layouts/SHOW_LOADER_ACTION');

export const setErrorToastAction: any = createAction('layouts/SET_ERROR_TOAST');

export const setSuccessToastAction: any = createAction('layouts/SET_SUCCESS_TOAST');

export const setInfoToastAction: any = createAction('layouts/SET_INFO_TOAST');

export const deleteToastAction: any = createAction('layouts/DELETE_TOAST');
export const setKeywordAction: any = createAction('layouts/SET_KEYWORD');
