import * as Yup from 'yup';
import Head from 'next/head';
import FullLayout from '../../components/layout/FullLayout';
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { InputText } from '../../components/_form';
import { useDispatch, useSelector } from 'react-redux';
import { searchKeywordAction, setKeywordAction } from '../../redux/layouts/actions';
import { universityKeywordSelector, universityResultSelector } from '../../redux/layouts/selectors';
import { DataTable } from '../../components/_common';
import { PaginationType } from '../../constants';

export default function Index() {
    const dispatch = useDispatch();
    const items = useSelector(universityResultSelector);
    const keyword = useSelector(universityKeywordSelector);
    const count = 10;

    useEffect(() => {
        if (keyword) {
            console.log('AAAA', keyword);
            dispatch(searchKeywordAction(keyword));
        }
    }, [keyword]);

    const SubmitSchema = Yup.object().shape({
        keyword: Yup.string()
            .trim('Cannot include leading and trailing spaces')
            .min(3, 'Must be at least 3 characters')
            .strict(true)
            .required('You must enter your data')
    });

    return (
        <div className="main-bg container xl:max-w-[1400px] mx-auto">
            <Head>
                <title>University Search</title>
                <meta name="description" content="LiveProshop portal" />
            </Head>

            <div className="main-layout">
                <h1 className="page-heading">Univercity Search</h1>
                <div>
                    <Formik
                        enableReinitialize
                        initialValues={{ keyword: '' }}
                        validationSchema={SubmitSchema}
                        onSubmit={(values: any) => {
                            dispatch(setKeywordAction(values.keyword));
                            dispatch(searchKeywordAction(values.keyword));
                        }}>
                        {(props) => (
                            <form onSubmit={props.handleSubmit} className="mt-5">
                                <div className="float-left min-w-[300px]">
                                    <InputText
                                        icon={'f-search'}
                                        label={null}
                                        name={'keyword'}
                                        placeholder={'Input Data'}
                                        style={'lg:w-full'}
                                        props={props}
                                        tips={null}
                                    />
                                    <div className="mt-10 mb-7 block border border-gray-180 border-b-0" />
                                    <button type="submit" className="gradient-btn">
                                        {'Search'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className="clear-both" />
                <div className="mt-10">
                    {items?.length > 0 && (
                        <>
                            <DataTable
                                paginationType={PaginationType.UNIVERCITIES}
                                totalAmount={count}>
                                {items?.map((item: any) => (
                                    <tr key={item.id}>
                                        <td style={{ width: '45%' }}>{item.name}</td>
                                        <td className="toggler-action" style={{ width: '70px' }}>
                                            {item['alpha_two_code']}
                                        </td>
                                        <td style={{ maxWidth: '150px' }}>
                                            {item['state-province'] ? item['state-province'] : ''}
                                        </td>
                                        <td style={{ width: '200px' }}>{item.domains[0]}</td>
                                        <td className="w-[70px]">{item.country}</td>
                                        <td className="w-[300px]">{item['web_pages'][0]}</td>
                                    </tr>
                                ))}
                            </DataTable>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
Index.Layout = FullLayout;

export async function getServerSideProps(context: any) {
    const { locale } = context;

    return {
        props: {
            locale,
            messages: {
                ...require(`../../messages/en.json`)
            }
        }
    };
}
