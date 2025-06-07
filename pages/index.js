import { useState, useMemo } from "react";

const parts = {
  frameColor: {
    Basic: [
      "Black", "White", "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Gray", "Brown",
      "Beige", "Crimson", "Teal", "Navy", "Olive", "Maroon", "Cyan", "Magenta", "Lime", "Coral"
    ],
    Light: [
      "Light Blue", "Light Pink", "Light Gray", "Light Green", "Light Yellow", "Lavender", "Peach", "Mint", "Powder Blue", "Blanched Almond"
    ],
    Dark: [
      "Dark Blue", "Dark Red", "Dark Green", "Dark Purple", "Charcoal", "Midnight Black", "Forest Green", "Burgundy", "Indigo", "Saddle Brown"
    ],
    Matte: [
      "Matte Black", "Matte Gray", "Matte Blue", "Matte Red", "Matte White", "Matte Olive", "Matte Navy", "Matte Burgundy", "Matte Teal", "Matte Brown"
    ],
    Metallic: [
      "Metallic Silver", "Metallic Blue", "Metallic Red", "Metallic Green", "Metallic Copper", "Metallic Gold",
      "Metallic Bronze", "Metallic Purple", "Metallic Teal", "Metallic Charcoal", "Metallic Champagne"
    ],
    Neon: [
      "Neon Green", "Neon Pink", "Neon Orange", "Neon Yellow", "Neon Blue", "Neon Purple", "Neon Red", "Neon Cyan", "Neon Lime", "Neon Magenta"
    ],
    Flake: [
      "Galaxy Purple Flake", "Electric Blue Flake", "Ruby Red Sparkle", "Emerald Green Sparkle", "Midnight Black Flake",
      "Champagne Sparkle", "Holographic Chrome", "Oil Slick", "Silver Flake", "Blue Flake", "Green Flake"
    ],
  },
  tireType: [
    "Shinko SR241", "Dunlop MX53", "Kenda K270", "Maxxis Minion DHF", "Hybrid", "Pirelli Scorpion", "Michelin Wild Enduro"
  ],
  handlebars: [
    "Warp 9 Riser", "ODI V2 Lock-On", "ProTaper", "Stock", "Renthal Fatbar", "Renthal Apex", "Biltwell Tracker"
  ],
  headlight: [
    "None", "Basic", "Baja Designs S2 Pro", "GritShift Projector", "Supernova E3", "Lezyne Macro Drive"
  ],
  seat: [
    "Guts Racing Tall", "Guts Racing Gripper", "Luna Tall Seat", "Stock", "Selle Italia SLR", "Brooks Cambium"
  ],
  pegs: [
    "Warp 9 MX Pegs", "Prickly Peg Extenders", "Amazon CNC Billet", "Stock", "ODI Rogue"
  ],
  throttle: [
    "Domino", "Surron Ultra Bee Throttle Tube", "NB Power Twist", "Stock"
  ],
  grips: [
    "ODI Rogue", "Warp 9 Lock-On", "ProTaper Pillow Top", "Stock"
  ],
  subframe: [
    "Warp 9 Riser Kit", "GritShift Subframe", "Custom Fabricated", "Stock"
  ],
  wheels: [
    "Warp 9 19/17 Supermoto", "DirtyBike 21/18 MX", "Custom Anodized", "Stock 19/19"
  ],
  chain: [
    "DID 420NZ3 Gold", "EK 420 SR", "Amazon Heavy-Duty", "Stock"
  ],
  sprocket: [
    "Prickly 54T", "Warp 9 52T", "Luna 60T", "Stock 48T"
  ],
  bashPlate: [
    "EBMX Aluminum Bash Plate", "Warp 9 Skid Plate", "Amazon HD Plate", "Stock"
  ],
  battery: [
    "EBMX 72v 42Ah", "ChiBatterySystems 60v", "GrinTech 72v", "Stock 60v"
  ],
  controller: [
    "EBMX X-9000", "Nucular 24F", "Votol EM-150", "Stock"
  ],
  display: [
    "EggRider V2", "Apt 850C", "Luna Full Color", "Stock"
  ],
  motor: [
    "QS 3kW V3", "NB Power 5000W", "EBMX XLB-60", "Stock"
  ],
  rearShock: [
    "DNM RCP-2S", "FastAce BDA53RC", "Fox Float X", "Stock"
  ],
  frontFork: [
    "DNM USD-8s", "Manitou Dorado", "KKE Inverted", "Stock"
  ],
};

