function checkEmailAvailability(email) {
    let availabilityMessage; // Declare the variable here

    if (email.length === 0) {
        document.getElementById('emailMsg').innerText = '';
        document.getElementById('emailMsg').style.display = 'none';
        return;
    }

    axios.get('/check-email/' + email)
        .then(response => {
            if (response.data.available) {
                availabilityMessage = '사용가능한 이메일입니다.';
                document.getElementById('emailMsg').style.color = '#1A6DFF';
            } else {
                availabilityMessage = '사용하고있는 이메일입니다.';
                document.getElementById('emailMsg').style.color = '#ff3f3f';
                
            }

            document.getElementById('emailMsg').innerText = availabilityMessage;
            document.getElementById('emailMsg').style.display = 'block';
        })
        .catch(error => {
            console.error(error);
        });
}

function checkPasswordAvailability(password, ConfirmPassword) {
    let passwordMessage;

    if (password.length === 0 || ConfirmPassword.length === 0) {
        passwordMessage = '비밀번호를 확인해주세요.';
        document.getElementById('pswd1Msg').style.color = '#ff3f3f';
    } 
    else if (password === '' || ConfirmPassword === '') {
        passwordMessage = '비밀번호가 공란입니다.';
        document.getElementById('pswd1Msg').style.color = '#ff3f3f';
    }
    else if (password === ConfirmPassword) {
        passwordMessage = '비밀번호가 일치합니다.';
        document.getElementById('pswd1Msg').style.color = '#1A6DFF';
    }
    else {
        passwordMessage = '비밀번호가 일치하지 않습니다.';
        document.getElementById('pswd1Msg').style.color = '#ff3f3f';
    }

    document.getElementById('pswd1Msg').innerText = passwordMessage;
    document.getElementById('pswd1Msg').style.display = 'block';
}


function checkBirthdayAvailability(birthday) {
    let birthdayMessage;

    if (birthday.length === 0) {
        birthdayMessage = '생년월일을 확인해주세요.';
        document.getElementById('birthdayMsg').style.color = '#ff3f3f';
    } 
    else if (birthday.length === 10) {
        // document.getElementById('birthdayMsg').style.display = 'none';
        document.getElementById('birthdayMsg').style.color = '#1A6DFF';
        birthdayMessage = ''; // Set to an empty string for valid 8-character birthday
    }
    else {
        birthdayMessage = '생년월일은 8자리 숫자로 입력해 주세요.';
        document.getElementById('birthdayMsg').style.color = '#ff3f3f';
    }

    document.getElementById('birthdayMsg').innerText = birthdayMessage;
    document.getElementById('birthdayMsg').style.display = 'block';
}

function PhoneSend() {
    let number = document.getElementById('phone').value;

    if(number.length === 13) {
        axios.get('/check-phone/' + number)
        .then(response => {
            if (response.data.available) {
                alert("인증번호가 발송되었습니다.");
                document.getElementById('PhoneResult').style.display = 'flex';

                axios.get('/send', {params: {phoneNumber: number}})
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                    document.getElementById('randomNumber').value = response.data;
                })
                .catch(error => {
                    console.error(error);
                })    
            } else {
                alert('등록된 번호입니다.')
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    else {
        alert("전화번호를 다시 입력해주세요.");
    }    
}

function randomResult() {
    let randomResponse = document.getElementById('randomNumber').value;
    let randomPhone = document.getElementById('random').value;

    if(randomResponse === randomPhone) {
        alert('인증되었습니다.');
        document.getElementById('btnJoin').disabled = false;
        document.getElementById('ResultButton').disabled = true;
        document.getElementById('random').readOnly = true;
        document.getElementById('PhoneResult').style.display = 'none';
        document.getElementById('Certified').disabled = true;
    }
    else {
        console.log(randomResponse);
    console.log(randomPhone);
        alert('인증번호가 일치하지않습니다.');
        document.getElementById('btnJoin').disabled = true;
    }
}


 
