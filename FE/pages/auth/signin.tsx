import { providers, getSession } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { InputText, InputPassword } from '../../components/_form';
import { signIn } from 'next-auth/client';
import FullLayout from '../../components/layout/FullLayout';
import { Formik } from 'formik';
import Head from 'next/head';
import React from 'react';

function Signin() {
    const t = useTranslations();
    const { query } = useRouter();

    const SubmitSchema = Yup.object().shape({
        email: Yup.string().email(t('Must be a valid email')).required(t('Required field')),
        password: Yup.string().required(t('Required field'))
    });

    // useState()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <>
            <Head>
                <title>UniversitySearch - Sign In</title>
            </Head>

            <div className="flex main-bg justify-center">
                <div className="w-80 p-8 mt-10 rounded-lg bg-white colored-shadow md:w-96 md:p-10 pb-14">
                    <div className="mb-8 font-bold text-2xl line-height-105percent text-gray-600">
                        {t('Please sign into your account')}
                    </div>

                    {query.message && (
                        <div className="error-el mb-4">
                            <span className="text-sm">{query.message}</span>
                        </div>
                    )}
                    <Formik
                        enableReinitialize
                        initialValues={{}}
                        validationSchema={SubmitSchema}
                        onSubmit={(values) => {
                            signIn('credentials_login', {
                                email: (values as any).email,
                                password: (values as any).password,
                                callbackUrl: `/dashboard`
                            });
                        }}>
                        {(props) => (
                            <form onSubmit={props.handleSubmit} className="mb-4">
                                <InputText
                                    style={null}
                                    icon={'f-email'}
                                    label={null}
                                    name={'email'}
                                    placeholder={'Email'}
                                    props={props}
                                    tips={null}
                                    onChange={(event) => {
                                        event.target.value = event.target.value.trim();
                                        props.handleChange(event);
                                    }}
                                />

                                <InputPassword
                                    style={null}
                                    icon={'f-password'}
                                    label={null}
                                    name={'password'}
                                    placeholder={'Password'}
                                    props={props}
                                />
                                <div className="mb-6">
                                    <button
                                        className="gradient-btn w-full px-3 py-4 text-white bg-indigo-500 rounded-md
                                    hover:bg-indigo-600
                                    focus:outline-none duration-100 ease-in-out">
                                        {t('Login')}
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}
Signin.Layout = FullLayout;

export default Signin;

export async function getServerSideProps(context: any) {
    const { req, locale } = context;
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: { destination: `/` }
        };
    }
    return {
        props: {
            providers: await providers(),
            locale: locale,
            messages: {
                ...require(`../../messages/en.json`)
            }
        }
    };
}
