document.addEventListener('DOMContentLoaded', () =>{
    
    // Show navbar when click on burger in mobile mode
    document.querySelector('.burger').onclick = function(){
        const navlinks=document.querySelector('#nav-links');
		navlinks.classList.toggle('nav-links');
	};	

	document.querySelector('#show-menu').onclick = () =>{
		document.querySelector('.menu').setAttribute('style','display:grid')
		document.querySelector('.back-modal').setAttribute('style','display:block')
	}
	document.querySelector('#cancel').onclick = () =>{
		document.querySelector('.menu').setAttribute('style','display:none')
		document.querySelector('.back-modal').setAttribute('style','display:none')
	}

	document.querySelectorAll('.meals div').forEach(div =>{
		div.onclick = ()=>{
			const current=document.querySelector('.meals .active');
			if (current != null){ 
			current.classList.toggle('active')};
			div.classList.toggle('active');
			
		}
	})
	document.querySelectorAll('.size span').forEach(span =>{
		span.onclick = ()=>{
			const current=document.querySelector('.size .active');
			if (current != null){ 
			current.classList.toggle('active')};
			span.classList.toggle('active');
			
		}
	})
    
})

window.onload = function() {
	lax.setup() // init

	const updateLax = () => {
		lax.update(window.scrollY)
		window.requestAnimationFrame(updateLax)
	}

	window.requestAnimationFrame(updateLax)
}