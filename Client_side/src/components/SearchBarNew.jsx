import React from 'react'

function SearchBarNew() {
  return (
    <div className="flex items-center border-b border-gray-500 rounded-3xl ">
    <div className="flex items-center px-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M3.6 10.7a7 7 0 1010-10 7 7 0 00-10 10z"
        />
      </svg>
    </div>
    <input
      type="text"
      placeholder="Search  ..."
      className="w-full px-3 py-2 font-semibold leading-tight text-gray-700 focus:outline-none"
    />
  </div>

  )
}

export default SearchBarNew
