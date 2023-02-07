// JavaScript code for managing popup.

//  Utility
const max = (list) => {
    return list.sort()[list.length - 1];
}

const min = (list) => {
    return list.sort()[0];
}

// Sidebar
let sideBarId = document.getElementById("sidebarbutton");
let isToggle = false;

sideBarId.addEventListener("click", () => {
    sideBarOnOff()
});

const sideBarOnOff = () => {
    if (!isToggle) {
        if (sideBarOn) {
            sideBarOn();
        }
        isToggle = true;
    } else {
        sideBarOf();
        isToggle = false;
    }
}

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

// Color
let current_selected_color = "#ffb835";
let color_foramte_count = 0;
let colorFromates = { hex: "#ffb835", rgb: "rgb(255, 184, 53)", hsv: "hsv(39, 79%, 100%)", hsl: "hsl(39, 100%, 60%)" };
let colorFormatesLists = [];

put_color_by_history_or_set = (hex_color) => {
    colorFromates.hex = hex_color;
    colorFromates.rgb = hexToRgb(hex_color);
    colorFromates.hsv = hexToHsv(hex_color);
    colorFromates.hsl = hexToHsl(hex_color);
    putColor("hex");
}

// LocalStorage
let colorStore = "color_store_x_color_picker";
let side_bar_content = document.getElementById("side_bar_content");
const cb_for_history_load = () => {
    const side_bar_content_childs = side_bar_content.children
    for(let ele of side_bar_content_childs) {
        ele.addEventListener("click", (e) => {
            put_color_by_history_or_set(rgb2hex(e.target.style.backgroundColor));
            sideBarOnOff();
        });
    }
}
const get_color_back = () => {
    let side_bar_content_row_data = "";
    let temp_color_array = JSON.parse(localStorage.getItem(colorStore));
    // console.log(temp_color_array)
    for(let ele of temp_color_array) {
        colorFormatesLists.push(ele);
        let saved_color_set = JSON.parse(ele);
        side_bar_content_row_data += `<p class="side_bar_content_row" style="background: ${saved_color_set.hex};">${saved_color_set.hex}</p>`;
    }
    side_bar_content.innerHTML = side_bar_content_row_data;
    cb_for_history_load();
}
get_color_back();

document.getElementById("color_code").innerText = current_selected_color;

document.getElementById("up_arrow").addEventListener("click", () => {
    let temp_arr = ["hex", "rgb", "hsv", "hsl"];
    color_foramte_count += 1;
    let select = temp_arr[color_foramte_count % temp_arr.length];
    document.getElementById("color_code").innerText = colorFromates[select];
});

document.getElementById("down_arrow").addEventListener("click", () => {
    let temp_arr = ["hex", "rgb", "hsv", "hsl"];
    if (color_foramte_count >= 2) {
        color_foramte_count -= 1;
    }
    let select = temp_arr[color_foramte_count % temp_arr.length];
    document.getElementById("color_code").innerText = colorFromates[select];
});

