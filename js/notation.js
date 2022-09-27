function formatNumber(number){
    if (number.lt(new Decimal("1000"))){
        return number.toFixed(3);
    }
    return name(number);
}