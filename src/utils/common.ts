export const getBackendApiUrl = () => import.meta.env.VITE_BACKEND_BASE_URL;

export const getBackendFilesUrl = () => import.meta.env.VITE_BACKEND_FILES_URL;

export const isValidDate = (dateString: string): boolean => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;
  return dateRegex.test(dateString);
};
