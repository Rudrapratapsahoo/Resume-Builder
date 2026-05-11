export const formatDate = (
  dateString
) => {
  return new Date(
    dateString
  ).toLocaleDateString();
};

export const capitalize = (
  text
) => {
  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
};