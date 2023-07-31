document.addEventListener('DOMContentLoaded', function() {
  let formElement = document.getElementById('join_form');
  formElement.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    let formData = new FormData(formElement);

    axios.post('/rest/join', formData)
      .then(function(response) {
        console.log(response.data);

        if(response.data === 0){
            alert('회원가입이 진행되지 않았습니다.\n다시 시도해주시기 바랍니다.');
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
  });
});


