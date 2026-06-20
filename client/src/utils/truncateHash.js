export const truncateHash = (hash) => {
  if (!hash) return "";

  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
};
