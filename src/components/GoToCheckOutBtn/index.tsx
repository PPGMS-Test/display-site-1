import { FC } from "react";
import { Link } from "react-router-dom";

const GoToCheckOutBtn: FC = () => {
    return (
        <div className="w-1/2 px-2">
            <button className="w-full bg-yellow-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                <Link to="/shoppingCartBCDC">Go To Checkout</Link>
            </button>
        </div>
    );
};
export default GoToCheckOutBtn;
