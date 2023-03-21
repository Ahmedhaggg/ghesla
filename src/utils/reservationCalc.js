let calcTax = priceWithDiscount => +( priceWithDiscount * 0.15).toFixed(2);
let calcDiscount = (price, percentage) => +((price * percentage) / 100).toFixed(2);

let calcServiceAmount = (service, requiredTax = true) => {
    let price = +service.dataValues.price;

    // calc discount
    let discount = service.servicesDiscount ? 
        calcDiscount(price, service.servicesDiscount.dataValues.percentage) : 0;

    // minus discount
    let servicePriceWithDiscount = +(price - discount).toFixed(2);
    
    // calc tax
    let productPriceWithTax = requiredTax ? calcTax(servicePriceWithDiscount) : 0

    return servicePriceWithDiscount + productPriceWithTax;
} 

let calcAdditionalServicesAmount = (additionalServices, requiredTax = true) => 
    additionalServices
        .reduce((total, current) => +(
            calcServiceAmount(current, requiredTax) + total
        ).toFixed(2) , 0);

let calcGiftPoints = amount => Math.round(amount * 0.4);

let calcNewBalance = (startedBalance, deductedAmount) => +(startedBalance - deductedAmount).toFixed(2);
module.exports = { 
    calcAdditionalServicesAmount, 
    calcServiceAmount, 
    calcGiftPoints,
    calcNewBalance
};