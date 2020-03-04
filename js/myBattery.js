let Battery = function (capacity) {
    this.capa = capacity;

    this.getCapacity = function () {
        return this.capa;
    };
    this.setCapacity = function (new_value) {
        this.capa = new_value;
    };
};

let ss_battery = new Battery(100);

show_battery(ss_battery.getCapacity());

function show_battery (capacity) {
    document.getElementById('ss_battery').innerHTML= capacity+'%';
}

function ss_to_ip(phone1, phone2){
phone1.setCapacity(80)
}