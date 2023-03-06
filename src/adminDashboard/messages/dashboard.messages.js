let createMessageFactory = (page) => `حصل خطا في اضافة ${page} تاكد من اصحة البيانات المددخلة`
let updateMessageFactory = (page) => `خطا في تجديث ${page} تاكد من صحة البيانات المددخلة`
let deleteMessageFactory = (page) => `لا يمكن حذف ${page} في الوقت الحالي`


exports.invalidLogin = "البريد الالكتروني او كلمة المرور غير صحيحة";
exports.createServiceError = createMessageFactory("الخدمة");
exports.updateServiceError = updateMessageFactory("الخدمة");
exports.createDiscountError = createMessageFactory("التخفيض علي الخدمة");
exports.updateDiscountError = updateMessageFactory("التخفيض علي الخدمة");
exports.deleteDiscountError = deleteMessageFactory("التخفيض علي الخدمة");
exports.createPickerError = createMessageFactory("البايكر");
exports.updateReservationError = updateMessageFactory("الحجز");
exports.updatePickerError = updateMessageFactory("البايكر");
exports.noFileUploaded = "يجب اختيار صورة"
exports.pickerNotAvailable = "البايكر غير متاح حاليا"
exports.createCityError = createMessageFactory("المدينة");