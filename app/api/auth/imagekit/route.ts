import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const { publicKey, privateKey, urlEndpoint } = config.env.imageKit;
const imageKit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  return NextResponse.json(imageKit.getAuthenticationParameters());
}
