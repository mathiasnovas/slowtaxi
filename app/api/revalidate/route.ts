import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json();
  const type = body?._type;

  if (type === "post") {
    revalidatePath("/");
    if (body?.slug?.current) {
      revalidatePath(`/blog/${body.slug.current}`);
    }
  } else if (type === "about") {
    revalidatePath("/about");
  }

  return NextResponse.json({ revalidated: true });
}
