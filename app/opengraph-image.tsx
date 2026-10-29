import { ImageResponse } from "next/og";
export const alt =
  "Aries Pujie Prasetio | ARIES. — Independent Software Engineer & Software Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b1020",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "70px",
          fontFamily: "sans-serif",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
          ARIES<span style={{ color: "#7792ff" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          <span>Ideas into software.</span>
          <span style={{ color: "#7792ff" }}>Built for your business.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#b5c0d3",
          }}
        >
          <span>Aries Pujie Prasetio · Jakarta, Indonesia</span>
          <span>WEB / MOBILE / SYSTEMS</span>
        </div>
      </div>
    ),
    size,
  );
}