// Helper to get styles per color type and simulate metallic, matte, neon, and flake effects
function getColorButtonStyle(option) {
  // Base colors for mapping
  const colorMap = {
    // Basic
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
    Beige: "#F5F5DC",
    Crimson: "#DC143C",
    Teal: "#008080",
    Navy: "#000080",
    Olive: "#808000",
    Maroon: "#800000",
    Cyan: "#00FFFF",
    Magenta: "#FF00FF",
    Lime: "#00FF00",
    Coral: "#FF7F50",
    // Light
    "Light Blue": "#ADD8E6",
    "Light Pink": "#FFB6C1",
    "Light Gray": "#D3D3D3",
    "Light Green": "#90EE90",
    "Light Yellow": "#FFFFE0",
    Lavender: "#E6E6FA",
    Peach: "#FFDAB9",
    Mint: "#98FF98",
    "Powder Blue": "#B0E0E6",
    "Blanched Almond": "#FFEBCD",
    // Dark
    "Dark Blue": "#00008B",
    "Dark Red": "#8B0000",
    "Dark Green": "#006400",
    "Dark Purple": "#4B0082",
    Charcoal: "#36454F",
    "Midnight Black": "#191919",
    "Forest Green": "#228B22",
    Burgundy: "#800020",
    Indigo: "#4B0082",
    "Saddle Brown": "#8B4513",
    // Matte
    "Matte Black": "#1C1C1C",
    "Matte Gray": "#4D4D4D",
    "Matte Blue": "#3B5998",
    "Matte Red": "#B22222",
    "Matte White": "#F5F5F5",
    "Matte Olive": "#6B8E23",
    "Matte Navy": "#223366",
    "Matte Burgundy": "#6F142B",
    "Matte Teal": "#367588",
    "Matte Brown": "#5C4033",
    // Metallic
    "Metallic Silver": "#C0C0C0",
    "Metallic Blue": "#4682B4",
    "Metallic Red": "#B22222",
    "Metallic Green": "#228B22",
    "Metallic Copper": "#B87333",
    "Metallic Gold": "#FFD700",
    "Metallic Bronze": "#CD7F32",
    "Metallic Purple": "#6E3B6E",
    "Metallic Teal": "#367588",
    "Metallic Charcoal": "#36454F",
    "Metallic Champagne": "#F7E7CE",
    // Neon
    "Neon Green": "#39FF14",
    "Neon Pink": "#FF6EC7",
    "Neon Orange": "#FF6700",
    "Neon Yellow": "#FFFF33",
    "Neon Blue": "#1F51FF",
    "Neon Purple": "#BF00FF",
    "Neon Red": "#FF073A",
    "Neon Cyan": "#00FFF7",
    "Neon Lime": "#A6FF00",
    "Neon Magenta": "#FF00FF",
    // Flake
    "Galaxy Purple Flake": "#6A0DAD",
    "Electric Blue Flake": "#7DF9FF",
    "Ruby Red Sparkle": "#9B111E",
    "Emerald Green Sparkle": "#50C878",
    "Midnight Black Flake": "#0B0B0B",
    "Champagne Sparkle": "#F7E7CE",
    "Holographic Chrome": "#D1C4E9",
    "Oil Slick": "#3B3B3B",
    "Silver Flake": "#C0C0C0",
    "Blue Flake": "#4682B4",
    "Green Flake": "#228B22",
  };

  const baseStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    userSelect: "none",
    minWidth: "80px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "0.9rem",
    color: "#000",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const backgroundColor = colorMap[option] || "#fff";
  let style = { ...baseStyle, backgroundColor };

  // Neon glow effect
  if (option.startsWith("Neon")) {
    style.color = "#fff";
    style.textShadow = `0 0 6px ${backgroundColor}, 0 0 20px ${backgroundColor}`;
  }

  // Matte - dull the color a bit
  else if (option.startsWith("Matte")) {
    style.filter = "brightness(0.75) saturate(0.6)";
    style.color = "#fff";
  }

  // Metallic - subtle gradient shine
  else if (option.startsWith("Metallic")) {
    style.backgroundImage = `linear-gradient(45deg, ${backgroundColor} 30%, #eee 60%, ${backgroundColor} 90%)`;
    style.color = "#222";
  }

  // Flake/Sparkle - simulated sparkle pattern
  else if (
    option.includes("Flake") ||
    option.includes("Sparkle") ||
    option.includes("Holographic") ||
    option.includes("Oil Slick")
  ) {
    style.backgroundImage =
      `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.7) 2px, transparent 4px), ` +
      `radial-gradient(circle at 80% 80%, rgba(255,255,255,0.4) 1px, transparent 3px), ` +
      `linear-gradient(45deg, ${backgroundColor} 30%, #ccc 60%, ${backgroundColor} 90%)`;
    style.color = "#fff";
  }

  return style;
}

