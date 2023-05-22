import { HttpClient } from "@/helpers/http-client";
import type {
  LoginRequestData,
  LoginResponseData,
  RegisterRequestData,
  RegisterResponseData,
  UserProfileResponseData,
} from "./interfaces";
import { SERVICE_API } from "./config";
import { getCookie, setCookie } from "@/helpers/cookie";

export async function queryRegister(
  data: RegisterRequestData
): Promise<RegisterResponseData> {
  const response = await HttpClient.post<
    RegisterResponseData,
    RegisterRequestData
  >(SERVICE_API + "/auth/register", data);

  setCookie(response.jwtRes, "jwt");
  return response;
}

export async function queryLogin(
  data: LoginRequestData
): Promise<LoginResponseData> {
  const response = await HttpClient.post<LoginResponseData, LoginRequestData>(
    SERVICE_API + "/auth/login",
    data
  );

  setCookie(response.jwtRes, "jwt");
  return response;
}

export async function queryUserProfile(): Promise<UserProfileResponseData> {
  return await HttpClient.get<UserProfileResponseData>(
    SERVICE_API + "/auth/info",
    {
      Authorization: `Bearer ${getCookie("jwt")}`,
    }
  );
}
