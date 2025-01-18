export const isUsernameValid = (username: string) => {
  return username.length > 0;
};

export const isPasswordValid = (password: string) => {
  return password.length > 0;
};

export const isEmpty = (input: string) => {
  return input.trim().length === 0;
};