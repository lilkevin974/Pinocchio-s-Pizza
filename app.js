document.addEventListener('DOMContentLoaded', () =>{
    
    // Show navbar when click on burger in mobile mode
    document.querySelector('.burger').onclick = function(){
        const navlinks=document.querySelector('#nav-links');
        navlinks.classList.toggle('nav-links');
    };
})

window.onload = function() {
	lax.setup() // init

	const updateLax = () => {
		lax.update(window.scrollY)
		window.requestAnimationFrame(updateLax)
	}

	window.requestAnimationFrame(updateLax)
}