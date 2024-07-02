function float64_init() {
	
	const BITS = 64;
	const SIGN = 1;
	const EXP = 11;
	const MAN = BITS-(SIGN + EXP);
	
	format(BITS, SIGN, EXP, MAN);
}