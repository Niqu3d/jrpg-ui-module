/**
 * This script defines the function to create the control button for the JRPG UI module.
 */
// Import the JRPGUI class from the main module file
import { JRPGUI } from './index.js';

/**
 * Creates the control button for the JRPG UI module.
 *
 * This function creates a new button element and returns it.
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

    // Add a click event listener to the button
    controlButton.addEventListener('click', () => {
        // Create a new instance of the JRPGUI class and render it
        new JRPGUI().render(true);
    });

    // Add the CSS class for styling
    controlButton.classList.add('control-button');
    // Return the created button element
    return controlButton;
}
