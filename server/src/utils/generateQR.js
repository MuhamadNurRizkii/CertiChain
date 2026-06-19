import QRcode from "qrcode";

export const generateQR = async (url) => {
  return await QRcode.toDataURL(url);
};
