import { User } from "../../interface/user/User";
import { Address } from "../../interface/address/Address";
import {
    BuyerInfo,
    setBuyerInfoContactPhone,
    setBuyerInfoContactEmailAddress,
    setBuyerInfoContactFirstName,
    setBuyerInfoContactLastName,
    setBuyerInfoContactGender,
    setBuyerInfoAddressAddress1,
    setBuyerInfoAddressAddress2,
    setBuyerInfoAddressCity,
    setBuyerInfoAddressCountry,
    setBuyerInfoAddressProvince,
    setBuyerInfoAddressPostalCode,
} from "../../reducer/reducers/buyerInfoReducer";
// import user_data from "../../Mock/Person/Tom.json";
// import address_data from "../../Mock/Address/TomAddress.json";
import { FC } from "react";
import classNames from "classnames";
import UseMoreSpace from "../../components/Toggles/UseMoreSpaceToggle";
import { useAppDispatch, useAppSelector } from "../../typeHooks";
import { Input, TextField } from "@mui/material";
import {
    getBuyerInfo,
    setBuyerInfo,
} from "../../reducer/reducers/buyerInfoReducer";

//[2023-10-08 BCDB 一定要下拉式的]
const Contact: FC = () => {
    const dispatch = useAppDispatch();
    const user: User = useAppSelector(
        (state) => getBuyerInfo(state).Contact
    ) as User;
    const address: Address = useAppSelector(
        (state) => getBuyerInfo(state).Address
    ) as Address;

    const isUseMoreSpace: boolean = useAppSelector(
        (state) => state.isMoreSpace.useMoreSpace
    );

    const NationCityDivClassName = "w-20 mt-2 mb-1";

    const handleChange = (event: any) => {
        const attributeID = event.target.id;
        console.log(attributeID);
        const value = event.target.value;
        console.log(value);

        let oContact = user;
        // @ts-ignore
        oContact[attributeID] = value;

        let oAddress = address;
        let oBuyerInfo: BuyerInfo = {
            Contact: oContact,
            Address: oAddress,
        };

        // dispatch(event.target.value);
    };

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
                  {/* ------------- Name--------------*/}
                <div>
                    <p className="item-center text-gray-400 font-normal">
                        Name
                    </p>
                    <div className="flex flex-wrap">
                    <p className="ml-4">
                        <TextField
                            id="FirstName"
                            value={user.FirstName}
                            color="secondary"
                            size="small"
                            className="w-24"
                            label="FirstName"
                            onChange={(event) => {
                                // const attributeID = event.target.id;
                                // console.log(attributeID);
                                const value = event.target.value;

                                // console.log(value);
                                dispatch(setBuyerInfoContactFirstName(value));
                            }}
                        ></TextField>
                    </p>
                    <p className="ml-4">
                        <TextField
                            id="LastName"
                            value={user.LastName}
                            color="secondary"
                            size="small"
                            className=" w-28"
                            label="LastName"
                            onChange={(event) => {
                                // const attributeID = event.target.id;
                                // console.log(attributeID);
                                const value = event.target.value;

                                // console.log(value);
                                dispatch(setBuyerInfoContactLastName(value));
                            }}
                        ></TextField>
                    </p>

                    </div>


                    
                </div>
                {/* ------------- 电话--------------*/}
                <div>
                    <p className="item-center text-gray-400 font-normal">
                        Phone Number
                    </p>
                    <p className="ml-4">
                        <TextField
                            id="Phone"
                            value={user.Phone}
                            color="secondary"
                            size="small"
                            className="text-sm font-bold text-gray-900"
                            onChange={(event) => {
                                // const attributeID = event.target.id;
                                // console.log(attributeID);
                                const value = event.target.value;

                                // console.log(value);
                                dispatch(setBuyerInfoContactPhone(value));
                            }}
                        ></TextField>
                    </p>
                </div>
                {/* ------------- 邮箱 --------------*/}
                <div>
                    <p className="item-center text-gray-400 font-normal">
                        Email Address
                    </p>
                    <p className="ml-4">
                        <TextField
                            id="EmailAddress"
                            value={user.EmailAddress}
                            size="small"
                            fullWidth
                            className="text-sm font-bold text-gray-900"
                            onChange={(event) => {
                                // const attributeID = event.target.id;
                                // console.log(attributeID);
                                const value = event.target.value;

                                // console.log(value);
                                dispatch(
                                    setBuyerInfoContactEmailAddress(value)
                                );
                            }}
                        ></TextField>
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
                            <TextField
                                id="Address1"
                                value={address.Address1}
                                size="small"
                                fullWidth
                                className="text-sm font-bold text-gray-900"
                                onChange={(event) => {
                                    // const attributeID = event.target.id;
                                    // console.log(attributeID);
                                    const value = event.target.value;

                                    // console.log(value);
                                    dispatch(
                                        setBuyerInfoAddressAddress1(value)
                                    );
                                }}
                            ></TextField>
                        </p>
                    </li>
                    {/* ------------- 第二行 --------------*/}
                    <li className="flex flex-col ">
                        <p className="item-center text-gray-400 font-normal">
                            Address Line 2
                        </p>
                        <p className="ml-4">
                            <TextField
                                id="Address2"
                                value={address.Address2}
                                size="small"
                                fullWidth
                                className="text-sm font-bold text-gray-900"
                                onChange={(event) => {
                                    // const attributeID = event.target.id;
                                    // console.log(attributeID);
                                    const value = event.target.value;

                                    // console.log(value);
                                    dispatch(
                                        setBuyerInfoAddressAddress2(value)
                                    );
                                }}
                            ></TextField>
                        </p>
                    </li>
                    {/* ------------- 第三行 --------------*/}
                    <li className="flex flex-col ">
                        <p className="item-center text-gray-400 font-normal">
                            Nation and City
                        </p>
                        <div className="ml-4 pb-2 pt-1 flex flex-wrap">
                            <div className={NationCityDivClassName}>
                                <TextField
                                    id="Address1"
                                    value={address.City}
                                    size="small"
                                    label="City"
                                    className="text-sm font-bold text-gray-900 w-20 m-2"
                                    onChange={(event) => {
                                        // const attributeID = event.target.id;
                                        // console.log(attributeID);
                                        const value = event.target.value;

                                        // console.log(value);
                                        dispatch(
                                            setBuyerInfoAddressCity(value)
                                        );
                                    }}
                                ></TextField>
                            </div>
                            <p className="mt-2 mb-1"> &nbsp; - &nbsp; </p>
                            <div className={NationCityDivClassName}>
                                <TextField
                                    id="Province"
                                    value={address.Province}
                                    size="small"
                                    label="Province"
                                    className="text-sm font-bold text-gray-900 w-20 m-2"
                                    onChange={(event) => {
                                        // const attributeID = event.target.id;
                                        // console.log(attributeID);
                                        const value = event.target.value;

                                        // console.log(value);
                                        dispatch(
                                            setBuyerInfoAddressProvince(value)
                                        );
                                    }}
                                ></TextField>
                            </div>
                            <p className="mt-2 mb-1"> &nbsp; - &nbsp; </p>

                            <div className={NationCityDivClassName}>
                                <TextField
                                    id="Country"
                                    value={address.Country}
                                    size="small"
                                    label="Country"
                                    className="text-sm font-bold text-gray-900 w-20 m-2"
                                    onChange={(event) => {
                                        // const attributeID = event.target.id;
                                        // console.log(attributeID);
                                        const value = event.target.value;

                                        // console.log(value);
                                        dispatch(
                                            setBuyerInfoAddressCountry(value)
                                        );
                                    }}
                                ></TextField>
                            </div>
                            <p className="mt-2 mb-1"> &nbsp; - &nbsp; </p>
                            <div className="mt-2 mb-1 w-24">
                                <TextField
                                    id="PostalCode"
                                    value={address.PostalCode}
                                    size="small"
                                    label="PostalCode"
                                    onChange={(event) => {
                                        // const attributeID = event.target.id;
                                        // console.log(attributeID);
                                        const value = event.target.value;

                                        // console.log(value);
                                        dispatch(
                                            setBuyerInfoAddressPostalCode(value)
                                        );
                                    }}
                                ></TextField>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Contact;
