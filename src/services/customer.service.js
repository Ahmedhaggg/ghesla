const { Customer, CustomerLoginVerification } = require("../models");

exports.findOne = async (phoneNumber) =>
    await Customer.findOne({ where: { phoneNumber } });

exports.create = async (newCustomerData) => 
    await Customer.create(newCustomerData); 

exports.createVerificationCode = async (newVerificationCodeData) => {
    console.log("verificationCodeverificationCodeverificationCode")
    let verificationCode = await CustomerLoginVerification
        .update(newVerificationCodeData, {
            where: { phoneNumber: newVerificationCodeData.phoneNumber }
        });
    console.log(verificationCode)
    if (verificationCode[0] == 1) 
        return newVerificationCodeData;
        
    return await CustomerLoginVerification.create(newVerificationCodeData);
}
exports.findVerificationCode = async (phoneNumber) => 
    await CustomerLoginVerification.findOne({ where: { phoneNumber }});

exports.deleteVerificationCode = async (id) => 
    await CustomerLoginVerification.destroy({ where: { id } })

