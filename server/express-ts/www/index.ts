import { randomUUID } from 'crypto';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 23009;

const clientID = "AbdLhKRGmSLshAiaLdfrdePdMhlnq8n4aRM3p7bwFgYL6FewsYiTGdfviIbTULFVvoIKi4hlyTcbat8S";
const secretKey = "EI8c5mSYLjn-9JSGYWSODXySJ3YukZCSt8OIR0Qwu4U6rnvpdgmV-7m2xso_zHDGwb1avA25oH7kqjki";

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use((req, res, next) => {
    // console.log("当前请求的IP是:", res.ip);
    // console.log("打印当前的请求头:");
    // console.table(res.headers);
    if (req.method === "GET") {
        console.log("当前请求的参数是: GET -", req.url)
    } else if (req.method === "POST") {
        console.log("当前请求的参数是: POST -", req.url)
    }
    next()
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
});


// app.get('/createOrder', (req, res) => { res.send("Hello") })
app.post('/createOrder', (req, res) => {
    console.log("[createOrder]接口收到数据了!:", req.body);
    const requestBody = req.body;

    fetch("https://api.sandbox.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "PayPal-Partner-Attribution-Id": "PP-Test-Petro",
            Authorization: `Basic ${btoa(
                `${clientID}:${secretKey}`
            )}`,
            "PayPal-Request-Id": randomUUID()
        },
        body: JSON.stringify(requestBody),
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log("[与Paypal服务器通讯后的返回值]:", data)
        console.log("====================================")
        // debugger;
        res.send(data)
        // return orderID
    });
});
app.post("/captureOrder", (req, res) => {
    console.log("[captureOrder]接口收到数据了!:", req.body);
    const requestBody = req.body;
    const orderID = requestBody.orderID
    fetch(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "PayPal-Partner-Attribution-Id": "PP-Test-Petro",
            Authorization: `Basic ${btoa(
                `${clientID}:${secretKey}`
            )}`,
        }
    }).then(res => res.json()).then(data => {
        console.log("[与Paypal服务器通讯后的返回值]:", data)
        console.log("====================================")
        // debugger;
        res.send(data)
        // return orderID
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));