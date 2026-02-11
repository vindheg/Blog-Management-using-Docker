const express = require('express');
const promClient = require('prom-client');
const sql = require('mysql2');
const app = express();
const PORT = 3000;

// ----------------- Monitoring Setup -----------------
// Collect default Node.js process metrics (CPU, Memory, GC, etc.)
promClient.collectDefaultMetrics({ prefix: 'node_app_' });

// Histogram for tracking HTTP request duration
const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 10]
});

// Middleware to measure request time
app.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on('finish', () => {
        end({ method: req.method, route: req.path, code: res.statusCode });
    });
    next();
});

// Endpoint for Prometheus to scrape metrics
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

// ----------------- Database Connection (Using 'db' service name) -----------------
var con;

function handleDisconnect() {
    con = sql.createConnection({ 
        host: "db", // <-- Service name from docker-compose
        user: "root",
        password: "root_password", 
        database: "blog",
        multipleStatements: true
    });

    con.connect(function(err) {
        if (err) {
            console.log('error connecting to db:', err.message);
            setTimeout(handleDisconnect, 2000); // Retry connection
        } else {
            console.log('Connected to MySQL DB');
        }
    });

    con.on('error', function(err) {
        console.error('Database error:', err.message);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNREFUSED') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
handleDisconnect();


// ----------------- Express Middleware and Routes -----------------
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Retrieve top posts
app.get('/latestBlogs', function(req, res) {
    var retrieve = `SELECT post.pname,user.uname,user.email FROM user,post where user.uid=post.uid ORDER BY post.cat desc LIMIT 5`;
    con.query(retrieve, function(err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

// Insert new post
app.post('/InsertBlog', function(req, res) {
    const { pid, pname, uid, cat } = req.body;
    var i = `INSERT INTO post values(${pid},'${pname}',${uid},'${cat}')`;
    con.query(i, function(err, result) {
        if (err) return res.status(500).send(err.message);
        // Redirect back to the form after successful submission
        res.redirect('/'); 
    });
});

// Delete comment based on id
app.post('/DeleteComment', function(req, res) {
    const { cid } = req.body;
    var c = `DELETE FROM comment where c_id=${cid}`;
    con.query(c, function(err, result) {
        if (err) return res.status(500).send(err.message);
        // Redirect back to the form after successful submission
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
})