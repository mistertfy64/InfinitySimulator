setInterval(() => {
	// add passive
	let currentTime = Date.now();
	let deltaTimeInMilliseconds = currentTime - player.lastUpdateTime;
	player.lastUpdateTime = currentTime;

	for (let i = 1; i <= player.cashGenerators.length - 1; i++) {
		player.cashGenerators[i].multiplier = player.cashGenerators[
			i
		].amountPurchased.eq(0)
			? new Decimal("1")
			: new Decimal("1.1").pow(
					player.cashGenerators[i].amountPurchased.sub(1)
			  );
	}

	for (let i = 1; i <= player.cashGenerators.length - 1; i++) {
		if (i === 1) {
			player.cash = player.cash.add(
				player.cashGenerators[1].amountOwned
					.mul(deltaTimeInMilliseconds / 1000)
					.mul(player.cashGenerators[1].multiplier)
					.mul(player.cashUpgrades[`cu1`].currentEffect) // cu1 effect
			);
		} else {
			player.cashGenerators[i - 1].amountOwned = player.cashGenerators[
				i - 1
			].amountOwned.add(
				player.cashGenerators[i].amountOwned
					.mul(deltaTimeInMilliseconds / 1000)
					.mul(player.cashGenerators[1].multiplier)
			);
		}
	}

	// update variables
	player.cashUpgrades["cu1"].currentEffect = new Decimal("1.5").pow(
		player.cashUpgrades["cu1"].level
	);

	// update html
	$("#cash-count").text(formatNumber(player.cash));

	for (let i = 1; i <= player.cashGenerators.length - 1; i++) {
		$(`#cash-generator-${i}-multiplier`).text(
			formatNumber(
				player.cashGenerators[i].multiplier.mul(
					player.cashUpgrades[`cu1`].currentEffect
				)
			) // cu1 effect
		);
		$(`#cash-generator-${i}-owned-count`).text(
			formatNumber(player.cashGenerators[i].amountOwned)
		);
		$(`#cash-generator-${i}-cost`).text(
			formatNumber(getCostForGenerator(i))
		);
	}

	for (let i = 1; i <= Object.keys(player.cashUpgrades).length - 1; i++) {
		$(`#cash-upgrade-${i}__current-effect`).text(
			formatNumber(player.cashUpgrades[`cu${i}`].currentEffect)
		);
		$(`#cash-upgrade-${i}__level`).text(
			player.cashUpgrades[`cu${i}`].level
		);
		$(`#cash-upgrade-${i}__cost`).text(
			formatNumber(getCostForCashUpgrade(i))
		);
	}
}, 50);
