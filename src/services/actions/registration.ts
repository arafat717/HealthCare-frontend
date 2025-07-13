"use server";

export const registerPatient = async (data: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/user/create-patient`,
    {
      method: "POST",
      body: data,
      cache: "no-store",
    }
  );
  const user = await res.json();
  return user;
};
