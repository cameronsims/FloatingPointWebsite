function float8_init() {
	
	const BITS = 8;
	const SIGN = 1;
	const EXP = 4;
	const MAN = BITS-(SIGN + EXP);
	
	format(BITS, SIGN, EXP, MAN);
}