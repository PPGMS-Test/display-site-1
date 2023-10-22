import React, { FC } from "react";
import "./App.css";
import { Link } from "react-router-dom";

const App: FC = () => {
    return (
        <div className=" m-auto">
            <div className=" w-auto px-2 m-4">
                <button className="w-full bg-yellow-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                    <Link to="/display">Go To Display</Link>
                </button>
            </div>
            <div className="w-auto px-2 m-4">
                <button className="w-full bg-blue-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                    <Link to="/lab">Go To Lab</Link>
                </button>
            </div>
        </div>
    );
};

export default App;
