import axios from 'axios';

export const setEmployeeId = (employeeId) => ({
  type: 'SET_EMPLOYEE_ID',
  payload: employeeId,
});

export const fetchEmployeeId = (token) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('/api/employees/profile', config);
      const employeeId = response.data._id;
      localStorage.setItem('employeeId', employeeId);
      dispatch(setEmployeeId(employeeId));
    } catch (error) {
      console.error(error);
    }
  };
};
