import React, { useState, useMemo } from "react";

const parts = {
       bikes: {
    "Stark Varg": [
      "Stark Varg MX (standard, 2021–2023)", 
      "Stark Varg MX Alpha (80 hp)", 
      "Stark Varg EX 60 hp (2025 enduro)", 
      "Stark Varg EX Alpha 80 hp"
    ],
    "Talaria": [
      "Talaria Sting MX3", "Talaria Sting MX4", "Talaria Sting MX5", "Talaria Sting MX5 Pro", 
      "Talaria Sting R MX4", "Talaria Sting R MX4 Expert Edition", "Talaria Sting R SX4", 
      "Talaria Sting 60V Road Legal", "Talaria Dragon", "Talaria X3 Concept", 
      "Talaria X3 L1E Road Legal", "Talaria XXX Black Edition"
    ],
    "Sur-Ron": [
      "Sur-Ron Light Bee L1E", "Sur-Ron Light Bee X", "Sur-Ron Ultra Bee", "Sur-Ron Ultra Bee T", 
      "Sur-Ron Ultra Bee X", "Sur-Ron Storm Bee", "Sur-Ron Storm Bee F", "Sur-Ron Storm Bee R", 
      "Sur-Ron Hyper Bee"
    ],
    "eMoto": [
      "E‑Ride Pro Mini", "E‑Ride Pro S", "E‑Ride Pro SS 2.0", "E‑Ride Pro SS 3.0", 
      "E‑Ride Pro SR", "E‑Box 2.0"
    ],
    "Tuttio": [
      "Tuttio Soleil01 Electric Mini Bike", "Tuttio Seeker24 Dual Motor Electric Bike", 
      "Tuttio Adria26 Dual Motor Electric Bike", "Tuttio ARC‑I Kids Electric Bike", 
      "Tuttio ICT Electric Dirt Bike", "Tuttio C6 PRO Electric City Bike"
    ],
    "Ridstar": [
      "Ridstar Q20 Lite 1000W", "Ridstar Q20 1200W", "Ridstar Q20 1500W", "Ridstar Q20 Pro 2000W", 
      "Ridstar Q20 Pro Dual Motor", "Ridstar Q20 Luxe 1500W", "Ridstar Q16 1500W", 
      "Ridstar CR20 1500W", "Ridstar H20 1000W", "Ridstar H20 1200W", "Ridstar H20 Pro 2000W", 
      "Ridstar MN20 1000W Foldable", "Ridstar MN26 1500W", "Ridstar FM001 2‑Seater", 
      "Ridstar DC26 2000W Folding", "Ridstar E26 Pro 1000W Fat Tire", "Ridstar Q20 Mini Fat Tire"
    ],
    "Razor": [
      "Razor MX350 Dirt Rocket", "Razor MX400 Dirt Rocket", "Razor MX500 Dirt Rocket", 
      "Razor MX650 Dirt Rocket", "Razor Dirt Rocket Pro Spec", "Razor MX125 Dirt Rocket"
    ],
    "Cake": [
      "Cake Kalk OR", "Cake Kalk INK", "Cake Kalk INK SL", "Cake Kalk AP", "Cake Ösa Lite", 
      "Cake Ösa Flex", "Cake Ösa+", "Cake Makka"
    ],
    "Kuberg": [
      "Kuberg Freerider 8kW", "Kuberg Freerider 12kW", "Kuberg Freerider 14kW", 
      "Kuberg Freerider Street 4kW", "Kuberg Ranger 8kW", "Kuberg Ranger 12kW", 
      "Kuberg Ranger 14kW"
    ],
    "Onyx": [
      "Onyx CTY", "Onyx RCR", "Onyx RCR LTD", "Onyx RCR Street", "Onyx LZR", "Onyx LZR Pro"
    ],
    "Fantic": [
      "Fantic XF2 Integra", "Fantic XF2 Fat Sport", "Fantic XMF 1.7", "Fantic XMF 1.7 Carbon", 
      "Fantic XEF 1.9 Race", "Fantic XEF 1.9 Factory", "Fantic XEF 1.9 Carbon Team", 
      "Fantic Issimo Urban", "Fantic Issimo Fun"
    ],
    "Bultaco": [
      "Bultaco Brinco R", "Bultaco Brinco RB", "Bultaco Brinco S", "Bultaco Brinco C", 
      "Bultaco Albero", "Bultaco Rapitán", "Bultaco Pursang E-Track"
    ],
    "Zero": [
      "Zero S", "Zero SR", "Zero SR/F", "Zero SR/S", "Zero DSR", "Zero DSR/X", "Zero FX", 
      "Zero FXE", "Zero FXE-2", "Zero XB", "Zero XE", "Zero XU", "Zero MX", "Zero MXR", 
      "Zero S ZF9", "Zero S ZF12", "Zero S ZF14", "Zero DS ZF9", "Zero DS ZF12", 
      "Zero DS ZF14", "Zero DSR ZF14", "Zero DSR ZF14.4", "Zero DSR ZF15.6", "Zero DSR ZF17.3", 
      "Zero SR/F ZF14.4", "Zero SR/F ZF17.3", "Zero SR/S ZF14.4", "Zero SR/S ZF17.3"
    ],
    "Super73": [
  "Super73 Z1", "Super73 Z", "Super73 Z Miami", "Super73 ZX", "Super73 Z Adventure",
  "Super73 S1", "Super73 S2", "Super73 S Adventure", "Super73 S Blackout SE",
  "Super73 R", "Super73 RX", "Super73 R Adventure", "Super73 R Blackout SE",
  "Super73 R Brooklyn", "Super73 SG1", "Super73 SG", "Super73 SGZ", "Super73 SG2",
  "Super73 Scout", "Super73 OG", "Super73 Original 250W", "Super73 OG1",
  "Super73-ZG", "Super73 C1X (Concept)"
    ],
    "Rawrr": [
  "Rawrr Mantis", "Rawrr Mantis BL", "Rawrr Mantis L1E", "Rawrr Mantis Carbon Edition",
  "Rawrr Mantis 72V", "Rawrr Mantis 60V", "Rawrr Mantis MX", "Rawrr Mantis Street Legal",
  "Rawrr Mantis Pro", "Rawrr Mantis X", "Rawrr Mantis Limited Edition"
],
    "Segway": [
  "Segway Dirt eBike X160", "Segway Dirt eBike X260", 
  "Segway Xyber", "Segway Xyber Road", "Segway Xyber Off-Road",
  "Segway SuperScooter GT1", "Segway SuperScooter GT2",
  "Segway SuperScooter GT2P", "Segway SuperScooter P100S", 
  "Segway SuperScooter P65", "Segway SuperScooter P60"
],
"Lyric Cycles": [
  "Lyric Graffiti", "Lyric Graffiti X", "Lyric Voodoo", 
  "Lyric Voodoo 2.0", "Lyric Venom", "Lyric Ghost (Concept)", 
  "Lyric Challenger (Prototype)"
],
"Juiced Bikes": [
  "Juiced HyperScorpion", "Juiced HyperScorpion Express", "Juiced HyperScorpion Delta", 
  "Juiced Scorpion", "Juiced Scorpion X", "Juiced Scrambler", "Juiced CityScrambler", 
  "Juiced CampScrambler", "Juiced RipCurrent", "Juiced RipCurrent S", 
  "Juiced RipCurrent S Step-Through", "Juiced RipRacer", "Juiced CrossCurrent", 
  "Juiced CrossCurrent S2", "Juiced CrossCurrent X", "Juiced CrossCurrent X Step-Through", 
  "Juiced CrossTour", "Juiced OceanCurrent"
],
"Monday Motorbikes": [
  "Monday Anza V1", "Monday Anza V2", "Monday Anza V2S", 
  "Monday Gateway", "Monday Gateway 750", "Monday Presidio", 
  "Monday Presidio Pro", "Monday Gen7", "Monday Gen7 Pro"
],
"Zooz Bikes": [
  "Zooz Urban Ultralight 250", "Zooz Urban Ultralight 750", "Zooz Urban Ultralight 1100",
  "Zooz Ultra Urban 750", "Zooz Ultra Urban 1100", "Zooz Ultra Flex 1200",
  "Zooz Ripster"
],
"Apollo / RFN": [
  "RFN Ares", "RFN Tox", "RFN Wilder", "RFN Surpass", "RFN Outlaw", 
  "RFN Apex", "RFN Resolute", "Apollo Phantom", "Apollo Phantom Sport", 
  "Apollo Pro", "Apollo Ghost", "Apollo Explorer"
],
"UBCO": [
  "UBCO 2x2 Work Bike", "UBCO 2x2 Adventure Bike", "UBCO 2x2 Special Edition",
  "UBCO 2x2 Hunt Edition"
],
"Trevor Motorcycles": [
  "DTRe Stella",
  "DTRe Vince"
],
"Sondors": [
  "Sondors Metacycle"
],
  },
  frameColor: {
    basic: [
  "Apple Green", "Aquamarine", "Ash Gray", "Azure", "Beige", "Black", "Blush", "Blue", "Bronze", "Brown", "Burgundy", "Cerulean", "Charcoal",
  "Chartreuse", "Cherry Red", "Chocolate", "Cobalt Blue", "Copper", "Copper Red", "Coral", "Cream", "Crimson", "Cyan", "Dark Blue", "Dark Gray",
  "Dark Green", "Dark Orange", "Dark Red", "Eggplant", "Electric Blue", "Fern", "Firebrick", "Forest Green", "Gold", "Gray", "Green", "Indigo",
  "Ivory", "Jade", "Jet Black", "Khaki", "Lavender", "Lead", "Lemon", "Light Blue", "Light Gray", "Light Pink", "Light Yellow", "Lilac", "Lime",
  "Magenta", "Mahogany", "Maroon", "Mauve", "Mint", "Moss Green", "Mustard", "Navy", "Olive", "Olive Drab", "Orange", "Orchid", "Peach",
  "Peacock Blue", "Pear", "Periwinkle", "Pink", "Platinum", "Plum", "Pumpkin", "Purple", "Red", "Rose", "Ruby Red", "Rust", "Salmon", "Sand",
  "Sea Green", "Sienna", "Sky Blue", "Slate Gray", "Snow", "Steel", "Steel Blue", "Sunflower", "Tan", "Teal", "Tomato", "Turquoise", "Violet",
  "White", "Yellow"
    ],
    Light: [
  "Light Red", "Light Coral", "Light Pink", "Light Salmon", "Light Orange", "Light Yellow", "Light Gold", "Light Peach", "Light Apricot",
  "Light Beige", "Light Brown", "Light Tan", "Light Almond", "Light Champagne", "Light Khaki", "Light Olive", "Light Green", "Pale Green",
  "Mint Green", "Light Lime", "Light Seafoam", "Honeydew", "Light Aqua", "Light Cyan", "Pale Turquoise", "Light Teal", "Powder Blue",
  "Light Sky Blue", "Sky Blue", "Light Blue", "Alice Blue", "Azure", "Baby Blue", "Light Steel Blue", "Lavender Blue", "Lavender",
  "Light Indigo", "Light Purple", "Thistle", "Mauve", "Orchid", "Light Violet", "Plum", "Wisteria", "Light Magenta", "Light Fuchsia",
  "Light Rose", "Blush Pink", "Light Crimson", "Light Raspberry", "Seashell", "Snow", "Floral White", "Ivory", "Ghost White", "White Smoke",
  "Gainsboro", "Light Gray", "Light Silver", "Light Slate Gray", "Light Charcoal", "Platinum", "Pastel Pink", "Pastel Orange", "Pastel Yellow",
  "Pastel Green", "Pastel Blue", "Pastel Purple", "Peach Puff", "Navajo White", "Misty Rose", "Linen", "Old Lace", "Cornsilk", "Lemon Chiffon",
  "Papaya Whip", "Moccasin", "Bisque", "Antique White", "Light Plum", "Light Copper", "Light Rosewood", "Pearl", "Vanilla", "Eggshell", "Cream",
  "Bubblegum Pink", "Baby Pink", "Fairy Tale", "Isabelline", "Tea Rose", "Light Brick", "Cameo Pink", "Piggy Pink", "Tiffany Blue",
  "Carolina Blue"
    ],
    Dark: [
  "Dark Red", "Dark Crimson", "Dark Maroon", "Burgundy", "Wine", "Blood Red", "Firebrick", "Dark Brick", "Mahogany", "Rusty Red", "Ox Blood",
  "Sangria", "Claret", "Chestnut", "Sienna", "Dark Chocolate", "Dark Brown", "Chocolate Brown", "Walnut", "Coffee", "Cocoa Brown", "Dark Taupe",
  "Umber", "Dark Olive", "Hunter Green", "Forest Green", "Dark Moss", "Deep Green", "Bottle Green", "Midnight Green", "Dark Teal", "Dark Cyan",
  "Teal Blue", "Prussian Blue", "Dark Navy", "Navy Blue", "Midnight Blue", "Royal Blue", "Indigo", "Dark Slate Blue", "Slate Blue", "Dark Purple",
  "Eggplant", "Deep Plum", "Dark Violet", "Deep Violet", "Dark Magenta", "Dark Orchid", "Mulberry", "Dark Pink", "Dark Salmon", "Bistre",
  "Dark Copper", "Copper", "Bronze", "Dark Gold", "Old Gold", "Dark Yellow", "Mustard", "Olive Drab", "Army Green", "Dark Lime",
  "Dark Chartreuse", "Dark Sea Green", "Deep Teal", "Dark Aqua", "Midnight Teal", "Gunmetal", "Charcoal", "Onyx", "Jet Black",
  "Ebony", "Rifle Green", "Dark Slate Gray", "Outer Space", "Phthalo Blue", "Midnight", "Dark Steel", "Graphite", "Dark Smoke", "Oil Black",
  "Raven", "Gunmetal Gray", "Coal", "Pitch Black", "Twilight Blue", "Deep Sapphire", "Dark Sapphire", "Dark Denim", "Space Cadet",
  "Dark Cerulean", "Dark Azure", "Blue Sapphire", "Deep Indigo", "Dark Mulberry", "Midnight Purple", "Dark Mauve", "Eggplant Purple",
  "Dark Burgundy", "Deep Ruby", "Dark Rose", "Dark Brick Red", "Bloodstone", "Ox Blood Red", "Saddle Brown", "Brown Sugar", "Burnt Umber",
  "Russet", "Sepia", "Dark Amber", "Deep Amber", "Bronze Olive", "Olive Brown", "Steel Gray", "Dark Gray"
    ],
    Matte: [
  "Matte Black", "Matte White", "Matte Red", "Matte Blue", "Matte Green", "Matte Yellow", "Matte Orange", "Matte Purple", "Matte Brown",
  "Matte Pink", "Matte Gray", "Matte Light Gray", "Matte Cyan", "Matte Magenta", "Matte Lime", "Matte Maroon", "Matte Navy", "Matte Olive",
  "Matte Teal", "Matte Silver", "Matte Gold", "Matte Coral", "Matte Salmon", "Matte Turquoise", "Matte Violet", "Matte Indigo", "Matte Crimson",
  "Matte Chocolate", "Matte Khaki", "Matte Lavender", "Matte Beige", "Matte Mint", "Matte Mustard", "Matte Peach", "Matte Rust",
  "Matte Slate Gray", "Matte Sea Green", "Matte Tan", "Matte Tomato", "Matte Wheat", "Matte Azure", "Matte Chartreuse", "Matte Periwinkle",
  "Matte Steel Blue", "Matte Sienna", "Matte Lemon", "Matte Burgundy", "Matte Charcoal", "Matte Forest Green", "Matte Midnight Blue",
  "Matte Eggplant", "Matte Deep Plum", "Matte Mulberry", "Matte Gunmetal", "Matte Onyx", "Matte Coffee", "Matte Cocoa", "Matte Burnt Orange",
  "Matte Rusty Red", "Matte Olive Drab", "Matte Army Green", "Matte Hunter Green", "Matte Dark Moss", "Matte Prussian Blue", "Matte Denim",
  "Matte Slate Blue", "Matte Dark Slate Gray", "Matte Oil Black", "Matte Raven", "Matte Graphite", "Matte Sepia", "Matte Bronze", "Matte Copper",
  "Matte Dark Taupe", "Matte Deep Teal", "Matte Dark Cyan", "Matte Dark Violet", "Matte Dark Magenta", "Matte Dark Orchid", "Matte Dark Burgundy",
  "Matte Deep Ruby", "Matte Dark Rose", "Matte Saddle Brown", "Matte Brown Sugar", "Matte Burnt Umber", "Matte Russet", "Matte Deep Amber",
  "Matte Bronze Olive", "Matte Olive Brown", "Matte Steel Gray", "Matte Dark Gray"
    ],
    Metallic: [
  "Metallic Silver", "Metallic Gold", "Metallic Bronze", "Metallic Copper", "Metallic Platinum", "Metallic Steel", "Metallic Gunmetal",
  "Metallic Titanium", "Metallic Rose Gold", "Metallic Chrome", "Metallic Aluminum", "Metallic Brass", "Metallic Bronze Olive",
  "Metallic Dark Silver", "Metallic Bright Silver", "Metallic Antique Gold", "Metallic Light Gold", "Metallic Copper Red", "Metallic Rust",
  "Metallic Burnt Copper", "Metallic Dark Copper", "Metallic Champagne", "Metallic Pewter", "Metallic Iron", "Metallic Silver Blue",
  "Metallic Silver Green", "Metallic Steel Blue", "Metallic Ocean Blue", "Metallic Blue Gray", "Metallic Midnight Blue", "Metallic Dark Steel",
  "Metallic Ash Gray", "Metallic Slate Gray", "Metallic Gunmetal Gray", "Metallic Graphite", "Metallic Carbon Black", "Metallic Onyx",
  "Metallic Dark Bronze", "Metallic Mahogany", "Metallic Copper Brown", "Metallic Red Bronze", "Metallic Rusty Red", "Metallic Goldenrod",
  "Metallic Yellow Gold", "Metallic Light Bronze", "Metallic Pale Gold", "Metallic Rose Copper", "Metallic Light Copper",
  "Metallic Bronze Yellow", "Metallic Brass Brown", "Metallic Olive Bronze", "Metallic Champagne Gold", "Metallic Champagne Pink",
  "Metallic Antique Silver", "Metallic Bright Gold", "Metallic Electric Blue", "Metallic Ice Blue", "Metallic Sky Blue", "Metallic Azure",
  "Metallic Sapphire", "Metallic Cobalt Blue", "Metallic Royal Blue", "Metallic Navy Blue", "Metallic Dark Blue", "Metallic Steel Green",
  "Metallic Dark Green", "Metallic Forest Green", "Metallic Emerald", "Metallic Jade", "Metallic Teal", "Metallic Aqua", "Metallic Turquoise",
  "Metallic Deep Turquoise", "Metallic Bright Teal", "Metallic Purple", "Metallic Violet", "Metallic Amethyst", "Metallic Lavender",
  "Metallic Magenta", "Metallic Hot Pink", "Metallic Fuchsia", "Metallic Dark Magenta", "Metallic Burgundy", "Metallic Crimson", "Metallic Ruby",
  "Metallic Maroon", "Metallic Chocolate", "Metallic Coffee", "Metallic Burnt Umber", "Metallic Bronze Red", "Metallic Dark Brown",
  "Metallic Tan", "Metallic Sand", "Metallic Wheat", "Metallic Beige", "Metallic Pearl", "Metallic Light Gray", "Metallic Silver Gray",
  "Metallic Dark Gray", "Metallic Charcoal", "Metallic Black", "Metallic Graphite Black", "Metallic Oil Slick"
    ],
    Neon: [
  "Neon Pink", "Neon Green", "Neon Blue", "Neon Yellow", "Neon Orange", "Neon Purple", "Neon Red", "Neon Cyan", "Neon Lime", "Neon Magenta",
  "Neon Coral", "Neon Turquoise", "Neon Lavender", "Neon Peach", "Neon Aqua", "Neon Mint", "Neon Fuchsia", "Neon Teal", "Neon Gold",
  "Neon Silver", "Neon Bronze", "Neon Bright Crimson", "Neon Salmon", "Neon Violet", "Neon Indigo", "Neon Marigold", "Neon Chartreuse",
  "Neon Electric Blue", "Neon Electric Green", "Neon Electric Purple", "Neon Electric Yellow", "Neon Hot Pink", "Neon Bright Orange",
  "Neon Bright Red", "Neon Bright Green", "Neon Bright Blue", "Neon Bright Yellow", "Neon Bright Purple", "Neon Bright Cyan",
  "Neon Bright Magenta", "Neon Fluorescent Pink", "Neon Fluorescent Orange", "Neon Fluorescent Yellow", "Neon Fluorescent Green",
  "Neon Fluorescent Blue", "Neon Fluorescent Purple", "Neon Fluorescent Cyan", "Neon Fluorescent Magenta", "Neon Bright Turquoise",
  "Neon Bright Mint", "Neon Bright Lavender", "Neon Bright Peach", "Neon Bright Salmon", "Neon Bright Violet", "Neon Bright Indigo",
  "Neon Bright Maroon", "Neon Bright Olive", "Neon Bright Silver", "Neon Bright Gold", "Neon Bright Bronze", "Neon Bright Copper",
  "Neon Bright Ruby", "Neon Bright Sapphire", "Neon Bright Topaz", "Neon Bright Amethyst", "Neon Bright Onyx", "Neon Bright Quartz",
  "Neon Bright Pearl", "Neon Bright Steel", "Neon Bright Ash", "Neon Bright Charcoal", "Neon Bright Smoke", "Neon Bright Cloud",
  "Neon Bright Sky", "Neon Bright Ocean", "Neon Bright Forest", "Neon Bright Jungle", "Neon Bright Grass", "Neon Bright Moss",
  "Neon Bright Leaf", "Neon Bright Pine", "Neon Bright Olive Drab", "Neon Bright Lime Punch", "Neon Bright Kiwi", "Neon Bright Aloe",
  "Neon Bright Shamrock", "Neon Bright Fern", "Neon Bright Basil", "Neon Bright Celadon", "Neon Bright Jade", "Neon Bright Lagoon",
  "Neon Bright Lagoon Blue", "Neon Bright Royal Blue", "Neon Bright Denim", "Neon Bright Navy", "Neon Bright Midnight",
  "Neon Bright Plum", "Neon Bright Orchid", "Neon Bright Lilac", "Neon Bright Heather", "Neon Bright Mauve", "Neon Bright Blush",
  "Neon Bright Rose", "Neon Bright Brick", "Neon Bright Rust", "Neon Bright Burnt Orange", "Neon Bright Sunset", "Neon Bright Amber",
  "Neon Bright Honey", "Neon Bright Saffron", "Neon Bright Mustard", "Neon Bright Lemon", "Neon Bright Citrus", "Neon Bright Banana",
  "Neon Bright Gold Rush"
    ],
    Flake: [
  "Sparkle Black", "Glitter Silver", "Flake Blue", "Metallic Red Flake", "Candy Apple Flake", "Sparkly Purple", "Flake Green", "Glitter Gold",
  "Metallic Teal Flake", "Pearl White Flake", "Sparkling Navy", "Glitter Pink", "Flake Orange", "Candy Flake Yellow", "Sparkle Bronze",
  "Metallic Copper Flake", "Flake Maroon", "Glitter Turquoise", "Pearl Blue Flake", "Sparkly Lime", "Metallic Violet Flake", "Candy Green Flake",
  "Sparkle Magenta", "Glitter Charcoal", "Flake Burgundy", "Metallic Rose Flake", "Sparkly Pearl Champagne", "Sparkly Mint", "Candy Coral Flake",
  "Glitter Olive", "Flake Lavender", "Metallic Burgundy Flake", "Sparkle Cyan", "Candy Fuchsia Flake", "Glitter Mustard", "Flake Rust",
  "Pearl Pink Flake", "Sparkly Aqua", "Metallic Slate Flake", "Candy Plum Flake", "Flake Champagne", "Sparkle Coral", "Glitter Moss",
  "Metallic Lemon Flake", "Pearl Gold Flake", "Flake Forest Green", "Candy Blue Flake", "Sparkly Amber", "Glitter Electric Blue",
  "Metallic Peach Flake", "Flake Chartreuse", "Sparkle Salmon", "Candy Bronze Flake", "Glitter Azure", "Pearl Violet Flake",
  "Flake Mint Green", "Metallic Ruby Flake", "Sparkly Teal", "Candy Mustard Flake", "Glitter Crimson", "Flake Denim",
  "Pearl Turquoise Flake", "Sparkle Rose Gold", "Metallic Olive Flake", "Candy Lemon Flake", "Flake Sapphire", "Glitter Blush", "Sparkly Cobalt",
  "Metallic Periwinkle Flake", "Candy Tangerine Flake", "Flake Electric Green", "Sparkle Mulberry", "Glitter Emerald", "Pearl Cyan Flake",
  "Metallic Fire Red Flake", "Candy Lavender Flake", "Flake Pistachio", "Sparkly Garnet", "Glitter Hot Pink", "Metallic Chocolate Flake",
  "Candy Kelly Green Flake", "Flake Antique Gold", "Sparkle Pacific Blue", "Pearl Rust Flake", "Glitter Marigold", "Metallic Champagne Flake",
  "Flake Watermelon", "Candy Saffron Flake", "Sparkly Plum", "Metallic Ice Blue Flake", "Flake Copper Penny", "Glitter Scarlet",
  "Sparkle Emerald Green", "Pearl Mustard Flake", "Candy Ocean Blue Flake", "Flake Firefly", "Metallic Steel Blue Flake", "Glitter Mango",
  "Sparkly Jade", "Candy Tangerine", "Flake Snow White", "Pearl Sky Blue Flake", "Metallic Deep Purple Flake", "Sparkle Blood Red",
  "Glitter Pine Green", "Flake Orchid", "Candy Baby Blue Flake", "Metallic Burnt Orange Flake", "Sparkly Ruby", "Glitter Ivory",
  "Flake Turquoise Green", "Pearl Dusty Rose Flake", "Metallic Midnight Blue Flake", "Candy Champagne", "Sparkle Lemon Yellow",
  "Glitter Cerulean", "Flake Rosewood", "Metallic Hot Magenta Flake", "Candy Canary Yellow Flake", "Sparkly Pumpkin", "Flake Azure Blue",
  "Pearl Ice Green Flake", "Metallic Bronze Flake", "Glitter Mulberry", "Sparkle Coral Reef", "Candy Plum Purple Flake", "Flake Electric Purple",
  "Metallic Moss Green Flake", "Sparkly Bubblegum Pink", "Glitter Sapphire", "Flake Pineapple", "Pearl Coffee Flake", "Metallic Frost Blue Flake",
  "Candy Lilac Flake", "Sparkle Neon Orange", "Glitter Apple Green", "Flake Mint Blue", "Metallic Champagne Rose Flake",
  "Candy Fire Engine Red Flake", "Sparkly Ocean Blue"
    ],
  },
  Tires: [
    "Shinko SR241", "Dunlop MX53", "Kenda K270", "Maxxis Minion DHF", "Hybrid", "Pirelli Scorpion", "Michelin Wild Enduro"
  ],
  Handlebars: [
    "Warp 9 Riser", "ODI V2 Lock-On", "ProTaper", "Stock", "Renthal Fatbar", "Renthal Apex", "Biltwell Tracker"
  ],
  Headlight: [
    "None", "Basic", "Baja Designs S2 Pro", "GritShift Projector", "Supernova E3", "Lezyne Macro Drive"
  ],
  Seat: [
    "Guts Racing Tall", "Guts Racing Gripper", "Luna Tall Seat", "Stock", "Selle Italia SLR", "Brooks Cambium"
  ],
  Pegs: [
    "Warp 9 MX Pegs", "Prickly Peg Extenders", "Amazon CNC Billet", "Stock", "ODI Rogue"
  ],
  Throttle: [
    "Domino", "Surron Ultra Bee Throttle Tube", "NB Power Twist", "Stock"
  ],
  Grips: [
    "ODI Rogue", "Warp 9 Lock-On", "ProTaper Pillow Top", "Stock"
  ],
  Subframe: [
    "Warp 9 Riser Kit", "GritShift Subframe", "Custom Fabricated", "Stock"
  ],
  Wheels: [
    "Warp 9 19/17 Supermoto", "DirtyBike 21/18 MX", "Custom Anodized", "Stock 19/19"
  ],
  Chain: [
    "DID 420NZ3 Gold", "EK 420 SR", "Amazon Heavy-Duty", "Stock"
  ],
  Sprocket: [
    "Prickly 54T", "Warp 9 52T", "Luna 60T", "Stock 48T"
  ],
  Skidplate: [
    "EBMX Aluminum Bash Plate", "Warp 9 Skid Plate", "Amazon HD Plate", "Stock"
  ],
  Battery: [
    "EBMX 72v 42Ah", "ChiBatterySystems 60v", "GrinTech 72v", "Stock 60v"
  ],
  Controller: [
    "EBMX X-9000", "Nucular 24F", "Votol EM-150", "Stock"
  ],
  Display: [
    "EggRider V2", "Apt 850C", "Luna Full Color", "Stock"
  ],
  Motor: [
    "QS 3kW V3", "NB Power 5000W", "EBMX XLB-60", "Stock"
  ],
  RearShock: [
    "DNM RCP-2S", "FastAce BDA53RC", "Fox Float X", "Stock"
  ],
  Forks: [
    "DNM USD-8s", "Manitou Dorado", "KKE Inverted", "Stock"
  ],
};

