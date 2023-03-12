let calcServicePrice = service => {
    let servicePrice = +service.dataValues.price;
    let discount = service.servicesDiscount ?
        +((servicePrice * service.servicesDiscount.dataValues.percentage) / 100).toFixed(2) : 0;
    let servicePriceWithDiscount = +(servicePrice - discount).toFixed(2);
    let productPriceWithTax = +( servicePriceWithDiscount * 0.15).toFixed(2)
    return servicePriceWithDiscount + productPriceWithTax;
} 
let calcServicesPrice =  services => 
    services.reduce((total, current) => +(calcServicePrice(current) + total).toFixed(2) , 0);

module.exports = { calcServicesPrice, calcServicePrice };