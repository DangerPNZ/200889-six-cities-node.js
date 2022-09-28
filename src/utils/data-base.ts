export const getURI = (
  userName: string,
  password: string,
  host: string,
  port: number,
  dataBaseName: string
): string => `mongodb://${userName}:${password}@${host}:${port}/${dataBaseName}?authSource=admin`;
