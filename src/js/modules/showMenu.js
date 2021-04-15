const showMenu = () =>{
    const hamburger = document.querySelector('.menu__hamburger'),
          menuWrapper = document.querySelector('.menu__wrapper'),
          close = document.querySelector('.menu__close');

    hamburger.addEventListener('click' , ()=>{
        menuWrapper.classList.add('active');
    });

    close.addEventListener('click', ()=>{
        menuWrapper.classList.remove('active');
    });
};

export default showMenu;