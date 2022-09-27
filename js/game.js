var player = {
	cash: new Decimal("0"),
	lastUpdateTime: Date.now(),
	generators: [
		{},
		{
			amountPurchased: new Decimal("0"),
			amountOwned: new Decimal("0"),
			multiplier: new Decimal("1"),
		},
	],
};

function buyGenerator(number) {
	// if (
	// 	(number === 1 && player.generators[1].amountPurchased.eq(0)) ||
	// 	player.generators[1] === undefined
	// ) {
	// 	player.generators[1].amountPurchased = new Decimal("0");
	// 	player.generators[1].amountPurchased =
	// 		player.generators[1].amountPurchased.add("1");
	// 	player.generators[1].amountOwned =
	// 		player.generators[1].amountOwned.add("1");
	// 	if (player.generators[number].amountPurchased.eq(1)) {
	// 		writeNewGenerator(number + 1);
	// 	}
	// 	player.generators[1].multiplier = player.generators[1].multiplier.mul(2);
	// } else {
		if (
			player.cash.gte(
				getCostForGenerator(number)
			)
		) {
			player.cash = player.cash.sub(getCostForGenerator(number))
			player.generators[number].amountPurchased =
				player.generators[number].amountPurchased.add("1");
			player.generators[number].amountOwned =
				player.generators[number].amountOwned.add("1");
			if (player.generators[number].amountPurchased.eq(1)) {
				writeNewGenerator(number + 1);
			}
		for (let i = 1; i <= number; i++){
			player.generators[number].multiplier = player.generators[number].multiplier.mul(number+1);
		}}
		
}

function writeNewGenerator(number) {
	player.generators[number] = {
		amountPurchased: new Decimal("0"),
		amountOwned: new Decimal("0"),
		multiplier: new Decimal("1"),
	};
	$(`#generator-purchasing-area-container`).append(
		`<div class="generator-information-container"><span>Tier ${number} Generators - Bought: <span id="generator-${number}-purchased-count">0</span></span><span id="generator-${number}-owned-count">0</span><button class="button--large-rectangle button--generator" onClick="buyGenerator(${number})">Buy 1 for <span id="generator-${number}-cost">0</button></div>`
	);
}

function getCostForGenerator(number){
	if (number === 1 && player.generators[1].amountPurchased.eq(0)){
		return new Decimal("0");
	}
	return new Decimal(number).pow(new Decimal(number).root(3-(number-2)*0.1 > 1 ? 3-(number-2)*0.1 : 1  )).mul(new Decimal(4).pow(number)).pow(player.generators[number].amountPurchased.add("1"));
}
