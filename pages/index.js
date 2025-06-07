import { useState, useMemo } from "react";

const parts = {
  frameColor: {
    Basic: [
      "Black", "White", "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Gray", "Brown",
      "Crimson", "Navy", "Teal", "Olive", "Maroon", "Lime", "Cyan", "Magenta", "Beige", "Coral",
      "Turquoise", "Violet", "Indigo", "Gold", "Silver", "Chocolate", "Lavender", "Salmon", "Mint",
      "Peach", "Plum", "Rust", "Tan", "Mustard", "Cream", "Sapphire", "Emerald", "Ruby", "Charcoal"
    ],
    Light: [
      "Light Blue", "Light Pink", "Light Gray", "Light Green", "Light Yellow",
      "Pale Turquoise", "Lavender Blush", "Linen", "Light Cyan", "Peach Puff", "Powder Blue",
      "Light Salmon", "Misty Rose", "Honeydew", "Alice Blue", "Seashell", "Old Lace", "Floral White",
      "Ghost White", "Ivory", "Beige"
    ],
    Dark: [
      "Dark Blue", "Dark Red", "Dark Green", "Dark Purple", "Charcoal", "Midnight Black",
      "Burgundy", "Forest Green", "Saddle Brown", "Dark Slate Gray", "Indigo", "Midnight Blue",
      "Dark Olive Green", "Dark Magenta", "Dark Cyan", "Dark Goldenrod", "Dark Orchid",
      "Dark Sea Green", "Dark Slate Blue", "Dark Turquoise"
    ],
    Matte: [
      "Matte Black", "Matte Gray", "Matte Blue", "Matte Red", "Matte White", "Matte Olive",
      "Matte Navy", "Matte Burgundy", "Matte Forest Green", "Matte Charcoal", "Matte Maroon",
      "Matte Mustard", "Matte Plum", "Matte Rust", "Matte Tan", "Matte Cream"
    ],
    Metallic: [
      "Metallic Silver", "Metallic Blue", "Metallic Red", "Metallic Green", "Metallic Copper", "Metallic Gold",
      "Metallic Bronze", "Metallic Teal", "Metallic Purple", "Metallic Burgundy", "Metallic Navy",
      "Metallic Rose Gold", "Metallic Platinum", "Metallic Chrome", "Metallic Graphite"
    ],
    Neon: [
      "Neon Green", "Neon Pink", "Neon Orange", "Neon Yellow", "Neon Blue",
      "Neon Purple", "Neon Red", "Neon Cyan", "Neon Lime", "Neon Magenta"
    ],
    Flake: [
      "Galaxy Purple Flake", "Electric Blue Flake", "Ruby Red Sparkle", "Emerald Green Sparkle", "Midnight Black Flake",
      "Champagne Sparkle", "Holographic Chrome", "Oil Slick", "Silver Flake", "Gold Flake",
      "Blue Sparkle", "Green Sparkle", "Pink Sparkle", "Purple Flake", "Red Flake"
    ],
  },

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

// Color mapping for backgrounds
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
  Crimson: "#DC143C",
  Navy: "#000080",
  Teal: "#008080",
  Olive: "#808000",
  Maroon: "#800000",
  Lime: "#00FF00",
  Cyan: "#00FFFF",
  Magenta: "#FF00FF",
  Beige: "#F5F5DC",
  Coral: "#FF7F50",
  Turquoise: "#40E0D0",
  Violet: "#EE82EE",
  Indigo: "#4B0082",
  Gold: "#FFD700",
  Silver: "#C0C0C0",
  Chocolate: "#D2691E",
  Lavender: "#E6E6FA",
  Salmon: "#FA8072",
  Mint: "#98FF98",
  Peach: "#FFE5B4",
  Plum: "#DDA0DD",
  Rust: "#B7410E",
  Tan: "#D2B48C",
  Mustard: "#FFDB58",
  Cream: "#FFFDD0",
  Sapphire: "#0F52BA",
  Emerald: "#50C878",
  Ruby: "#9B111E",
  Charcoal: "#36454F",

  // Light colors
  "Light Blue": "#ADD8E6",
  "Light Pink": "#FFB6C1",
  "Light Gray": "#D3D3D3",
  "Light Green": "#90EE90",
  "Light Yellow": "#FFFFE0",
  "Pale Turquoise": "#AFEEEE",
  "Lavender Blush": "#FFF0F5",
  Linen: "#FAF0E6",
  "Light Cyan": "#E0FFFF",
  "Peach Puff": "#FFDAB9",
  "Powder Blue": "#B0E0E6",
  "Light Salmon": "#FFA07A",
  "Misty Rose": "#FFE4E1",
  Honeydew: "#F0FFF0",
  "Alice Blue": "#F0F8FF",
  Seashell: "#FFF5EE",
  "Old Lace": "#FDF5E6",
  "Floral White": "#FFFAF0",
  "Ghost White": "#F8F8FF",
  Ivory: "#FFFFF0",

  // Dark colors
  "Dark Blue": "#00008B",
  "Dark Red": "#8B0000",
  "Dark Green": "#006400",
  "Dark Purple": "#4B0082",
  "Midnight Black": "#191919",
  Burgundy: "#800020",
  "Saddle Brown": "#8B4513",
  "Dark Slate Gray": "#2F4F4F",
  "Midnight Blue": "#191970",
  "Dark Olive Green": "#556B2F",
  "Dark Magenta": "#8B008B",
  "Dark Cyan": "#008B8B",
  "Dark Goldenrod": "#B8860B",
  "Dark Orchid": "#9932CC",
  "Dark Sea Green": "#8FBC8F",
  "Dark Slate Blue": "#483D8B",
  "Dark Turquoise": "#00CED1",

  // Matte finishes
  "Matte Black": "#1C1C1C",
  "Matte Gray": "#4D4D4D",
  "Matte Blue": "#3B5998",
  "Matte Red": "#B22222",
  "Matte White": "#F5F5F5",
  "Matte Olive": "#6B8E23",
  "Matte Navy": "#2C3E50",
  "Matte Burgundy": "#800020",
  "Matte Forest Green": "#254117",
  "Matte Charcoal": "#36454F",
  "Matte Maroon": "#800000",
  "Matte Mustard": "#FFDB58",
  "Matte Plum": "#8E4585",
  "Matte Rust": "#B7410E",
  "Matte Tan": "#D2B48C",
  "Matte Cream": "#FFFDD0",

  // Metallic finishes
  "Metallic Silver": "#C0C0C0",
  "Metallic Blue": "#4682B4",
  "Metallic Red": "#B22222",
  "Metallic Green": "#228B22",
  "Metallic Copper": "#B87333",
  "Metallic Gold": "#FFD700",
  "Metallic Bronze": "#CD7F32",
  "Metallic Teal": "#008080",
  "Metallic Purple": "#800080",
  "Metallic Burgundy": "#800020",
  "Metallic Navy": "#000080",
  "Metallic Rose Gold": "#B76E79",
  "Metallic Platinum": "#E5E4E2",
  "Metallic Chrome": "#D4D4D4",
  "Metallic Graphite": "#474A51",

  // Neon finishes
  "Neon Green": "#39FF14",
  "Neon Pink": "#FF6EC7",
  "Neon Orange": "#FF6700",
  "Neon Yellow": "#FFFF33",
  "Neon Blue": "#1F51FF",
  "Neon Purple": "#BC13FE",
  "Neon Red": "#FF073A",
  "Neon Cyan": "#00FFFF",
  "Neon Lime": "#BFFF00",
  "Neon Magenta": "#FF00FF",

  // Flake / Sparkle finishes
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
  "Blue Sparkle": "#1E90FF",
  "Green Sparkle": "#32CD32",
  "Pink Sparkle": "#FF69B4",
  "Purple Flake": "#800080",
  "Red Flake": "#FF0000",
};

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

  let backgroundColor = colorMap[option] || "#fff";
  let style = { ...baseStyle, backgroundColor };

  // Neon glow
  if (option.startsWith("Neon")) {
    style.color = "#fff";
    style.textShadow = `0 0 8px ${backgroundColor}, 0 0 20px ${backgroundColor}`;
  }
  // Matte
  else if (option.startsWith("Matte")) {
    style.filter = "brightness(0.7) saturate(0.5)";
  }
  // Metallic gradient
  else if (option.startsWith("Metallic")) {
    style.backgroundImage = `linear-gradient(45deg, ${backgroundColor} 30%, #fff 60%, ${backgroundColor} 90%)`;
    style.color = "#fff";
  }
  // Flake/sparkle texture simulation
  else if (
    option.includes("Flake") ||
    option.includes("Sparkle") ||
    option.includes("Holographic") ||
    option.includes("Oil Slick")
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
    Object.fromEntries(Object.keys(parts).map((key) => [key, parts[key][typeof parts[key] === 'object' ? Object.keys(parts[key])[0] : 0][0]]))
  );

  const [activePart, setActivePart] = useState(null);
  const [activeColorCategory, setActiveColorCategory] = useState(null);
  const [colorSearch, setColorSearch] = useState("");

  const handleUpdate = (part, value) => {
    setConfig((prev) => ({ ...prev, [part]: value }));
  };

  // When selecting frameColor part, show categories; else no categories
  const isFrameColorActive = activePart === "frameColor";

  // Filter colors based on search
  const filteredColorsByCategory = useMemo(() => {
    if (!isFrameColorActive) return {};

    const searchLower = colorSearch.toLowerCase();

    const filtered = {};
    for (const [category, colors] of Object.entries(parts.frameColor)) {
      filtered[category] = colors.filter((color) =>
        color.toLowerCase().includes(searchLower)
      );
    }
    return filtered;
  }, [colorSearch, isFrameColorActive]);

  // Ensure activeColorCategory stays valid
  // Default to first category if none selected or current invalid
  const colorCategories = Object.keys(parts.frameColor);
  if (isFrameColorActive && (!activeColorCategory || !colorCategories.includes(activeColorCategory))) {
    setActiveColorCategory(colorCategories[0]);
  }

  return (
    <div className="p-4 grid gap-4" style={{ maxWidth: "900px", margin: "auto" }}>
      <h1 className="text-3xl font-bold">E-Bike Customizer Simulator</h1>

      <button
        onClick={() => setActivePart((prev) => (prev ? null : Object.keys(parts)[0]))}
        style={{ padding: "8px 16px", fontSize: "1rem" }}
      >
        {activePart ? "Close Parts Menu" : "Open Parts Menu"}
      </button>

      {activePart && (
        <div
          className="grid grid-cols-[200px_1fr] gap-4 mt-4"
          style={{ minHeight: "300px" }}
        >
          {/* Left Part Selection */}
          <div
            className="border-r pr-2 space-y-2"
            style={{ borderRight: "1px solid #ccc" }}
          >
            {Object.keys(parts).map((part) => (
              <button
                key={part}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  fontWeight: activePart === part ? "bold" : "normal",
                  marginBottom: "4px",
                  padding: "6px 8px",
                  cursor: "pointer",
                  backgroundColor: activePart === part ? "#ddd" : "transparent",
                  border: "none",
                }}
                onClick={() => {
                  setActivePart(part);
                  setColorSearch("");
                  if (part === "frameColor") {
                    setActiveColorCategory(colorCategories[0]);
                  } else {
                    setActiveColorCategory(null);
                  }
                }}
              >
                {part}
              </button>
            ))}
          </div>

          {/* Right Options Display */}
          <div>
            {isFrameColorActive ? (
              <>
                {/* Search bar only for frameColor */}
                <input
                  type="text"
                  placeholder="Search colors..."
                  value={colorSearch}
                  onChange={(e) => setColorSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "12px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                  }}
                />

                {/* Color Categories Tabs */}
                <div
                  style={{
                    display: "flex",
                   
