"use server";

import { cookies } from "next/headers";

interface IUser {
  id: number;
  email: string;
  name: string;
}

export async function saveUser(cookieName = "user", userData: IUser) {
  "use server";
  const oneDay = 24 * 60 * 60 * 1000;
  try {
    cookies().set(cookieName, JSON.stringify(userData), {
      expires: Date.now() - oneDay,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
