'use client'

import {useEffect} from "react";
import EmptyState from "@/app/components/EmptyState";

interface ErrorProps{
    error: Error;
}
const Error = ({error} : ErrorProps) => {
    useEffect(()=>{
        console.log(error)
    }, [error])

    return(
        <EmptyState
            title=":("
            subtitle="Something went wrong."
        />
    )
}

export default Error