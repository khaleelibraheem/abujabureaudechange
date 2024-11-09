import { NextResponse } from "next/server";

const API_KEY = process.env.EXCHANGERATE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

// Simple in-memory cache
let ratesCache = {
  data: null,
  timestamp: null,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const baseCurrency = searchParams.get("base");

  if (!baseCurrency) {
    return NextResponse.json(
      { error: "Base currency is required" },
      { status: 400 }
    );
  }

  // Check cache
  if (
    ratesCache.data &&
    ratesCache.timestamp &&
    Date.now() - ratesCache.timestamp < CACHE_DURATION
  ) {
    return NextResponse.json(ratesCache.data);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/latest/${baseCurrency}`
    );
    const data = await response.json();

    // Update cache
    ratesCache = {
      data,
      timestamp: Date.now(),
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching rates:", error);
    return NextResponse.json(
      { error: "Failed to fetch exchange rates" },
      { status: 500 }
    );
  }
}
