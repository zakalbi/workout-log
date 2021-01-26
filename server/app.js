let express = require('express');
let app = express();
let sequelize = require('./db');
let wlog = require('./controllers/wlogController')
let user = require('./controllers/userController')

sequelize.sync();
//sequelize.sync({ force: true })

app.use(express.json());

app.use('/user', user);
app.use('/workoutlog', wlog);

app.listen(3000, function() {
    console.log('App is listening on port 3000');
})