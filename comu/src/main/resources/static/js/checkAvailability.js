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



function checkPhoneAvailability(phone) {
    console.log("실행됨ㅋㅋ" + phone);
    console.log(phone.length);
    let phoneMessage; // Declare the variable here
    if (phone.length === 0) {
        document.getElementById('phoneMsg').innerText = '';
        document.getElementById('phoneMsg').style.display = 'none';
        return;
    }
    else if(phone.length === 13) {
        axios.get('/check-phone/' + phone)
        .then(response => {
            if (response.data.available) {
                phoneMessage = '사용가능한 번호입니다.';
                document.getElementById('phoneMsg').style.color = '#1A6DFF';

            } else {
                phoneMessage = '등록된 번호입니다.';
                document.getElementById('phoneMsg').style.color = '#ff3f3f';
            }

            document.getElementById('phoneMsg').innerText = phoneMessage;
            document.getElementById('phoneMsg').style.display = 'block';
        })
        .catch(error => {
            console.error(error);
        });
    }
    else {
        console.log("else");
        document.getElementById('phoneMsg').innerText = '전화번호가 정확한지 확인해주세요.';
        document.getElementById('phoneMsg').style.display = 'block';
        document.getElementById('phoneMsg').style.color = '#ff3f3f';
    }
}

function checkBirthdayAvailability(birthday) {
    let birthdayMessage;

    if (birthday.length === 0) {
        birthdayMessage = '생년월일을 확인해주세요.';
        document.getElementById('birthdayMsg').style.color = '#ff3f3f';
    } 
    else if (birthday.length === 10) {
        document.getElementById('birthdayMsg').style.display = 'none';
        birthdayMessage = ''; // Set to an empty string for valid 8-character birthday
    }
    else {
        birthdayMessage = '생년월일은 8자리 숫자로 입력해 주세요.';
        document.getElementById('birthdayMsg').style.color = '#ff3f3f';
    }

    document.getElementById('birthdayMsg').innerText = birthdayMessage;
    document.getElementById('birthdayMsg').style.display = 'block';
}



