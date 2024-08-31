import { FC, useContext, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { CodeBlockSPBStandard } from "./CodeBlock/CodeBlockSPBStandard";
import {
    CODE_SNIPPET_NAME,
    PrismDisplayContext,
    PrismThemeNAME,
} from "./PrismDisplayContextProvider";
import { CodeBlockCreateOrderRequest_1 } from "./CodeBlock/CodeBlockCreateOrderRequest_1";
import { CodeBlockSPBBNPL } from "./CodeBlock/CodeBlockSPBBNPL";
import { CodeBlockACDC } from "./CodeBlock/CodeBlockACDC";

const CodeDisplayAreaPrismDisplay: FC = () => {
    const { codeSnippetName, prismTheme, languageType } =
        useContext(PrismDisplayContext);

    const getCode = () => {
        switch (codeSnippetName) {
            case CODE_SNIPPET_NAME.SPB_STANDARD:
                return CodeBlockSPBStandard;
                break;
            case CODE_SNIPPET_NAME.SPB_BNPL:
                return CodeBlockSPBBNPL;
                break;
            case CODE_SNIPPET_NAME.ACDC:
                return CodeBlockACDC;
                break;

            case CODE_SNIPPET_NAME.CREATE_ORDER_REQUEST_1:
                return CodeBlockCreateOrderRequest_1;
                break;

            default:
                break;
        }
        return "";
    };

    const getTheme = (themes: any) => {
        return themes[prismTheme];
    };

    return (
        <>
            {/* {languageType} */}
            <Highlight
                theme={getTheme(themes)}
                code={getCode()}
                language={languageType}                
            >
                {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                }) => (
                    <pre style={style}>
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                                <span>{i + 1}</span>
                                {line.map((token, key) => (
                                    <span
                                        key={key}
                                        {...getTokenProps({
                                            token,
                                        })}
                                    />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </>
    );
};

export default CodeDisplayAreaPrismDisplay;
