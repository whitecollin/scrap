import React from "react";
import { useState } from "react";
import { useReducer } from "react";
import axios from "axios";
const url=()=>{
    const [url,seturl]=useState('');
    const sendurl=()=>{
    axios.post('/sendurl',url)
        .then(res=>{
            
        })
    }
    const initialstate=[
        url=''
    ];
    const reducer = (state, action) => {
        switch (action.type) {
        case "url":
            state.url=action.payload;
            return state;
        default:
            return state;
        }
    };
    const [urls, dispatch] = useReducer(reducer, initialstate);

    return(
        <>
            <input type="text" onChange={(e)=>seturl(e.target.value)}></input>
            <button onClick={send}>Get</button>
        </>
    )
}