import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  matcher: ["/", '/contact', '/big-promo', '/about', '/projects'],
};

export async function middleware(req: NextRequest) {
  // Check for the presence of the EDGE_CONFIG environment variable
  if (!process.env.EDGE_CONFIG) {
    // Redirect to a custom page if EDGE_CONFIG is missing
    return NextResponse.redirect(new URL("/missing-edge-config", req.url));
  }

  try {
    // Check whether the maintenance page should be shown
    const isInMaintenanceMode = await get<boolean>("isInMaintenanceMode");
    console.log("isInMaintenanceMode:", isInMaintenanceMode);

    // If in maintenance mode, redirect to the maintenance page
    if (isInMaintenanceMode) {
      return NextResponse.redirect(new URL("/maintenance", req.url));
    }
  } catch (error) {
    // Log the error to the console
    console.error("Error in middleware:", error);
    // Optionally redirect to an error page or handle the error accordingly
    return NextResponse.redirect(new URL("/error", req.url));
  }

  // Continue to the requested page if not in maintenance mode
  return NextResponse.next();
}
