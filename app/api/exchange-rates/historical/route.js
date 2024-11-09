import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const baseCurrency = searchParams.get("base");
  const date = searchParams.get("date");

  if (!baseCurrency || !date) {
    return NextResponse.json(
      { error: "Base currency and date are required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/history/${baseCurrency}/${date}`
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching historical rates:", error);
    return NextResponse.json(
      { error: "Failed to fetch historical rates" },
      { status: 500 }
    );
  }
}
