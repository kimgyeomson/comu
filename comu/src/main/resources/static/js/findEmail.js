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

function PhoneSend() {
    let number = document.getElementById('phone').value;

    if(number.length === 13) {
        axios.get('/check-phone/' + number)
        .then(response => {
            if (response.data.available) {
                alert("인증번호가 발송되었습니다.");
                document.getElementById('ResultNo').style.display = 'flex';

                axios.get('/send', {params: {phoneNumber: number}})
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                    document.getElementById('randomNumber').value = response.data;
                    document.getElementById('phoneMsg').style.display = 'none';
                    document.getElementById('phoneMsg').style.color = '#1A6DFF';
                })
                .catch(error => {
                    console.error(error);
                })    
            } else {
                document.getElementById('phoneMsg').innerText = '등록된 번호입니다.';
                document.getElementById('phoneMsg').style.display = 'block';
                document.getElementById('phoneMsg').style.color = '#ff3f3f';
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    else {
        document.getElementById('phoneMsg').innerText = '전화번호를 입력해주세요';
        document.getElementById('phoneMsg').style.display = 'block';
        document.getElementById('phoneMsg').style.color = '#ff3f3f';
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
