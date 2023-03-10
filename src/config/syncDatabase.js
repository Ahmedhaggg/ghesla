let { createWorkDays } = require("../utils/cronjobs")
let adminService = require("../services/admin.service");
let reservationsStatusService = require("../services/reservationsStatus.service");
const { RESERVATION_PENDING, RESERVATION_COMPLETED, RESERVATION_DOING } = require("./constants");
const { db } = require("./database");

db.sync().then(async (start) => {
    await createWorkDays();
    let adminLength = await adminService.count();
    if (!adminLength)
        await adminService.create({ email: "admin@gmail.com", password: "Admin12345"});

    let statusLength = await reservationsStatusService.count();
    
    if(statusLength == 0) {
        await reservationsStatusService.create({ name: RESERVATION_PENDING })
        await reservationsStatusService.create({ name: RESERVATION_DOING })
        await reservationsStatusService.create({ name: RESERVATION_COMPLETED })
    }          
}).catch(error => console.log("error happend in excute sync", error));
        