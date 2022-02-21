const express = require('express');
const routes = require('./routes/routes');
const api = require('./routes/api/employees');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});
const hbs = require('express-handlebars').create({
    helpers: {
        /**
         * HBS helper to render a dropdown with an item selected
         * @param selected The value of the item that should be selected
         * @param options All of the available options
         * @return {*} The corrected HTML dropdown
         */
        select: (selected, options) => {
            return options.fn(this).replace(
                new RegExp(' value=\"' + selected + '\"'),
                '$& selected="selected"');
        },
        /**
         * Returns the days since a given date
         * @param date The date to count from
         * @return {number} The number of days since the given date
         */
        daysSince: (date) => {
            return Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));
        },
        /**
         * Formats the given value as USD
         * @param value The numeric value
         * @return {string} The value as formatted USD ($__.__)
         */
        formatMoney: (value) => {
            return formatter.format(value);
        }
    }
});


const app = express();


app.engine('handlebars', (hbs.engine));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/', api);
app.use('/', routes);


// Wait for the DB to connect, then start the server
mongoose.connect('mongodb://localhost:27017/week5',{
    useNewURLParser:true
}).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log('listening on port 3000')
})

