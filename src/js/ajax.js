import { TIMEOUT_SECONDS } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    console.log(uploadData, url);

    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (response.status === "error") {
      throw new Error(`${data.message} (${response.status})`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};