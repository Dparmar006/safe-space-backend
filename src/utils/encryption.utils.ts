import bcryptjs from "bcryptjs";

export const hashString = async (str: string, salt: string | number = 12) => {
  return await bcryptjs.hash(str, salt);
};

export const compareHashString = async (
  plainString: string,
  hashedString: string
) => {
  return await bcryptjs.compare(plainString, hashedString);
};
