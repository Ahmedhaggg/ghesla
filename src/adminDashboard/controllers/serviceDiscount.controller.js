let serviceService = require("../../services/service.service");
let PagesTitle = require("../messages/pages.title");
let dashboardMessages = require("../messages/dashboard.messages");

exports.store = async (req, res, next) => {
    let { serviceId } = req.params;
    let { expirationAt, percentage } = req.body;

    let newDiscount = await serviceService.addDiscountToService({
        serviceId,
        expirationAt,
        percentage
    });

    if (!newDiscount)
        req.flash("createDiscountError", dashboardMessages.createDiscountError)

    res.redirect(`/dashboard/services/${serviceId}`)
}

exports.update = async (req, res, next) => {
    let { serviceId, discountId } = req.params.discountId;

    let newDiscountData = req.body;

    let updateDiscount = await serviceService.updateDiscount(discountId, newDiscountData);

    if (!updateDiscount) { 
        req.flash("updateDiscountError", dashboardMessages.updateDiscountError);
        return res.redirect(`/dashboard/services/${serviceId}/discount/${id}/edit`)
    }

    res.redirect(`/dashboard/services/${serviceId}`)
}

exports.destroy = async (req, res, next) => {
    let { serviceId, discountId } = req.params;
    
    let deletedDiscount = await serviceService.deleteDiscount(discountId);
  
    if (!deletedDiscount) 
        req.flash("deleteDiscountError", dashboardMessages.deleteDiscountError);

    res.redirect(`/dashboard/services/${serviceId}`)
}
