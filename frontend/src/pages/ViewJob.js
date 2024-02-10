import React, { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import Job from '../components/Job';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ViewJob = () => {
  // State variables
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    position: '',
    workLocation: '',
    workType: '',
    keyWordSearch: '',
    sort: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [showFilter, setShowFilter] = useState(true);

  // Redux state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Fetch data effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
          params: {
            ...filters,
            page: pagination.page,
            pageSize: pagination.pageSize,
          },
        };

        const response = await axios.get('/api/jobs/all-jobs', config);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [filters, pagination]);

  // Event Handlers
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
  };

  const handleSortChange = (value) => {
    setFilters((prevFilters) => ({ ...prevFilters, sort: value }));
  };

  const handleSearchChange = (value) => {
    setFilters((prevFilters) => ({ ...prevFilters, keyWordSearch: value }));
    setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
  };

  const handlePageChange = (direction) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: direction === 'next' ? prevPagination.page + 1 : prevPagination.page - 1,
    }));
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  // Component Rendering
  return (
    <>
      <button
        onClick={toggleFilter}
        className="block md:hidden bg-blue-500 text-white py-2 px-4 mt-4 mb-2 mx-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        {showFilter ? 'Hide Filter' : 'Show Filter'}
      </button>
      <div className='flex'>
        <div className={`w-full md:w-1/4 ${showFilter ? 'block' : 'hidden md:block'}`}>
          <Filter
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className={`w-full p-25 md:w-3/4 md:pl-4 ${showFilter ? 'hidden md:block' : 'block'}`}>
          <Job jobs={jobs} onPageChange={handlePageChange} page={pagination.page} />
        </div>
      </div>
    </>
  );
};

export default ViewJob;
