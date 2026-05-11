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
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
export const initials = (name = "") => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};