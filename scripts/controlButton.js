// for the control botton

export function createControlButton() {
    const controlButton = document.createElement('button');
    controlButton.classList.add('control-button');
    controlButton.textContent = "Open JRPG UI"; // More descriptive text
    controlButton.setAttribute('aria-label', 'Open JRPG UI'); // Accessibility

    controlButton.addEventListener('click', () => {
        new JRPGUI().render(true);
    });

    const sidebar = document.getElementById('sidebar');
    sidebar.appendChild(controlButton);
}
