// import "core-js";

import _ from 'lodash';
import './stylesheet/style.css';
import Icon from './assets/images/logo.png';
import printMe from './print';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpackkk'], ' ');
  element.classList.add('hello');

  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);
  console.log('index general')
  return element;
}
console.log('index ')
document.body.appendChild(component());