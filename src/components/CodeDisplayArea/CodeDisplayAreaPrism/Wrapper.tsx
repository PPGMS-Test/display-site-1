import { FC, useState } from "react";
import classNames from "classnames";
import CodeDisplayAreaPrism from "./CodeDisplayAreaPrism";
import CodeDisplayAreaPrismDisplay from "./PrismDisplay";

const CodeDisplayAreaPrismWrapper: FC = () => {
    return (
        <>
            <div
                className={classNames({
                    "relative bg-white pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-3xl sm:rounded-lg sm:px-10":
                        true,
                    "pt-10": true,
                })}
            >
                <div className="mx-auto max-w-2xl">
                    {/* Divide line in each div */}
                    <div className="divide-y divide-gray-300/50">
                       <CodeDisplayAreaPrismDisplay/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CodeDisplayAreaPrismWrapper;
