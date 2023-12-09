const express = require('express');
const app = express();
const port = 4000;
const expressHbs = require('express-handlebars');
const Handlebars = require('handlebars');

Handlebars.registerHelper('if_eq', function (a, b, options) {
    if (a == b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

app.use(express.static(__dirname + '/html'));

app.engine('hbs', expressHbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'layout',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    }, 
    helpers: {
        showDate: (date) => {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        showIndex: (index) => index + 1,
    }
}));
app.set('view engine', 'hbs');

// Cau hinh de doc du lieu gui len theo phuong thuc POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.redirect('/danh-sach'));
app.use('/danh-sach', require('./routes/wardRouter'));

app.get('/createTables', (req, res) => {
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('Tables created!');
    });
});
// app.set('view engine', 'hbs');
app.listen(port, () => console.log(`Example app listening on port ${port}!`));