document.addEventListener('DOMContentLoaded', function () {
    let formElement = document.getElementById('join_form');
    formElement.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        let formData = new FormData(formElement);
        let color = 'rgb(255, 63, 64)';
        let color2 = 'rgb(255, 63, 63)';

        if(document.getElementById('IdMsg').style.color === color) {
            document.getElementById('IdMsg').innerText = '특수 문자는 포함할수없습니다.';
            return;
        }
        if(document.getElementById('IdMsg').style.color === color2) {
            document.getElementById('IdMsg').innerText = '중복된 아이디 입니다.';
            return;
        }
        if(document.getElementById('password').value !== document.getElementById('ConfirmPassword').value) {
            document.getElementById('pswd1Msg').innerText = '비밀번호가 일치하지 않습니다.';
            document.getElementById('pswd1Msg').style.display = 'block';
            document.getElementById('pswd1Msg').style.color = 'rgb(255, 63, 63)';
            return;
        }
        if(document.getElementById('birthday').value.length !== 10) {
            document.getElementById('birthdayMsg').innerText = '생년월일은 8자리 숫자로 입력해주세요.';
            document.getElementById('birthdayMsg').style.display = 'block';
        }
        else {
            axios.post('/RestJoin', formData)
                .then(function (response) {
                    console.log(response.data);

                    if (response.data === 0) {
                        alert('중복된 아이디 입니다.');
                    } else if (response.data === -1) {
                        alert('데이터 작성을 완료해주세요');
                    } else if (response.data === 1) {
                        alert('회원가입 완료');
                        window.location.href = '/';
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    // Handle error here
                });
        }
    });
});


