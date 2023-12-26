var express = require("express");
var app = express();
var moment = require("moment");

var bodyParse = require("body-parser");
app.use(bodyParse.json());

const port = 23009;

const clientID =
    "AbdLhKRGmSLshAiaLdfrdePdMhlnq8n4aRM3p7bwFgYL6FewsYiTGdfviIbTULFVvoIKi4hlyTcbat8S";
const secretKey =
    "EI8c5mSYLjn-9JSGYWSODXySJ3YukZCSt8OIR0Qwu4U6rnvpdgmV-7m2xso_zHDGwb1avA25oH7kqjki";
let PayPal_Auth_Assertion;
const merchantID = "CMHAMMNAXCMGA";

const initPayPalAuth = () => {
    let to_encode = {
        iss: clientID,
        payer_id: merchantID,
    };
    let to_encode_str = JSON.stringify(to_encode);
    let encoded_str = btoa(to_encode_str);
    PayPal_Auth_Assertion = `eyJhbGciOiJub25lIn0=.${encoded_str}.`;
    console.log("PayPal Auth Assertion被初始化了!");
};

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use((req, res, next) => {
    // console.log("当前请求的IP是:", res.ip);
    // console.log("打印当前的请求头:");
    // console.table(res.headers);
    if (req.method === "GET") {
        console.log("当前请求的参数是: GET -", req.url);
    } else if (req.method === "POST") {
        console.log("当前请求的参数是: POST -", req.url);
    }
    next();
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PATCH, PUT, DELETE"
    );
    res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
    next();
});

// app.get('/createOrder', (req, res) => { res.send("Hello") })
app.post("/createOrder", (req, res) => {
    console.log(
        "====================================\r\n[",
        moment().format("YYYY-MM-DD hh:mm:ss"),
        "]\r\n===================================="
    );
    console.log(
        "[createOrder]接口收到数据了!:\r\n\r\n",
        JSON.stringify(req.body, null, "    ")
    );
    const requestBody = req.body;

    fetch("https://api.sandbox.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "PayPal-Partner-Attribution-Id": "PP-Test-Petro",
            Authorization: `Basic ${btoa(`${clientID}:${secretKey}`)}`,
            "PayPal-Request-Id": crypto.randomUUID(),
            "PayPal-Auth-Assertion": PayPal_Auth_Assertion,
        },
        body: JSON.stringify(requestBody),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log("\r\n\r\n[与Paypal服务器通讯后的返回值]:", data);

            // debugger;
            res.send(data);
            // return orderID
        });
});

app.post("/captureOrder", (req, res) => {
    console.log(
        "====================================\r\n[",
        moment().format("YYYY-MM-DD hh:mm:ss"),
        "]\r\n===================================="
    );
    console.log("[captureOrder]接口收到数据了!:", req.body);
    const requestBody = req.body;
    const orderID = requestBody.orderID;
    fetch(
        `https://api.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "PayPal-Partner-Attribution-Id": "PP-Test-Petro",
                Authorization: `Basic ${btoa(`${clientID}:${secretKey}`)}`,
                "PayPal-Auth-Assertion": PayPal_Auth_Assertion,
            },
        }
    )
        .then((res) => res.json())
        .then((data) => {
            console.log("[与Paypal服务器通讯后的返回值]:", data);

            // debugger;
            res.send(data);
            // return orderID
        });
});

app.post("/refund", (req, res) => {
    console.log(
        "====================================\r\n[",
        moment().format("YYYY-MM-DD hh:mm:ss"),
        "]\r\n===================================="
    );
    console.log("[refund]接口收到数据了!:", req.body);
    const requestBody = req.body;
    const transactionID = requestBody.transactionID;
    fetch(
        `https://api.sandbox.paypal.com/v2/checkout/orders/${transactionID}/refund`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "PayPal-Partner-Attribution-Id": "PP-Test-Petro",
                Authorization: `Basic ${btoa(`${clientID}:${secretKey}`)}`,
                "PayPal-Auth-Assertion": PayPal_Auth_Assertion,
            },
            body: JSON.stringify(requestBody),
        }
    )
        .then((res) => res.json())
        .then((data) => {
            console.log("[与Paypal服务器通讯后的返回值]:", data);

            // debugger;
            res.send(data);
            // return orderID
        });
});

app.listen(port, () => {
    initPayPalAuth();
    console.log(`Example app listening on port ${port}!`);
});
