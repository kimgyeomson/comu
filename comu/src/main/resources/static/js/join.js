document.addEventListener('DOMContentLoaded', function() {
  let formElement = document.getElementById('join_form');
  formElement.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    let formData = new FormData(formElement);
    let emailm = document.getElementById('emailMsg');
    let pw = document.getElementById('password').value;
    let cpw = document.getElementById('ConfirmPassword').value;
    let bir = document.getElementById('birthday').value;
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
    axios.post('/findEmail', formData)
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


