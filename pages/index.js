import { useState } from "react";

const parts = {
  frameColor: [
    // Basic Colors
    "Black", "White", "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Gray", "Brown",
    "Sky Blue", "Mint", "Coral", "Teal", "Rose", "Beige", "Tan", "Lime", "Magenta", "Cyan",

    // Light Colors
    "Light Blue", "Light Pink", "Light Gray", "Light Green", "Light Yellow", "Pale Lavender", "Peach", "Powder Blue", "Baby Pink",

    // Dark Colors
    "Dark Blue", "Dark Red", "Dark Green", "Dark Purple", "Charcoal", "Midnight Black", "Navy", "Burgundy", "Forest Green", "Deep Plum",

    // Matte Finishes
    "Matte Black", "Matte Gray", "Matte Blue", "Matte Red", "Matte White", "Matte Olive", "Matte Teal", "Matte Maroon", "Matte Navy", "Matte Tan",

    // Metallic Finishes
    "Metallic Silver", "Metallic Blue", "Metallic Red", "Metallic Green", "Metallic Copper", "Metallic Gold",
    "Metallic Purple", "Metallic Teal", "Metallic Orange", "Metallic Pink", "Metallic Black",

    // Neon Finishes
    "Neon Green", "Neon Pink", "Neon Orange", "Neon Yellow", "Neon Blue", "Neon Purple", "Neon Red", "Neon Cyan", "Neon Lime", "Neon White",

    // Sparkly / Flake Finishes
    "Galaxy Purple Flake", "Electric Blue Flake", "Ruby Red Sparkle", "Emerald Green Sparkle",
    "Midnight Black Flake", "Champagne Sparkle", "Holographic Chrome", "Oil Slick",
    "Sunset Orange Flake", "Iridescent Pink Flake", "Silver Stardust", "Blue Glitter Shine", "Gold Flake",
  ],

  // other parts unchanged
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

function getColorButtonStyle(option, isSelected) {
  const baseStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: isSelected ? "2px solid #000" : "1px solid #ccc",
    cursor: "pointer",
    color: "#000",
    userSelect: "none",
    transition: "all 0.3s ease",
    minWidth: "100px",
    textAlign: "center",
  };

  const colorMap = {
    // Add all color mappings here
    Black: "#000", White: "#fff", Red: "#f00", Blue: "#00f", Green: "#008000", Yellow: "#ff0", Orange: "#ffa500",
    Purple: "#800080", Pink: "#ffc0cb", Gray: "#808080", Brown: "#a52a2a", "Sky Blue": "#87CEEB", Mint: "#98FF98",
    Coral: "#FF7F50", Teal: "#008080", Rose: "#FF007F", Beige: "#f5f5dc", Tan: "#d2b48c", Lime: "#32cd32",
    Magenta: "#ff00ff", Cyan: "#00ffff",

    "Light Blue": "#add8e6", "Light Pink": "#ffb6c1", "Light Gray": "#d3d3d3", "Light Green": "#90ee90",
    "Light Yellow": "#ffffe0", "Pale Lavender": "#dcd0ff", Peach: "#ffe5b4", "Powder Blue": "#b0e0e6", "Baby Pink": "#f4c2c2",

    "Dark Blue": "#00008b", "Dark Red": "#8b0000", "Dark Green": "#006400", "Dark Purple": "#4b0082",
    Charcoal: "#36454f", "Midnight Black": "#191919", Navy: "#000080", Burgundy: "#800020", "Forest Green": "#228b22", "Deep Plum": "#580f41",

    "Matte Black": "#1c1c1c", "Matte Gray": "#4d4d4d", "Matte Blue": "#3b5998", "Matte Red": "#b22222",
    "Matte White": "#f5f5f5", "Matte Olive": "#6b8e23", "Matte Teal": "#367588", "Matte Maroon": "#800000", "Matte Navy": "#1d2951", "Matte Tan": "#c3b091",

    "Metallic Silver": "#c0c0c0", "Metallic Blue": "#4682b4", "Metallic Red": "#dc143c", "Metallic Green": "#228b22",
    "Metallic Copper": "#b87333", "Metallic Gold": "#ffd700", "Metallic Purple": "#8a2be2", "Metallic Teal": "#008080",
    "Metallic Orange": "#ff8c00", "Metallic Pink": "#ff69b4", "Metallic Black": "#2f2f2f",

    "Neon Green": "#39ff14", "Neon Pink": "#ff6ec7", "Neon Orange": "#ff6700", "Neon Yellow": "#ffff33",
    "Neon Blue": "#1f51ff", "Neon Purple": "#c724b1", "Neon Red": "#ff073a", "Neon Cyan": "#00ffe4", "Neon Lime": "#bfff00", "Neon White": "#fefefe",

    "Galaxy Purple Flake": "#6a0dad", "Electric Blue Flake": "#7df9ff", "Ruby Red Sparkle": "#9b111e",
    "Emerald Green Sparkle": "#50c878", "Midnight Black Flake": "#0b0b0b", "Champagne Sparkle": "#f7e7ce",
    "Holographic Chrome": "#d1c4e9", "Oil Slick": "#3b3b3b",
    "Sunset Orange Flake": "#ff4500", "Iridescent Pink Flake": "#ff77ff", "Silver Stardust": "#c0c0c0",
    "Blue Glitter Shine": "#3f88ff", "Gold Flake": "#ffd700",
  };

  let backgroundColor = colorMap[option] || "#fff";
  let style = { ...baseStyle, backgroundColor };

  if (option.startsWith("Neon")) {
    style.color = "#fff";
    style.textShadow = `0 0 8px ${backgroundColor}, 0 0 20px ${backgroundColor}`;
  } else if (option.startsWith("Matte")) {
    style.filter = "brightness(0.7) saturate(0.5)";
  } else if (option.startsWith("Metallic")) {
    style.backgroundImage = `linear-gradient(45deg, ${backgroundColor} 30%, #fff 60%, ${backgroundColor} 90%)`;
    style.color = "#fff";
  } else if (
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "8px" }}>
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
