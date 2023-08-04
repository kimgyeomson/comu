document.addEventListener('DOMContentLoaded', function() {
  let formElement = document.getElementById('btnJoin');
  formElement.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    let formData = new FormData(formElement);
    let emailm = document.getElementById('emailMsg');
    let color = 'rgb(255, 63, 63)';

    console.log(document.getElementById('emailMsg').style.color);
    if(document.getElementById('emailMsg').style.color === color) {
      document.getElementById('emailMsg').innerText = '중복된 이메일 입니다.';
    }
    else if(pw !== cpw) {
      document.getElementById('pswd1Msg').innerText = '비밀번호가 일치하지 않습니다.';
    }
    else if(bir.length !== 10) {
      document.getElementById('birthdayMsg').innerText = '생년월일은 8자리 숫자로 입력해 주세요.';
    }
    else {
    axios.post('/findEmailResult', formData)
      .then(function(response) {
        console.log(response.data);

        if(response.data === 0){
            alert('중복된 아이디 입니다.');
        }else if(response.data === -1){
            alert('데이터 작성을 완료해주세요');
        }else if(response.data === 1){
            alert('회원가입 완료');
            window.location.href='/';
        }
    })
      .catch(function(error) {
        console.log(error);
        // Handle error here
      });
    }
  });
});



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
                availabilityMessage = '등록되지 않는 이메일입니다.';
                document.getElementById('emailMsg').style.color = '#ff3f3f';
            } else {
                // availabilityMessage = '사용하고있는 이메일입니다.';
                // document.getElementById('emailMsg').style.color = '#ff3f3f';
                availabilityMessage = '';
                document.getElementById('emailMsg').style.display = 'none';

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
                document.getElementById('phoneMsg').innerText = '등록되지 않는 번호입니다.';
                document.getElementById('phoneMsg').style.display = 'block';
                document.getElementById('phoneMsg').style.color = '#ff3f3f';
            } else {
                alert("인증번호가 발송되었습니다.");
                document.getElementById('PhoneResult').style.display = 'flex';
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
        document.getElementById('ResultButton').disabled = true;
        document.getElementById('random').readOnly = true;
        document.getElementById('PhoneResult').style.display = 'none';
        document.getElementById('Certified').disabled = true;
        document.getElementById('btnJoin').disabled = false;
    }
    else {
        console.log(randomResponse);
    console.log(randomPhone);
        alert('인증번호가 일치하지않습니다.');
        document.getElementById('btnJoin').disabled = true;
    }
}
