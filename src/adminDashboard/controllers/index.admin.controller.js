let PagesTitles = require("../messages/pages.title")
exports.index = async (req, res, next) => {
    res.render("index", { title: PagesTitles.INDEX})
}