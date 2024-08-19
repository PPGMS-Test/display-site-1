import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import classNames from "classnames";
import exp from "constants";
import { FC } from "react";
import ReactEmbedGist from "react-embed-gist";

const CodeDisplayArea: FC = () => {
    const CodeSampleConstantList = [
       
    ];

    const children = CodeSampleConstantList.map((CodeSampleConstant) => {
        return (
            <ToggleButton
                value={APMMethod}
                key={APMMethod}
                //margin不手动为0话会被设为-1, 看起来很奇怪;加粗字体看起来更清楚些
                style={{ margin: "0px", fontWeight: 700 }}
            >
                {APMMethod}
            </ToggleButton>
        );
    });

    return (
        <div
            className={classNames({
                "relative bg-white px-6 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-3xl sm:rounded-lg sm:px-10":
                    true,
                "pt-10": true,
            })}
        >
            <div className="mx-auto max-w-2xl">
                {/* Divide line in each div */}
                <div className="divide-y divide-gray-300/50">
                    <div>
                        <ToggleButtonGroup
                            size="large"
                            color="primary"
                            value={method}
                            exclusive
                            onChange={handleChange}
                            disabled={isDisable}
                        >
                            {children}
                        </ToggleButtonGroup>
                    </div>

                    {/* https://www.npmjs.com/package/react-embed-gist */}
                    <ReactEmbedGist
                        gist="user-q123/ee71b914500f57517ce0af83e11bab9c"
                        // wrapperClass="gist__bash"
                        // loadingClass="loading__screen"
                        // titleClass="gist__title"
                        // errorClass="gist__error"
                        // contentClass="gist__content"
                        // file=".bash_profile.sh"
                        // loadingFallback={<Loading />}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeDisplayArea;
