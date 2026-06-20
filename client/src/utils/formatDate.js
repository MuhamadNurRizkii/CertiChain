export const formatDateTime = (timestamp) =>
  new Date(timestamp).toLocaleString("sv-SE").replace("T", " ");
