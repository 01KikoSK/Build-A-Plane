// --- Build-A-Plane: Console Edition ---
// --- Paste this entire block into your browser's developer console and press Enter ---

(function() {

    // --- GAME STATE ---
    const player = {
        money: 500,
        inventory: {
            engine: null,
            wings: null,
            fuselage: null,
            tail: null
        }
    };

    // --- PART DATABASE ---
    const shop = {
        engine: [
            { name: "Lawnmower Engine", price: 100, power: 10, weight: 20 },
            { name: "V4 Piston Engine", price: 400, power: 50, weight: 40 },
            { name: "V8 Supercharged Engine", price: 1000, power: 120, weight: 70 }
        ],
        wings: [
            { name: "Wooden Wings", price: 100, lift: 30, weight: 30 },
            { name: "Aluminum Wings", price: 350, lift: 70, weight: 25 },
            { name: "Carbon Fiber Wings", price: 900, lift: 150, weight: 15 }
        ],
        fuselage: [
            { name: "Plywood Cockpit", price: 50, stability: 5, weight: 50 },
            { name: "Steel Frame", price: 250, stability: 15, weight: 80 },
            { name: "Aerodynamic Monocoque", price: 700, stability: 30, weight: 40 }
        ],
        tail: [
            { name: "Simple Rudder", price: 50, stability: 10, weight: 5 },
            { name: "T-Tail Assembly", price: 200, stability: 25, weight: 10 },
            { name: "Advanced V-Tail", price: 600, stability: 50, weight: 8 }
        ]
    };

    // --- CORE GAME FUNCTIONS ---

    /**
     * Displays the list of available commands.
     */
    function help() {
        console.log("%c--- Available Commands ---", "color: yellow; font-weight: bold;");
        console.log("status()         - Check your money and equipped parts.");
        console.log("showShop()       - See all available parts for sale.");
        console.log("buy('type', num) - Buy a part. e.g., buy('engine', 1)");
        console.log("fly()            - Attempt to fly your assembled plane!");
        console.log("help()           - Show this list of commands again.");
        console.log("--------------------------");
    }

    /**
     * Displays the player's current money and inventory.
     */
    function status() {
        console.log(`%c💰 Money: $${player.money}`, "color: #4CAF50; font-size: 14px;");
        console.log("%c🔧 Your Plane Parts:", "color: cyan; font-weight: bold;");

        let hasParts = false;
        for (const partType in player.inventory) {
            if (player.inventory[partType]) {
                console.log(`  - ${partType.charAt(0).toUpperCase() + partType.slice(1)}: ${player.inventory[partType].name}`);
                hasParts = true;
            } else {
                console.log(`  - ${partType.charAt(0).toUpperCase() + partType.slice(1)}: [EMPTY]`);
            }
        }
        if (!hasParts) {
            console.log("You have no parts. Visit the shop with showShop()!");
        }
    }

    /**
     * Displays all items available in the shop using console.table for nice formatting.
     */
    function showShop() {
        console.log("%c--- 🛠️ The Parts Shop 🛠️ ---", "color: orange; font-weight: bold; font-size: 16px;");
        for (const partType in shop) {
            console.log(`%c--- ${partType.toUpperCase()}S ---`, "color: yellow;");
            // Add an 'id' for easy selection by the player
            const tableData = shop[partType].map((item, index) => ({ id: index, ...item }));
            console.table(tableData);
        }
        console.log("To buy, use the command: buy('type', id)");
        console.log("Example: buy('engine', 0) to buy the Lawnmower Engine.");
    }

    /**
     * Buys a part and adds it to the player's inventory.
     * @param {string} partType - The type of part to buy (e.g., 'engine').
     * @param {number} index - The index of the part in the shop list.
     */
    function buy(partType, index) {
        if (!shop[partType]) {
            console.error("❌ Invalid part type! Choose from: 'engine', 'wings', 'fuselage', 'tail'");
            return;
        }
        const part = shop[partType][index];
        if (!part) {
            console.error(`❌ Invalid ID for ${partType}. Check the shop!`);
            return;
        }

        if (player.money >= part.price) {
            player.money -= part.price;
            player.inventory[partType] = part;
            console.log(`%c✅ You bought the ${part.name} for $${part.price}!`, "color: lightgreen;");
            status();
        } else {
            console.error(`❌ Not enough money! You need $${part.price} but only have $${player.money}.`);
        }
    }

    /**
     * Simulates a flight attempt with the current plane configuration.
     */
    function fly() {
        console.log("%c--- Preparing for Takeoff! ---", "color: skyblue; font-weight: bold;");
        const { engine, wings, fuselage, tail } = player.inventory;

        // Check if the plane is complete
        if (!engine || !wings || !fuselage || !tail) {
            console.error("🔥 Your plane is incomplete! You need an engine, wings, a fuselage, and a tail to fly.");
            status();
            return;
        }

        // Calculate plane stats
        const totalPower = engine.power;
        const totalLift = wings.lift;
        const totalWeight = engine.weight + wings.weight + fuselage.weight + tail.weight;
        const totalStability = fuselage.stability + tail.stability;

        console.log("Calculating flight potential...");
        console.log(`  Power: ${totalPower}, Lift: ${totalLift}, Weight: ${totalWeight}, Stability: ${totalStability}`);

        const performance = (totalPower + totalLift) - totalWeight;

        if (performance <= 0) {
            console.log("💥 Your plane is too heavy for its parts! It can't even get off the ground. CRASH!");
            return;
        }

        // Higher stability reduces the chance of a random crash
        const crashChance = Math.max(0.05, 0.5 - (totalStability / 100));
        
        if (Math.random() < crashChance) {
            console.log("🌪️ Oh no! A sudden gust of wind! The plane is unstable... CRASH!");
            console.log("You salvaged some parts and earned $10.");
            player.money += 10;
        } else {
            const distance = performance * (1 + totalStability / 50); // Stability gives a small distance bonus
            const earnings = Math.floor(distance * 2.5); // 2.5 is our earning multiplier
            player.money += earnings;
            console.log(`✈️ SUCCESS! A beautiful flight!`);
            console.log(`   You flew a distance of ${Math.floor(distance)} meters!`);
            console.log(`   You earned $${earnings}!`);
        }
        
        console.log(`You now have $${player.money}.`);
    }

    // --- Make functions available in the global scope (the console) ---
    window.help = help;
    window.status = status;
    window.showShop = showShop;
    window.buy = buy;
    window.fly = fly;

    // --- Game Start ---
    console.clear();
    console.log("%cWelcome to Build-A-Plane: Console Edition! ✈️", "color: white; background-color: navy; font-size: 20px; padding: 5px; border-radius: 5px;");
    console.log("Your goal is to build the best plane and earn as much money as possible.");
    console.log("Type 'help()' to see the list of commands.");
    console.log("-----------------------------------------------------------------");
    status();

})();