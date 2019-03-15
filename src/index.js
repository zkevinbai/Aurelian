import visualization from './visualization';
import {defaultData} from './dataGenerator';
import objectMaker from './objectGenerator';
import urlMaker from './urlGenerator';

document.addEventListener("DOMContentLoaded", ()=>{    
    const data = defaultData();
    const object=objectMaker(...data);
    const url = urlMaker(object);
    visualization(url)
})