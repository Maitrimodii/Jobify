const initialState = {
  employeeId: localStorage.getItem('employeeId') || null,
};


const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMPLOYEE_ID':
      return {
        ...state,
        employeeId: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;