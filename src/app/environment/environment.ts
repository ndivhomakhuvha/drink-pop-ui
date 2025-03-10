export const baseUrl: string = 'http://localhost:8080';
export const productsEndpoints = {
  getAllProducts: `${baseUrl}/products/all`,
};
export const storeEndpoints = {
  getAllStores: `${baseUrl}/stores`,
};

export const waitListEndpoints = {
  signUpForWaitList: `${baseUrl}/waitlist/`,
};
