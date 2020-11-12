import React from 'react';

import ReactDOM from "react-dom";

import '../stylesheet/container/example.sass'

// (function(){

    const ExamplePage = () => {
        return (
            <div>
                Hecho con react 
            </div>
        )
    }
    
    const wrapper = document.getElementById("container");
    wrapper ? ReactDOM.render(<ExamplePage />, wrapper) : false;
    const wrapper2 = document.getElementById("elm");
    wrapper2 ? ReactDOM.render('el pepe', wrapper2) : false;
    
    console.log(wrapper, wrapper2);
    console.log('example 1 page ');

    
// })()
// console.log('afuera',wrapper, wrapper2);
// console.log('example 1 page afuera');
