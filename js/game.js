var player = {
	cash: new Decimal("1"),
	lastUpdateTime: Date.now(),
	generators: [
		{},
		{
			amountPurchased: new Decimal("0"),
			amountOwned: new Decimal("0"),
			multiplier: new Decimal("1"),
		},
	],
	cashUpgrades: {
		"cu0": {},
		"cu1": {
			level: new Decimal("0"),
			maximumLevel: null, // i.e., no limit
			currentEffect: new Decimal("1"),
		},
	},
};

const SCREENS = [
	"cash-generator-purchasing-area-container",
	"cash-upgrade-purchasing-area-container",
];

function buyGenerator(number) {
	if (player.cash.gte(getCostForGenerator(number))) {
		player.cash = player.cash.sub(getCostForGenerator(number));
		player.generators[number].amountPurchased =
			player.generators[number].amountPurchased.add("1");
		player.generators[number].amountOwned =
			player.generators[number].amountOwned.add("1");
		if (player.generators[number].amountPurchased.eq(1)) {
			writeNewGenerator(number + 1);
		}
	}
}

function writeNewGenerator(number) {
	player.generators[number] = {
		amountPurchased: new Decimal("0"),
		amountOwned: new Decimal("0"),
		multiplier: new Decimal("1"),
	};
	$(`#cash-generator-purchasing-area-container`).append(
		`<div class="cash-generator-information-container"><span>Tier ${number} Cash Generators &#10005;<span id="cash-generator-${number}-multiplier">1</span></span><span id="cash-generator-${number}-owned-count">0</span><button class="button--large-rectangle button--generator" onClick="buyGenerator(${number})">Buy 1 for <span id="cash-generator-${number}-cost">0</button></div>`
	);
}

function getCostForGenerator(number) {
	if (number === 1 && player.generators[1].amountPurchased.eq(0)) {
		return new Decimal("1");
	}
	return new Decimal(number)
		.pow(
			new Decimal(number).root(
				3 - (number - 2) * 0.1 > 1 ? 3 - (number - 2) * 0.1 : 1
			)
		)
		.mul(new Decimal(4).pow(number))
		.pow(
			player.generators[number]?.amountPurchased.add("1") ??
				new Decimal("1")
		);
}

function getCostForCashUpgrade(number) {
	return new Decimal(10).pow(
		player.cashUpgrades[`cu${number}`].level
			.mul(new Decimal("3").add(number))
			.add(10)
	);
}

function buyCashUpgrade(number) {
	if (player.cashUpgrades[`cu${number}`].maximumLevel) {
		// has limit
		if (
			player.cashUpgrades[`cu${number}`].level.lt(maximumLevel) &&
			player.cash.gte(getCostForCashUpgrade(number))
		) {
			player.cash = player.cash.sub(number);
			player.cashUpgrades[`cu${number}`].level =
				player.cashUpgrades[`cu${number}`].level.add(1);
			return;
		}
	}
	// doesn't have limit
	if (player.cash.gte(getCostForCashUpgrade(number))) {
		player.cash = player.cash.sub(number);
		player.cashUpgrades[`cu${number}`].level =
			player.cashUpgrades[`cu${number}`].level.add(1);
		return;
	}
}

function navigateTo(screen) {
	for (let i = 0; i < SCREENS.length; i++) {
		$(`#${SCREENS[i]}`).hide(0);
	}
	$(`#${screen}`).show(0);
}

navigateTo("cash-generator-purchasing-area-container");