function putColor(color) {
    document.getElementById("colorDiv").style.backgroundColor = colorFromates[color];
    document.getElementById("color_code").innerText = colorFromates[color];
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
    // console.log(`rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`)
    return `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`
}
const hexToHsv = (hex) => {
    let [has, r, g, b] = [hex.substr(0, 1), hex.substr(1, 2), hex.substr(3, 2), hex.substr(5, 2)]
    let [R, G, B] = [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
    let [R_, G_, B_] = [R / 255, G / 255, B / 255];
    let [cMax, cMin] = [max([R_, G_, B_]), min([R_, G_, B_])];
    let delta = cMax - cMin;

    // for Hue
    let HUE = null;
    if (delta === 0) {
        HUE = 0;
    } else if (cMax === R_) {
        HUE = 60 * (((G_ - B_) / delta) % 6);
    } else if (cMax === G_) {
        HUE = 60 * (((B_ - R_) / delta) + 2);
    } else if (cMax === B_) {
        HUE = 60 * (((R_ - G_) / delta) + 4);
    } else {
        console.log("Wrong Color Formate.");
    }

    // for Saturation 
    let SATURATION = null;
    if (cMax === 0) {
        SATURATION = 0;
    } else if (cMax !== 0) {
        SATURATION = delta / cMax;
    }

    // for Value
    let VALUE = null;
    VALUE = cMax;
    // console.log(Math.round(HUE), Math.round(SATURATION * 100), Math.round(VALUE * 100));
    return `hsv(${Math.round(HUE)}, ${Math.round(SATURATION * 100)}%, ${Math.round(VALUE * 100)}%)`
}
const hexToHsl = (hex) => {
    let [has, r, g, b] = [hex.substr(0, 1), hex.substr(1, 2), hex.substr(3, 2), hex.substr(5, 2)]
    let [R, G, B] = [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
    let [R_, G_, B_] = [R / 255, G / 255, B / 255];
    let [cMax, cMin] = [max([R_, G_, B_]), min([R_, G_, B_])];
    let delta = cMax - cMin;

    // for Hue
    let HUE = null;
    if (delta === 0) {
        HUE = 0;
    } else if (cMax === R_) {
        HUE = 60 * (((G_ - B_) / delta) % 6);
    } else if (cMax === G_) {
        HUE = 60 * (((B_ - R_) / delta) + 2);
    } else if (cMax === B_) {
        HUE = 60 * (((R_ - G_) / delta) + 4);
    } else {
        console.log("Wrong Color Formate.");
    }

    // for Lightness
    let LIGHT = null;
    LIGHT = (cMax + cMin) / 2

    // for Saturation 
    let SATURATION = null;
    if (delta === 0) {
        SATURATION = 0;
    } else {
        SATURATION = (delta / (1 - Math.abs(2 * LIGHT - 1)))
    }

    // console.log(Math.round(HUE), Math.round(SATURATION * 100), Math.round(LIGHT * 100));
    return `hsl(${Math.round(HUE)}, ${Math.round(SATURATION * 100)}%, ${Math.round(LIGHT * 100)}%)`
}

function pickRandomColor(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1 / ++count)
            result = prop;
    return result;
}

function materialColor() {
    var colors = {
        "red": {
            "50": "#ffebee",
            "100": "#ffcdd2",
            "200": "#ef9a9a",
            "300": "#e57373",
            "400": "#ef5350",
            "500": "#f44336",
            "600": "#e53935",
            "700": "#d32f2f",
            "800": "#c62828",
            "900": "#b71c1c",
            "hex": "#f44336",
            "a100": "#ff8a80",
            "a200": "#ff5252",
            "a400": "#ff1744",
            "a700": "#d50000"
        },
        "pink": {
            "50": "#fce4ec",
            "100": "#f8bbd0",
            "200": "#f48fb1",
            "300": "#f06292",
            "400": "#ec407a",
            "500": "#e91e63",
            "600": "#d81b60",
            "700": "#c2185b",
            "800": "#ad1457",
            "900": "#880e4f",
            "hex": "#e91e63",
            "a100": "#ff80ab",
            "a200": "#ff4081",
            "a400": "#f50057",
            "a700": "#c51162"
        },
        "purple": {
            "50": "#f3e5f5",
            "100": "#e1bee7",
            "200": "#ce93d8",
            "300": "#ba68c8",
            "400": "#ab47bc",
            "500": "#9c27b0",
            "600": "#8e24aa",
            "700": "#7b1fa2",
            "800": "#6a1b9a",
            "900": "#4a148c",
            "hex": "#9c27b0",
            "a100": "#ea80fc",
            "a200": "#e040fb",
            "a400": "#d500f9",
            "a700": "#aa00ff"
        },
        "deepPurple": {
            "50": "#ede7f6",
            "100": "#d1c4e9",
            "200": "#b39ddb",
            "300": "#9575cd",
            "400": "#7e57c2",
            "500": "#673ab7",
            "600": "#5e35b1",
            "700": "#512da8",
            "800": "#4527a0",
            "900": "#311b92",
            "hex": "#673ab7",
            "a100": "#b388ff",
            "a200": "#7c4dff",
            "a400": "#651fff",
            "a700": "#6200ea"
        },
        "indigo": {
            "50": "#e8eaf6",
            "100": "#c5cae9",
            "200": "#9fa8da",
            "300": "#7986cb",
            "400": "#5c6bc0",
            "500": "#3f51b5",
            "600": "#3949ab",
            "700": "#303f9f",
            "800": "#283593",
            "900": "#1a237e",
            "hex": "#3f51b5",
            "a100": "#8c9eff",
            "a200": "#536dfe",
            "a400": "#3d5afe",
            "a700": "#304ffe"
        },
        "blue": {
            "50": "#e3f2fd",
            "100": "#bbdefb",
            "200": "#90caf9",
            "300": "#64b5f6",
            "400": "#42a5f5",
            "500": "#2196f3",
            "600": "#1e88e5",
            "700": "#1976d2",
            "800": "#1565c0",
            "900": "#0d47a1",
            "hex": "#2196f3",
            "a100": "#82b1ff",
            "a200": "#448aff",
            "a400": "#2979ff",
            "a700": "#2962ff"
        },
        "lightBlue": {
            "50": "#e1f5fe",
            "100": "#b3e5fc",
            "200": "#81d4fa",
            "300": "#4fc3f7",
            "400": "#29b6f6",
            "500": "#03a9f4",
            "600": "#039be5",
            "700": "#0288d1",
            "800": "#0277bd",
            "900": "#01579b",
            "hex": "#03a9f4",
            "a100": "#80d8ff",
            "a200": "#40c4ff",
            "a400": "#00b0ff",
            "a700": "#0091ea"
        },
        "cyan": {
            "50": "#e0f7fa",
            "100": "#b2ebf2",
            "200": "#80deea",
            "300": "#4dd0e1",
            "400": "#26c6da",
            "500": "#00bcd4",
            "600": "#00acc1",
            "700": "#0097a7",
            "800": "#00838f",
            "900": "#006064",
            "hex": "#00bcd4",
            "a100": "#84ffff",
            "a200": "#18ffff",
            "a400": "#00e5ff",
            "a700": "#00b8d4"
        },
        "teal": {
            "50": "#e0f2f1",
            "100": "#b2dfdb",
            "200": "#80cbc4",
            "300": "#4db6ac",
            "400": "#26a69a",
            "500": "#009688",
            "600": "#00897b",
            "700": "#00796b",
            "800": "#00695c",
            "900": "#004d40",
            "hex": "#009688",
            "a100": "#a7ffeb",
            "a200": "#64ffda",
            "a400": "#1de9b6",
            "a700": "#00bfa5"
        },
        "green": {
            "50": "#e8f5e9",
            "100": "#c8e6c9",
            "200": "#a5d6a7",
            "300": "#81c784",
            "400": "#66bb6a",
            "500": "#4caf50",
            "600": "#43a047",
            "700": "#388e3c",
            "800": "#2e7d32",
            "900": "#1b5e20",
            "hex": "#4caf50",
            "a100": "#b9f6ca",
            "a200": "#69f0ae",
            "a400": "#00e676",
            "a700": "#00c853"
        },
        "lightGreen": {
            "50": "#f1f8e9",
            "100": "#dcedc8",
            "200": "#c5e1a5",
            "300": "#aed581",
            "400": "#9ccc65",
            "500": "#8bc34a",
            "600": "#7cb342",
            "700": "#689f38",
            "800": "#558b2f",
            "900": "#33691e",
            "hex": "#8bc34a",
            "a100": "#ccff90",
            "a200": "#b2ff59",
            "a400": "#76ff03",
            "a700": "#64dd17"
        },
        "lime": {
            "50": "#f9fbe7",
            "100": "#f0f4c3",
            "200": "#e6ee9c",
            "300": "#dce775",
            "400": "#d4e157",
            "500": "#cddc39",
            "600": "#c0ca33",
            "700": "#afb42b",
            "800": "#9e9d24",
            "900": "#827717",
            "hex": "#cddc39",
            "a100": "#f4ff81",
            "a200": "#eeff41",
            "a400": "#c6ff00",
            "a700": "#aeea00"
        },
        "yellow": {
            "50": "#fffde7",
            "100": "#fff9c4",
            "200": "#fff59d",
            "300": "#fff176",
            "400": "#ffee58",
            "500": "#ffeb3b",
            "600": "#fdd835",
            "700": "#fbc02d",
            "800": "#f9a825",
            "900": "#f57f17",
            "hex": "#ffeb3b",
            "a100": "#ffff8d",
            "a200": "#ffff00",
            "a400": "#ffea00",
            "a700": "#ffd600"
        },
        "amber": {
            "50": "#fff8e1",
            "100": "#ffecb3",
            "200": "#ffe082",
            "300": "#ffd54f",
            "400": "#ffca28",
            "500": "#ffc107",
            "600": "#ffb300",
            "700": "#ffa000",
            "800": "#ff8f00",
            "900": "#ff6f00",
            "hex": "#ffc107",
            "a100": "#ffe57f",
            "a200": "#ffd740",
            "a400": "#ffc400",
            "a700": "#ffab00"
        },
        "orange": {
            "50": "#fff3e0",
            "100": "#ffe0b2",
            "200": "#ffcc80",
            "300": "#ffb74d",
            "400": "#ffa726",
            "500": "#ff9800",
            "600": "#fb8c00",
            "700": "#f57c00",
            "800": "#ef6c00",
            "900": "#e65100",
            "hex": "#ff9800",
            "a100": "#ffd180",
            "a200": "#ffab40",
            "a400": "#ff9100",
            "a700": "#ff6d00"
        },
        "deepOrange": {
            "50": "#fbe9e7",
            "100": "#ffccbc",
            "200": "#ffab91",
            "300": "#ff8a65",
            "400": "#ff7043",
            "500": "#ff5722",
            "600": "#f4511e",
            "700": "#e64a19",
            "800": "#d84315",
            "900": "#bf360c",
            "hex": "#ff5722",
            "a100": "#ff9e80",
            "a200": "#ff6e40",
            "a400": "#ff3d00",
            "a700": "#dd2c00"
        },
        "brown": {
            "50": "#efebe9",
            "100": "#d7ccc8",
            "200": "#bcaaa4",
            "300": "#a1887f",
            "400": "#8d6e63",
            "500": "#795548",
            "600": "#6d4c41",
            "700": "#5d4037",
            "800": "#4e342e",
            "900": "#3e2723",
            "hex": "#795548"
        },
        "grey": {
            "50": "#fafafa",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#e0e0e0",
            "400": "#bdbdbd",
            "500": "#9e9e9e",
            "600": "#757575",
            "700": "#616161",
            "800": "#424242",
            "900": "#212121",
            "hex": "#9e9e9e"
        },
        "blueGrey": {
            "50": "#eceff1",
            "100": "#cfd8dc",
            "200": "#b0bec5",
            "300": "#90a4ae",
            "400": "#78909c",
            "500": "#607d8b",
            "600": "#546e7a",
            "700": "#455a64",
            "800": "#37474f",
            "900": "#263238",
            "hex": "#607d8b"
        },
        "black": {
            "hex": "#000000"
        },
        "white": {
            "hex": "#ffffff"
        }
    }
    var colorList = colors[pickRandomColor(colors)];
    var newColorKey = pickRandomColor(colorList);
    var newColor = colorList[newColorKey];
    return newColor;
}

// Show colors in color palette
let color_palette_section = document.getElementById("color_palette_section");
let left_arrow = document.getElementById("left_arrow");
let right_arrow = document.getElementById("right_arrow");
let material_color_array = [];
let count_color = 30;
let offset = 5;
left_arrow.addEventListener("click", () => {
    if(offset > 5) {
        offset -= 5;
    }
    newColor(material_color_array.slice(offset - 5, offset));
});
right_arrow.addEventListener("click", () => {
    if(offset < 50) {
        offset += 5;
    }
    newColor(material_color_array.slice(offset - 5, offset));
});
const rgb2hex = (rgb) => {
    return `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
}
const cb = () => {
    const nodes = document.querySelector("#color_palette_section").children;
    for(let ele of nodes) {
        ele.addEventListener("click", (e) => {
            put_color_by_history_or_set(rgb2hex(e.target.style.backgroundColor));
        });
    }
}
const gen_color = () => {
    for(let i = 0; i < count_color; i++) {
        let gen_material_color = materialColor();
        if(gen_material_color !== '#ffffff') {
            material_color_array.push(`<span class="colorPalette" style="background-color: ${gen_material_color};"></span>`);
        }
    }
}
gen_color();
const newColor = (list) => {
    let innerColorHtml = "";
    for(let ele of list) {
        innerColorHtml += ele;
    }
    color_palette_section.innerHTML = innerColorHtml;
    cb();
}
newColor(material_color_array.slice(0, 5));