export default function EBikeCustomizer() {
  const [config, setConfig] = useState(
    Object.fromEntries(
      Object.entries(parts).map(([key, value]) =>
        Array.isArray(value)
          ? [key, value[0]]
          : [key, Object.values(value)[0][0]]
      )
    )
  );
  const [activeCategory, setActiveCategory] = useState("frameColor");
  const [colorCategory, setColorCategory] = useState("Basic");
  const [searchTerm, setSearchTerm] = useState("");

  // Only show search bar when activeCategory is frameColor
  const showSearch = activeCategory === "frameColor";

  // List of categories for frameColor
  const colorCategories = useMemo(() => {
    if (activeCategory === "frameColor") {
      return Object.keys(parts.frameColor);
    }
    return [];
  }, [activeCategory]);

  // Filter colors by selected colorCategory and search term
  const filteredColors = useMemo(() => {
    if (activeCategory !== "frameColor") return [];

    let colors = parts.frameColor[colorCategory] || [];
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      colors = colors.filter((c) => c.toLowerCase().includes(term));
    }
    return colors;
  }, [activeCategory, colorCategory, searchTerm]);

  const updatePart = (part, value) => {
    setConfig((prev) => ({ ...prev, [part]: value }));
  };

  return (
    <div className="p-4" style={{ maxWidth: 900, margin: "auto" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: 24 }}>
        E-Bike Customizer Simulator
      </h1>

      {/* Category tabs */}
      <div style={{ display: "flex", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        {Object.keys(parts).map((part) => (
          <button
            key={part}
            onClick={() => {
              setActiveCategory(part);
              setSearchTerm("");
              if (part === "frameColor") setColorCategory("Basic");
            }}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: activeCategory === part ? "3px solid #0070f3" : "1px solid #ccc",
              backgroundColor: activeCategory === part ? "#e6f0ff" : "#fff",
              cursor: "pointer",
              fontWeight: activeCategory === part ? "700" : "500",
            }}
          >
            {part}
          </button>
        ))}
      </div>

      {/* Search bar (only for colors) */}
      {showSearch && (
        <input
          type="text"
          placeholder="Search colors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: 12,
            padding: 8,
            fontSize: 16,
            width: "100%",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
      )}

      {/* If frameColor category, show color categories */}
      {activeCategory === "frameColor" && (
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 12,
            flexWrap: "wrap",
          }}
        >
          {colorCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setColorCategory(cat)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                cursor: "pointer",
                backgroundColor: colorCategory === cat ? "#0070f3" : "#f0f0f0",
                color: colorCategory === cat ? "#fff" : "#000",
                fontWeight: "600",
                fontSize: 14,
                border: "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Options Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: activeCategory === "frameColor" ? "repeat(auto-fit, minmax(110px, 1fr))" : "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
        }}
      >
        {activeCategory === "frameColor"
          ? filteredColors.map((color) => (
              <button
                key={color}
                style={{
                  ...getColorButtonStyle(color),
                  border:
                    config.frameColor === color ? "3px solid #0070f3" : "1px solid #ccc",
                  boxShadow:
                    config.frameColor === color ? "0 0 8px #0070f3" : "none",
                }}
                onClick={() => updatePart("frameColor", color)}
                title={color}
              >
                {color}
              </button>
            ))
          : parts[activeCategory].map((option) => (
              <button
                key={option}
                onClick={() => updatePart(activeCategory, option)}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border:
                    config[activeCategory] === option ? "3px solid #0070f3" : "1px solid #ccc",
                  backgroundColor:
                    config[activeCategory] === option ? "#e6f0ff" : "#fff",
                  cursor: "pointer",
                  fontWeight: config[activeCategory] === option ? "700" : "500",
                  fontSize: 16,
                  userSelect: "none",
                }}
              >
                {option}
              </button>
            ))}
      </div>

      {/* Config Summary */}
      <div
        style={{
          marginTop: 36,
          padding: 16,
          borderRadius: 8,
          border: "1px solid #ccc",
          backgroundColor: "#fafafa",
        }}
      >
        <h2 style={{ marginBottom: 12, fontWeight: "700", fontSize: 20 }}>
          Your E-Bike Config
        </h2>
        <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
          {Object.entries(config).map(([part, value]) => (
            <li key={part} style={{ marginBottom: 4
