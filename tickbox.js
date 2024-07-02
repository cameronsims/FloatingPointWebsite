function format_resizeElement(e, size) {
	var old = e.getAttribute("style");
	
	if (old == null) {
		old = "";
	}
	
	e.setAttribute("style", "width: " + size + ";");
}

function format_resizeElements(e, size) {
	for (var i = 0; i < e.length; i++) {
		format_resizeElement(e[i], size);
	}
}

function format_clear() {
	var e = document.getElementsByClassName("bit-field");
	for (var i = 0; i < e.length; i++) {
		while (e[i].firstChild) {
			e[i].firstChild.remove();
		}
	}
}

function format(BITS, SIGN, EXP, MAN) {
	// WE don't want 100% because overflow
	const MAX_PERCENT = 80;
	const MIN_PERCENT = 4;
	
	// Clear existing
	format_clear();
	
	// Change Widths
	/*var e = document.getElementsByClassName("sign-field")    ;//.forEach((e) => {  });
	format_resizeElements(e, (((MAX_PERCENT*SIGN) / BITS) + MIN_PERCENT) + "%");
	
	e = document.getElementsByClassName("exponent-field");//.forEach((e) => { e.setAttribute("style", e.getAttribute("style") + "width: " + 100*(EXP) /BITS + "%;"); });
	format_resizeElements(e, (((MAX_PERCENT*EXP) / BITS) + MIN_PERCENT) + "%");
	
	e = document.getElementsByClassName("mantissa-field");//.forEach((e) => { e.setAttribute("style", e.getAttribute("style") + "width: " +  + "%;"); });
	format_resizeElements(e, (((MAX_PERCENT*MAN) / BITS) + MIN_PERCENT) + "%");
	*/
	

	// Add Sign Bit
	if (SIGN == true) {
		var e = document.createElement("input");
		e.setAttribute("type", "checkbox");
		e.setAttribute("class", "sign-check");
		e.setAttribute("id", "sign-bit" + i);
		e.setAttribute("onchange", "float_update(this)");
		document.getElementById("sign-field").appendChild(e);
	}

	// Add exponent bits
	for (var i = 0; i < EXP; i++) {
		var e = document.createElement("input");
		e.setAttribute("type", "checkbox");
		e.setAttribute("class", "exp-check");
		e.setAttribute("id", "exponent-bit" + i);
		e.setAttribute("onchange", "float_update(this)");
		document.getElementById("exponent-field").appendChild(e);
	}
	
	// Add mantissa bits
	for (var i = 0; i < MAN; i++) {
		var e = document.createElement("input");
		e.setAttribute("type", "checkbox");
		e.setAttribute("class", "man-check");
		e.setAttribute("id", "mantissa-bit" + i);
		e.setAttribute("onchange", "float_update(this)");
		document.getElementById("mantissa-field").appendChild(e);
	}
	
}

function float_update(e) {
	// Get the elements
	var isNegative = false;
	
	var expCulmValue = 0;
	var expPower = 0;
	var expValue = 0;
	
	var manCulmValue = 0;
	var manValue = 1;
	
	// GET SIGN ///////////////////////////////////////////////////
	const SIGN = document.getElementsByClassName("sign-check");
	if (SIGN.length != 0) {
		isNegative = !SIGN[0].checked;
	}
	
	// GET EXPONENT ///////////////////////////////////////////////
	const EXP  = document.getElementsByClassName("exp-check");
	const EXP_LENGTH = EXP.length;
	const EXP_BIAS = Math.pow(2, EXP_LENGTH - 1) - 1;
	if (EXP_LENGTH != 0) {
		for (var i = 0; i < EXP_LENGTH; i++) {
			expCulmValue = 2*expCulmValue + EXP[i].checked;
		}
	}
	expPower = expCulmValue - EXP_BIAS;
	expValue = Math.pow(2, expPower);
	
	// GET MANTISSA ///////////////////////////////////////////////
	const MAN  = document.getElementsByClassName("man-check");
	
	// If the exponent is -127, do not add +1
	if (expCulmValue == 0) {
		manValue = 0;
	}
	
	// The the exponent is maximum, it is infinity
	if (expCulmValue >= Math.pow(2, EXP_LENGTH) - 1) {
		manValue = Infinity;
	}
	
	if (MAN.length != 0) {
		for (var i = 0; i < MAN.length; i++) {
			manCulmValue = 2*manCulmValue + MAN[i].checked;
			manValue = manValue + MAN[i].checked*Math.pow(2, -(i + 1));
		}
	}
	
	document.getElementById("sign-result").innerHTML = (isNegative)? "0<br/>0 = +<br/>-" : "1<br/>1 = -<br/>+";
	
	document.getElementById("exponent-result").innerHTML = (expCulmValue) + " - " + EXP_BIAS + "<br/>" + expPower + "<br/>" + "2^" + expPower;
	document.getElementById("mantissa-result").innerHTML = manCulmValue + "<br/>" + ((expCulmValue != 0) ? ("1 + " + (manValue - 1)) : "0") + "<br/>" + manValue;
	
	const f = (isNegative ? 1 : -1) * expValue * manValue;
	
	document.getElementById("result").innerHTML = f;
}