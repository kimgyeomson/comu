function checkIdAvailability(Id) {
    let availabilityMessage; // Declare the variable here

    if (Id.length === 0) {
        document.getElementById('IdMsg').innerText = '';
        document.getElementById('IdMsg').style.display = 'none';
        return;
    }

    axios.get('/check-Id/' + Id)
        .then(response => {
            if (response.data.available) {
                availabilityMessage = '사용가능한 아이디입니다.';
                document.getElementById('IdMsg').style.color = '#1A6DFF';
            } else {
                availabilityMessage = '사용하고있는 아이디입니다.';
                document.getElementById('IdMsg').style.color = '#ff3f3f';
            }

            document.getElementById('IdMsg').innerText = availabilityMessage;
            document.getElementById('IdMsg').style.display = 'block';
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
    let phoneMessage; // Declare the variable here

    if (phone.length === 0) {
        document.getElementById('phoneMsg').innerText = '';
        document.getElementById('phoneMsg').style.display = 'none';
        return;
    }
    else if(phone.length <= 11) {
        const one = phone.substr(0, 3);
        const two = phone.substr(3, 4);
        const three = phone.substr(7, 4);
        const formattedPhone = one + '-' + two + '-' + three;
        const phoneInput = document.getElementById('phone');
        phoneInput.value = formattedPhone;
        
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
    else if (birthday.length === 8) {
        const year = birthday.substr(0, 4);
        const month = birthday.substr(4, 2);
        const day = birthday.substr(6, 2);
        const formattedDate = year + '.' + month + '.' + day;
        const birthdayInput = document.getElementById('birthday');
        birthdayInput.value = formattedDate;
        document.getElementById('birthdayMsg').style.display = 'none';
        birthdayMessage = ''; // Set to an empty string for valid 8-character birthday
    } 
    else if(birthday.lenth === 10){
        birthdayMessage = '';
        document.getElementById('birthdayMsg').style.display = 'none';
    }
    else {
        birthdayMessage = '생년월일은 8자리 숫자로 입력해 주세요.';
        document.getElementById('birthdayMsg').style.color = '#ff3f3f';
    }

    document.getElementById('birthdayMsg').innerText = birthdayMessage;
    document.getElementById('birthdayMsg').style.display = 'block';
}
