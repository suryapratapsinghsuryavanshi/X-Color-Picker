// JavaScript code for managing popup.

//  Utility
const max = (list) => {
    return list.sort()[list.length - 1];
}

const min = (list) => {
    return list.sort()[0];
}

// LocalStorage
let colorStore = "color_store_x_color_picker";

// Color
let current_selected_color = "#ffb835";
let color_foramte_count = 0;
let colorFromates = { hex: "#ffb835", rgb: "rgb(255, 184, 53)", hsv: "hsv(39, 79, 100)", hsl: "hsl(39, 100, 60)" };

let colorFormatesLists = [];

document.getElementById("color_code").innerText = current_selected_color;

document.getElementById("up_arrow").addEventListener("click", () => {
    let temp_arr = [ "hex", "rgb", "hsv", "hsl" ];
    color_foramte_count += 1;
    let select = temp_arr[ color_foramte_count % temp_arr.length ];
    document.getElementById("color_code").innerText = colorFromates[select];
});

document.getElementById("down_arrow").addEventListener("click", () => {
    let temp_arr = [ "hex", "rgb", "hsv", "hsl" ];
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
        colorFromates.hsv = hexToHsv(r.sRGBHex);
        colorFromates.hsl = hexToHsl(r.sRGBHex);
        putColor("hex");
        colorFormatesLists.push(JSON.stringify(colorFromates));
        localStorage.setItem(colorStore, JSON.stringify(colorFormatesLists));
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
const hexToHsv = (hex) => {
    let [has, r, g, b] = [hex.substr(0, 1), hex.substr(1, 2), hex.substr(3, 2), hex.substr(5, 2)]
    let [ R, G, B ] = [ parseInt(r, 16), parseInt(g, 16), parseInt(b, 16) ];
    let [ R_, G_, B_ ] = [ R / 255, G / 255, B / 255 ];
    let [ cMax, cMin ] = [ max([ R_, G_, B_ ]), min([ R_, G_, B_ ]) ];
    let delta = cMax - cMin;

    // for Hue
    let HUE = null;
    if(delta === 0) {
        HUE = 0;
    }else if(cMax === R_) {
        HUE = 60 * (( (G_ - B_) / delta ) % 6);
    }else if(cMax === G_) {
        HUE = 60 * (( (B_ - R_) / delta ) + 2);
    }else if(cMax === B_) {
        HUE = 60 * (( (R_ - G_) / delta ) + 4);
    }else {
        console.log("Wrong Color Formate.");
    }

    // for Saturation 
    let SATURATION = null;
    if(cMax === 0) {
        SATURATION = 0;
    }else if(cMax !== 0) {
        SATURATION = delta / cMax;
    }

    // for Value
    let VALUE = null;
    VALUE = cMax;
    console.log(Math.round(HUE), Math.round(SATURATION * 100), Math.round(VALUE * 100));
    return `hsv(${Math.round(HUE)}, ${Math.round(SATURATION * 100)}, ${Math.round(VALUE * 100)})`
}
const hexToHsl = (hex) => {
    let [has, r, g, b] = [hex.substr(0, 1), hex.substr(1, 2), hex.substr(3, 2), hex.substr(5, 2)]
    let [ R, G, B ] = [ parseInt(r, 16), parseInt(g, 16), parseInt(b, 16) ];
    let [ R_, G_, B_ ] = [ R / 255, G / 255, B / 255 ];
    let [ cMax, cMin ] = [ max([ R_, G_, B_ ]), min([ R_, G_, B_ ]) ];
    let delta = cMax - cMin;

    // for Hue
    let HUE = null;
    if(delta === 0) {
        HUE = 0;
    }else if(cMax === R_) {
        HUE = 60 * (( (G_ - B_) / delta ) % 6);
    }else if(cMax === G_) {
        HUE = 60 * (( (B_ - R_) / delta ) + 2);
    }else if(cMax === B_) {
        HUE = 60 * (( (R_ - G_) / delta ) + 4);
    }else {
        console.log("Wrong Color Formate.");
    }

    // for Lightness
    let LIGHT = null;
    LIGHT = ( cMax + cMin ) / 2

    // for Saturation 
    let SATURATION = null;
    if(delta === 0) {
        SATURATION = 0;
    }else {
        SATURATION = (delta / (1 - Math.abs(2 * LIGHT - 1)))
    }

    console.log(Math.round(HUE), Math.round(SATURATION * 100), Math.round(LIGHT * 100));
    return `hsl(${Math.round(HUE)}, ${Math.round(SATURATION * 100)}, ${Math.round(LIGHT * 100)})`
}