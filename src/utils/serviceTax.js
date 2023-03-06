exports.calcServiceTax = price => +((price / 0.15).toFixed());
exports.calcServicesTax =  services => {
    let total = services.reduce((total, current) => total + current.price , 0) * 0.15;
    return +total.toFixed(2)
}