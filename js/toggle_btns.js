// switch charts
let buttonSwitchChart = document.querySelectorAll('.change-btn');
let chartOpen = document.querySelectorAll('.exam-graph ');
function removeActiveClassCharts() {
buttonSwitchChart.forEach((buttonSwitchChart) => buttonSwitchChart.classList.remove('active'));
chartOpen.forEach((chartOpen) => chartOpen.classList.remove('active-chart'));
}
for (let i = 0; i < buttonSwitchChart.length; i++) {
    buttonSwitchChart[i].onclick = function changeColor() {
        removeActiveClassCharts();
        buttonSwitchChart[i].classList.add('active');
        chartOpen[i].classList.add("active-chart");       
}
}

// switch ces
let buttonSwitchCes = document.querySelectorAll('.ces-content_toggle-btn');
let cesOpen = document.querySelectorAll('.ces-content_text');
function removeActiveClassCes() {
buttonSwitchCes.forEach((buttonSwitchCes) => buttonSwitchCes.classList.remove('active'));
cesOpen.forEach((cesOpen) => cesOpen.classList.remove('active-ces'));
}
for (let i = 0; i < buttonSwitchCes.length; i++) {
    buttonSwitchCes[i].onclick = function changeColor() {
        removeActiveClassCes();
        buttonSwitchCes[i].classList.add('active');
        cesOpen[i].classList.add("active-ces");       
}
}
