import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import JobCard from '../components/JobCard';
import Filter from '../components/Filter';
import SelectedJobs from '../components/SelectedJobs';

const Application = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const buttonName = "View Application"
  const [filters,setFilters] = useState({
    position:'',
    workLocation:'',
    workType:'',
    keyWordSearch:'',
    sort:'',
  })

  const [pagination,setPagination] = useState({
    page:1,
    pageSize:10,
  })

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

        const response = await axios.get('/api/jobs/get-my-job', config)
        setJobs(response.data.jobs);
        console.log(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pagination,filters,selectedJob]);

  const handleViewEmployees = (job) => {
    setSelectedJob(job);
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
  };

  const handleFilterChange = (filterName,value) =>{
    setFilters((prevFilters)=>({...prevFilters,[filterName]:value}))
    setPagination((prevPagination)=>({...prevPagination,page:1}))
  }

  const handleSortChange = (value) =>{
    setFilters((prevFilters)=>({...prevFilters,sort:value}))
  }

  const handleSearchChange = (value) =>{
    setFilters((prevFilters) => ({ ...prevFilters, keyWordSearch: value }));
    setPagination((prevPagination) => ({ ...prevPagination, page: 1 }));
  }

  const handlePageChange = (direction) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: direction === 'next' ? prevPagination.page + 1 : prevPagination.page - 1,
    }));
  };
  return (
    <div>
      {selectedJob ? (
        <SelectedJobs selectedJob={selectedJob} handleBackToJobs={handleBackToJobs}/>
            ) : (
        <>
          <div className='flex'>
              <div className='w-1/4'>
                <Filter 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                  onSearchChange={handleSearchChange}
                />
              </div>
              <div className='w-3/4'>
                <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-6 sm:py-12">
                  <JobCard  
                    jobs = {jobs} 
                    handleSelected={handleViewEmployees} 
                    onPageChange={handlePageChange}
                    buttonName={buttonName}
                    page={pagination.page}
                  />
                </div>
              </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Application;