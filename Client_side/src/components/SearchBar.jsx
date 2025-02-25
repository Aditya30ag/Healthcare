import React from "react";

function SearchBar() {
  return (
    <div>
      <FormControl>
        <FormLabel>Country</FormLabel>
        <Select placeholder="Select country">
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>
    </div>
  );
}

export default SearchBar;
