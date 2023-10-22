import { getTransactionID } from "../reducer/reducers/orderReducer";
import { useAppSelector } from "../typeHooks";

const Thankyou = () => {
    const transactionID = useAppSelector((state) => getTransactionID(state));

    return (
        <div id="thank-you-page">
            <h1>Thank You For your purchase!</h1>

            <p>
                Your transaction
                <i>{transactionID}</i> is Complete!
            </p>
        </div>
    );
};

export default Thankyou;
