import React from 'react'
import { HeaderNapMenu, HeaderNavItemType } from './const'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/molecules'
import { Button } from '@/components/atoms'
import Link from 'next/link'
import clsx from 'clsx'

const HeaderLogo = () => {
    return (
        <div className="flex items-center justify-center gap-2">
            <div className="minimalist-square h-[35px] w-[35px] rounded-[10px] bg-gray-700 md:h-[50px] md:w-[50px]"></div>
            <div className="flex">
                <h5 className="font-bold">MinimalGaming</h5>
                <h5 className="font-bold text-gray-500">Setup</h5>
            </div>
        </div>
    )
}

const HeaderNapItem = ({ item }: { item: HeaderNavItemType }) => {
    const { title, child, additionalCls } = item
    const hasChild = !!child?.length
    return (
        <HoverCard open={hasChild ? undefined : false}>
            <HoverCardTrigger asChild>
                <p
                    className={clsx(
                        'font-semi cursor-pointer text-lg hover:underline',
                        additionalCls
                    )}
                >
                    {title}
                </p>
            </HoverCardTrigger>
            <HoverCardContent className="flex w-80 flex-col gap-3">
                {child?.map((ch) => (
                    <Link
                        className={clsx(ch.additionalCls)}
                        href="/"
                        key={ch.key}
                    >
                        {ch.title}
                    </Link>
                ))}
            </HoverCardContent>
        </HoverCard>
    )
}

const HeaderNav = () => {
    const renderHeaderNavItem = () => {
        return HeaderNapMenu.map((item) => {
            return <HeaderNapItem key={item.key} item={item} />
        })
    }
    return (
        <div className="flex items-center gap-5">{renderHeaderNavItem()}</div>
    )
}

const Header = () => {
    return (
        <div className="flex justify-between gap-3 px-5 py-3">
            <HeaderLogo />
            <HeaderNav />
        </div>
    )
}

export default Header
