import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { userSelector } from '../../redux/user/selectors';
import { useSelector } from 'react-redux';
import { baseApiUrl } from '../../constants';

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

interface Props {
    isNonPage?: boolean | null;
}

const Header: React.FC<Props> = ({ isNonPage }) => {
    const user = useSelector(userSelector);
    const t = useTranslations();
    const [userPhoto, setUserPhoto] = useState(userProfileImg);
    const router = useRouter();

    useEffect(
        function () {
            if (user?.photo) {
                setUserPhoto(baseApiUrl + user?.photo);
            }
        },
        [user]
    );

    return (
        <header
            className={`w-full ${user?.email ? 'auth-header' : ''} ${
                router.pathname == '/' || router.pathname == '/auth/signup' || isNonPage
                    ? 'mb-10 md:mb-5 shadow-lg'
                    : 'shadow-lg'
            }`}>
            <div className="container relative mx-auto layout-header xl:max-w-[1400px]">
                <div className="site-logo">
                    <Link href={'/'}>
                        {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/alt-text */}
                        <Image
                            src="/images/logo.png"
                            alt=""
                            width="40"
                            height="40"
                            className="site-logo"
                        />
                    </Link>
                </div>

                <div className="mt-[10px] right-header-block md:mt-auto inline-block">
                    {user?.email ? (
                        <div className="pt-2 flex flex-col">
                            <span className="rounded-full profile" />
                            <span className="logout-btn login-btn-layout">
                                <Link href={'/api/auth/signout'}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a
                                        className="sm:float-right disabled-btn-small login-white-btn"
                                        href="javascript:;"
                                        title={'Logout'}>
                                        {'Logout'}
                                    </a>
                                </Link>
                            </span>
                        </div>
                    ) : (
                        <div className="unlogged-block">
                            <span className="logout-btn login-btn-layout">
                                <Link href={'/auth/signin'}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a
                                        className="sm:float-right disabled-btn-small login-white-btn"
                                        href="javascript:;"
                                        title={'Login'}>
                                        {'Login'}
                                    </a>
                                </Link>
                            </span>
                        </div>
                    )}
                </div>
                <div className="hidden right-header-block">
                    {user?.email ? (
                        <div className="profile-block profile-block-layout">
                            <div className="float-left h-[32px]">
                                <Image
                                    src={userPhoto}
                                    width={32}
                                    height={32}
                                    className="rounded-full cursor-pointer profile-img"
                                    alt=""
                                />
                            </div>
                            <span className="profile-name mt-[-4px] float-left border-1 border-black">
                                Hello
                                <span className="text-blue-350 pl-2 inline-block min-w-max">
                                    ID: 888
                                </span>
                            </span>
                        </div>
                    ) : (
                        <></>
                    )}
                    {user?.email ? (
                        <span className="logout-btn logout-btn-layout">
                            <a
                                href="/api/auth/signout"
                                title={t('Logout')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.localStorage.removeItem('user');
                                    signOut();
                                }}>
                                <Image
                                    className="mr-5"
                                    src="/images/icon-logout.svg"
                                    width={14}
                                    height={20}
                                    alt={t('Logout')}
                                />
                            </a>
                        </span>
                    ) : (
                        <span className="logout-btn login-btn-layout">
                            <Link href={'/auth/signin'}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a href="javascript:;" title={t('Login')}>
                                    <Image
                                        className="mr-5"
                                        src="/images/login-icon.svg"
                                        width={24}
                                        height={40}
                                        alt={t('Logout')}
                                    />
                                </a>
                            </Link>
                        </span>
                    )}
                </div>
                <div className="clear-both" />
            </div>
        </header>
    );
};

export default Header;
