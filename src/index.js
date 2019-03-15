import visualization from './visualization';
import objectMaker from './objectGenerator';
import urlMaker from './urlGenerator';

document.addEventListener("DOMContentLoaded", ()=>{
    const object = objectMaker();
    const url = urlMaker(object);
    visualization(url)
})