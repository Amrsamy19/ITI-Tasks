export const checkAuth = (book, user) => {
  return book.createdBy === user.id || user.role === "admin";
};
