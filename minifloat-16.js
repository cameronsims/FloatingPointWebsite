function float16_init() {
	
	const BITS = 16;
	const SIGN = 1;
	const EXP = 5;
	const MAN = BITS-(SIGN + EXP);
	
	format(BITS, SIGN, EXP, MAN);
}