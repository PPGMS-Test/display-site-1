import { FC } from "react";

import AddShippingInCreateOrder from "../../components/Toggles/AddShippingInCreateOrder";

const HomePage: FC = () => {
    const codeHighlightStyle = {
        borderRadius: ".25rem",
        padding: ".125rem .25",
        backgroundColor: "#F2F1F1",
        color: "black",
        margin: ".25rem",
        fontWeight: "bold",
    };
    return (
        <div className=" block text-nowrap">
            您可以在 <span style={codeHighlightStyle}>Payment Setting</span> 中,
            选择在<span style={codeHighlightStyle}>Checkout</span>
            页面里需要展示的Payment Method. (如果选择了Apple
            Pay作为显示的支付方式, 那么它虽然会被列出, 但是需要您的设备支持Apple
            Pay)
            {/* <AddShippingInCreateOrder /> */}
        </div>
    );
};

export default HomePage;
