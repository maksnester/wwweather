export const getMessageFromError = (error: unknown) => {
  if ((error as any)?.response?.data) {
    return JSON.stringify((error as any).response.data);
  }
  return (error instanceof Error && error.message) || "Something went wrong";
};
