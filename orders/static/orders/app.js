document.addEventListener('DOMContentLoaded', () =>{
    
    // Show navbar when click on burger in mobile mode
    document.querySelector('.burger').onclick = function(){
        const navlinks=document.querySelector('#nav-links');
		navlinks.classList.toggle('nav-links');
	};
	
	// Show modal of the menu
	document.querySelector('#show-menu').onclick = () =>{
		document.querySelector('.menu').setAttribute('style','display:grid')
		document.querySelector('.back-modal').setAttribute('style','display:block')
	}
	// Close the modal of the menu
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
	document.querySelectorAll('.size').forEach(div=>{
		const c=div.children;
		var spans=[];
		for (var i=0; i<c.length; i++) {
			var child = c[i];
			  spans.push(child)      
		}
		spans.forEach(span =>{
			span.onclick = ()=>{
				const type=span.dataset.type;
				const size=span.dataset.size;
				const special=document.querySelector('.size .special');
				if(special != null){
					if(type != special.dataset.type){
						special.classList.toggle('special');
					}
				}
				
				if (span==c[2]){
					span.classList.toggle('special');
				}
				else{
					const current=document.querySelector('.size .active');
					if (current != null){ 
						if (current != span){
							current.classList.toggle('active')
						};
					}
					span.classList.toggle('active');
				}	
			}
		})
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
	const s=document.querySelectorAll('[name="toppings"]');
	const n=s.length;
	console.log(n)
	s.forEach(select =>{
		const topping=select.options[select.selectedIndex].value;
		console.log(topping)
	})	
}

// Add a new line of topping choice when click on new
function addtopping(){
	const items=document.querySelector('.items');
	const n=items.querySelectorAll('div').length;
	const s=document.querySelector('[name="toppings"]');
	const len=s.options.length;
	var opt;
	var text='';
	for (var i=0; i<len; i++){
		opt=s.options[i];
		text+=`<option value="${opt.value}">${opt.value}</option>`;
	}
	
	if (n<3){
		const div = document.createElement('div');
		div.innerHTML=`<span>Topping ${n+1} :</span> <select name="toppings" onchange="updateprice()">${text}</select><i class="fas fa-plus"></i><i class="fas fa-times"></i>`;
		items.insertBefore(div, items.children[n+1])
	}
}