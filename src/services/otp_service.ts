import axios, { AxiosResponse } from "axios";
import otpGenerator from "otp-generator";
import { configs } from "../configs/config";

interface SMS {
  return: boolean;
  request_id: string;
  message: string;
}

export const sendOtp = async (phone: string, otp: string): Promise<SMS> => {
  const apiKey = configs.fast2sms;
  const response: AxiosResponse<SMS> = await axios.post(
    "https://www.fast2sms.com/dev/bulkV2",
    {
      route: "q",
      language: "english",
      flash: 0,
      message: `Your OTP is ${otp}`,
      numbers: phone,
    },
    {
      headers: {
        Authorization: `${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const generateOTP = (): string => {
  return otpGenerator.generate(6, {
    digits: true,
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });
};
