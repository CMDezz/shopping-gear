import localFont from "next/font/local";
import path from "path";
export const font_inter = localFont({
  src: [
    {
      path: "../../../public/fonts/inter/Inter-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/inter/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/inter/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/inter/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/inter/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const font_playwrite = localFont({
  src: [
    {
      path: "../../../public/fonts/playwrite/Playwrite-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-playwrite",
  display: "swap",
});
