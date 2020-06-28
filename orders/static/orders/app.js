
var data={
	type: 'Regular',
	size:'Small',
	toppings:0,
	topping1 : 'None',
	topping2 : 'None',
	topping3 : 'None',
	price:0,
}

var orders=[]
var numberOrder=0

document.addEventListener('DOMContentLoaded', () =>{
    
    // Show navbar when click on burger in mobile mode
    document.querySelector('.burger').onclick = function(){
        const navlinks=document.querySelector('#nav-links');
		navlinks.classList.toggle('nav-links');
	};
	
	// Show modal of the menu
	document.querySelector('#show-menu').onclick = () =>{
		showModal()
	}
	// Close the modal of the menu
	document.querySelector('#cancel').onclick = () =>{
		document.querySelector('.menu').setAttribute('style','display:none')
		document.querySelector('.back-modal').setAttribute('style','display:none')
	}
	// Change css of tabs in menu
	document.querySelectorAll('.meals div').forEach(div =>{
		div.onclick = ()=>{
			const current=document.querySelector('.meals .active');
			if (current != null){ 
			current.classList.toggle('active')};
			div.classList.toggle('active');	
		}
	})
	//Change css and select off the different sizes of pizza
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
				let special=document.querySelector('.size .special');
				if(special != null){
					if(type != special.dataset.type){
						special.classList.toggle('special');	
					}
				}
				if (span==c[2]){	
					span.classList.toggle('special');
					let special=document.querySelector('.size .special');
					if(document.querySelector('.unshow') == null && special!=null){
						document.querySelector('.items').classList.toggle('unshow')
					}
					if(document.querySelector('.unshow') != null && special ==null ){
						document.querySelector('.items').classList.toggle('unshow')
					}
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
				updateprice()	
			}
		})
	}) 
	
	document.querySelector('.add button').onclick = () =>{
		const div=document.createElement('div');
		const c=document.querySelector('.recap');
		div.innerHTML=`<p>${data.size} ${data.type} Pizza</p>
		<span> ${data.price} <i class="fas fa-times" onclick="deleteorders(this)"></i></span>`;
		div.classList.add('orders')
		div.dataset.number=numberOrder;
		const div2=document.querySelector('.total')
		c.insertBefore(div, div2);
		const o={
			type: data.type,
			size: data.size,
			toppings: data.toppings,
			topping1 : data.topping1,
			topping2 : data.topping2,
			topping3 : data.topping3,
			price: data.price,
		}
		orders.push(o)
		numberOrder += 1;
	}
})

window.onload = function() {
	lax.setup() // init

	const updateLax = () => {
		lax.update(window.scrollY)
		window.requestAnimationFrame(updateLax)
	}

	window.requestAnimationFrame(updateLax)
}
function showModal(){
	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', '/')
	xhttp.setRequestHeader("X-CSRFToken",  getCookie('csrftoken')); 
	xhttp.onload = () => {
		const data = xhttp.responseText;
		if (data=='non-connected'){
			document.location.href ="/accounts/login"
		}
		else{
			document.querySelector('.menu').setAttribute('style','display:grid')
			document.querySelector('.back-modal').setAttribute('style','display:block')
		}
	}
	xhttp.send();
          return false;

}

function updateprice(){
	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', '/')
	xhttp.setRequestHeader("X-CSRFToken",  getCookie('csrftoken')); 
	xhttp.onload = () => {

		// Extract JSON data from request
		const j_data = JSON.parse(xhttp.responseText);
		const price = document.querySelector('#price')
		const old= document.querySelector('#price span')
		if (old !=null){
			price.removeChild(old)
		}
		const span=document.createElement('span');
		span.innerHTML=j_data;
		price.appendChild(span);
		data.price=j_data;
	}

	let s=document.querySelectorAll('[name="toppings"]');
	let n=s.length;
	const t= document.querySelector('.size .active');
	if (t != null){
		data.type=t.dataset.type;
		data.size=t.dataset.size
	}
	
	const spe=document.querySelector('.size .special');
	if (spe != null){
		n=4
	}

	if(spe== null){
		s.forEach(select =>{
			const topping=select.options[select.selectedIndex].value;
			const child=select.closest('.items').children;
			if (select.parentElement== child[1]){
				data.topping1=topping;
			}
			if (select.parentElement== child[2]){
				data.topping2=topping;
			}
			if (select.parentElement== child[3]){
				data.topping3=topping;
			}
			if (topping=="None"){
				n-=1;
			}
		})
	}

	
	data.toppings=n;	
	console.log(data.toppings)
	console.log(data.type)

	j_data=JSON.stringify(data)

	xhttp.send(j_data);
          return false;	
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

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function deleteorders(elem){
	const div=elem.parentElement.parentElement;
	const number=div.getAttribute("data-number");
	delete orders[number];
	div.remove();
	console.log(orders)	
	console.log(orders[0])
}