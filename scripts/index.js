/**
 * This script defines the main logic for your JRPG UI module.
 */

import { createControlButton } from './controlButton.js';

// JRPGUI Class - Represents the custom UI application for your module
class JRPGUI extends FormApplication {
    /**
     * Define default application options.
     * @returns {Object} An object containing the default application options.
     */
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

    /**
     * Retrieves data for the UI template.
     * @returns {Object} An object containing the data for the template.
     */
    getData() {
        // Get all actors in the game
        const actors = game.actors.contents;

        // Map each actor to an object containing its information
        return {
            characters: actors.map(actor => {
                try {
                    return {
                        name: actor.name, // Actor name
                        portrait: actor.img, // Path to the actor's portrait image
                        hp: actor.system?.attributes?.hp?.value || 0, // Current HP value (or 0 if not found)
                        maxHp: actor.system?.attributes?.hp?.max || 0, // Maximum HP value (or 0 if not found)
                        _id: actor._id, // Actor's unique ID
                        ac: actor.system?.ac || 0, // Access AC directly if it's calculated by extendActor.js
                        class: actor.system?.details?.class?.name || "Unknown", // Class for PF2e
                        type: actor.type || "Unknown",
                        ancestry: actor.system?.details?.ancestry?.value || "Unknown",
                        heritage: actor.system?.details?.heritage?.value || "Unknown",
                        healthPercentage: (actor.system?.attributes?.hp?.value || 0) / (actor.system?.attributes?.hp?.max || 0) * 100, // Calculate health percentage (or 0 if HP data not found)
                    };
                } catch (error) {
                    console.error(`Error processing actor ${actor.name}:`, error);
                    // Return default values for error handling
                    return {
                        name: actor.name,
                        portrait: actor.img,
                        _id: actor._id,
                        class: "Error",
                        type: "Error",
                        ancestry: "Error",
                        heritage: "Error",
                        hp: 0,
                        maxHp: 0,
                        ac: 0,
                        healthPercentage: 0,
                    };
                }
            }),
        };
    }

    /**
     * Adds event listeners to the UI elements.
     * @param {HTMLElement} html The HTML element representing the application.
     */
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

// Export the JRPGUI class
export { JRPGUI };

Hooks.once('ready', () => {
    // Create the control button
    const myButton = createControlButton();

    // Find or create the button container
    let buttonContainer = document.getElementById('jrpg-ui-button-container');

    if (!buttonContainer) {
        buttonContainer = document.createElement('div');
        buttonContainer.id = 'jrpg-ui-button-container';
        buttonContainer.classList.add('sidebar-top-buttons');

        // Find the sidebar element
        const sidebar = document.getElementById('sidebar');

        if (sidebar) {
            sidebar.appendChild(buttonContainer);
        } else {
            console.warn("Sidebar element not found. Button container could not be appended.");
        }
    }

    // Append the button to the container
    buttonContainer.appendChild(myButton);
});
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
    // registerSettings(); // Remove this line if you don't have settings
    // registerHooks(); // Remove this line if you don't have custom hooks
});
