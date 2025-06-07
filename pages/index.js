import { useState, useMemo } from "react";

const colorCategories = {
  Basic: [
    "Black", "White", "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Gray", "Brown",
    "Crimson", "Royal Blue", "Forest Green", "Goldenrod", "Coral", "Indigo", "Salmon", "Slate Gray",
    "Chocolate", "Ivory", "Firebrick", "Dodger Blue", "Lime Green", "Gold", "Tomato", "Violet",
    "Light Coral", "Steel Blue", "Medium Sea Green", "Khaki", "Orchid", "Dark Salmon", "Light Slate Gray",
    "Peru", "Seashell", "Indian Red", "Deep Sky Blue", "Medium Aquamarine", "Yellow Green"
  ],
  Light: [
    "Light Blue", "Light Pink", "Light Gray", "Light Green", "Light Yellow", "Pastel Mint", "Cream",
    "Sky Blue", "Lavender", "Peach Puff", "Misty Rose", "Honeydew", "Light Cyan", "Pale Goldenrod",
    "Powder Blue", "Blanched Almond", "Lemon Chiffon", "Papaya Whip", "Light Salmon", "Mint Cream",
    "Light Steel Blue", "Alice Blue", "Seashell", "Floral White", "Ivory", "Ghost White", "Snow",
    "Light Goldenrod Yellow", "Light Sky Blue", "Light Pink", "Lavender Blush", "Beige"
  ],
  Dark: [
    "Dark Blue", "Dark Red", "Dark Green", "Dark Purple", "Charcoal", "Midnight Black", "Navy",
    "Maroon", "Saddle Brown", "Dark Olive Green", "Dark Slate Blue", "Dark Magenta", "Dark Cyan",
    "Dark Goldenrod", "Dark Khaki", "Dark Orchid", "Dark Salmon", "Dark Sea Green", "Dark Slate Gray",
    "Dark Turquoise", "Dark Violet", "Deep Pink", "Forest Green", "Indigo", "Olive Drab", "Purple",
    "Rebecca Purple", "Sienna", "Teal"
  ],
  Matte: [
    "Matte Black", "Matte Gray", "Matte Blue", "Matte Red", "Matte White", "Matte Olive", "Matte Navy",
    "Matte Maroon", "Matte Forest Green", "Matte Purple", "Matte Orange", "Matte Teal", "Matte Cyan",
    "Matte Yellow", "Matte Brown", "Matte Pink", "Matte Slate", "Matte Beige", "Matte Charcoal",
    "Matte Indigo", "Matte Crimson", "Matte Lavender"
  ],
  Metallic: [
    "Metallic Silver", "Metallic Blue", "Metallic Red", "Metallic Green", "Metallic Copper", "Metallic Gold",
    "Metallic Purple", "Metallic Teal", "Metallic Bronze", "Metallic Magenta", "Metallic Navy", "Metallic Orange",
    "Metallic Yellow", "Metallic Pink", "Metallic Charcoal", "Metallic Turquoise", "Metallic Rose", "Metallic Steel",
    "Metallic Crimson", "Metallic Olive", "Metallic Violet"
  ],
  Neon: [
    "Neon Green", "Neon Pink", "Neon Orange", "Neon Yellow", "Neon Blue", "Neon Purple",
    "Neon Cyan", "Neon Lime", "Neon Magenta", "Neon Red", "Neon Turquoise", "Neon Violet",
    "Neon Coral", "Neon Gold", "Neon Mint"
  ],
  Flake: [
    "Galaxy Purple Flake", "Electric Blue Flake", "Ruby Red Sparkle", "Emerald Green Sparkle",
    "Midnight Black Flake", "Champagne Sparkle", "Holographic Chrome", "Oil Slick", "Starry Night Flake",
    "Cosmic Silver Flake", "Meteorite Gold Sparkle", "Diamond Dust", "Aurora Borealis Flake",
    "Shooting Star Flake", "Lunar Silver Sparkle", "Solar Flare Orange Flake", "Platinum Flake",
    "Glittering Sapphire", "Stardust Blue", "Nova Red Sparkle"
  ],
};

const allColorNames = Object.values(colorCategories).flat();

