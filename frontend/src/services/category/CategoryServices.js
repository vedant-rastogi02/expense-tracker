import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getuser } from "../../utils/getuser";


export const addCategoryAPI = async (categoryData) => {
  const token = getuser();

  const { name, type } = categoryData;

  const response = await axios.post(
    `${BASE_URL}/categories/create`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const listCategoriesAPI = async () => {
  const token = getuser();

  const response = await axios.get(
    `${BASE_URL}/categories/lists`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateCategoryAPI = async ({ name, type, id }) => {
     const token = getuser();
      const response = await axios.put(
    `${BASE_URL}/categories/update/${id}`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //Return a promise
  return response.data;
}

export const deleteCategoryAPI = async ({id}) => {
    const token = getuser();
    const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;}