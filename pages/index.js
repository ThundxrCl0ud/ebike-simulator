import { useState, useMemo } from "react";

const colorCategories = {
  Basic: [
    "Black", "White", "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Gray", "Brown",
    "Maroon", "Navy", "Teal", "Olive", "Lime", "Cyan", "Magenta", "Silver", "Gold"
  ],
  Light: [
    "Light Blue", "Light Pink", "Light Gray", "Light Green", "Light Yellow", "Lavender", "Peach", "Mint Cream", "Honeydew", "Misty Rose"
  ],
  Dark: [
    "Dark Blue", "Dark Red", "Dark Green", "Dark Purple", "Charcoal", "Midnight Black", "Burgundy", "Forest Green", "Indigo", "Slate Gray"
  ],
  Matte: [
    "Matte Black", "Matte Gray", "Matte Blue", "Matte Red", "Matte White", "Matte Olive", "Matte Navy", "Matte Brown", "Matte Burgundy"
  ],
  Metallic: [
    "Metallic Silver", "Metallic Blue", "Metallic Red", "Metallic Green", "Metallic Copper", "Metallic Gold", "Metallic Bronze", "Metallic Purple", "Metallic Teal"
  ],
  Neon: [
    "Neon Green", "Neon Pink", "Neon Orange", "Neon Yellow", "Neon Blue", "Neon Purple", "Neon Red"
  ],
  Flake: [
    "Galaxy Purple Flake", "Electric Blue Flake", "Ruby Red Sparkle", "Emerald Green Sparkle", "Midnight Black Flake", "Champagne Sparkle", "Holographic Chrome", "Oil Slick",
    "Silver Flake", "Gold Flake", "Blue Flake", "Green Flake"
  ],
};

const parts = {
  frameColor: Object.values(colorCategories).flat(),
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

// Helper to get CSS color code for each color name
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
  Maroon: "#800000",
  Navy: "#000080",
  Teal: "#008080",
  Olive: "#808000",
  Lime: "#00FF00",
  Cyan: "#00FFFF",
  Magenta: "#FF00FF",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  "Light Blue": "#ADD8E6",
  "Light Pink": "#FFB6C1",
  "Light Gray": "#D3D3D3",
  "Light Green": "#90EE90",
  "Light Yellow": "#FFFFE0",
  Lavender: "#E6E6FA",
  Peach: "#FFE5B4",
  "Mint Cream": "#F5FFFA",
  Honeydew: "#F0FFF0",
  "Misty Rose": "#FFE4E1",
  "Dark Blue": "#00008B",
  "Dark Red": "#8B0000",
  "Dark Green": "#006400",
  "Dark Purple": "#4B0082",
  Charcoal: "#36454F",
  "Midnight Black": "#191919",
  Burgundy: "#800020",
  "Forest Green": "#228B22",
  Indigo: "#4B0082",
  "Slate Gray": "#708090",
  "Matte Black": "#1C1C1C",
  "Matte Gray": "#4D4D4D",
  "Matte Blue": "#3B5998",
  "Matte Red": "#B22222",
  "Matte White": "#F5F5F5",
  "Matte Olive": "#6B8E23",
  "Matte Navy": "#1A237E",
  "Matte Brown": "#5D4037",
  "Matte Burgundy": "#6A1B1A",
  "Metallic Silver": "#C0C0C0",
  "Metallic Blue": "#4682B4",
  "Metallic Red": "#B22222",
  "Metallic Green": "#228B22",
  "Metallic Copper": "#B87333",
  "Metallic Gold": "#FFD700",
  "Metallic Bronze": "#CD7F32",
  "Metallic Purple": "#6A0DAD",
  "Metallic Teal": "#008080",
  "Neon Green": "#39FF14",
  "Neon Pink": "#FF6EC7",
  "Neon Orange": "#FF6700",
  "Neon Yellow": "#FFFF33",
  "Neon Blue": "#1F51FF",
  "Neon Purple": "#BC13FE",
  "Neon Red": "#FF073A",
  "Galaxy Purple Flake": "#6A0DAD",
  "Electric Blue Flake": "#7DF9FF",
  "Ruby Red Sparkle": "#9B111E",
  "Emerald Green Sparkle": "#50C878",
  "Midnight Black Flake": "#0B0B0B",
  "Champagne Sparkle": "#F7E7CE",
  "Holographic Chrome": "#D1C4E9",
  "Oil Slick": "#3B3B3B",
  "Silver Flake": "#C0C0C0",
  "Gold Flake": "#FFD700",
  "Blue Flake": "#0000FF",
  "Green Flake": "#008000",
};

