import { FC, useEffect, useState } from "react";
import CodeDisplayAreaPrism from "@/components/CodeDisplayArea/CodeDisplayAreaPrism/CodeDisplayAreaPrism";

const SinglePageTest: FC = () => {
    const [orderId, setOrderID] = useState("");

    return (
        <div>
            SingleTestPage
            <CodeDisplayAreaPrism />
        </div>
    );
};

export default SinglePageTest;
