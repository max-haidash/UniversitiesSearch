import Header from '../header/Header';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isDataLoadingSelector } from '../../redux/layouts/selectors';
import { useRouter } from 'next/router';
import { fetchUserAction, setUserAction } from '../../redux/user';
import { useSession } from 'next-auth/client';

export default function FullLayout({ children }: { children: any }) {
    const showLoader = useSelector(isDataLoadingSelector);
    const router = useRouter();
    const [session] = useSession();
    const dispatch = useDispatch();

    useEffect(
        function () {
            if (session?.user?.email && !window.localStorage.getItem('user')) {
            } else {
                const localUser = JSON.parse(window.localStorage.getItem('user') || '{}');
                if (session?.user?.email !== localUser.email) {
                    if (session?.user?.email !== undefined) {
                        dispatch(fetchUserAction(session?.user?.email));
                    }
                } else {
                    dispatch(
                        setUserAction(JSON.parse(window.localStorage.getItem('user') || '{}'))
                    );
                }
            }
        },
        [dispatch, session?.user?.email]
    );

    return (
        <>
            {showLoader && (
                <div className="loader">
                    <div className="flex justify-center items-center w-full h-full">
                        <div
                            className="spinner-border animate-spin inline-block w-20 h-20 border-4 rounded-full"
                            role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}
            <Header />
            <div
                className={`min-h-[750px] ${
                    router.pathname == '/' || router.pathname == '/auth/signup'
                } text-black dark:text-white`}>
                {children}
            </div>
        </>
    );
}
