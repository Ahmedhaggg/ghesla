let express = require("express");
let cors = require("cors");
let path = require("path")
let methodOverride = require("method-override");
const apiRoutes = require("./api/routes");
const apiErrorHandlerMiddleware = require("./middlewares/apiErrorHandlerMiddleware");
const apiNotFoundMiddleware = require("./middlewares/apiNotFoundMiddleware");
const { adminRoutes } = require("./adminDashboard/routes");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
let flash = require("connect-flash");
// let hpp = require("hpp")
// const { dashboardLimiter, apiLimiter } = require("./config/rateLimiting");
let app = express();

// app.use("/dashboard", dashboardLimiter)
// app.use("/api", apiLimiter)

app.use(express.urlencoded({ extended: true, limit: "40kb" }))
app.use(express.json({ limit: "60kb" }))
app.use(methodOverride("_method"))
app.use(cors());

// app.use(hpp())
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
require("./config/syncDatabase"); 
require("./utils/cronjobs");
app.use(express.static(path.join(__dirname, 'adminDashboard', 'public')));
app.use("/images", express.static(path.join(__dirname, 'adminDashboard', 'public', "images")));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'adminDashboard', 'views'));

apiRoutes(app);
adminRoutes(app);

app.use(apiErrorHandlerMiddleware); 
app.use(apiNotFoundMiddleware);

let rService = require("./services/reservation.service");
rService.findAll({}).then(el => console.log(el));
app.listen(4000, () => console.log("server is ruuning"));
  