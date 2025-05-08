// src/api/materialService.ts
import axiosInstance from './axiosInstance';

export const getMaterials = async (accessToken: string, skip = 0, limit = 20) => {
  if (!accessToken) throw new Error("Access token missing");

  const filterObject = {
    Skip: skip,
    Limit: limit,
    Types: [1],
  };

  const encodedFilter = btoa(JSON.stringify(filterObject));
  console.log("Encoded filter:", encodedFilter);

  const response = await axiosInstance.get(`/Materials/GetAll/?filter=${encodedFilter}`, {
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
  });

  return response.data;
};