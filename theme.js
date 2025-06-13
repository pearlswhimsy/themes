const themeselector = document.getElementById("theme-selector");
const bgUpload = document.getElementById("bg-upload");

function applyTheme(theme) {
    // Remove any old theme class
    document.body.classList.remove("light-theme", "dark-theme", "cute-theme");

    // Add the selected theme
    document.body.classList.add(`${theme}-theme`);

    // Check if a background image is saved
    const savedBg = localStorage.getItem("customBackground");
    if (savedBg) {
        // If there's a custom image, make background transparent
        document.body.style.backgroundColor = "transparent";
    } else {
        // If no image, allow the theme color to show normally
        document.body.style.backgroundColor = "";
    }
}

window.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
        themeselector.value = savedTheme;
    }

    const savedBg = localStorage.getItem("customBackground");
    if (savedBg) {
        document.documentElement.style.backgroundImage = `url(${savedBg})`;
    }
});

themeselector.addEventListener("change", function () {
    const selectedtheme = themeselector.value;
    localStorage.setItem("theme", selectedtheme);
    applyTheme(selectedtheme);
});

bgUpload.addEventListener("change", function () {
    const file = bgUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            const imageData = reader.result;
            document.documentElement.style.backgroundImage = `url(${imageData})`;
            localStorage.setItem("customBackground", imageData);
            // reapply theme to update transparency
            const currentTheme = themeselector.value;
            applyTheme(currentTheme);
        };
        reader.readAsDataURL(file);
    }
});




const removeBgButton = document.getElementById("remove-bg");

removeBgButton.addEventListener("click", function () {
    // Remove image
    document.documentElement.style.backgroundImage = "none";
    localStorage.removeItem("customBackground");

    // Reapply theme to bring back background color
    const currentTheme = themeselector.value;
    applyTheme(currentTheme);
});

