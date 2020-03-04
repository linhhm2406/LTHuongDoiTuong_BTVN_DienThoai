let My_phone = function (name, color) {
    this.message = '';
    this.name = name;
    this.color = color;
    this.inBox = [];
    this.outBox = [];
    this.phoneStatus = true;
    this.battery = 100;

    this.getPhonePowerStatus = function () {
        return this.phoneStatus;
    };

    this.setPowerOn = function () {
        this.phoneStatus = true;
    };

    this.setPowerOff = function () {
        this.phoneStatus = false;
    };

    this.getBattery = function () {
        return this.battery;
    };
    this.setBattery = function (new_value) {
        this.battery = new_value;
    };

    this.getInbox = function () {
        return this.inBox;
    };

    this.getOutbox = function () {
        return this.outBox;
    };

    this.getName = function () {
        return this.name;
    };

    this.getColor = function () {
        return this.color;
    };

    this.writeMessage = function (message) {
        this.message = message;
    };

    this.sendMessage = function (phone) {
        phone.inBox.push(this.message);
        this.outBox.push(this.message);
    };

    this.deleteInbox_all = function (phone) {
        phone.inBox = [];
    };

    this.deleteInbox_selection = function (position, phone) {
        phone.inBox.splice(position, 1);
    };
    this.deleteOutbox_all = function (phone) {
        phone.outBox = [];
    };

    this.deleteOutbox_selection = function (position, phone) {
        phone.outBox.splice(position, 1);
    };
};

let samsung = new My_phone('samsung', 'black');
let iphone = new My_phone('iphone', 'white');


function turn_On_Off(phone) {
    phone.getPhonePowerStatus();
    if (phone.phoneStatus === true) {
        phone.setPowerOff();
        alert('Điện thoại đã tắt');
    } else {
        phone.setPowerOn();
        alert('Điện thoại đã bật');
    }
}

function check_phone_power_status(phone) {
    if (phone.phoneStatus === false) {
        alert('Điện thoại đã tắt');
    }
}

function ss_show_battery(capacity) {
    document.getElementById('ss_battery').innerHTML = capacity + '%';
}

function ip_show_battery(capacity) {
    document.getElementById('ip_battery').innerHTML = capacity + '%';
}

ss_show_battery(samsung.getBattery());
ip_show_battery(samsung.getBattery());


function inbox_display(id, phone) {
    phone.getInbox();
    let html = [];
    for (let i = 0; i < phone.inBox.length; i++) {
        html.push('Tin nhắn ' + (i + 1) + '. ' + phone.inBox[i]);
    }
    document.getElementById(id).value = html.join('\n');
}

function outbox_display(id, phone) {
    phone.getOutbox();
    let html = [];
    for (let i = 0; i < phone.outBox.length; i++) {
        html.push('Tin nhắn ' + (i + 1) + '. ' + phone.outBox[i]);
    }
    document.getElementById(id).value = html.join('\n');
}

function mess_ss_to_ip(phone1, phone2) {
    check_phone_power_status(phone1);
    document.getElementById('ip_receive_message').innerHTML = "";
    let message_content = document.getElementById('ss_input_message').value;
    phone1.writeMessage(message_content);
    document.getElementById('ss_input_message').value = "";
    phone1.sendMessage(phone2);
    document.getElementById('ip_receive_message').innerHTML = message_content;

    phone2.getInbox();
    inbox_display('ip_check_inbox', iphone);
    phone1.getOutbox();
    outbox_display('ss_check_outbox', samsung);

    phone1.setBattery(phone1.getBattery() - 1);
    ss_show_battery(phone1.getBattery());
    alarm_battery(phone1);
}

function mess_ip_to_ss(phone1, phone2) {
    document.getElementById('ss_receive_message').innerHTML = "";
    let message_content = document.getElementById('ip_input_message').value;
    phone1.writeMessage(message_content);
    document.getElementById('ip_input_message').value = "";
    phone1.sendMessage(phone2);
    document.getElementById('ss_receive_message').innerHTML = message_content;

    phone2.getInbox();
    inbox_display('ss_check_inbox', samsung);
    phone1.getOutbox();
    outbox_display('ip_check_outbox', iphone);

    phone1.setBattery(phone1.getBattery() - 1);
    ip_show_battery(phone1.getBattery());
    alarm_battery(phone1);
}

function delete_inbox_selection(id, phone) {
    let delete_position = parseInt(prompt('Bạn muốn xóa tin nhắn mấy ?'));
    if (delete_position > phone.inBox.length) {
        alert('Không có tin nhắn ' + delete_position);
    } else {
        let confirm_delete = confirm('Bạn thật sự muốn xóa tin nhắn ' + delete_position + ' ?');
        if (confirm_delete === true) {
            phone.deleteInbox_selection((delete_position - 1), phone);
            inbox_display(id, phone);
        }
    }
}

function delete_inbox_all(id, phone) {
    let confirm_delete = confirm('Bạn thật sự muốn xóa toàn bộ tin nhắn ?');
    if (confirm_delete === true) {
        phone.deleteInbox_all(phone);
        document.getElementById(id).value = phone.inBox;
    }
}

function delete_outbox_selection(id, phone) {
    let delete_position = parseInt(prompt('Bạn muốn xóa tin nhắn mấy ?'));
    if (delete_position > phone.outBox.length) {
        alert('Không có tin nhắn ' + delete_position);
    } else {
        let confirm_delete = confirm('Bạn thật sự muốn xóa tin nhắn ' + delete_position + ' ?');
        if (confirm_delete === true) {
            phone.deleteOutbox_selection((delete_position - 1), phone);
            outbox_display(id, phone);
        }
    }
}

function delete_outbox_all(id, phone) {
    let confirm_delete = confirm('Bạn thật sự muốn xóa toàn bộ tin nhắn ?');
    if (confirm_delete === true) {
        phone.deleteOutbox_all(phone);
        document.getElementById(id).value = phone.outBox;
    }
}

function alarm_battery(phone) {
    if (phone.getBattery() <= 15) {
        alert('Pin yếu, Kết nối bộ sạc');
    }
}

let ss_charging;

function ss_battery_charging() {
    ss_charging = setInterval(ss_check_battery, 1000);
}

function ss_check_battery() {
    if (samsung.getBattery() === 100) {
        alert('Pin đầy');
        clearInterval(ss_charging);
    } else {
        samsung.setBattery(samsung.getBattery() + 1);
        ss_show_battery(samsung.getBattery());
    }
}

let ip_charging;

function ip_battery_charging() {
    ip_charging = setInterval(ip_check_battery, 1000);
}

function ip_check_battery() {
    if (iphone.getBattery() === 100) {
        alert('Pin đầy');
        clearInterval(ip_charging);
    } else {
        iphone.setBattery(iphone.getBattery() + 1);
        ip_show_battery(iphone.getBattery());
    }
}
