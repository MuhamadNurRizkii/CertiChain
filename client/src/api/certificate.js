const url = import.meta.env.VITE_URL_API;

export const uploadFile = async (formData) => {
  return await fetch(`${url}/certificate/upload`, {
    method: "POST",
    body: formData,
  });
};

export const findAllCertificates = async () => {
  return await fetch(`${url}/certificates`);
};

export const findCertificate = async (id) => {
  return await fetch(`${url}/certificate/verify/${id}`);
};
