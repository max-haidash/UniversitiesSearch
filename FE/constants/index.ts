// Each table pagination and controls meta stored to redux separately
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
export const baseApiUrl = publicRuntimeConfig.apiUrl;

export enum PaginationType {
    UNIVERCITIES = 'univercities'
}

export const TableHeaders: { [key in PaginationType]: Type.DataTableHeader[] } = {
    [PaginationType.UNIVERCITIES]: [
        { titleKey: 'Name' },
        { titleKey: 'Code' },
        { titleKey: 'State' },
        { titleKey: 'Domains' },
        { titleKey: 'Country' },
        { titleKey: 'Web' }
    ]
};

export enum UserRole {
    ADMIN = 3
}
