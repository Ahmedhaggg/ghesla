let pickerService = require("../../services/picker.service");
const hashing = require("../../utils/hashing");
let pagesTitles = require("../messages/pages.title");
const uploader = require("../../middlewares/uploader");

exports.index = async (req, res, next) => {
    let pickers = await pickerService.findAll();
    
    res.render("pickers/index", { title: pagesTitles.PICKERS, pickers });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let picker = await pickerService.findOne({ id });
    
    if (!picker)
        return res.redirect("/dashboard/404")
    
    res.render("pickers/show", {
        title: picker.dataValues.name,
        picker
    })
}

exports.create = async (req, res, next) => {
    let validationErrors = req.flash("validationErrors");
    let createPickerError = req.flash("createPickerError")[0]
    let lastValues = req.flash("lastValues")[0];
    
    res.render("pickers/create", { 
        title: pagesTitles.CREATEPICKER,
        validationErrors,
        createPickerError,
        lastValues
    })
}

exports.store = async (req, res, next) => {
    let image = req.file.originalname;
    let buffer = req.file.buffer;
    
    let { email, password, confirmPassword, name, phoneNumber, startWorkAt } = req.body;

    let hashedPassword = await hashing.hash(password);
    
    let startWorkAtDate = new Date(startWorkAt);
    let newPicker = await pickerService.create({
        email,
        password: hashedPassword,
        name,
        phoneNumber,
        image
    }, new Date(startWorkAtDate.getFullYear(), startWorkAtDate.getMonth(), startWorkAtDate.getDate()));
    
    if (newPicker.isFaild) {
        req.flash("validationErrors", newPicker.message);
        req.flash("lastValues", { email, name, phoneNumber, startWorkAt, password, confirmPassword });
        await uploader.delete(image);
        return res.redirect(`/dashboard/pickers/create`)
    }
    
    await uploader.uploadFromMemory(image, buffer);
       
    return res.redirect(`/dashboard/pickers/${newPicker.dataValues.id}`);
}

// exports.edit = async (req, res, next) => {
//     let validationErrors = req.flash("validationErrors");
//     let updatePickerError = req.flash("updatePickerError")[0];
//     let lastValues = req.flash("lastValues")[0]
//     let { id } = req.params;
    
//     let picker = await pickerService.findOne({ id });
    
//     if (!picker)
//         res.redirect("/dashboard/404");

//     res.render("pickers/edit", {
//         title: pagesTitles.EDITDIPICKER,
//         validationErrors,
//         updatePickerError,
//         lastValues,
//         picker
//     });
// }

// exports.update = async (req, res, next) => {
//     let pickerData = req.body;
//     let { id } = req.params;

//     let updatepicker = await pickerService.update(id, pickerData)

//     if (!updatepicker) {
//         req.flash("updatePickerError", dashboardMessages.updatePickerError)
//         return res.redirect(`/dashboard/pickers/${id}/edit`)
//     }
//     res.redirect(`/dashboard/pickers/${id}`)
// }
