// index.js

// Import necessary styles and functions
import './styles/module.css'; // Import module styles
import { createControlButton } from './module.js'; // Import control button creation function

// Import functions for registering settings and hooks (likely from separate files)
import { registerSettings } from './module/settings.js';
import { registerHooks } from './module/hooks.js';

// Hook to run code once when the game is ready
Hooks.once('ready', () => {
    // Render the JRPG UI application
    new JRPGUI().render(true);
});

// JRPGUI Class - Represents the custom UI application for your module
class JRPGUI extends FormApplication {
    // Define default application options
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "jrpg-ui-module", // Unique identifier for the application
            title: "Legend of Dragoon UI", // Title displayed in the application window
            template: "modules/jrpg-ui-module/templates/app.html", // Path to the HTML template defining the UI
            width: 600, // Width of the application window
            height: "auto", // Height of the application window (automatic based on content)
            popOut: true, // Allow the application window to be popped out as a separate window
            resizable: true, // Allow the application window to be resized
        });
    }

    // Function to retrieve data for the UI template
    getData() {
        // Get all actors in the game
        const actors = game.actors.contents;

        // Map each actor to an object containing its information
        return {
            characters: actors.map(actor => ({
                name: actor.name, // Actor name
                portrait: actor.img, // Path to the actor's portrait image
                hp: actor.system?.attributes?.hp?.value || 0, // Current HP value (or 0 if not found)
                maxHp: actor.system?.attributes?.hp?.max || 0, // Maximum HP value (or 0 if not found)
                _id: actor._id, // Actor's unique ID
                ac: actor.system?.derived?.ac || 0, // Armor Class (or 0 if not found)
                // ... (similarly extract other desired actor data)
                healthPercentage: (actor.system?.attributes?.hp?.value || 0) / (actor.system.attributes?.hp?.max || 0) * 100, // Calculate health percentage (or 0 if HP data not found)
            })),
        };
    }

    // Function to add event listeners to the UI elements
    activateListeners(html) {
        super.activateListeners(html); // Call parent class method for base functionality

        // Add click listener to character list items
        html.find('.character-item').click(event => {
            const li = $(event.currentTarget); // Get the clicked element (jQuery)
            const actorId = li.data('actor-id'); // Retrieve the actor ID from the element's data attribute

            // Get the actor object by its ID
            const actor = game.actors.get(actorId);

            if (actor) {
                // If actor found, render its sheet
                actor.sheet.render(true);
            } else {
                // If actor not found, display an error notification
                ui.notifications.error(`Actor with ID ${actorId} not found.`);
            }
        });
    }
}

// Ensure custom sheet is used when opening an actor sheet
Hooks.on('getActorSheet', (actor) => {
    if (actor instanceof game.actors.BaseActor) {
        actor.sheet = new LoDCharacterSheet(actor); // Use your custom LoDCharacterSheet class
    }
});

// Removed unused import and hook (commented out for reference)
// import { extendActor } from './extendActor.js';
// Hooks.on('createActor', (actor) => { ... });

// Hooks to run code once on initialization and ready
Hooks.once('init', async function() {
    registerSettings();
    registerHooks();
});

Hooks.once('ready', async function() {
    // ... your module's additional ready logic ...
    createControlButton(); // Call function to create the control button
});
