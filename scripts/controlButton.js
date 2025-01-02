/**
 * This script defines the function to create the control button for the JRPG UI module.
 */

// Import the JRPGUI class from the main module file
import { JRPGUI } from './index.js';

/**
 * Creates the control button for the JRPG UI module.
 *
 * This function creates a new button element, adds necessary classes and attributes,
 * and appends it to the Foundry VTT sidebar.
 */
export function createControlButton() {
    // Create a new button element
    const controlButton = document.createElement('button');

    // Add the CSS class for styling
    controlButton.classList.add('control-button');

    // Create an image element for the icon
    const icon = document.createElement('img');
    icon.src = 'modules/jrpg-ui-module/images/icon.png'; // Replace with the actual path to your icon image
    icon.alt = 'JRPG UI';
    icon.width = '20'; // Adjust size as needed
    icon.height = '20'; // Adjust size as needed

    // Append the icon to the button
    controlButton.appendChild(icon);

    // Set the button text and accessibility label
    controlButton.setAttribute('title', 'Open JRPG UI');
    controlButton.setAttribute('aria-label', 'Open JRPG UI');

    // Minimize button styling
    controlButton.style.padding = '0'; // Remove padding
    controlButton.style.border = 'none';
    controlButton.style.backgroundColor = 'transparent';
    controlButton.style.outline = 'none'; // Remove default button focus outline

    // **Experimental: Attempt to position the button**
    // **Warning: This might not work consistently and may break with future Foundry VTT updates**
    controlButton.style.position = 'absolute';
    controlButton.style.top = '600px'; // how far away from the top of the screen
    controlButton.style.left = '-1380px'; // how far away from the right of the screen
    controlButton.style.zIndex = '10px';
    controlButton.style.width = '24px'; // how wide the button is
    controlButton.style.height = '24px'; // how tall the button is

    // Add a click event listener to the button
    controlButton.addEventListener('click', () => {
        // Create a new instance of the JRPGUI class and render it
        new JRPGUI().render(true);
    });

    // Get the sidebar element from the DOM
    const sidebar = document.getElementById('sidebar');

    // Append the button to the sidebar if the sidebar element exists
    if (sidebar) {
        sidebar.appendChild(controlButton);
    } else {
        console.warn("Sidebar element not found. Control button could not be appended.");
    }
}
