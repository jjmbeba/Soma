import { redirect } from "next/navigation";
import {getUser} from "@/app/actions";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function capitalize(word:string){
  return `${word.slice(0,1).toUpperCase()}${word.slice(1)}`
}

export async function getUserOrThrowError() {
  const {data: {user}} = await getUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  return user;
}