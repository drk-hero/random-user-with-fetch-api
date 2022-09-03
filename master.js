setInterval(_time, 1000);
setInterval(_icon_check, 1800000);
_icon_check()
_time();

function _time() {
    let _Idtime = document.getElementById("timeset")
    let _date = new Date()
    _Idtime.innerHTML = _date.toLocaleTimeString()
}

function _icon_check() {
    let _timeck = new Date().getHours()
    let _icon = document.getElementById('checktime')
    if (_timeck <= 4) {
        _icon.classList.add('bi-moon-fill')
    } else if (_timeck > 6 && _timeck < 10) {
        _icon.classList.add('bi-sunrise-fill')
    } else if (_timeck >= 10 && _timeck < 17) {
        _icon.classList.add('bi-sun-fill')
    } else if (_timeck >= 17 && _timeck < 20) {
        _icon.classList.add('bi-sunset-fill')
    } else {
        _icon.classList.add('bi-moon-fill')
    }



}
let _inputUser
let _inputpassword
let _byrow = document.getElementsByClassName("row-by-row")[0]
let _bypass = document.getElementsByClassName("row-by-pass")[0]
let _clock = document.getElementsByClassName("set-time-to")[0]
let _filtere = document.getElementById("bg-img");
//     // click to login
function _clicked() {
    _bypass.style.opacity = "1"
    _bypass.style.visibility = "visible"
    _clock.style.transform = "translateX(-53%)"
    _byrow.style.opacity = "0"
    _byrow.style.visibility = "hidden"
    _filtere.style.filter = "blur(8px)"
    _filtere.style.transform = "scale(1.2)"
}

function _gohome() {
    _byrow.style.opacity = "1"
    _byrow.style.visibility = "visible"
    _bypass.style.opacity = "0"
    _bypass.style.visibility = "hidden"
    _clock.style.transform = "translateX(0)"
    _filtere.style.filter = "blur(0)"
    _filtere.style.transform = "scale(1)"
}
document.getElementById("cancele").addEventListener("click", _gohome);

function _resetlogin() {
    _login.style.display = "none"
    _login.style.visibility = "hidden"
    _sign_in.style.display = "block";
    _sign_in.style.visibility = "visible";
    document.getElementById('user-name').value = ""
    document.getElementById('paas-word').value = ""
}

let _login = document.getElementById('aboute-login')
let _sign_in = document.getElementsByClassName('login-header-pasw')[0]
    // check in api
fetch('https://dummyjson.com/users')
    .then(function(response) {
        // if (response.status !== 200)
        if (!response.ok) {
            _loading.innerHTML = "<div class='header-loading'><img id='loading' src='img/loading.gif'></div>";
            return;
        }
        response.json().then(function(data) {
            console.log(data)
            for (i = 0; i < 5; i++) {
                document.getElementsByClassName('box-user-pss')[0].innerHTML += `
                            <div class="row m-2">
                                <p class="col-12">
                                username: <span>${data.users[i].username}</span>
                                </p>
                                <p class="col-12">
                                    password: <span>${data.users[i].password}</span>
                                </p>
                            </div>
                        `
            }

            document.getElementById('loginbtn').addEventListener('click', () => {
                _inputUser = document.getElementById('user-name').value
                _inputpassword = document.getElementById('paas-word').value
                if (
                    (_inputUser == null) && (_inputpassword == null) ||
                    (_inputUser == "") || (_inputpassword == "") ||
                    (_inputUser.length == 0) && (_inputpassword.length == 0)
                ) {
                    alert("box o pur kon!!!")
                } else {
                    // alert("dorost")
                    for (i = 0; i < 5; i++) {
                        if (data.users[i].username == _inputUser && data.users[i].password == _inputpassword) {
                            _gohome()
                            _login.style.display = "block"
                            _login.style.visibility = "visible"
                            _sign_in.style.display = "none";
                            _sign_in.style.visibility = "hidden";
                            document.getElementById('figure-img').src = data.users[i].image
                            document.getElementById('name-last').innerText = "welcome " + data.users[i].firstName + " " + data.users[i].lastName
                            document.getElementById('name-first').innerText = data.users[i].firstName
                            document.getElementById('gender').innerText = data.users[i].gender
                            document.getElementById('emailed').innerText = data.users[i].email
                            document.getElementById('phonenum').innerText = data.users[i].phone
                            document.getElementById('birthDate').innerText = data.users[i].birthDate
                            document.getElementById('age').innerText = data.users[i].age
                            document.getElementById('address').innerText = data.users[i].address.address
                            console.log(_inputUser + " - " + _inputpassword)
                        }
                    }
                }
            })
        });
    })
    .catch(function(err) {
        document.write('Error: ' + err);
    });