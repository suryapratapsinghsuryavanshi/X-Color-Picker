// JavaScript code for managing popup.

let id = document.getElementById("sidebarbutton");

id.addEventListener("click", sideBarOn)

function sideBarOn(){
    console.log("ggooo");
    let button = document.getElementById("sidebarbutton");
    let sidebar = document.getElementById("sideBarOff");
    sidebar.removeAttribute("id");
    sidebar.setAttribute("id","sideBarOn");
    button.removeAttribute("onclick");
    button.setAttribute("onclick","sideBarOf()");
}

function sideBarOf(){
    let button = document.getElementById("sidebarbutton");
    let sidebar = document.getElementById("sideBarOn");
    sidebar.removeAttribute("id");
    sidebar.setAttribute("id","sideBarOf");
    button.removeAttribute("onclick");
    button.setAttribute("onclick","sideBarOn()");
}
