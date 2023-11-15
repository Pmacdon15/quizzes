const sql = require('mssql');

const config = {
    user: 'pmacd',
    password: 'asdfghjkl3388',
    server: 'Workstation',
    database: 'test',
    options: {
        encrypt: true
    }
};

sql.connect(config, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected to SQL Server');
});
