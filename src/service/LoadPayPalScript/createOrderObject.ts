import { Shipping } from './../../interface/Shipping/Shipping';
import store from "../../reducer/store";
import CreateOrder from '../OrderV2/CreateOrderAPI';
import CaptureOrderAPI from '../OrderV2/CaptureOrderAPI';
import { BuyerInfo } from '../../reducer/reducers/buyerInfoReducer';
import { ShoppingCartItem } from '../../reducer/reducers/shoppingCartReducer';
import { CurrentShippingOption } from '../../reducer/reducers/shippingOptionReducer';


let state;
let buyerInfo: BuyerInfo;
let isWithShipping: boolean;
let currentShippingOption: CurrentShippingOption;
let ShippingOptionList: Shipping[];
let ShoppingCartList: ShoppingCartItem[];

// debugger;

interface ExtendedObj {
    [key: string]: any;
}

function getProductsTotalPrice() {
    let totalPrice = 0
    ShoppingCartList.forEach(item => {
        totalPrice += item.totalValue || 0
    })
    totalPrice += currentShippingOption.Price;
    return totalPrice
}

function assembleCreateOrderOject() {
    const baseOrderAmount = getProductsTotalPrice();

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
                    value: baseOrderAmount,
                    // currency_code: "EUR",
                    currency_code: "USD",
                },
            },
        ],
    };

    // let reformatShippingOption: { id: string; label: string; type: string; selected: boolean; amount: { value: number; currency_code: string; }; }[] = [];
    let reformatShippingOption: any[] = [];


    //TODO//待完成
    //这里有bug
    ShippingOptionList.forEach(item => {
        reformatShippingOption.push({
            id: item.Id,
            label: item.Label,
            type: item.Type,
            selected: item.Id === currentShippingOption.Id ? true : false,
            amount: {
                value: item.Value,
                currency_code: item.CurrencyCode,
            },
        })
    })

    if (isWithShipping) {
        create_order_obj.shipping = {
            options: reformatShippingOption
        };
    }

    if (buyerInfo) {
        //这是不正确的
        // create_order_obj = Object.assign(create_order_obj, payer_info);
        //正确的
        (create_order_obj as any).payer = payer_info;
    }
    return create_order_obj;
}

const CreateOrderObjectFn = (callbackFnSet: any) => {
    const { navigate, getLink } = callbackFnSet;
    // debugger;

    state = store.getState();
    buyerInfo = state.buyerInfo;
    isWithShipping = state.withShippingOption.isWithShipping;
    currentShippingOption = state.withShippingOption.CurrentShippingOption;
    ShippingOptionList = state.withShippingOption.ShippingOptionList;
    ShoppingCartList = state.shoppingCart.list;
    // debugger;
    const create_order_obj = assembleCreateOrderOject();
    //查看请求体
    // console.log(JSON.stringify(create_order_obj, null, "  "));
    // debugger;

    let paypalObject: ExtendedObj = {
        createOrder: function () {
            return CreateOrder(create_order_obj);
        },
        onApprove: async function (data: any, actions: any) {
            await CaptureOrderAPI();
            setTimeout(() => {
                // debugger;
                navigate(getLink())
            }, 1800)
        },
        onCancel: function (data: any) {
            // window.alert("Cancel!")
            // window.close();
            // Show a cancel page, or return to cart
        },
    };

    //TODO//待完成
    //物流运费功能还没搞定, 会报错
    if (isWithShipping) {
        paypalObject.onShippingChange = function (data: any, actions: any) {
            debugger;
            data.amount.value =
                (
                    getProductsTotalPrice() + parseFloat(data.selected_shipping_option.amount.value)
                ).toFixed(2);
            console.log("[onShippingChange]data.amount.value", data.amount.value);

            let patchObject = actions.order.patch([
                {
                    op: "replace",
                    path: "/purchase_units/@reference_id=='default'/amount",
                    value: {
                        value: data.amount.value,
                        currency_code: "USD",
                    },
                },
            ]);
            debugger;
            return patchObject;
        };
    }

    return paypalObject;
};

export default CreateOrderObjectFn;
