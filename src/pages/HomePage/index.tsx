import { FC } from "react";

import AddShippingInCreateOrder from "../../components/Toggles/AddShippingInCreateOrder";

const HomePage: FC = () => {
    return (
        <div className=" block">
            Home Page
            <AddShippingInCreateOrder />
        </div>
    );
};

export default HomePage;
