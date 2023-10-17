import { FC } from "react";

import ShoppingCartSummary from "../../components/ShoppingCartSummary";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "../../components/ShoppingCartDraw";
import ProductDetail from "./productDetail";

const Product: FC = () => {
    const content = (
        <div>
            <div className="flex flex-col  min-h-screen">
                <div className="bg-gray-100 rounded-lg shadow-lg p-6">
                    <ShoppingCartSummary />
                </div>
            </div>
        </div>
    );

    //TODO
    //TODO
    const icon = (<div className="">
        
    </div>);

    return (
        <div className=" w-full mx-auto">
            <div className=" bg-blue-600 h-20 w-full mx-auto">
                <Drawer
                    position={"right"}
                    icon={<Bars3Icon className=" h-12"/>}
                    content={content}
                />
            </div>

            <div className="bg-gray-100 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ProductDetail />
                </div>
            </div>
        </div>
    );
};

export default Product;
