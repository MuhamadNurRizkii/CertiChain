import { supabase } from "../config/supabase.js";

export const uploadFile = async (fileBuffer, filename) => {
  const { data, error } = await supabase.storage
    .from("sertifikat")
    .upload(filename, fileBuffer, {
      contentType: "application/pdf",
    });

  if (error) {
    throw error;
  }

  const { data: publicUrl } = supabase.storage
    .from("sertifikat")
    .getPublicUrl(filename);

  console.log("upload file berhasil:", data);
  console.log(publicUrl);
  return publicUrl.publicUrl;
};

export const insertCertificate = async ({
  id,
  hash,
  file_url,
  tx_hash,
  certificate_name,
}) => {
  const { data, error } = await supabase
    .from("certificates")
    .insert({
      id,
      hash,
      file_url,
      tx_hash,
      certificate_name,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const findCertificate = async (id) => {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const findAllCertificates = async () => {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};
