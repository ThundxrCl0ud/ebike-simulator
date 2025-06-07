import { useState } from "react";

const parts = {
  frameColor: [
    // Basic Colors
    "Black", "White", "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Gray", "Brown",

    // Light Colors
    "Light Blue", "Light Pink", "Light Gray", "Light Green", "Light Yellow",

    // Dark Colors
    "Dark Blue", "Dark Red", "Dark Green", "Dark Purple", "Charcoal", "Midnight Black",

    // Matte Finishes
    "Matte Black", "Matte Gray", "Matte Blue", "Matte Red", "Matte White", "Matte Olive",

    // Metallic Finishes
    "Metallic Silver", "Metallic Blue", "Metallic Red", "Metallic Green", "Metallic Copper", "Metallic Gold",

    // Neon Finishes
    "Neon Green", "Neon Pink", "Neon Orange", "Neon Yellow", "Neon Blue",

    // Sparkly / Flake Finishes
    "Galaxy Purple Flake", "Electric Blue Flake", "Ruby Red Sparkle", "Emerald Green Sparkle", "Midnight Black Flake", "Champagne Sparkle", "Holographic Chrome", "Oil Slick"
  ],

  tireType: ["Shinko SR241", "Dunlop MX53", "Kenda K270", "Maxxis Minion DHF", "Hybrid"],
  handlebars: ["Warp 9 Riser", "ODI V2 Lock-On", "ProTaper", "Stock"],
  headlight: ["None", "Basic", "Baja Designs S2 Pro", "GritShift Projector"],
  seat: ["Guts Racing Tall", "Guts Racing Gripper", "Luna Tall Seat", "Stock"],
  pegs: ["Warp 9 MX Pegs", "Prickly Peg Extenders", "Amazon CNC Billet", "Stock"],
  throttle: ["Domino", "Surron Ultra Bee Throttle Tube", "NB Power Twist", "Stock"],
  grips: ["ODI Rogue", "Warp 9 Lock-On", "ProTaper Pillow Top", "Stock"],
  subframe: ["Warp 9 Riser Kit", "GritShift Subframe", "Custom Fabricated", "Stock"],
  wheels: ["Warp 9 19/17 Supermoto", "DirtyBike 21/18 MX", "Custom Anodized", "Stock 19/19"],
  chain: ["DID 420NZ3 Gold", "EK 420 SR", "Amazon Heavy-Duty", "Stock"],
  sprocket: ["Prickly 54T", "Warp 9 52T", "Luna 60T", "Stock 48T"],
  bashPlate: ["EBMX Aluminum Bash Plate", "Warp 9 Skid Plate", "Amazon HD Plate", "Stock"],
  battery: ["EBMX 72v 42Ah", "ChiBatterySystems 60v", "GrinTech 72v", "Stock 60v"],
  controller: ["EBMX X-9000", "Nucular 24F", "Votol EM-150", "Stock"],
  display: ["EggRider V2", "Apt 850C", "Luna Full Color", "Stock"],
  motor: ["QS 3kW V3", "NB Power 5000W", "EBMX XLB-60", "Stock"],
  rearShock: ["DNM RCP-2S", "FastAce BDA53RC", "Fox Float X", "Stock"],
  frontFork: ["DNM USD-8s", "Manitou Dorado", "KKE Inverted", "Stock"],
};

