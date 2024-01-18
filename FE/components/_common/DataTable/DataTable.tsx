import React, { useCallback, useState, useMemo } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { setPaginationAction } from '../../../redux/layouts';
import { paginationSelectorFactory } from '../../../redux/layouts/selectors';
import { RawPagination, EmptyTable } from '../../_common/index';
import { TableHeaders, PaginationType } from '../../../constants';

interface Props {
    paginationType: Type.PaginationType;
    children: React.ReactNode[];
    totalAmount: number;
    hideBulk?: boolean;
}

const DataTable: React.FC<Props> = ({ paginationType, children, totalAmount, hideBulk }) => {
    const t = useTranslations();
    const listShowIds: string | PaginationType[] = [];

    const showIds: boolean = listShowIds.includes(paginationType);
    const headers = TableHeaders[paginationType];

    const dispatch = useDispatch();
    const { limit, sort, column, offset }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(paginationType)
    );
    const [loading, setLoading] = useState(true);
    const [allChecked, setAllChecked] = useState(false);

    const setPage = useCallback(
        (currentPage) => {
            dispatch(
                setPaginationAction({
                    type: paginationType,
                    modifier: { offset: limit * currentPage.selected }
                })
            );
        },
        [paginationType, limit, dispatch]
    );

    const setSort = useCallback(
        (event: React.SyntheticEvent): void => {
            const column = event.currentTarget.getAttribute('data-name') as string;
            const sort = event.currentTarget.getAttribute('data-direction') as string;
            dispatch(setPaginationAction({ type: paginationType, modifier: { sort, column } }));
        },
        [paginationType, dispatch]
    );

    const setLimit = useCallback(
        (event: React.SyntheticEvent): void => {
            const limit = Number((event.target as HTMLSelectElement).value);
            dispatch(setPaginationAction({ type: paginationType, modifier: { limit, offset: 0 } }));
            // dispatch(setSwitchToggleAction(null));
        },
        [paginationType, dispatch]
    );

    const handleAllChecked = () => {
        if (!allChecked) {
            // dispatch(checkAllIdsAction());
        } else {
            // dispatch(uncheckAllIdsAction());
        }
        setAllChecked(!allChecked);
    };

    const isTwoRowsHeader = useMemo(() => headers.some((i) => i.subTitles?.length), [headers]);
    const renderTableHeader = () => {
        const getTh = (item: Type.DataTableHeader) => (
            <th
                rowSpan={isTwoRowsHeader && !item.subTitles?.length ? 2 : 1}
                colSpan={item.subTitles?.length || 1}
                key={item.titleKey ? item.titleKey : Math.random().toString(16).slice(2)}
                className={classNames('text-left', item.className, {
                    sorting_disabled: !item.sortKey
                })}>
                {item.className === 'option-switcher' && (
                    <label
                        htmlFor="switchAll"
                        className="flex items-center cursor-pointer relative">
                        <div className="toggle-bg bg-gray-200 border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600" />
                    </label>
                )}
                <div className="relative w-full inline-block">
                    {item.sortKey && (
                        <div className="sortable-block absolute top-[-9px] left-0">
                            <div
                                role="presentation"
                                data-name={item.sortKey}
                                data-direction="ASC"
                                onClick={setSort}
                                className={classNames('btn_sort top', {
                                    active: column === item.sortKey && sort === 'ASC'
                                })}
                            />
                            <div
                                role="presentation"
                                data-name={item.sortKey}
                                data-direction="DESC"
                                onClick={setSort}
                                className={classNames('btn_sort down', {
                                    active: column === item.sortKey && sort === 'DESC'
                                })}
                            />
                        </div>
                    )}
                    <div
                        className="inline-block"
                        style={{ marginLeft: item.sortKey ? '30px' : '0' }}>
                        {item.iconClass && (
                            <div className="inline-block">
                                <i className={`tbl-icon ${item.iconClass}`} />
                            </div>
                        )}
                        {item.titleKey && (
                            <div style={{ marginTop: '-2px' }} className="inline-block">
                                {item.titleKey ? t(item.titleKey) : ''}
                            </div>
                        )}
                    </div>
                </div>
            </th>
        );

        return (
            <>
                <tr role="row">
                    {showIds && !hideBulk && (
                        <th style={{ width: '30px' }} className="ids">
                            <input
                                type="checkbox"
                                onChange={handleAllChecked}
                                checked={allChecked}
                                className="float-left checkbox-action check-all"
                            />
                        </th>
                    )}
                    {headers.map(getTh)}
                </tr>
                {isTwoRowsHeader && (
                    <tr role="row">
                        {headers.map((item: Type.DataTableHeader) => {
                            if (!item.subTitles?.length) return null;
                            return item.subTitles.map(getTh);
                        })}
                    </tr>
                )}
            </>
        );
    };

    const length = useMemo(
        () =>
            headers.reduce((acc: number, item: Type.DataTableHeader) => {
                if (!item.subTitles?.length) return acc;
                return acc + item.subTitles.length;
            }, headers.length),
        [headers]
    );

    const renderTableBody = () => {
        if (children?.length) return children;
        return <EmptyTable colSpan={length}>{t('Table is empty')}</EmptyTable>;
    };

    return (
        <div className="overflow-x-scroll">
            <table className="w-full float-table">
                <thead>{renderTableHeader()}</thead>
                <tbody>{renderTableBody()}</tbody>
            </table>
            {!loading && (
                <div className="flex justify-between min-w-max w-full mt-5 mb-10">
                    <div className="w-16 mr-1">
                        <select value={limit} onChange={setLimit} className="form-control">
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    {Math.ceil(totalAmount / limit) > 1 && (
                        <RawPagination
                            forcePage={
                                offset > totalAmount
                                    ? Math.ceil(totalAmount / limit)
                                    : offset / limit
                            }
                            pageCount={Math.ceil(totalAmount / limit)}
                            onPageChange={setPage}
                        />
                    )}
                    <div className="pagination-total">
                        {Boolean(totalAmount) && (
                            <div className="dataTables_info" role="status">
                                {t('Showing')} {offset + 1} {t('to')}{' '}
                                {offset + limit > totalAmount ? totalAmount : offset + limit} of{' '}
                                {totalAmount} {t('entries')}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
