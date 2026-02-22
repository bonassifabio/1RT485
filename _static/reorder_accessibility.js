document.addEventListener("DOMContentLoaded", () => {
    const modeLabels = { light: "Light mode", dark: "Dark mode", auto: "Auto mode" };

    function getCurrentMode() {
        return document.documentElement.dataset.mode || localStorage.getItem("mode") || "auto";
    }

    const observer = new MutationObserver(() => {
        const a11yMenu = document.querySelector("#AcccessibilityMenu .dropdown-menu");
        const themeSwitcher = document.querySelector(".article-header-buttons .theme-switch-button");
        if (a11yMenu && themeSwitcher) {
            const li = document.createElement("li");
            li.className = "d-flex align-items-center px-2";
            const label = document.createElement("span");
            label.className = "btn__text-container";
            label.style.cursor = "pointer";
            label.textContent = modeLabels[getCurrentMode()];
            label.addEventListener("click", () => themeSwitcher.click());
            li.appendChild(themeSwitcher);
            li.appendChild(label);
            a11yMenu.prepend(li);
            observer.disconnect();

            // Move the whole accessibility menu to the rightmost position in the header
            const headerButtons = document.querySelector(".article-header-buttons");
            if (headerButtons) headerButtons.appendChild(document.getElementById("AcccessibilityMenu"));

            // Update label whenever data-mode changes on <html>
            new MutationObserver(() => {
                label.textContent = modeLabels[getCurrentMode()];
            }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});
