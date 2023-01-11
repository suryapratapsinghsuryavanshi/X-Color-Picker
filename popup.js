// JavaScript code for managing popup.

// Color
let current_selected_color = null;

document.getElementById("color_code").innerText = "#ffb835";

document.getElementById("up_arrow").addEventListener("click", () => {

})

function putColor(color) {
    document.getElementById("colorDiv").style.backgroundColor = color;
    document.getElementById("color_code").innerText = color;
}

let sideBarId = document.getElementById("sidebarbutton");
let isToggle = false;

sideBarId.addEventListener("click", () => {
    if(!isToggle) {
        if(sideBarOn) {
            sideBarOn();
        }
        isToggle = true;
    }else {
        sideBarOf();
        isToggle = false;
    }
});

function sideBarOn(){
    let sidebar = document.getElementById("sideBarOff");
    sidebar.removeAttribute("id");
    sidebar.setAttribute("id","sideBarOn");
}

function sideBarOf(){
    let sidebar = document.getElementById("sideBarOn");
    sidebar.removeAttribute("id");
    sidebar.setAttribute("id","sideBarOff");
}

// Pick Color
let pick_color = document.getElementById("color_pick");
pick_color.addEventListener("click", () => {
    let eye = new EyeDropper();
    eye.open().then(r => {
        current_selected_color = r;
        putColor(current_selected_color.sRGBHex);
    }).catch((e) => {
        console.log("Error: " + e);
    });
});
