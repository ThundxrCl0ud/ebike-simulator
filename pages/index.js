import { useState } from "react";

const parts = {
  frameColor: ["Black", "White", "Blue", "Red", "Custom Powder Coated"],
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
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border:
                        config[activeCategory] === option ? "2px solid #000" : "1px solid #ccc",
                      backgroundColor: config[activeCategory] === option ? "#ddd" : "#fff",
                      cursor: "pointer",
                    }}
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
