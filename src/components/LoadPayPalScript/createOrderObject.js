const CreateOrderObject = {
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        // value: baseOrderAmount,
                        value: 15,
                        // currency_code: "EUR",
                        currency_code: "USD",
                    },
                    shipping: {
                        options: [
                            {
                                id: "SHIP_123",
                                label: "Free Shipping",
                                type: "SHIPPING",
                                selected: true,
                                amount: {
                                    value: "3.00",
                                    currency_code: "USD",
                                },
                            },
                        ],
                    },
                },
            ],
        });
    },
    onShippingChange: function (data, actions) {
        debugger;
        data.amount.value =
            // parseFloat(baseOrderAmount) +
            (
                15 + parseFloat(data.selected_shipping_option.amount.value)
            ).toFixed(2);
        console.log("data.amount.value", data.amount.value);

        let obj = actions.order.patch([
            {
                op: "replace",
                path: "/purchase_units/@reference_id=='default'/amount",
                value: {
                    value: data.amount.value,
                    // value: 88,
                    currency_code: "USD",
                },
            },
        ]);
        debugger;
        return obj;
    },
};

export default CreateOrderObject;
