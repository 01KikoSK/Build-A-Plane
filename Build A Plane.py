import time
import os

# A helper function to clear the console screen for a cleaner look
def clear_screen():
    """Clears the console screen."""
    os.system('cls' if os.name == 'nt' else 'clear')

# --- PART DEFINITIONS ---
# We use a class to define what a part is
class Part:
    def __init__(self, name, part_type, stats):
        self.name = name
        self.part_type = part_type # "wings", "engine", "tail"
        self.stats = stats         # A dictionary of stats

    def display(self):
        """Returns a string representation of the part's stats."""
        stat_str = ", ".join(f"{key.capitalize()}: {value}" for key, value in self.stats.items())
        return f"{self.name} ({stat_str})"

# A dictionary to hold all available parts, organized by type
AVAILABLE_PARTS = {
    "wings": [
        Part("Small Wings", "wings", {"lift": 20, "drag": 5, "weight": 10}),
        Part("Medium Glider Wings", "wings", {"lift": 30, "drag": 8, "weight": 20}),
        Part("Large Jet Wings", "wings", {"lift": 25, "drag": 12, "weight": 40}),
    ],
    "engine": [
        Part("Single Propeller Engine", "engine", {"thrust": 25, "weight": 20}),
        Part("Twin Propeller Engines", "engine", {"thrust": 45, "weight": 35}),
        Part("Basic Jet Engine", "engine", {"thrust": 80, "weight": 60}),
    ],
    "tail": [
        Part("Simple Tail", "tail", {"stability": 10, "drag": 2, "weight": 5}),
        Part("Advanced Tail", "tail", {"stability": 20, "drag": 1, "weight": 10}),
    ],
}

# --- PLANE DEFINITION ---
class Plane:
    def __init__(self):
        # A plane is composed of different parts
        self.parts = {
            "wings": None,
            "engine": None,
            "tail": None,
        }
        # Every plane has a base chassis with its own stats
        self.base_stats = {"weight": 50, "drag": 5}

    def add_part(self, part):
        """Adds a part to the plane in the correct slot."""
        if part.part_type in self.parts:
            self.parts[part.part_type] = part
            print(f"\nAdded {part.name} to the plane!")
        else:
            print("Unknown part type!")

    def display(self):
        """Prints the current configuration of the plane."""
        print("--- Your Plane ---")
        for part_type, part in self.parts.items():
            if part:
                print(f"{part_type.capitalize()}: {part.name}")
            else:
                print(f"{part_type.capitalize()}: (None)")
        print("--------------------")

    def calculate_total_stats(self):
        """Calculates the combined stats of all parts and the base chassis."""
        total_stats = self.base_stats.copy()
        # Set defaults for stats that the chassis doesn't have
        total_stats.setdefault("lift", 0)
        total_stats.setdefault("thrust", 0)
        total_stats.setdefault("stability", 0)
        
        for part in self.parts.values():
            if part:
                for stat, value in part.stats.items():
                    total_stats[stat] = total_stats.get(stat, 0) + value
        return total_stats

    def is_ready_to_fly(self):
        """Checks if all essential parts have been added."""
        return all(part is not None for part in self.parts.values())

# --- GAME LOGIC ---
def build_menu():
    """The main loop for building the plane."""
    plane = Plane()
    while True:
        clear_screen()
        plane.display()
        
        if plane.is_ready_to_fly():
            print("\nYour plane is complete! You can now fly it.")
            print("Or, you can replace a part.")

        print("\nChoose a part category to work on:")
        print("1. Wings")
        print("2. Engine")
        print("3. Tail")
        print("--------------------")
        if plane.is_ready_to_fly():
            print("4. Fly the Plane!")
        print("5. Back to Main Menu")
        
        choice = input("> ")

        if choice in ["1", "2", "3"]:
            part_types = {"1": "wings", "2": "engine", "3": "tail"}
            part_type = part_types[choice]
            
            clear_screen()
            print(f"--- Choose {part_type.capitalize()} ---")
            parts_list = AVAILABLE_PARTS[part_type]
            
            for i, part in enumerate(parts_list):
                print(f"{i + 1}. {part.display()}")
            
            part_choice = input("> ")
            try:
                part_index = int(part_choice) - 1
                if 0 <= part_index < len(parts_list):
                    chosen_part = parts_list[part_index]
                    plane.add_part(chosen_part)
                else:
                    print("Invalid choice.")
            except ValueError:
                print("Please enter a number.")
            
            time.sleep(1.5)

        elif choice == "4" and plane.is_ready_to_fly():
            fly_simulation(plane)
            input("\nPress Enter to return to the main menu...")
            break # Exit the build loop
        
        elif choice == "5":
            break # Exit the build loop
            
        else:
            print("Invalid option.")
            time.sleep(1)


def fly_simulation(plane):
    """Simulates the flight based on the plane's final stats."""
    clear_screen()
    print("Your plane is being rolled out to the runway...")
    time.sleep(2)
    
    stats = plane.calculate_total_stats()
    print("\n--- Final Plane Stats ---")
    for key, value in stats.items():
        print(f"{key.capitalize()}: {value}")
    print("-------------------------\n")
    time.sleep(3)

    print("The engine sputters to life...")
    time.sleep(2)
    
    # Simple physics simulation
    can_take_off = stats["thrust"] > stats["weight"]
    can_fly = stats["lift"] > stats["weight"] + stats["drag"]
    is_stable = stats["stability"] > 15

    if not can_take_off:
        print("Your plane rumbles down the runway but it's too heavy for the engine!")
        print("CRASH! It couldn't even get off the ground.")
        return

    print("VROOOM! The plane speeds down the runway and takes off!")
    time.sleep(2)

    if not can_fly:
        print("It's in the air, but the wings aren't providing enough lift!")
        print("The plane stalls and nosedives into the ground. KABOOM!")
        return
        
    print("It's flying! It's really flying!")
    time.sleep(2)

    if not is_stable:
        print("The plane is wobbling uncontrollably in the air!")
        print("It flips over and spirals downwards. A fiery explosion marks the end.")
        return

    # If all checks pass, it's a success!
    # The "score" is a simple calculation
    distance = (stats["thrust"] - stats["drag"]) * stats["stability"]
    
    print("The flight is smooth and steady! You've built a fantastic aircraft!")
    print(f"\nCongratulations! You flew a distance of {distance} units!")


def main_menu():
    """The main menu of the game."""
    while True:
        clear_screen()
        print("======================")
        print(" Welcome to Build-a-Plane!")
        print("======================")
        print("1. Build a New Plane")
        print("2. Exit")
        
        choice = input("> ")
        
        if choice == "1":
            build_menu()
        elif choice == "2":
            print("Thanks for playing!")
            break
        else:
            print("Invalid choice, please try again.")
            time.sleep(1)

# --- Start the game ---
if __name__ == "__main__":
    main_menu()