// Helper to get styles per color type and simulate metallic, matte, neon, and flake effects
function getColorButtonStyle(option) {
  // Base colors for mapping
  const colorMap = {
    // Basic
  "Black": "#000000",
  "White": "#FFFFFF",
  "Gray": "#808080",
  "Light Gray": "#D3D3D3",
  "Dark Gray": "#A9A9A9",
  "Red": "#FF0000",
  "Dark Red": "#8B0000",
  "Baby Pink": "#F4C2C2",
  "Crimson": "#DC143C",
  "Pink": "#FFC0CB",
  "Light Pink": "#FFB6C1",
  "Coral": "#FF7F50",
  "Orange": "#FFA500",
  "Dark Orange": "#FF8C00",
  "Peach": "#FFE5B4",
  "Yellow": "#FFFF00",
  "Gold": "#FFD700",
  "Light Yellow": "#FFFFE0",
  "Lime": "#00FF00",
  "Green": "#008000",
  "Dark Green": "#006400",
  "Olive": "#808000",
  "Teal": "#008080",
  "Cyan": "#00FFFF",
  "Light Blue": "#ADD8E6",
  "Blue": "#0000FF",
  "Dark Blue": "#00008B",
  "Navy": "#000080",
  "Indigo": "#4B0082",
  "Purple": "#800080",
  "Lavender": "#E6E6FA",
  "Violet": "#EE82EE",
  "Brown": "#A52A2A",
  "Tan": "#D2B48C",
  "Beige": "#F5F5DC",
  "Maroon": "#800000",
  "Burgundy": "#800020",
  "Sienna": "#A0522D",
  "Chocolate": "#D2691E",
  "Salmon": "#FA8072",
  "Tomato": "#FF6347",
  "Khaki": "#F0E68C",
  "Plum": "#DDA0DD",
  "Orchid": "#DA70D6",
  "Magenta": "#FF00FF",
  "Turquoise": "#40E0D0",
  "Aquamarine": "#7FFFD4",
  "Sky Blue": "#87CEEB",
  "Steel Blue": "#4682B4",
  "Slate Gray": "#708090",
  "Moss Green": "#8A9A5B",
  "Forest Green": "#228B22",
  "Mint": "#98FF98",
  "Peacock Blue": "#1CA9C9",
  "Cerulean": "#007BA7",
  "Electric Blue": "#7DF9FF",
  "Azure": "#007FFF",
  "Cobalt Blue": "#0047AB",
  "Ruby Red": "#9B111E",
  "Cherry Red": "#DE3163",
  "Firebrick": "#B22222",
  "Pumpkin": "#FF7518",
  "Sunflower": "#FFDA03",
  "Mustard": "#FFDB58",
  "Cream": "#FFFDD0",
  "Ivory": "#FFFFF0",
  "Snow": "#FFFAFA",
  "Charcoal": "#36454F",
  "Jet Black": "#343434",
  "Ash Gray": "#B2BEB5",
  "Rose": "#FF007F",
  "Blush": "#DE5D83",
  "Mauve": "#E0B0FF",
  "Periwinkle": "#CCCCFF",
  "Lilac": "#C8A2C8",
  "Eggplant": "#614051",
  "Copper": "#B87333",
  "Bronze": "#CD7F32",
  "Steel": "#4682B4",
  "Lead": "#4C5866",
  "Platinum": "#E5E4E2",
  "Champagne": "#F7E7CE",
  "Pear": "#D1E231",
  "Lemon": "#FFF700",
  "Apple Green": "#8DB600",
  "Chartreuse": "#7FFF00",
  "Jade": "#00A86B",
  "Sea Green": "#2E8B57",
  "Fern": "#4F7942",
  "Olive Drab": "#6B8E23",
  "Sand": "#C2B280",
  "Rust": "#B7410E",
  "Copper Red": "#CB6D51",
  "Mahogany": "#C04000",
    // Light
"Light Red": "#FF7F7F",
"Baby Pink": "#FFC0CB",
"Tea Rose": "#F4C2C2",
"Light Coral": "#F08080",
"Lavender Blue": "#CCCCFF",
"Light Salmon": "#FFA07A",
"Light Plum": "#B399C8",
"Light Orange": "#FFD580",
"Light Gold": "#FAFAD2",
"Light Peach": "#FFE5B4",
"Light Apricot": "#FBCEB1",
"Light Brown": "#C4A484",
"Light Almond": "#EFDECD",
"Light Khaki": "#F0E68C",
"Light Olive": "#BAB86C",
"Light Champagne": "#F7E7CE",
"Light Green": "#90EE90",
"Pale Green": "#98FB98",
"Mint Green": "#98FF98",
"Light Lime": "#BFFF00",
"Light Seafoam": "#A7FBD4",
"Honeydew": "#F0FFF0",
"Light Aqua": "#A4F4F9",
"Light Cyan": "#E0FFFF",
"Pale Turquoise": "#AFEEEE",
"Light Teal": "#99E6E6",
"Powder Blue": "#B0E0E6",
"Light Sky Blue": "#87CEFA",
"Alice Blue": "#F0F8FF",
"Azure": "#F0FFFF",
"Baby Blue": "#89CFF0",
"Light Steel Blue": "#B0C4DE",
"Light Indigo": "#B4A7D6",
"Light Purple": "#CBC3E3",
"Thistle": "#D8BFD8",
"Light Violet": "#CF9FFF",
"Wisteria": "#C9A0DC",
"Light Magenta": "#FF99FF",
"Light Fuchsia": "#F984EF",
"Light Rose": "#FBCFCD",
"Blush Pink": "#FFDDEE",
"Light Crimson": "#F88379",
"Light Raspberry": "#FFBCD9",
"Seashell": "#FFF5EE",
"Floral White": "#FFFAF0",
"Gainsboro": "#DCDCDC",
"Light Silver": "#D8D8D8",
"Light Slate Gray": "#778899",
"Light Charcoal": "#A9A9A9",
"Pastel Pink": "#FFD1DC",
"Pastel Orange": "#FFB347",
"Pastel Yellow": "#FDFD96",
"Pastel Green": "#77DD77",
"Pastel Blue": "#AEC6CF",
"Pastel Purple": "#B39EB5",
"Peach Puff": "#FFDAB9",
"Navajo White": "#FFDEAD",
"Misty Rose": "#FFE4E1",
"Linen": "#FAF0E6",
"Old Lace": "#FDF5E6",
"Cornsilk": "#FFF8DC",
"Lemon Chiffon": "#FFFACD",
"Papaya Whip": "#FFEFD5",
"Moccasin": "#FFE4B5",
"Bisque": "#FFE4C4",
"Antique White": "#FAEBD7",
"Light Copper": "#DA8A67",
"Light Rosewood": "#BC8F8F",
"Pearl": "#F8F6F0",
"Light Beige": "#F5F5DC",
"Vanilla": "#F3E5AB",
"Eggshell": "#F0EAD6",
"Cream": "#FFFDD0",
"Bubblegum Pink": "#FFC1CC",
"Fairy Tale": "#F2C1D1",
"Isabelline": "#F4F0EC",
"Cameo Pink": "#EFBBCC",
"Light Tan": "#D2B48C",
"Piggy Pink": "#FDDDE6",
"Light Brick": "#CB6D51",
"Tiffany Blue": "#0ABAB5",
"Carolina Blue": "#56A0D3",
    // Dark
"Dark Red": "#8B0000",
"Dark Crimson": "#631A1A",
"Dark Maroon": "#550000",
"Burgundy": "#4C1A1A",
"Wine": "#722F37",
"Dark Mulberry": "#70193D",
"Blood Red": "#660000",
"Firebrick": "#B22222",
"Dark Brick": "#8B1A1A",
"Mahogany": "#4A0100",
"Rusty Red": "#8B2500",
"Ox Blood": "#4B0101",
"Sangria": "#92000A",
"Claret": "#7F1734",
"Chestnut": "#5D1A1A",
"Sienna": "#5A2D0C",
"Dark Chocolate": "#3E1E0B",
"Dark Brown": "#3B2F2F",
"Chocolate Brown": "#381819",
"Walnut": "#4B3621",
"Coffee": "#3B2F2F",
"Cocoa Brown": "#42291A",
"Dark Taupe": "#483C32",
"Umber": "#635147",
"Dark Olive": "#556B2F",
"Hunter Green": "#355E3B",
"Forest Green": "#254117",
"Dark Moss": "#4A5D23",
"Deep Green": "#013220",
"Bottle Green": "#004225",
"Midnight Green": "#003333",
"Dark Teal": "#014D4D",
"Dark Cyan": "#008B8B",
"Teal Blue": "#367588",
"Prussian Blue": "#003153",
"Dark Navy": "#000080",
"Navy Blue": "#000055",
"Midnight Blue": "#191970",
"Royal Blue": "#002366",
"Indigo": "#2E0854",
"Dark Slate Blue": "#483D8B",
"Slate Blue": "#6A5ACD",
"Dark Purple": "#301934",
"Eggplant": "#311432",
"Deep Plum": "#580F41",
"Dark Violet": "#9400D3",
"Deep Violet": "#4B0082",
"Dark Magenta": "#8B008B",
"Dark Orchid": "#9932CC",
"Mulberry": "#70193D",
"Dark Pink": "#8B3A62",
"Dark Salmon": "#E9967A",
"Bistre": "#3D2B1F",
"Dark Copper": "#B87333",
"Copper": "#7C482B",
"Bronze": "#5C4033",
"Dark Gold": "#B8860B",
"Old Gold": "#CFB53B",
"Dark Yellow": "#CCCC00",
"Mustard": "#FFDB58",
"Olive Drab": "#6B8E23",
"Army Green": "#4B5320",
"Dark Lime": "#A4C639",
"Dark Chartreuse": "#6B8E23",
"Dark Sea Green": "#8FBC8F",
"Deep Teal": "#004B49",
"Dark Aqua": "#005757",
"Midnight Teal": "#003F4D",
"Gunmetal": "#2a3439",
"Charcoal": "#36454F",
"Onyx": "#353839",
"Jet Black": "#343434",
"Ebony": "#555D50",
"Rifle Green": "#444C38",
"Dark Slate Gray": "#2F4F4F",
"Outer Space": "#414A4C",
"Phthalo Blue": "#000F89",
"Midnight": "#121212",
"Dark Steel": "#262626",
"Graphite": "#1C1C1C",
"Dark Smoke": "#3A3B3C",
"Oil Black": "#232B2B",
"Raven": "#141414",
"Gunmetal Gray": "#2C3539",
"Coal": "#2E2D2D",
"Pitch Black": "#0B0B0B",
"Twilight Blue": "#0A1A4C",
"Deep Sapphire": "#082567",
"Dark Sapphire": "#0F52BA",
"Dark Denim": "#081E3E",
"Space Cadet": "#1D2951",
"Dark Cerulean": "#08457E",
"Dark Azure": "#007BA7",
"Blue Sapphire": "#126180",
"Deep Indigo": "#1A1A8D",
"Midnight Purple": "#280137",
"Dark Mauve": "#874C62",
"Eggplant Purple": "#311432",
"Dark Burgundy": "#4C0013",
"Deep Ruby": "#6D071A",
"Dark Rose": "#65000B",
"Dark Brick Red": "#8A0707",
"Bloodstone": "#6B2C1A",
"Ox Blood Red": "#4A0000",
"Saddle Brown": "#8B4513",
"Brown Sugar": "#AF6E4D",
"Burnt Umber": "#8A3324",
"Olive Brown": "#645403",
"Russet": "#80461B",
"Sepia": "#704214",
"Dark Amber": "#FFBF00",
"Deep Amber": "#FF8C00",
"Bronze Olive": "#4B5320",
"Steel Gray": "#43464B",
    // Matte
"Matte Black": "#1C1C1C",
"Matte White": "#F5F5F5",
"Matte Red": "#B22222",
"Matte Blue": "#3B5998",
"Matte Green": "#2E8B57",
"Matte Yellow": "#E1C699",
"Matte Orange": "#D2691E",
"Matte Purple": "#6A5ACD",
"Matte Brown": "#5C4033",
"Matte Pink": "#D87CA1",
"Matte Gray": "#696969",
"Matte Light Gray": "#A9A9A9",
"Matte Cyan": "#008B8B",
"Matte Magenta": "#8B008B",
"Matte Lime": "#32CD32",
"Matte Maroon": "#800000",
"Matte Navy": "#000080",
"Matte Olive": "#556B2F",
"Matte Teal": "#008080",
"Matte Silver": "#C0C0C0",
"Matte Gold": "#D4AF37",
"Matte Coral": "#FF6F61",
"Matte Salmon": "#FA8072",
"Matte Turquoise": "#40E0D0",
"Matte Violet": "#8F00FF",
"Matte Indigo": "#4B0082",
"Matte Crimson": "#DC143C",
"Matte Chocolate": "#3D1C02",
"Matte Khaki": "#BDB76B",
"Matte Lavender": "#B57EDC",
"Matte Beige": "#D9D2BF",
"Matte Mint": "#98FF98",
"Matte Mustard": "#FFDB58",
"Matte Peach": "#FFE5B4",
"Matte Rust": "#B7410E",
"Matte Slate Gray": "#708090",
"Matte Sea Green": "#2E8B57",
"Matte Tan": "#D2B48C",
"Matte Tomato": "#FF6347",
"Matte Wheat": "#F5DEB3",
"Matte Azure": "#007FFF",
"Matte Chartreuse": "#7FFF00",
"Matte Periwinkle": "#CCCCFF",
"Matte Steel Blue": "#4682B4",
"Matte Sienna": "#A0522D",
"Matte Lemon": "#FFF700",
"Matte Burgundy": "#800020",
"Matte Charcoal": "#36454F",
"Matte Forest Green": "#228B22",
"Matte Midnight Blue": "#191970",
"Matte Eggplant": "#614051",
"Matte Deep Plum": "#673147",
"Matte Mulberry": "#70193D",
"Matte Gunmetal": "#2a3439",
"Matte Onyx": "#353839",
"Matte Coffee": "#6F4E37",
"Matte Cocoa": "#7B3F00",
"Matte Burnt Orange": "#CC5500",
"Matte Rusty Red": "#8B2500",
"Matte Olive Drab": "#6B8E23",
"Matte Army Green": "#4B5320",
"Matte Hunter Green": "#355E3B",
"Matte Dark Moss": "#4A5D23",
"Matte Prussian Blue": "#003153",
"Matte Denim": "#1560BD",
"Matte Slate Blue": "#6A5ACD",
"Matte Dark Slate Gray": "#2F4F4F",
"Matte Oil Black": "#1B1B1B",
"Matte Raven": "#222222",
"Matte Graphite": "#383838",
"Matte Sepia": "#704214",
"Matte Bronze": "#CD7F32",
"Matte Copper": "#B87333",
"Matte Dark Taupe": "#483C32",
"Matte Deep Teal": "#014D4D",
"Matte Dark Cyan": "#008B8B",
"Matte Dark Violet": "#9400D3",
"Matte Dark Magenta": "#8B008B",
"Matte Dark Orchid": "#9932CC",
"Matte Dark Burgundy": "#4A0000",
"Matte Deep Ruby": "#841B2D",
"Matte Dark Rose": "#C08081",
"Matte Saddle Brown": "#8B4513",
"Matte Brown Sugar": "#AF6E4D",
"Matte Burnt Umber": "#8A3324",
"Matte Russet": "#80461B",
"Matte Deep Amber": "#FFBF00",
"Matte Bronze Olive": "#4B5320",
"Matte Olive Brown": "#645403",
"Matte Steel Gray": "#262B2F",
    // Metallic
"Metallic Silver": "#C0C0C0",
"Metallic Gold": "#D4AF37",
"Metallic Bronze": "#CD7F32",
"Metallic Copper": "#B87333",
"Metallic Platinum": "#E5E4E2",
"Metallic Steel": "#4682B4",
"Metallic Gunmetal": "#2a3439",
"Metallic Titanium": "#878681",
"Metallic Rose Gold": "#B76E79",
"Metallic Chrome": "#DADADA",
"Metallic Aluminum": "#A9A9A9",
"Metallic Brass": "#B5A642",
"Metallic Bronze Olive": "#6B584C",
"Metallic Dark Silver": "#A9A9A9",
"Metallic Bright Silver": "#D1D0CE",
"Metallic Antique Gold": "#CFB53B",
"Metallic Light Gold": "#F6EABE",
"Metallic Copper Red": "#CB6D51",
"Metallic Rust": "#B7410E",
"Metallic Burnt Copper": "#CC6600",
"Metallic Dark Copper": "#7C482B",
"Metallic Champagne": "#F7E7CE",
"Metallic Pewter": "#99AABB",
"Metallic Iron": "#48494B",
"Metallic Silver Blue": "#6B8E9B",
"Metallic Silver Green": "#9AA39A",
"Metallic Steel Blue": "#4682B4",
"Metallic Ocean Blue": "#4F6D7A",
"Metallic Blue Gray": "#6699CC",
"Metallic Midnight Blue": "#191970",
"Metallic Dark Steel": "#2A3439",
"Metallic Ash Gray": "#B2BEB5",
"Metallic Slate Gray": "#708090",
"Metallic Gunmetal Gray": "#2a3439",
"Metallic Graphite": "#383838",
"Metallic Carbon Black": "#1C1C1C",
"Metallic Onyx": "#353839",
"Metallic Dark Bronze": "#4A3C31",
"Metallic Mahogany": "#C04000",
"Metallic Copper Brown": "#996515",
"Metallic Red Bronze": "#E2725B",
"Metallic Rusty Red": "#8B4000",
"Metallic Goldenrod": "#DAA520",
"Metallic Yellow Gold": "#FFD700",
"Metallic Light Bronze": "#D2B48C",
"Metallic Pale Gold": "#EEE8AA",
"Metallic Rose Copper": "#B76E79",
"Metallic Light Copper": "#E97451",
"Metallic Bronze Yellow": "#B08D57",
"Metallic Brass Brown": "#B5A642",
"Metallic Olive Bronze": "#6B584C",
"Metallic Champagne Gold": "#F7E7CE",
"Metallic Champagne Pink": "#F7CAC9",
"Metallic Antique Silver": "#AFAFAF",
"Metallic Bright Gold": "#FFD700",
"Metallic Electric Blue": "#7DF9FF",
"Metallic Ice Blue": "#99FFFF",
"Metallic Sky Blue": "#87CEEB",
"Metallic Azure": "#007FFF",
"Metallic Sapphire": "#0F52BA",
"Metallic Cobalt Blue": "#0047AB",
"Metallic Royal Blue": "#4169E1",
"Metallic Navy Blue": "#000080",
"Metallic Dark Blue": "#00008B",
"Metallic Steel Green": "#2F4F4F",
"Metallic Dark Green": "#006400",
"Metallic Forest Green": "#228B22",
"Metallic Emerald": "#50C878",
"Metallic Jade": "#00A86B",
"Metallic Teal": "#008080",
"Metallic Aqua": "#00FFFF",
"Metallic Turquoise": "#40E0D0",
"Metallic Deep Turquoise": "#00CED1",
"Metallic Bright Teal": "#03C03C",
"Metallic Purple": "#6A0DAD",
"Metallic Violet": "#8F00FF",
"Metallic Amethyst": "#9966CC",
"Metallic Lavender": "#B57EDC",
"Metallic Magenta": "#FF00FF",
"Metallic Hot Pink": "#FF69B4",
"Metallic Fuchsia": "#FF00FF",
"Metallic Dark Magenta": "#8B008B",
"Metallic Bronze Red": "#B76E48",
"Metallic Burgundy": "#800020",
"Metallic Crimson": "#DC143C",
"Metallic Ruby": "#9B111E",
"Metallic Maroon": "#800000",
"Metallic Chocolate": "#D2691E",
"Metallic Coffee": "#6F4E37",
"Metallic Burnt Umber": "#8A3324",
"Metallic Dark Brown": "#654321",
"Metallic Tan": "#D2B48C",
"Metallic Sand": "#C2B280",
"Metallic Wheat": "#F5DEB3",
"Metallic Beige": "#F5F5DC",
"Metallic Pearl": "#EAE0C8",
"Metallic Light Gray": "#D3D3D3",
"Metallic Silver Gray": "#C0C0C0",
"Metallic Dark Gray": "#A9A9A9",
"Metallic Charcoal": "#36454F",
"Metallic Black": "#0A0A0A",
"Metallic Graphite Black": "#1C1C1C",
"Metallic Oil Slick": "#3B3C36",
    // Neon
  "Neon Pink": "#FF6EC7",
  "Neon Green": "#39FF14",
  "Neon Blue": "#1B03A3",
  "Neon Yellow": "#FFFF33",
  "Neon Orange": "#FF6700",
  "Neon Purple": "#BC13FE",
  "Neon Red": "#FF073A",
  "Neon Cyan": "#00FFFF",
  "Neon Lime": "#A6FF00",
  "Neon Magenta": "#FF00FF",
  "Neon Coral": "#FF496C",
  "Neon Turquoise": "#00FFEF",
  "Neon Lavender": "#CBA0FF",
  "Neon Peach": "#FFDAB9",
  "Neon Aqua": "#00FFCC",
  "Neon Mint": "#BDFCC9",
  "Neon Fuchsia": "#FF00CC",
  "Neon Teal": "#00FFCC",
  "Neon Gold": "#FFD700",
  "Neon Silver": "#C0C0C0",
  "Neon Bronze": "#CD7F32",
  "Neon Crimson": "#DC143C",
  "Neon Salmon": "#FF6F61",
  "Neon Violet": "#8F00FF",
  "Neon Indigo": "#4B0082",
  "Neon Marigold": "#FFC324",
  "Neon Chartreuse": "#7FFF00",
  "Neon Electric Blue": "#7DF9FF",
  "Neon Electric Green": "#00FF00",
  "Neon Electric Purple": "#BF00FF",
  "Neon Electric Yellow": "#FFFF33",
  "Neon Hot Pink": "#FF69B4",
  "Neon Bright Orange": "#FF5F1F",
  "Neon Bright Red": "#FF2400",
  "Neon Bright Green": "#66FF00",
  "Neon Bright Blue": "#0096FF",
  "Neon Bright Yellow": "#FFFF00",
  "Neon Bright Purple": "#AA00FF",
  "Neon Bright Cyan": "#00FFFF",
  "Neon Bright Magenta": "#FF00FF",
  "Neon Fluorescent Pink": "#FF1493",
  "Neon Fluorescent Orange": "#FF4500",
  "Neon Fluorescent Yellow": "#FFFF66",
  "Neon Fluorescent Green": "#39FF14",
  "Neon Fluorescent Blue": "#1F51FF",
  "Neon Fluorescent Purple": "#9D00FF",
  "Neon Fluorescent Cyan": "#00FFFF",
  "Neon Fluorescent Magenta": "#FF00FF",
  "Neon Lime Green": "#32CD32",
  "Neon Bright Lime": "#BFFF00",
  "Neon Bright Turquoise": "#40E0D0",
  "Neon Bright Mint": "#AAF0D1",
  "Neon Bright Lavender": "#E3E4FA",
  "Neon Bright Peach": "#FFE5B4",
  "Neon Bright Coral": "#FF7F50",
  "Neon Bright Salmon": "#FF8C69",
  "Neon Bright Violet": "#8F00FF",
  "Neon Bright Indigo": "#4B0082",
  "Neon Bright Maroon": "#800000",
  "Neon Bright Olive": "#808000",
  "Neon Bright Teal": "#008080",
  "Neon Bright Silver": "#C0C0C0",
  "Neon Bright Gold": "#FFD700",
  "Neon Bright Bronze": "#CD7F32",
  "Neon Bright Copper": "#B87333",
  "Neon Bright Ruby": "#E0115F",
  "Neon Bright Emerald": "#50C878",
  "Neon Bright Sapphire": "#0F52BA",
  "Neon Bright Topaz": "#FFC87C",
  "Neon Bright Amethyst": "#9966CC",
  "Neon Bright Onyx": "#353839",
  "Neon Bright Quartz": "#51484F",
  "Neon Bright Pearl": "#EAE0C8",
  "Neon Bright Steel": "#4682B4",
  "Neon Bright Ash": "#B2BEB5",
  "Neon Bright Charcoal": "#36454F",
  "Neon Bright Smoke": "#738276",
  "Neon Bright Cloud": "#E6E8FA",
  "Neon Bright Sky": "#87CEEB",
  "Neon Bright Ocean": "#0077BE",
  "Neon Bright Forest": "#228B22",
  "Neon Bright Jungle": "#29AB87",
  "Neon Bright Grass": "#7CFC00",
  "Neon Bright Moss": "#8A9A5B",
  "Neon Bright Leaf": "#71BC78",
  "Neon Bright Pine": "#01796F",
  "Neon Bright Olive Drab": "#6B8E23",
  "Neon Bright Lime Punch": "#D0FF14",
  "Neon Bright Kiwi": "#8EE53F",
  "Neon Bright Aloe": "#6FEDA3",
  "Neon Bright Shamrock": "#009E60",
  "Neon Bright Fern": "#71BC78",
  "Neon Bright Basil": "#789262",
  "Neon Bright Celadon": "#ACE1AF",
  "Neon Bright Jade": "#00A86B",
  "Neon Bright Lagoon": "#43B3AE",
  "Neon Bright Lagoon Blue": "#00CED1",
  "Neon Bright Azure": "#007FFF",
  "Neon Bright Cobalt": "#0047AB",
  "Neon Bright Royal Blue": "#4169E1",
  "Neon Bright Denim": "#1560BD",
  "Neon Bright Navy": "#000080",
  "Neon Bright Midnight": "#191970",
  "Neon Bright Plum": "#8E4585",
  "Neon Bright Orchid": "#DA70D6",
  "Neon Bright Lilac": "#C8A2C8",
  "Neon Bright Heather": "#B7A8B5",
  "Neon Bright Mauve": "#E0B0FF",
  "Neon Bright Blush": "#DE5D83",
  "Neon Bright Rose": "#FF007F",
  "Neon Bright Ruby Red": "#9B111E",
  "Neon Bright Cherry": "#DE3163",
  "Neon Bright Crimson": "#DC143C",
  "Neon Bright Brick": "#CB4154",
  "Neon Bright Rust": "#B7410E",
  "Neon Bright Copper Red": "#7C482B",
  "Neon Bright Burnt Orange": "#CC5500",
  "Neon Bright Tangerine": "#FFA089",
  "Neon Bright Sunset": "#FAD6A5",
  "Neon Bright Amber": "#FFBF00",
  "Neon Bright Honey": "#FFC30B",
  "Neon Bright Saffron": "#F4C430",
  "Neon Bright Mustard": "#FFDB58",
  "Neon Bright Lemon": "#FFF700",
  "Neon Bright Citrus": "#9FA91F",
  "Neon Bright Banana": "#FFE135",
  "Neon Bright Gold Rush": "#CFB53B",
    // Flake
  "Sparkle Black": "#1C1C1C",
  "Glitter Silver": "#D8D8D8",
  "Flake Blue": "#3A4F9F",
  "Metallic Red Flake": "#B22222",
  "Candy Apple Flake": "#D9424E",
  "Sparkly Purple": "#8A2BE2",
  "Flake Green": "#3D9140",
  "Glitter Gold": "#D4AF37",
  "Metallic Teal Flake": "#367A7E",
  "Pearl White Flake": "#F0F0F8",
  "Sparkling Navy": "#223366",
  "Glitter Pink": "#FF66CC",
  "Flake Orange": "#D45D17",
  "Candy Flake Yellow": "#F4D35E",
  "Sparkle Bronze": "#A97142",
  "Metallic Copper Flake": "#B66E41",
  "Flake Maroon": "#5B1A18",
  "Glitter Turquoise": "#40E0D0",
  "Pearl Blue Flake": "#A8C0E0",
  "Sparkly Lime": "#A8D63D",
  "Metallic Violet Flake": "#5D3A6D",
  "Candy Green Flake": "#68B16E",
  "Sparkle Magenta": "#B4457D",
  "Glitter Charcoal": "#36454F",
  "Flake Burgundy": "#6E2E31",
  "Metallic Rose Flake": "#D4879C",
  "Sparkly Pearl Champagne": "#F3E5C9",
  "Sparkly Mint": "#A6E6CA",
  "Candy Coral Flake": "#EF6F6C",
  "Glitter Olive": "#708238",
  "Flake Lavender": "#B497BD",
  "Metallic Burgundy Flake": "#7A1D1D",
  "Sparkle Cyan": "#2EB5D5",
  "Candy Fuchsia Flake": "#D44C91",
  "Glitter Mustard": "#D4AF37",
  "Flake Rust": "#B55239",
  "Pearl Pink Flake": "#F6C4C3",
  "Sparkly Aqua": "#40E0D080",
  "Metallic Slate Flake": "#6B7B8C",
  "Candy Plum Flake": "#7B487A",
  "Flake Champagne": "#F5E1B8",
  "Sparkle Coral": "#E56A62",
  "Glitter Moss": "#8A9A5B80",
  "Metallic Lemon Flake": "#F7EA48",
  "Pearl Gold Flake": "#E6C470",
  "Flake Forest Green": "#294D26",
  "Candy Blue Flake": "#3E6CB8",
  "Sparkly Amber": "#DFA945CC",
  "Glitter Electric Blue": "#00BFFFCC",
  "Metallic Peach Flake": "#FFB997",
  "Flake Chartreuse": "#A7D129",
  "Sparkle Salmon": "#FA8072",
  "Candy Bronze Flake": "#A9746E",
  "Glitter Azure": "#3399FFCC",
  "Pearl Violet Flake": "#B9AEDC",
  "Flake Mint Green": "#8EE9A0",
  "Metallic Ruby Flake": "#AA0114",
  "Sparkly Teal": "#008080CC",
  "Candy Mustard Flake": "#D9B500",
  "Glitter Crimson": "#DC143CCC",
  "Flake Denim": "#1560BD",
  "Pearl Turquoise Flake": "#40E0D0",
  "Sparkle Rose Gold": "#B76E79",
  "Metallic Olive Flake": "#556B2F",
  "Candy Lemon Flake": "#FFF44F",
  "Flake Sapphire": "#0F52BA",
  "Glitter Blush": "#F9AFAE",
  "Sparkly Cobalt": "#0047AB",
  "Metallic Periwinkle Flake": "#CCCCFF",
  "Candy Tangerine Flake": "#FF9408",
  "Flake Electric Green": "#00FF00",
  "Sparkle Mulberry": "#70193D",
  "Glitter Emerald": "#50C878",
  "Pearl Cyan Flake": "#00BCD4",
  "Metallic Fire Red Flake": "#B22222",
  "Candy Lavender Flake": "#B57EDC",
  "Flake Pistachio": "#93C572",
  "Sparkly Garnet": "#883841",
  "Glitter Hot Pink": "#FF69B4",
  "Metallic Chocolate Flake": "#5C4033",
  "Candy Kelly Green Flake": "#4CBB17",
  "Flake Antique Gold": "#C28840",
  "Sparkle Pacific Blue": "#1CA9C9",
  "Pearl Rust Flake": "#B7410E",
  "Glitter Marigold": "#FCAE1E",
  "Metallic Champagne Flake": "#F7E7CE",
  "Flake Watermelon": "#FC6C85",
  "Candy Saffron Flake": "#F4C430",
  "Sparkly Plum": "#8B458A",
  "Metallic Ice Blue Flake": "#99CCCC",
  "Flake Copper Penny": "#AD6F69",
  "Glitter Scarlet": "#FF2400",
  "Sparkle Emerald Green": "#046307",
  "Pearl Mustard Flake": "#FFDB58",
  "Candy Ocean Blue Flake": "#0077BE",
  "Flake Firefly": "#D4AF37",
  "Metallic Steel Blue Flake": "#4682B4",
  "Glitter Mango": "#FFB347",
  "Sparkly Jade": "#00A86B",
  "Candy Tangerine": "#FF9408",
  "Flake Snow White": "#FFFAFA",
  "Pearl Sky Blue Flake": "#87CEEB",
  "Metallic Deep Purple Flake": "#673147",
  "Sparkle Blood Red": "#660000",
  "Glitter Pine Green": "#01796F",
  "Flake Orchid": "#DA70D6",
  "Candy Baby Blue Flake": "#89CFF0",
  "Metallic Burnt Orange Flake": "#CC5500",
  "Sparkly Ruby": "#E0115F",
  "Glitter Ivory": "#FFFFF0",
  "Flake Turquoise Green": "#40E0D0",
  "Pearl Dusty Rose Flake": "#DCAE96",
  "Metallic Midnight Blue Flake": "#191970",
  "Candy Champagne": "#F7E7CE",
  "Sparkle Lemon Yellow": "#FFF44F",
  "Glitter Cerulean": "#007BA7",
  "Flake Rosewood": "#65000B",
  "Metallic Hot Magenta Flake": "#FF1DCE",
  "Candy Canary Yellow Flake": "#FFEF00",
  "Sparkly Pumpkin": "#FF7518",
  "Flake Azure Blue": "#007FFF",
  "Pearl Ice Green Flake": "#98FF98",
  "Metallic Bronze Flake": "#CD7F32",
  "Glitter Mulberry": "#C54B8C",
  "Sparkle Coral Reef": "#FF7F50",
  "Candy Plum Purple Flake": "#8E4585",
  "Flake Electric Purple": "#BF00FF",
  "Metallic Moss Green Flake": "#8A9A5B",
  "Sparkly Bubblegum Pink": "#FF6EC7",
  "Glitter Sapphire": "#0F52BA",
  "Flake Pineapple": "#563C0D",
  "Pearl Coffee Flake": "#6F4E37",
  "Metallic Frost Blue Flake": "#E0F7FA",
  "Candy Lilac Flake": "#C8A2C8",
  "Sparkle Neon Orange": "#FF6700",
  "Glitter Apple Green": "#8DB600",
  "Flake Mint Blue": "#98FFFA",
  "Metallic Champagne Rose Flake": "#F7E7CE",
  "Candy Fire Engine Red Flake": "#CE2029",
  "Sparkly Ocean Blue": "#8DB600",
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

function getColorButtonStyle(option, colorMap) {
  const backgroundColor = colorMap[option] || "#fff";
  let style = { ...baseStyle, backgroundColor };

  if (option.startsWith("Neon")) {
    style.color = "#fff";
    style.textShadow = `0 0 6px ${backgroundColor}, 0 0 20px ${backgroundColor}`;
  } else if (option.startsWith("Matte")) {
    style.filter = "brightness(0.75) saturate(0.6)";
    style.color = "#fff";
  } else if (option.startsWith("Metallic")) {
    style.backgroundImage = `linear-gradient(45deg, ${backgroundColor} 30%, #eee 60%, ${backgroundColor} 90%)`;
    style.color = "#222";
  } else if (
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

export default function EBikeCustomizer({ parts = {}, colorMap = {} }) {
  const [config, setConfig] = React.useState(() =>
    Object.fromEntries(
      Object.entries(parts).map(([key, value]) =>
        Array.isArray(value) ? [key, value[0]] : [key, Object.values(value)[0][0]]
      )
    )
  );

  const [activeCategory, setActiveCategory] = React.useState("frameColor");
  const [colorCategory, setColorCategory] = React.useState("Basic");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [bikeCategory, setBikeCategory] = React.useState(() => {
    const bikeKeys = Object.keys(parts?.bikes || {});
    return bikeKeys.length > 0 ? bikeKeys[0] : null;
  });

  const showSearch = activeCategory === "frameColor" || activeCategory === "bikes";

  const colorCategories = React.useMemo(() => {
    if (activeCategory === "frameColor") {
      return Object.keys(parts?.frameColor || {});
    }
    return [];
  }, [activeCategory, parts]);

  const filteredColors = React.useMemo(() => {
    if (activeCategory !== "frameColor") return [];

    let colors = parts.frameColor[colorCategory] || [];
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      colors = colors.filter((c) => c.toLowerCase().includes(term));
    }
    return colors;
  }, [activeCategory, colorCategory, searchTerm, parts]);

  const filteredBikes = React.useMemo(() => {
    if (activeCategory !== "bikes" || !bikeCategory) return [];

    let bikes = parts.bikes[bikeCategory] || [];
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      bikes = bikes.filter((b) => b.toLowerCase().includes(term));
    }
    return bikes;
  }, [activeCategory, bikeCategory, searchTerm, parts]);

  const updatePart = (part, value) => {
    setConfig((prev) => ({ ...prev, [part]: value }));
  };

  return (
    <div className="p-4" style={{ maxWidth: 900, margin: "auto" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: 24 }}>
        E-Bike Customizer Simulator
      </h1>

      <div style={{ display: "flex", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        {Object.keys(parts || {}).map((part) => (
          <button
            key={part}
            onClick={() => {
              setActiveCategory(part);
              setSearchTerm("");
              if (part === "frameColor") setColorCategory("Basic");
              if (part === "bikes") {
                const bikeKeys = Object.keys(parts?.bikes || {});
                setBikeCategory(bikeKeys.length > 0 ? bikeKeys[0] : null);
              }
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

      {showSearch && (
        <input
          type="text"
          placeholder={activeCategory === "frameColor" ? "Search colors..." : "Search bikes..."}
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

      {activeCategory === "frameColor" && (
        <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
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

      {activeCategory === "bikes" && (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
            {Object.keys(parts.bikes || {}).map((brand) => (
              <button
                key={brand}
                onClick={() => {
                  setBikeCategory(brand);
                  setSearchTerm("");
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  backgroundColor: bikeCategory === brand ? "#0070f3" : "#f0f0f0",
                  color: bikeCategory === brand ? "#fff" : "#000",
                  fontWeight: "600",
                  fontSize: 14,
                  border: "none",
                }}
              >
                {brand}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 12,
            }}
          >
            {filteredBikes.map((bike) => (
              <button
                key={bike}
                onClick={() => updatePart("bikes", bike)}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: config.bikes === bike ? "3px solid #0070f3" : "1px solid #ccc",
                  backgroundColor: config.bikes === bike ? "#e6f0ff" : "#fff",
                  cursor: "pointer",
                  fontWeight: config.bikes === bike ? "700" : "500",
                  fontSize: 16,
                  userSelect: "none",
                }}
              >
                {bike}
              </button>
            ))}
          </div>
        </>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            activeCategory === "frameColor"
              ? "repeat(auto-fit, minmax(110px, 1fr))"
              : "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
        }}
      >
        {activeCategory === "frameColor"
          ? filteredColors.map((color) => (
              <button
                key={color}
                style={{
                  ...getColorButtonStyle(color, colorMap),
                  border: config.frameColor === color ? "3px solid #0070f3" : "1px solid #ccc",
                  boxShadow: config.frameColor === color ? "0 0 8px #0070f3" : "none",
                }}
                onClick={() => updatePart("frameColor", color)}
                title={color}
              >
                {color}
              </button>
            ))
          : activeCategory !== "bikes" &&
            (Array.isArray(parts[activeCategory])
              ? parts[activeCategory]
              : Object.values(parts[activeCategory] || {}).flat()
            ).map((option) => (
              <button
                key={option}
                onClick={() => updatePart(activeCategory, option)}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border:
                    config[activeCategory] === option
                      ? "3px solid #0070f3"
                      : "1px solid #ccc",
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
            <li key={part} style={{ marginBottom: 4 }}>
              <strong>{part}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
