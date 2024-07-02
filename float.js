function floatx_popup() {

	// Create Popup window
	// var e = document.createDocumentFragment("div");
	var e = document.createElement("div");
	e.setAttribute("class", "popup-window");
	
	// Create a header
	
	var header = document.createElement("div");
	header.setAttribute("class", "popup-window-header");
	header.innerHTML = "Create a Custom Float!";
	
	e.appendChild(header);
	
	// Make a close button
	
	var close = document.createElement("button");
	close.setAttribute("onclick", "floatx_close()");
	close.setAttribute("class", "popup-window-exit");
	close.innerHTML = "X";
	
	e.appendChild(close);
	
	// Create a field to put # of bits in 
	var bits = document.createElement("input");
	bits.setAttribute("id", "popup-bits");
	bits.setAttribute("type", "number");
	
	var bits_txt = document.createTextNode("# of bits: ");
	
	e.appendChild(bits_txt);
	e.appendChild(bits);
	
	e.appendChild( document.createElement("p") );
	
	// Create a field to put in  if it has a sign 
	var sign = document.createElement("input");
	sign.setAttribute("id", "popup-sign");
	sign.setAttribute("type", "checkbox");
	sign.setAttribute("checked", true);
	
	var sign_txt = document.createTextNode("Sign Bit?");
	
	e.appendChild(sign_txt);
	e.appendChild(sign);
	
	e.appendChild( document.createElement("p") );
	
	// Get exponent bits
	var expo = document.createElement("input");
	expo.setAttribute("id", "popup-expo");
	expo.setAttribute("type", "number");
	
	var expo_txt = document.createTextNode("# of bits for exponent: ");
	
	e.appendChild(expo_txt);
	e.appendChild(expo);
	
	e.appendChild( document.createElement("p") );
	
	// close
	var conf = document.createElement("button");
	conf.setAttribute("onclick", "floatx_confirm()");
	conf.setAttribute("class", "popup-window-confirm");
	conf.innerHTML = "Confirm";
	e.appendChild(conf);
	
	
	document.getElementsByClassName("content")[0].appendChild(e);
}

function floatx_close() {
	
	var elems = document.getElementsByClassName("popup-window");
	if (elems.length > 0) {
		for (var i = 0; i < elems.length; i++) {
			elems[i].remove();
		}
	}
}

function floatx_confirm() {
	
	var e_bits = document.getElementById("popup-bits");
	var e_sign = document.getElementById("popup-sign");
	var e_expo = document.getElementById("popup-expo");
	
	var bits = e_bits.value;
	var expo = e_expo.value;
	var sign = (e_sign.checked) ? 1 : 0;
	
	var nonManBits = expo;	// Why does adding a bool to an int cause a string ????
	if (sign) {
		nonManBits++;
	}
	
	if (isNaN(bits) || isNaN(expo) || bits <= nonManBits || bits < 0 || expo < 0) {
		sign = 1;
		bits = 8;
		expo = 4;
		nonManBits = bits - (sign + expo); 
	}
	
	const MAN = bits - nonManBits;
	
	console.log(nonManBits);
	console.log(MAN);
	
	format(bits, sign, expo, MAN);
	
}

function float_init() {
	floatx_close();
	floatx_popup();
	
	const BITS = 64;
	const SIGN = 1;
	const EXP = 11;
	const MAN = BITS-(SIGN + EXP);
	
	format(BITS, SIGN, EXP, MAN);
	
}