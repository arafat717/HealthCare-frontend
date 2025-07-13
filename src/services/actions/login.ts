"use server";

export type TLogin = {
  email: string;
  password: string;
};

export const userLogin = async (data: TLogin) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const user = await res.json();
  return user;
};
