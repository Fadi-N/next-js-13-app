'use client'

import {IconType} from "react-icons";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";
import qs from "query-string";

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean
}

const CategoryBox = ({icon: Icon, label, selected}: CategoryBoxProps) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {}

        // https://www.npmjs.com/package/query-string
        if (params) {
            // Create an object out of all of our current parameters
            // Convert string to object
            currentQuery = qs.parse(params.toString())
        }

        // Assign current label as the category param in URL
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        // Once clicked on the same category again, remove all categories (reset)
        if (params?.get("category") === label) {
            delete updatedQuery.category;
        }

        // Generate URL wih newest query as a path name and filter out all empty options
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true})

        // Pass that URL
        router.push(url)
    }, [label, params, router])

    return (
        <div className={`
            flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
            ${selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}
        `} onClick={handleClick}
        >
            <Icon size={26}/>
            <div className="font-medium text-sm">{label}</div>
        </div>
    )
}

export default CategoryBox