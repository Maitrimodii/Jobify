import React from 'react';

const Filter = ({ filters, onFilterChange, onSortChange, onSearchChange }) => {
  // Handle change in filter values
  const handleFilterChange = (filterName, e) => {
    onFilterChange(filterName, e.target.value);
  };

  // Handle change in search input
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  // Handle change in sort option
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 mb-4 p-4 bg-gray-100 rounded-md h-screen">
      {/* Filter Jobs label */}
      <label className="text-lg font-semibold">Filter Jobs</label>

      {/* Profile filter */}
      <div className="flex flex-col gap-2">
        <label className="text-bold-sm">Profile</label>
        <input
          type="text"
          placeholder="e.g., Marketing"
          value={filters.position}
          onChange={(e) => handleFilterChange('position', e)}
          className="border p-2 rounded-md"
        />
      </div>

      {/* Location filter */}
      <div className="flex flex-col gap-2">
        <label className="text-bold-sm">Location</label>
        <input
          type="text"
          placeholder="e.g., Mumbai"
          value={filters.workLocation}
          onChange={(e) => handleFilterChange('workLocation', e)}
          className="border p-2 rounded-md"
        />
      </div>

      {/* Work Type filter */}
      <div className="flex flex-col gap-2">
        <label className="text-bold-sm">Work Type</label>
        <select
          value={filters.workType}
          onChange={(e) => handleFilterChange('workType', e)}
          className="border p-2 rounded-md"
        >
          <option value="">Select Work Type</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      {/* Keyword Search filter */}
      <div className="flex flex-col gap-2">
        <label className="text-bold-sm">Keyword Search</label>
        <input
          type="text"
          placeholder="Enter keywords"
          value={filters.keyWordSearch}
          onChange={handleSearchChange}
          className="border p-2 rounded-md"
        />
      </div>

      {/* Sort By filter */}
      <div className="flex flex-col gap-2">
        <label className="text-bold-sm">Sort By</label>
        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="border p-2 rounded-md"
        >
          <option value="">Sort by</option>
          <option value="oldest">Oldest</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