const baseColorMap = {
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
  "Royal Blue": "#4169E1",
  "Forest Green": "#228B22",
  Goldenrod: "#DAA520",
  Coral: "#FF7F50",
  Indigo: "#4B0082",
  Salmon: "#FA8072",
  "Slate Gray": "#708090",
  Chocolate: "#D2691E",
  Ivory: "#FFFFF0",
  Firebrick: "#B22222",
  "Dodger Blue": "#1E90FF",
  "Lime Green": "#32CD32",
  Gold: "#FFD700",
  Tomato: "#FF6347",
  Violet: "#EE82EE",
  "Light Coral": "#F08080",
  "Steel Blue": "#4682B4",
  "Medium Sea Green": "#3CB371",
  Khaki: "#F0E68C",
  Orchid: "#DA70D6",
  "Dark Salmon": "#E9967A",
  "Light Slate Gray": "#778899",
  Peru: "#CD853F",
  Seashell: "#FFF5EE",
  "Indian Red": "#CD5C5C",
  "Deep Sky Blue": "#00BFFF",
  "Medium Aquamarine": "#66CDAA",
  "Yellow Green": "#9ACD32",

  "Light Blue": "#ADD8E6",
  "Light Pink": "#FFB6C1",
  "Light Gray": "#D3D3D3",
  "Light Green": "#90EE90",
  "Light Yellow": "#FFFFE0",
  "Pastel Mint": "#AAF0D1",
  Cream: "#FFFDD0",
  "Sky Blue": "#87CEEB",
  Lavender: "#E6E6FA",
  "Peach Puff": "#FFDAB9",
  "Misty Rose": "#FFE4E1",
  Honeydew: "#F0FFF0",
  "Light Cyan": "#E0FFFF",
  "Pale Goldenrod": "#EEE8AA",
  "Powder Blue": "#B0E0E6",
  "Blanched Almond": "#FFEBCD",
  "Lemon Chiffon": "#FFFACD",
  "Papaya Whip": "#FFEFD5",
  "Mint Cream": "#F5FFFA",
  "Light Steel Blue": "#B0C4DE",
  "Alice Blue": "#F0F8FF",
  "Floral White": "#FFFAF0",
  Ghost White: "#F8F8FF",
  Snow: "#FFFAFA",
  "Light Goldenrod Yellow": "#FAFAD2",
  "Light Sky Blue": "#87CEFA",
  "Lavender Blush": "#FFF0F5",
  Beige: "#F5F5DC",

  "Dark Blue": "#00008B",
  "Dark Red": "#8B0000",
  "Dark Green": "#006400",
  "Dark Purple": "#4B0082",
  Charcoal: "#36454F",
  "Midnight Black": "#191919",
  Navy: "#000080",
  Maroon: "#800000",
  "Saddle Brown": "#8B4513",
  "Dark Olive Green": "#556B2F",
  "Dark Slate Blue": "#483D8B",
  "Dark Magenta": "#8B008B",
  "Dark Cyan": "#008B8B",
  "Dark Goldenrod": "#B8860B",
  "Dark Khaki": "#BDB76B",
  "Dark Orchid": "#9932CC",
  "Dark Salmon": "#E9967A",
  "Dark Sea Green": "#8FBC8F",
  "Dark Slate Gray": "#2F4F4F",
  "Dark Turquoise": "#00CED1",
  "Dark Violet": "#9400D3",
  "Deep Pink": "#FF1493",
  Indigo: "#4B0082",
  "Olive Drab": "#6B8E23",
  Purple: "#800080",
  "Rebecca Purple": "#663399",
  Sienna: "#A0522D",
  Teal: "#008080",

  "Matte Black": "#1C1C1C",
  "Matte Gray": "#4D4D4D",
  "Matte Blue": "#3B5998",
  "Matte Red": "#B22222",
  "Matte White": "#F5F5F5",
  "Matte Olive": "#6B8E23",
  "Matte Navy": "#2F3E4D",
  "Matte Maroon": "#6D3B3B",
  "Matte Forest Green": "#2F4F2F",
  "Matte Purple": "#5D3A6E",
  "Matte Orange": "#CC6600",
  "Matte Teal": "#367373",
  "Matte Cyan": "#359B9B",
  "Matte Yellow": "#CCCC00",
  "Matte Brown": "#5A3E1B",
  "Matte Pink": "#C08081",
  "Matte Slate": "#708090",
  "Matte Beige": "#D6C6B9",
  "Matte Charcoal": "#36454F",
  "Matte Indigo": "#4B0082",
  "Matte Crimson": "#8C1C1C",
  "Matte Lavender": "#B57EDC",

  "Metallic Silver": "#C0C0C0",
  "Metallic Blue": "#4682B4",
  "Metallic Red": "#B22222",
  "Metallic Green": "#228B22",
  "Metallic Copper": "#B87333",
  "Metallic Gold": "#FFD700",
  "Metallic Purple": "#6B3FA0",
  "Metallic Teal": "#367588",
  "Metallic Bronze": "#CD7F32",
  "Metallic Magenta": "#D91E52",
  "Metallic Navy": "#2A3F54",
  "Metallic Orange": "#FF8C00",
  "Metallic Yellow": "#FFEA00",
  "Metallic Pink": "#FF69B4",
  "Metallic Charcoal": "#4C4C4C",
  "Metallic Turquoise": "#40E0D0",
  "Metallic Rose": "#B76E79",
  "Metallic Steel": "#4682B4",
  "Metallic Crimson": "#DC143C",
  "Metallic Olive": "#808000",
  "Metallic Violet": "#8F00FF",

  "Neon Green": "#39FF14",
  "Neon Pink": "#FF6EC7",
  "Neon Orange": "#FF6700",
  "Neon Yellow": "#FFFF33",
  "Neon Blue": "#1F51FF",
  "Neon Purple": "#BC13FE",
  "Neon Cyan": "#00FFFF",
  "Neon Lime": "#CCFF00",
  "Neon Magenta": "#FF00FF",
  "Neon Red": "#FF073A",
  "Neon Turquoise": "#30D5C8",
  "Neon Violet": "#9F00FF",
  "Neon Coral": "#FF7F50",
  "Neon Gold": "#FFD700",
  "Neon Mint": "#AAF0D1",

  "Galaxy Purple Flake": "#6A0DAD",
  "Electric Blue Flake": "#7DF9FF",
  "Ruby Red Sparkle": "#9B111E",
  "Emerald Green Sparkle": "#50C878",
  "Midnight Black Flake": "#0B0B0B",
  "Champagne Sparkle": "#F7E7CE",
  "Holographic Chrome": "#D1C4E9",
  "Oil Slick": "#3B3B3B",
  "Starry Night Flake": "#1A1A40",
  "Cosmic Silver Flake": "#C0C0C0",
  "Meteorite Gold Sparkle": "#D4AF37",
  "Diamond Dust": "#E6E8FA",
  "Aurora Borealis Flake": "#88D8C0",
  "Shooting Star Flake": "#FFC300",
  "Lunar Silver Sparkle": "#C0C0C0",
  "Solar Flare Orange Flake": "#FF4500",
  "Platinum Flake": "#E5E4E2",
  "Glittering Sapphire": "#0F52BA",
  "Stardust Blue": "#3A9BDC",
  "Nova Red Sparkle": "#B22222",
};