// Style generator for color buttons
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

  const backgroundColor = colorMap[option] || "#fff";
  let style = { ...baseStyle, backgroundColor };

  // Neon - glow effect
  if (option.startsWith("Neon")) {
    style.color = "#fff";
    style.textShadow = `0 0 8px ${backgroundColor}, 0 0 20px ${backgroundColor}`;
  }
  // Matte - desaturate and darken
  else if (option.startsWith("Matte")) {
    style.filter = "brightness(0.7) saturate(0.5)";
  }
  // Metallic - gradient shine
  else if (option.startsWith("Metallic")) {
    style.backgroundImage = `linear-gradient(45deg, ${backgroundColor} 30%, #fff 60%, ${backgroundColor} 90%)`;
    style.color = "#fff";
  }
  // Flake/Sparkle - glitter pattern
  else if (
    option.includes("Flake") ||
    option.includes("Sparkle") ||
    option.includes("Holographic") ||
    option.includes("Oil Slick") ||
    option.includes("Flake")
  ) {
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
  const [searchText, setSearchText] = useState("");

  // When selecting frameColor, activeColorCategory tracks which category tab inside frame colors
  const [activeColorCategory, setActiveColorCategory] = useState("Basic");

  // Update part config
  const updatePart = (part, value) => {
    setConfig((prev) => ({ ...prev, [part]: value }));
  };

  // Filter colors by search text in active color category
  const filteredColors = useMemo(() => {
    if (activeCategory !== "frameColor") return [];
    const list = colorCategories[activeColorCategory] || [];
    if (!searchText.trim()) return list;
    const lower = searchText.toLowerCase();
    return list.filter((c) => c.toLowerCase().includes(lower));
  }, [searchText, activeColorCategory, activeCategory]);

  return (
    <div className="p-4 grid gap-4" style={{ maxWidth: 900, margin: "auto" }}>
      <h1 className="text-3xl font-bold text-center">E-Bike Customizer Simulator</h1>

      <button
        onClick={() => setActiveCategory((prev) => (prev ? null : Object.keys(parts)[0]))}
        style={{ padding: "8px 16px", cursor: "pointer", margin: "0 auto", display: "block" }}
      >
        {activeCategory ? "Close Parts Menu" : "Open Parts Menu"}
      </button>

      {activeCategory && (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "200px 1fr",
            gap: 20,
            marginTop: 24,
          }}
        >
          {/* Left Sidebar - Categories */}
          <div style={{ borderRight: "1px solid #ccc", paddingRight: 12 }}>
            {Object.keys(parts).map((part) => (
              <button
                key={part}
                onClick={() => {
                  setActiveCategory(part);
                  setSearchText("");
                  if (part !== "frameColor") setActiveColorCategory("Basic");
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  fontWeight: activeCategory === part ? "bold" : "normal",
                  marginBottom: 6,
                  padding: "8px",
                  background: activeCategory === part ? "#ddd" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 4,
                }}
              >
                {part}
              </button>
            ))}
          </div>

          {/* Right Content - Options */}
          <div>
            {activeCategory === "frameColor" ? (
              <>
                {/* Color Category Tabs */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  {Object.keys(colorCategories).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveColorCategory(cat);
                        setSearchText("");
                      }}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 20,
                        border: activeColorCategory === cat ? "2px solid #000" : "1px solid #aaa",
                        background: activeColorCategory === cat ? "#eee" : "transparent",
                        cursor: "pointer",
                        fontWeight: activeColorCategory === cat ? "bold" : "normal",
                        userSelect: "none",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search bar */}
                <div style={{ marginBottom: 16, textAlign: "center" }}>
                  <input
                    type="text"
                    placeholder="Search colors..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                      padding: "8px",
                      width: "100%",
                      maxWidth: 300,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                    }}
                  />
                </div>

                {/* Color Buttons */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                    gap: 10,
                  }}
                >
                  {filteredColors.length === 0 ? (
                    <div style={{ textAlign: "center", gridColumn: "1/-1", color: "#666" }}>
                      No colors found.
                    </div>
                  ) : (
                    filteredColors.map((colorName) => (
                      <button
                        key={colorName}
                        onClick={() => updatePart("frameColor", colorName)}
                        style={getColorButtonStyle(colorName, config.frameColor === colorName)}
                        title={colorName}
                        type="button"
                      >
                        {colorName}
                      </button>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: 12,
                }}
              >
                {parts[activeCategory].map((option) => (
                  <button
                    key={option}
                    onClick={() => updatePart(activeCategory, option)}
                    style={{
                      padding: "10px",
                      borderRadius: 6,
                      border: config[activeCategory] === option ? "2px solid #000" : "1px solid #ccc",
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      userSelect: "none",
                      fontWeight: config[activeCategory] === option ? "bold" : "normal",
                    }}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Configuration Summary */}
      <div
        style={{
          padding: 16,
          border: "1px solid #ccc",
          borderRadius: 12,
          backgroundColor: "#f9f9f9",
          marginTop: 32,
          maxWidth: 900,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h2 style={{ fontWeight: "600", marginBottom: 12 }}>Your E-Bike Config</h2>
        <ul style={{ listStyleType: "disc", paddingLeft: 20 }}>
          {Object.entries(config).map(([part, value]) => (
            <li key={part}>
              <strong>{part}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
