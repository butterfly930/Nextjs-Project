import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
    const [value, setValue] = useState("");
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md">
            <Link href="/" className="text-xl font-bold text-blue-900 italic shadow rounded-50 hover:text-green-800">Home Page</Link>
            <div className="flex-1 flex justify-center">
                <input
                    value={value}
                    onChange={onChange}
                    className="w-full max-w-xl px-6 text-gray-900 py-1 mt-5 mb-5 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 text-lg"
                    style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)' }}
                    placeholder="Search any post..."
                />
            </div>
        </header>
    );
}