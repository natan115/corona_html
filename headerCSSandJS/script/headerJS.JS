const headerSlide = () => {
    const burger = document.querySelector('.burger');
    const header = document.querySelector('.header-links');
    const headerLinks = document.querySelectorAll('.header-links li');

    
    burger.addEventListener('click', () => {
        /// פתיחה של התפריט
        header.classList.toggle('header-active');

        /// אפקט פתיחה לינקים
        headerLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            }
            else {
                link.style.animation = `andLinks 0.5s ease forwards ${index / 7 + 0.5}s`;
            }

        });
    });
    

}


headerSlide();