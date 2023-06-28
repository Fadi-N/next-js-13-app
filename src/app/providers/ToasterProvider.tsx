'use client'

// https://www.npmjs.com/package/react-hot-toast
// you need to do it like that because in next.js 13 it is a client component not server
// CHECK IF TOASTER IS FIXED FOR NEXT.JS 13

import {Toaster} from "react-hot-toast";

const ToasterProvider = () =>{
    return(
        <Toaster/>
    )
}

export default ToasterProvider