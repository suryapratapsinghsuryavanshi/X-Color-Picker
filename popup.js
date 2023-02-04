// JavaScript code for managing popup.

// LocalStorage
let colorStore = "color_store_x_color_picker";

// Color
let current_selected_color = "#ffb835";
let color_foramte_count = 0;
let colorFromates = { hex: "#ffb835", rgb: "rgb(255, 184, 53)" };

document.getElementById("color_code").innerText = current_selected_color;

document.getElementById("up_arrow").addEventListener("click", () => {
    let temp_arr = [ "hex", "rgb" ];
    color_foramte_count += 1;
    let select = temp_arr[ color_foramte_count % temp_arr.length ];
    document.getElementById("color_code").innerText = colorFromates[select];
});

document.getElementById("down_arrow").addEventListener("click", () => {
    let temp_arr = [ "hex", "rgb" ];
    if(color_foramte_count >= 2) {
        color_foramte_count -= 1;
    }
    let select = temp_arr[ color_foramte_count % temp_arr.length ];
    document.getElementById("color_code").innerText = colorFromates[select];
});

function putColor(color) {
    document.getElementById("colorDiv").style.backgroundColor = colorFromates[color];
    document.getElementById("color_code").innerText = colorFromates[color];
}

let sideBarId = document.getElementById("sidebarbutton");
let isToggle = false;

sideBarId.addEventListener("click", () => {
    if (!isToggle) {
        if (sideBarOn) {
            sideBarOn();
        }
        isToggle = true;
    } else {
        sideBarOf();
        isToggle = false;
    }
});

function sideBarOn() {
    let sidebar = document.getElementById("sideBarOff");
    sidebar.removeAttribute("id");
    sidebar.setAttribute("id", "sideBarOn");
}

function sideBarOf() {
    let sidebar = document.getElementById("sideBarOn");
    sidebar.removeAttribute("id");
    sidebar.setAttribute("id", "sideBarOff");
}

// Pick Color
let pick_color = document.getElementById("color_pick");
pick_color.addEventListener("click", () => {
    let eye = new EyeDropper();
    eye.open().then(r => {
        colorFromates.hex = r.sRGBHex;
        colorFromates.rgb = hexToRgb(r.sRGBHex);
        putColor("hex");
        localStorage.setItem(color_store_x_color_picker, JSON.stringify(colorFromates));
    }).catch((e) => {
        console.log("Error: " + e);
    });
});

// Color Conversion methods.
const hexToRgb = (hex) => {
    let [has, r, g, b] = [hex.substr(0, 1), hex.substr(1, 2), hex.substr(3, 2), hex.substr(5, 2)]
    console.log(`rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`)
    return `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`
}