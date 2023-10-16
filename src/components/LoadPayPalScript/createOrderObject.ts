import { BuyerInfo } from "../../reducer/reducers/buyerInfoReducer";
interface ExtendedObj {
    [key: string]: any;
}

const CreateOrderObjectFn = (
    buyerInfo: BuyerInfo,
    isWithShippingOption: boolean = false
) => {
    let payer_info;
    if (buyerInfo) {
        payer_info = {
            name: {
                given_name: buyerInfo.Contact.LastName,
                surname: buyerInfo.Contact.FirstName,
            },
            address: {
                address_line_1: buyerInfo.Address.Address1,
                address_line_2: buyerInfo.Address.Address2,
                admin_area_2: "San Jose",
                admin_area_1: "CA",
                postal_code: buyerInfo.Address.PostalCode,
                country_code: buyerInfo.Address.Country,
            },
            email_address: "petro-test01-us@cctest.com",
            password: "Qq111222333",
            phone: {
                phone_type: "MOBILE",
                phone_number: {
                    national_number: buyerInfo.Contact.Phone,
                },
            },
        };
    }

    let create_order_obj: ExtendedObj = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    // value: baseOrderAmount,
                    value: 15,
                    // currency_code: "EUR",
                    currency_code: "USD",
                },
            },
        ],
    };

    if (isWithShippingOption) {
        create_order_obj.shipping = {
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
        };
    }

    if (buyerInfo) {
        // create_order_obj = Object.assign(create_order_obj, payer_info);
        (create_order_obj as any).payer = payer_info;
    }

    let paypalObject: ExtendedObj = {
        createOrder: function (data: any, actions: any) {
            return actions.order.create(create_order_obj);
        },
    };

    if (isWithShippingOption) {
        paypalObject.onShippingChange = function (data: any, actions: any) {
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
        };
    }
    console.log(JSON.stringify(create_order_obj, null, "  "));
    return paypalObject;
};

export default CreateOrderObjectFn;
