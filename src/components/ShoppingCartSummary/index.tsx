import React, { FC } from "react";

const ShoppingCartSummary: FC = () => {
    return (
        <div>
            <div className="flex justify-between mb-4">
                <div className="flex items-center">
                    <img
                        src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                        alt="Product Image"
                        className="mr-4 w-40 h-40"
                    />
                    <div>
                        <h2 className="font-bold">Product Name</h2>
                        <p className="text-gray-700">Product Description</p>
                    </div>
                </div>
                <div className="flex items-center">
                    
                    <div className="mx-4">
                        <input
                            type="number"
                            value="1"
                            className="w-16 text-center"
                        />
                    </div>
                    <span className="font-bold">$19.99</span>
                </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center">
                <span className="font-bold">Subtotal:</span>
                <span className="font-bold">$19.99</span>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span>Taxes:</span>
                <span>$1.00</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center">
                <span className="font-bold">Total:</span>
                <span className="font-bold">$20.99</span>
            </div>
        </div>
    );
};

export default ShoppingCartSummary;
