import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SEWT Group — Ingénierie solaire & hydraulique industrielle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const badges = ["1,1 MWc installés", "25 ans d'expertise", "9 projets opérationnels"];

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(140deg, #0A0E18 0%, #111C38 55%, #0A0E18 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px 80px",
          position: "relative",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Ligne accent haut */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "5px",
          background: "linear-gradient(90deg, #E8762A 0%, #F8A060 40%, transparent 100%)",
        }} />

        {/* Cercle lumineux décoratif */}
        <div style={{
          position: "absolute",
          top: "-120px",
          right: "-80px",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,118,42,0.18) 0%, rgba(27,47,92,0.12) 50%, transparent 70%)",
        }} />

        {/* Domaine */}
        <div style={{
          position: "absolute",
          top: "56px",
          right: "80px",
          fontSize: "15px",
          color: "#3C4864",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}>
          sewt-group.ma
        </div>

        {/* Logo SEWT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0px" }}>
            <span style={{ fontWeight: 900, fontSize: "88px", color: "#E8762A", letterSpacing: "-3px", lineHeight: 1 }}>
              SUN
            </span>
            <span style={{ fontWeight: 900, fontSize: "88px", color: "#F0ECE0", letterSpacing: "-3px", lineHeight: 1 }}>
              ENERGY
            </span>
          </div>
          <span style={{ fontSize: "17px", color: "#6E7A94", letterSpacing: "5px", textTransform: "uppercase" }}>
            AND WATER TECHNOLOGIES GROUP
          </span>
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: "30px",
          color: "#F0ECE0",
          fontWeight: 700,
          margin: "0 0 8px 0",
          lineHeight: 1.25,
          maxWidth: "720px",
        }}>
          Ingénierie solaire & hydraulique industrielle
        </p>
        <p style={{ fontSize: "19px", color: "#6E7A94", margin: "0 0 32px 0" }}>
          Distribution · EPC · Exploitation & Maintenance · Maroc
        </p>

        {/* Badges */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {badges.map((b) => (
            <div
              key={b}
              style={{
                background: "rgba(232,118,42,0.12)",
                border: "1px solid rgba(232,118,42,0.35)",
                borderRadius: "100px",
                padding: "8px 20px",
                fontSize: "13px",
                color: "#F8A060",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
