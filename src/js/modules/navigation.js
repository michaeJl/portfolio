
const navigation = () =>{

    function getCoords(elem) {
        if (elem.nodeName){
            let box = elem.getBoundingClientRect();
            return {
                top: Math.round(box.top + pageYOffset),
                bottom: Math.round(box.bottom + pageYOffset)
            };
        }
    };

    function beautiful(box,elem,offset){
        const  topDistance = pageYOffset;

            if (box){
                if ( (topDistance + document.documentElement.clientHeight/2) > (box.top + ((box.bottom - box.top)/2)) && (topDistance + document.documentElement.clientHeight/2) < box.bottom ){  
                    elem.style.strokeDashoffset = (box.bottom - (topDistance + document.documentElement.clientHeight/2) ) * (offset/((box.bottom - box.top)/2)) + 'px';
                } else if (topDistance + (document.documentElement.clientHeight/2) >= box.bottom) {
                    elem.style.strokeDashoffset = 0 + "px";
                } else if (topDistance <= box.top){
                    elem.style.strokeDashoffset = offset + "px";
                };
            };
    };

    function scrollTo(selector) {
        document.querySelector(`${selector}`).scrollIntoView({behavior: 'smooth'});
        menuWrapper.classList.remove('active');
    }

    const triangle = document.querySelector('.triangle > polyline'),
          boxTriangle = getCoords(document.querySelector('.svg')),
          home = document.querySelector('.menu-logo'),
          menuWrapper = document.querySelector('.menu__wrapper'),
          menuWrapperLinks = document.querySelector('.menu__wrapper-links'),
          instrumetMain = document.querySelectorAll('.skills__grid-instument-main'),
          instumentCover = document.querySelectorAll('.skills__grid-instument-cover'),
          menuWrapperInstrument = document.querySelectorAll('.skills__grid-instument');

          let arrayInstrument = [];
          
          menuWrapperInstrument.forEach((item,i)=>{
            arrayInstrument[i] =  getCoords(item);
          });

    window.addEventListener('scroll',()=> {
        beautiful(boxTriangle,triangle,500);

        arrayInstrument.forEach((item,i) => {
            if (pageYOffset + document.documentElement.clientHeight >= item.top) {
                instumentCover[i].style.transition = "1s";
                instumentCover[i].style.transform = "translateX(0%)";
                setTimeout(() => {
                    instrumetMain[i].style.transition = "1s";
                    instrumetMain[i].style.transform = "translateX(0%)";
                }, 1000);
            } else {
                instumentCover[i].style.transition = "1s";
                instumentCover[i].style.transform = "translateX(115%)";
                setTimeout(() => {
                    instrumetMain[i].style.transition = "1s";
                    instrumetMain[i].style.transform = "translateX(115%)";
                }, 1000);
            }
        }); 
        
    });

    home.addEventListener('click', (event)=> {
        event.preventDefault();
        scrollTo('.promo');
    });

    menuWrapperLinks.addEventListener('click',(event)=>{
        event.preventDefault();
        const targetid = event.target.href;
        scrollTo(targetid.slice(targetid.lastIndexOf('#')));
    });

}

export default navigation;
