let customerService = require("../../services/customer.service");
let pageTitles = require("../messages/pages.title")
exports.index = async (req, res, next) => {
    let { page = 1 } = req.query;
    let customers = await customerService.findAll(null, ( page - 1) * 10, 10);
    let numberOfCustomers = await customerService.count()
    res.render("customers/index", {
        title: pageTitles.CUSTOMERS,
        customers,
        numberOfCustomers: 9,
        page
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let customer = await customerService.findOne({ id })
    if (!customer)
        return res.redirect("/dashboard/404")
    res.render("customers/show", {
        title: customer.name,
        customer
    })
}
