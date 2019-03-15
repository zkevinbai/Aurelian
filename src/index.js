import visualization from './visualization';
import {defaultData, dataMaker} from './dataGenerator';
import objectMaker from './objectGenerator';
import urlMaker from './urlGenerator';

document.addEventListener("DOMContentLoaded", ()=>{    
    // const data = defaultData();
    const defaultData =[
        75000,
        5000,
        12000,
        4000,
        36000,
        28000,
        12000,
        4000,
        36000,
        28000,
    ];
    const object=objectMaker(...defaultData);
    const url = urlMaker(object);
    visualization(url)
})