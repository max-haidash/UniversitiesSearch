export function parseTranslation(option: any, field: string, locale: string) {
    if (!option) return;
    if (option.translations) {
        const findedOption = option.translations.find(
            (data: any) => Object.keys(data)[0] === locale
        );
        if (findedOption) {
            return findedOption[locale][field];
        } else {
            return option[field];
        }
    } else {
        return option[field];
    }
}

export function authHeader(token: string) {
    return { Authorization: `Bearer ${token}`, Accept: 'application/json' };
}
