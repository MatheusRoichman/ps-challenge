import yelpRestClient from "@/services/rest-client/yelp-rest-client";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from './../../../../node_modules/axios/index.d';

export async function GET(req: NextRequest): Promise<Response> {
  const { url } = req;
  
  try {
    const requestedUrl = new URL(url);
    const yelpEndpoint = requestedUrl.pathname.replace(/^\/api/, "");

    const response = await yelpRestClient.get(yelpEndpoint, {
      params: Object.fromEntries(requestedUrl.searchParams),
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json((error as AxiosError).response?.data, {
      status: (error as AxiosError)?.response?.status || 500,
    });
  }
}
