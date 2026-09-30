import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getuser } from "../../utils/getuser";
import { useNavigate } from "react-router-dom";




export const addTransactionAPI = async (transactionData) => {
  const token = getuser();

  const { type, amount, category, date, description } = transactionData;

  const response = await axios.post(
    `${BASE_URL}/transactions/create`,
    {
      type,
      amount,
      category,
      date,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const listTransactionsAPI = async (filters) => {
  const token = getuser();

  const response = await axios.get(
    `${BASE_URL}/transactions/lists`,
    {
        params: {startDate: filters.startDate, endDate: filters.endDate, type: filters.type, category: filters.category},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; 

 
};




export const deleteTransactionAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/transactions/delete/${id}`, {
    withCredentials: true,
  });

  return response.data;
 }