// Helper to get styles per color type
function getColorButtonStyle(option, isSelected) {
  const baseStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: isSelected ? "2px solid #000" : "1px solid #ccc",
    cursor: "pointer",
    color: "#000",
    userSelect: "none",
    transition: "all 0.3s ease",
    minWidth: "80px",
    textAlign: "center",
  };

  // Basic mapping from color names to CSS colors (expand as needed)
  const colorMap = {
    Black: "#000000",
    White: "#FFFFFF",
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#008000",
    Yellow: "#FFFF00",
    Orange: "#FFA500",
    Purple: "#800080",
    Pink: "#FFC0CB",
    Gray: "#808080",
    Brown: "#A52A2A",
    "Light Blue": "#ADD8E6",
    "Light Pink": "#FFB6C1",
    "Light Gray": "#D3D3D3",
    "Light Green": "#90EE90",
    "Light Yellow": "#FFFFE0",
    "Dark Blue": "#00008B",
    "Dark Red": "#8B0000",
    "Dark Green": "#006400",
    "Dark Purple": "#4B0082",
    Charcoal: "#36454F",
    "Midnight Black": "#191919",
    "Matte Black": "#1C1C1C",
    "Matte Gray": "#4D4D4D",
    "Matte Blue": "#3B5998",
    "Matte Red": "#B22222",
    "Matte White": "#F5F5F5",
    "Matte Olive": "#6B8E23",
    "Metallic Silver": "#C0C0C0",
    "Metallic Blue": "#4682B4",
    "Metallic Red": "#B22222",
    "Metallic Green": "#228B22",
    "Metallic Copper": "#B87333",
    "Metallic Gold": "#FFD700",
    "Neon Green": "#39FF14",
    "Neon Pink": "#FF6EC7",
    "Neon Orange": "#FF6700",
    "Neon Yellow": "#FFFF33",
    "Neon Blue": "#1F51FF",
    "Galaxy Purple Flake": "#6A0DAD",
    "Electric Blue Flake": "#7DF9FF",
    "Ruby Red Sparkle": "#9B111E",
    "Emerald Green Sparkle": "#50C878",
    "Midnight Black Flake": "#0B0B0B",
    "Champagne Sparkle": "#F7E7CE",
    "Holographic Chrome": "#D1C4E9",
    "Oil Slick": "#3B3B3B",
  };

  // Get base background color
  let backgroundColor = colorMap[option] || "#fff";

  // Start composing style
  let style = { ...baseStyle, backgroundColor };

  // Add special effects based on the category:

  // Neon - add glow
  if (option.startsWith("Neon")) {
    style.color = "#fff";
    style.textShadow = `0 0 8px ${backgroundColor}, 0 0 20px ${backgroundColor}`;
  }

  // Matte - desaturate and reduce brightness
  else if (option.startsWith("Matte")) {
    style.backgroundColor = backgroundColor;
    style.filter = "brightness(0.7) saturate(0.5)";
  }

  // Metallic - add a subtle gradient to simulate shine
  else if (option.startsWith("Metallic")) {
    style.backgroundColor = backgroundColor;
    style.backgroundImage = `linear-gradient(45deg, ${backgroundColor} 30%, #fff 60%, ${backgroundColor} 90%)`;
    style.color = "#fff";
  }

  // Flake / Sparkle - add glittery texture simulation
  else if (
    option.includes("Flake") ||
    option.includes("Sparkle") ||
    option.includes("Holographic") ||
    option.includes("Oil Slick")
  ) {
    style.backgroundColor = backgroundColor;
    style.backgroundImage =
      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 2px, transparent 4px), " +
      "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.5) 1px, transparent 3px)";
    style.backgroundSize = "10px 10px";
    style.color = "#fff";
  }

  return style;
}

export default function EBikeCustomizer() {
  const [config, setConfig] = useState(
    Object.fromEntries(Object.keys(parts).map((key) => [key, parts[key][0]]))
  );
  const [activeCategory, setActiveCategory] = useState(null);

  const updatePart = (part, value) => {
    setConfig((prev) => ({ ...prev, [part]: value }));
  };

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-3xl font-bold">E-Bike Customizer Simulator</h1>

      <button onClick={() => setActiveCategory((prev) => (prev ? null : Object.keys(parts)[0]))}>
        {activeCategory ? "Close Parts Menu" : "Parts"}
      </button>

      {activeCategory && (
        <div className="grid grid-cols-[200px_1fr] gap-4 mt-4">
          <div className="border-r pr-2 space-y-2">
            {Object.keys(parts).map((part) => (
              <button
                key={part}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  fontWeight: activeCategory === part ? "bold" : "normal",
                  marginBottom: "4px",
                }}
                onClick={() => setActiveCategory(part)}
              >
                {part}
              </button>
            ))}
          </div>
          <div>
            <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                {parts[activeCategory].map((option) => (
                  <button
                    key={option}
                    style={getColorButtonStyle(option, config[activeCategory] === option)}
                    onClick={() => updatePart(activeCategory, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "12px",
          backgroundColor: "#f9f9f9",
          marginTop: "24px",
        }}
      >
        <h2 style={{ fontWeight: "600", marginBottom: "12px" }}>Your E-Bike Config</h2>
        <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
          {Object.entries(config).map(([part, value]) => (
            <li key={part}>
              {part}: {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
