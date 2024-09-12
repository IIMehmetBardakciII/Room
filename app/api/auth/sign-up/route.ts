import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formdata = await request.formData();
  return NextResponse.json({ message: "İşlem başarılı", formdata });
}
