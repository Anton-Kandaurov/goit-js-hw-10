import './css/styles.css';
import Notiflix from 'notiflix';

fetch(`https://restcountries.com/v3.1/all`).then
    (res => {
        if (!res.ok) {
            throw new Error(res.status);
        }
        return res.json();
    }).then
    ((data) => {console.log(data)})
 

const DEBOUNCE_DELAY = 300;
