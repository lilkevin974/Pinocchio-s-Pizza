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

function updateprice(){
	var xhttp = new XMLHttpRequest();
	const s=document.querySelector('[name="toppings"]')
	const topping=s.options[s.selectedIndex].value
	console.log(topping)
}

function addtopping(){
	const items=document.querySelector('.items');
	const n=items.querySelectorAll('div').length;
	console.log(n)
	if (n<3){
		const div = document.createElement('div');
		div.innerHTML=`<span>Topping ${n+1} :</span> <select name="toppings" onchange="updateprice()"><option value="None">None</option>{% for t in toppings %}<option value="{{ t.topping }}">{{ t.topping }}</option>{% endfor %}</select><i class="fas fa-plus"></i><i class="fas fa-times"></i>`;
		items.insertBefore(div, items.children[n+1])
	}
}