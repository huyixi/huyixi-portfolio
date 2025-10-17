import { GeistSans as GeistSansFont } from "geist/font/sans";
import { GeistMono as GeistMonoFont } from "geist/font/mono";
import { IBM_Plex_Serif, Playfair_Display } from "next/font/google";

export const geistSans = GeistSansFont;
export const geistMono = GeistMonoFont;

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
