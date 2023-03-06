let express = require("express");
let cors = require("cors");
let path = require("path")
let exphbs = require("express-handlebars");
let methodOverride = require("method-override");
let moment = require("moment")
const notEqualHelper = function(a, b, options) {
    if (a !== b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
};
  

// Create the Handlebars engine with the notEqual helper
const hbs = exphbs.create({
    helpers: {
        notEquel: notEqualHelper,
        findSelectOption: function(value, array, options) {
            if (array.indexOf(value) == -1) {
              return options.fn(this);
            }
            return options.inverse(this);
        },
        ifEquel: function(a, b, options) {
            console.log(a, b)
            if (a === b)
                return options.fn(this)
            else
                options.inverse(this) 
        },
        findError: function (array, field, options) {
            let item = array.find(el => el.param == field);
            if (item)
                return options.fn(item)
            else 
                return options.inverse(this)
        },
        or:  function(value1, value2) {
            return value1 || value2;
        },
        toLocalDateTime: function(datetime) {
            // Convert UTC datetime to local timezone
            const localDatetime = moment(datetime).format('YYYY-MM-DDTHH:mm:ss');
          
            // Return formatted local datetime
            return localDatetime;
        },
        makePagination: function(numberOfPages, options) {
            let items = [];
            for (let i = 0; i < numberOfPages; i++) {
                items.push(options.fn(i))
            }
            return items;
        },
        sum: function(num1, num2) {
            return num1 + num2;
        }
    }
});
//                             value="{{#or lastDiscountValues.discount.expirationAt service.servicesDiscount.dataValues.expirationAt }}{{/or}}">




const apiRoutes = require("./api/routes");
const apiErrorHandlerMiddleware = require("./middlewares/apiErrorHandlerMiddleware");
const apiNotFoundMiddleware = require("./middlewares/apiNotFoundMiddleware");
const { adminRoutes } = require("./adminDashboard/routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
let flash = require("connect-flash")
let app = express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(cors());

// use flash
app.set('trust proxy', 1)
app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat ddjdh',
    resave: true,
    saveUninitialized: true,
    cookie:  { secure: false, maxAge: 36000000 }
}));

app.use(flash())


require("./config/database");

app.use(express.static(path.join(__dirname, 'adminDashboard', 'public')));
app.use("/images", express.static(path.join(__dirname, 'adminDashboard', 'public', "images")));

// app.use("/images/id", express.static("/src/adminDashboard/public/images/2023-02-21T11-18-39.992Zdooooooo.PNG"));


// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'adminDashboard', 'views'));


let { db } = require("./config/database");
let { createWorkDays } = require("./utils/cronjobs")
let adminService = require("./services/admin.service");
let reservationsStatusService = require("./services/reservationsStatus.service");
const { RESERVATION_PENDING, RESERVATION_COMPLETED, RESERVATION_DOING } = require("./config/constants");

db.sync().then(async () => {
    await createWorkDays();
    let adminLength = await adminService.count();
    if (!adminLength)
        await adminService.create({ email: "admin@gmail.com", password: "Admin12345"});

    let statusLength = await reservationsStatusService.count();
    console.log(statusLength+  "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    if(statusLength == 0) {
        await reservationsStatusService.create({ name: RESERVATION_PENDING })
        await reservationsStatusService.create({ name: RESERVATION_DOING })
        await reservationsStatusService.create({ name: RESERVATION_COMPLETED })
    }
        
}); 
// db.sync({ force: true }).catch(err => console.log(err))
// console.log(Object.keys(Admin.getAttributes()))
// Admin.findAll().catch(err=> console.log(err))
// require("./utils/cronjobs");  

apiRoutes(app);
adminRoutes(app);

app.use(apiErrorHandlerMiddleware); 
app.use(apiNotFoundMiddleware);

app.listen(4000, () => console.log("server is ruuning"));
  