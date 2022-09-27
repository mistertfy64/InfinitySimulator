setInterval(() => {
	// add passive
	let currentTime = Date.now();
	let deltaTimeInMilliseconds = currentTime - player.lastUpdateTime;
	player.lastUpdateTime = currentTime;
	

	for (let i = 1; i <= player.generators.length-1; i++){
		if (i === 1){
			player.cash = player.cash.add(player.generators[1].amountOwned.mul(deltaTimeInMilliseconds/1000).mul(player.generators[1].multiplier));
		} else {
			player.generators[i-1].amountOwned = player.generators[i-1].amountOwned.add(player.generators[i].amountOwned.mul(deltaTimeInMilliseconds/1000).mul(player.generators[1].multiplier));
		}

	}

	// update html
	$("#cash-count").text(formatNumber(player.cash));

	for (let i = 1; i <= player.generators.length-1; i++){
		$(`#generator-${i}-purchased-count`).text(player.generators[i].amountPurchased.toFixed(0))
		$(`#generator-${i}-owned-count`).text(formatNumber(player.generators[i].amountOwned))
		$(`#generator-${i}-cost`).text(formatNumber(getCostForGenerator(i)));
	}

}, 50);
