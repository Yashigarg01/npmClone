import axios from 'axios';

const BASE_URL = 'https://registry.npmjs.org';

export const getPackageVersion = async (packageName: string, version: string) => {
    try {
      const response = await axios.get(`${BASE_URL}${packageName}/${version}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch package version details');
    }
  };

// Function to search for NPM packages
export const searchPackages = async (query: string) => {
  const response = await axios.get(`https://registry.npmjs.org/-/v1/search`, {
    params: { text: query },
  });
  return response.data;
};

// Function to get package details
export const getPackageDetails = async (packageName: string) => {
  const response = await axios.get(`${BASE_URL}/${packageName}`);
  return response.data;
};

// Function to get a specific version of the package
export const getPackageVersionDetails = async (packageName: string, version: string) => {
  const response = await axios.get(`${BASE_URL}/${packageName}/${version}`);
  return response.data;
};
