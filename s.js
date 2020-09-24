// inputs = document.forms['register'].getElementsByTagName('input');
inputs = document.getElementsByTagName('input')
run_onchange = false;

valid = () => {
        let errors = false;
        let reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
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
                    if (id == 'phone' && isNaN(value)) span.innerHTML = ' Số điện thoại phải là kiểu số';
                }
                // Nếu có lỗi thì chèn span vào hồ sơ, chạy onchange, submit return false, highlight border
                if (span.innerHTML != '') {
                    inputs[i].parentNode.appendChild(span);
                    errors = true;
                    run_onchange = true;
                    inputs[i].style.border = '1px solid #c6807b';
                    inputs[i].style.background = '#fffcf9';
                }
            }
        if (!errors) alert('Đăng ký thành công');
        return !errors;
    } // end valid()
    // Chạy hàm kiểm tra valid()
document.getElementById('submit').onclick = () => {
    return valid();
}

// Kiểm tra lỗi với sự kiện onchange -> gọi lại hàm valid()
for (const i in inputs)
    if (inputs.hasOwnProperty(i))
        inputs[i].onchange = function() {
            if (run_onchange) {
                this.style.border = '1px solid #999';
                this.style.background = '#fff';
                valid();
            }
        }