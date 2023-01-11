// JavaScript code for managing popup.

let sideBarId = document.getElementById("sidebarbutton");
let isToggle = false;

sideBarId.addEventListener("click", () => {
    if(!isToggle) {
        sideBarOn();
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
