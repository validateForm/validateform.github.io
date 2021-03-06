// inputs = document.forms['register'].getElementsByTagName('input');
inputs = document.getElementsByTagName('input')
run_onchange = false;
valid = () => {
    let errors = false;
    let reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
    // let reg_phone = /[0-9]{10}/g;
    // let reg_phone = new RegExp("[0-9]{10}")
    for (const i in inputs)
        if (inputs.hasOwnProperty(i)) {
            let value = inputs[i].value;
            let id = inputs[i].getAttribute('id');
            let span = document.createElement('span');
            let p = inputs[i].parentNode;
            // if (p.lastChild.nodeName == 'SPAN') p.removeChild(p.lastChild);
            if (p.lastChild.nodeName.toLowerCase() == 'span') p.removeChild(p.lastChild)
            if (!value) span.textContent = ' Thông tin được yêu cầu';
            else {
                if (id == 'email' && !reg_mail.test(value))
                    span.innerHTML = ' Email không hợp lệ (ví dụ: abc@gmail.com)';
                if (id == 'password') {
                    if (value.length < 6) span.innerHTML = ' Password phải từ 6 ký tự';
                    var pass = value;
                }
                if (id == 'confirm_pass' && value != pass) span.innerHTML = ' Password nhập lại chưa đúng';
                // if (id == 'phone' && isNaN(value) && !reg_phone.test(value)) {
                //     span.innerHTML = ' Số điện thoại phải là kiểu số';
                //     console.log(value)
                //     console.log(reg_phone.test(value))
                // }
            }
            if (span.innerHTML != '') {
                inputs[i].parentNode.appendChild(span);
                errors = true;
                run_onchange = true;
                inputs[i].style.border = '1px solid #c6807b';
                inputs[i].style.background = 'red';
                // inputs[i].style.border = '1px solid pink';
            }
        }
    console.log(document.getElementById('phone').pattern)
    if (!errors) alert('Đăng ký thành công');
    return !errors;
}
document.getElementById('submit').onclick = () => {
    return valid();
}
for (const i in inputs)
    if (inputs.hasOwnProperty(i))
        inputs[i].onchange = function() {
            if (run_onchange) {
                this.style.border = '1px solid #999';
                this.style.background = 'lightblue';
                // inputs[i].style.border = '1px solid lightblue';
                valid();
            }
        }