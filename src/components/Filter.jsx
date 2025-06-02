import React, { useState } from "react";

function Filter({ filterData, setFilterData, handleApplyFilter }) {
    const handleChange = (e) => {
        filterData[e.target.name] = e.target.value;
        setFilterData({ ...filterData });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md mb-6 flex flex-wrap gap-8 items-center">
            <select
                name="codeLanguage"
                value = {filterData.codeLanguage}
                className="p-2 rounded-2xl bg-gray-100 dark:bg-gray-700"
                onChange={handleChange}>

                <option value="">Code Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Go">Go</option>
                <option value="Rust">Rust</option>
            </select>

            <select
                name="language"
                value={filterData.language}
                className="p-2 rounded-2xl bg-gray-100 dark:bg-gray-700"
                onChange={handleChange}>

                <option value="">Spoken Language</option>
                <option value="None">None</option>
                <option value="English">English</option>
                <option value="Chinese">Chinese</option>
            </select>

            <select
                name="sortBy"
                value={filterData.sortBy}
                className="p-2 rounded-2xl bg-gray-100 dark:bg-gray-700"
                onChange={handleChange}>

                <option value="">Sort By</option>
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
            </select>

            <input
                type="date"
                name="date"
                value={filterData.date}
                min="2025-05-14"
                max={new Date().toISOString().split("T")[0]}
                className="p-2 rounded-2xl bg-gray-100 dark:bg-gray-700"
                onChange={handleChange} />

            <button
                className="bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-600 transition duration-300"
                onClick={ handleApplyFilter }>
                Apply Filters
            </button>
        </div>
    )
}

export default Filter;