import CircleCheckMark from "../../components/svgIcon/CircleCheckMark";
import { User } from "../../interface/user/User";
import { Address } from "../../interface/address/Address";
import user_data from "../../Mock/Person/Tom.json";
import address_data from "../../Mock/Address/TomAddress.json";
import { FC } from "react";

type Props = {
  userInfo: User;
  addressInfo: Address;
};

// const Part = ({ userInfo: User, addressInfo: Address }: Props) => {
const Part:FC = () => {
  const user: User = user_data as User;
  const address: Address = address_data as Address;
  //   console.log(user.Gender);

  return (
    <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
      <p className="text-gray-400 font-extrabold">Contact</p>
        {/* ------------- 电话--------------*/}
      <div>
        <p className="item-center text-gray-400 font-normal">Phone Number</p>
        <p className="ml-4">
          <code className="text-sm font-bold text-gray-900">{user.Phone}</code>
        </p>
      </div>
      {/* ------------- 邮箱 --------------*/}
      <div>
        <p className="item-center text-gray-400 font-normal">Email Address</p>
        <p className="ml-4">
          <code className="text-sm font-bold text-gray-900">{user.EmailAddress  }</code>
        </p>
      </div>

      <p className="text-gray-400 font-extrabold">Ship To</p>

      <ul className="space-y-4">
        {/* ------------- 第一行 --------------*/}
        <li className="flex flex-col ">
          <p className="item-center text-gray-400 font-normal">Address Line 1</p>
          <p className="ml-4">
            <code className="text-sm font-bold text-gray-900">
              {address.Address1}
            </code>
          </p>
        </li>
        {/* ------------- 第二行 --------------*/}
        <li className="flex flex-col ">
          <p className="item-center text-gray-400 font-normal">Address Line 2</p>
          <p className="ml-4">
            <code className="text-sm font-bold text-gray-900">
              {address.Address2}
            </code>
          </p>
        </li>
        {/* ------------- 第三行 --------------*/}
        <li className="flex flex-col ">
          <p className="item-center text-gray-400 font-normal" >Nation and City</p>
          <p className="ml-4">
            <code className="text-sm font-bold text-gray-900">
              {address.City} - {address.Province} - {address.Country}
            </code>
          </p>
        </li>
      </ul>
     
    </div>
  );
};
export default Part;
