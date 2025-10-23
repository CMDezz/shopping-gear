export type HeaderNavItemType = {
    key: string
    title: string
    additionalCls?: string
    child?: Array<HeaderNavItemType>
}

export type HeaderNavType = Array<HeaderNavItemType>
export const HeaderNapMenu: HeaderNavType = [
    {
        key: 'home',
        title: 'Homepage',
        additionalCls: 'font-bold text-gray-600 hover:text-pink-400',
    },
    {
        key: 'products',
        title: 'Hot Products',
        additionalCls: 'text-red-600',
        child: [
            {
                key: 'laptops',
                title: 'Laptops',
                additionalCls: 'text-red-600',
            },
            {
                key: 'headphone',
                title: 'Headphone',
            },
        ],
    },
    {
        key: 'contact',
        title: 'Contact',
    },
]
