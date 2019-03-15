import visualization from './visualization';
import {
    defaultData, 
    dataMaker, 
    dataParser
} from './dataGenerator';
import objectMaker from './objectGenerator';
import urlMaker from './urlGenerator';

document.addEventListener("DOMContentLoaded", ()=>{    
// v3 input data array
    const defaultInputData =[
        75000,
        5000,
        12000,
        4000,
        36000,
        28000,
    ];
    const inputData = dataParser(...defaultInputData);
    const inputObject = objectMaker(...inputData);
    const url = urlMaker(inputObject);
    visualization(url)
})