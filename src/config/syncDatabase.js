let { createWorkDays } = require("../utils/cronjobs")
let adminService = require("../services/admin.service");
let reservationsStatusService = require("../services/reservationsStatus.service");
const { RESERVATION_PENDING, RESERVATION_COMPLETED, RESERVATION_DOING, RESERVATION_PENDING_ID, RESERVATION_DOING_ID, RESERVATION_COMPLETED_ID } = require("./constants");
const { db } = require("./database");

db.sync().then(async () => {
    await createWorkDays();
    let adminLength = await adminService.count();
    if (!adminLength)
        await adminService.create({ email: "admin@gmail.com", password: "Admin12345"});

    let statusLength = await reservationsStatusService.count();
    
    if(statusLength == 0) {
        await reservationsStatusService.create({ id : RESERVATION_PENDING_ID, name: RESERVATION_PENDING })
        await reservationsStatusService.create({ id : RESERVATION_DOING_ID, name: RESERVATION_DOING })
        await reservationsStatusService.create({ id: RESERVATION_COMPLETED_ID, name: RESERVATION_COMPLETED })
    }
}).catch(error => console.log("error happend in excute sync", error));
        