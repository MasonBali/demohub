import { getClient, Body } from "@tauri-apps/api/http";

let client: any;

async function getClientInstance() {
  if (!client) {
    client = await getClient();
  }
  return client;
}

export async function sendPostRequest(
  appRequest: string,
  prompt: string,
  width: number,
  height: number,
  outputPath: string,
  initImage?: string | null,
  maskImage?: string | null,
  strength?: number,
  interferenceStrength?: number
) {
  let data: any = {
    prompt: prompt,
    width: width,
    height: height,
    output_path: outputPath,
    strength: strength,
  };

  if (initImage) {
    data.init_image_file = initImage;
  }

  if (maskImage) {
    data.mask_image_file = maskImage;
  }

  if (interferenceStrength) {
    data.num_inference_steps = interferenceStrength;
  }

  try {
    const bodyData = Body.json(data);
    const API_URL = `http://127.0.0.1:8000/${appRequest}/`;
    const client = await getClientInstance();
    const response = await client.request({
      method: "POST",
      url: API_URL,
      body: bodyData,
    });

    if (response.ok) {
      return response.data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending POST request:", error);
    throw error;
  }
}

export async function sendPostRequest2(appRequest: string, data: any) {
  try {
    const bodyData = Body.json(data);
    const API_URL = `http://127.0.0.1:8000/${appRequest}/`;
    const client = await getClientInstance();
    const response = await client.request({
      method: "POST",
      url: API_URL,
      body: bodyData,
    });

    if (response.ok) {
      return response.data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending POST request:", error);
    throw error;
  }
}

export async function sendGetRequest(appRequest: string) {
  try {
    const API_URL = `http://127.0.0.1:8000/${appRequest}/`;
    const client = await getClientInstance();
    const response = await client.request({
      method: "GET",
      url: API_URL,
    });

    if (response.ok) {
      return response.data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending GET request:", error);
    throw error;
  }
}
