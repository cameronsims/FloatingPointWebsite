function float32_init() {
	
	const BITS = 32;
	const SIGN = 1;
	const EXP = 8;
	const MAN = BITS-(SIGN + EXP);
	
	format(BITS, SIGN, EXP, MAN);
}