// Helper function to get style for a color button based on category and name
function getColorButtonStyle(option) {
  const colorValue = baseColorMap[option] || "#fff";

  const baseStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1.5px solid #ccc",
    cursor: "pointer",
    userSelect: "none",
    minWidth: "80px",
    textAlign: "center",
    fontWeight: "600",
    color: "#000",
    transition: "all 0.3s ease",
    backgroundColor: colorValue,
    boxShadow: "none",
  };

  // Neon - add glow effect
  if (option.startsWith("Neon")) {
    return {
      ...baseStyle,
      color: "#fff",
      textShadow: `0 0 6px ${colorValue}, 0 0 15px ${colorValue}`,
      border: `2px solid ${colorValue}`,
    };
  }

  // Matte - dim and desaturate
  if (option.startsWith("Matte")) {
    return {
      ...baseStyle,
      filter: "brightness(0.65) saturate(0.6)",
      border: "1.5px solid #555",
      color: "#eee",
      boxShadow: "inset 1px 1px 4px rgba(0,0,0,0.5)",
    };
  }

  // Metallic - gradient shine
  if (option.startsWith("Metallic")) {
    return {
      ...baseStyle,
      color: "#fff",
      backgroundImage: `linear-gradient(45deg, ${colorValue} 20%, #fff 50%, ${colorValue} 80%)`,
      border: `1.5px solid ${colorValue}`,
      boxShadow: `0 0 8px 1px ${colorValue}`,
    };
  }

  // Flake / Sparkle - textured pattern simulation
  if (
    option.includes("Flake") ||
    option.includes("Sparkle") ||
    option.includes("Holographic") ||
    option.includes("Oil Slick") ||
    option.includes("Starry") ||
    option.includes("Dust") ||
    option.includes("Meteorite") ||
    option.includes("Aurora") ||
    option.includes("Shooting Star") ||
    option.includes("Lunar") ||
    option.includes("Solar") ||
    option.includes("Platinum") ||
    option.includes("Glittering") ||
    option.includes("Nova")
  ) {
    return {
      ...baseStyle,
      color: "#fff",
      backgroundImage:
        `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9) 2px, transparent 4px), ` +
        `radial-gradient(circle at 80% 80%, rgba(255,255,255,0.4) 1px, transparent 3px), ` +
        `linear-gradient(45deg, ${colorValue} 25%, #fff 50%, ${colorValue} 75%)`,
      backgroundSize: "12px 12px",
      border: `1.5px solid ${colorValue}`,
      boxShadow: `0 0 10px 2px ${colorValue}`,
    };
  }

  // Basic colors (including Light and Dark) - just simple background
  return baseStyle;
}

export default function EBikeCustomizer() {
  // State to track selected part (category of parts)
  const [activeCategory, setActiveCategory] = useState(null);

  // State for current config (selected option for each part)
  const [config, setConfig] = useState(() => {
    // Default to first option of each part (frameColor first option is first Basic color)
    const defaultConfig = {
      frameColor: colorCategories.Basic[0],
      tireType: "Shinko SR241",
      handlebars: "Warp 9 Riser",
      headlight: "None",
      seat: "Guts Racing Tall",
      pegs: "Warp 9 MX Pegs",
      throttle: "Domino",
      grips: "ODI Rogue",
      subframe: "Warp 9 Riser Kit",
      wheels: "Warp 9 19/17 Supermoto",
      chain: "DID 420NZ3 Gold",
      sprocket: "Prickly 54T",
      bashPlate: "EBMX Aluminum Bash Plate",
      battery: "EBMX 72v 42Ah",
      controller: "EBMX X-9000",
      display: "EggRider V2",
      motor: "QS 3kW V3",
      rearShock: "DNM RCP-2S",
      frontFork: "DNM USD-8s",
    };
    return defaultConfig;
  });

  // Search state only for frameColor
  const [colorSearch, setColorSearch] =
