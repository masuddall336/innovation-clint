// components/Spinner.jsx
import React from "react";

const Spinner = () => (
    <div className="flex justify-center items-center py-10">
        <div className="w-16 h-16 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
    </div>
);

export default Spinner;