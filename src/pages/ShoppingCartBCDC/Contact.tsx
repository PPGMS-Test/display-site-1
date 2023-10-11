
import { User } from "../../interface/user/User";
import { Address } from "../../interface/address/Address";
// import user_data from "../../Mock/Person/Tom.json";
// import address_data from "../../Mock/Address/TomAddress.json";
import { FC } from "react";
import classNames from "classnames";
import UseMoreSpace from "../../components/Toggles/UseMoreSpaceToggle";
import { useAppSelector } from "../../typeHooks";

//[2023-10-08 BCDB 一定要下拉式的]
const Contact: FC = () => {
    const user: User = useAppSelector(
        (state) => state.buyerInfo.Contact
    ) as User;
    const address: Address = useAppSelector(
        (state) => state.buyerInfo.Address
    ) as Address;


    const isUseMoreSpace: boolean = useAppSelector(
        (state) => state.isMoreSpace.useMoreSpace
    );

    return (
        <div>
            <UseMoreSpace />
            {/* <p>当前的值:{` ${isUseMoreSpace}`}</p> */}

            <div
                className={classNames({
                    "text-base leading-7 text-gray-600": true,
                    "space-y-6 py-8": isUseMoreSpace,
                })}
            >
                <p className="text-gray-400 font-extrabold">Contact</p>
                {/* ------------- 电话--------------*/}
                <div>
                    <p className="item-center text-gray-400 font-normal">
                        Phone Number
                    </p>
                    <p className="ml-4">
                        <code className="text-sm font-bold text-gray-900">
                            {user.Phone}
                        </code>
                    </p>
                </div>
                {/* ------------- 邮箱 --------------*/}
                <div>
                    <p className="item-center text-gray-400 font-normal">
                        Email Address
                    </p>
                    <p className="ml-4">
                        <code className="text-sm font-bold text-gray-900">
                            {user.EmailAddress}
                        </code>
                    </p>
                </div>

                <p className="text-gray-400 font-extrabold">Ship To</p>

                <ul
                    className={classNames({
                        "space-y-4": isUseMoreSpace,
                    })}
                >
                    {/* ------------- 第一行 --------------*/}
                    <li className="flex flex-col ">
                        <p className="item-center text-gray-400 font-normal">
                            Address Line 1
                        </p>
                        <p className="ml-4">
                            <code className="text-sm font-bold text-gray-900">
                                {address.Address1}
                            </code>
                        </p>
                    </li>
                    {/* ------------- 第二行 --------------*/}
                    <li className="flex flex-col ">
                        <p className="item-center text-gray-400 font-normal">
                            Address Line 2
                        </p>
                        <p className="ml-4">
                            <code className="text-sm font-bold text-gray-900">
                                {address.Address2}
                            </code>
                        </p>
                    </li>
                    {/* ------------- 第三行 --------------*/}
                    <li className="flex flex-col ">
                        <p className="item-center text-gray-400 font-normal">
                            Nation and City
                        </p>
                        <p className="ml-4">
                            <code className="text-sm font-bold text-gray-900">
                                {address.City} - {address.Province} -{" "}
                                {address.Country}
                            </code>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Contact;
