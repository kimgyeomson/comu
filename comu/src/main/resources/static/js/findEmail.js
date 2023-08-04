

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
        document.getElementById('phoneFormList').style.border = '1px solid #1A6DFF'
        document.getElementById('divPhoneNo').style.border = '1px solid #1A6DFF'
        document.getElementById('phone').readOnly = true;
    }
    else {
        console.log(randomResponse);
    console.log(randomPhone);
        alert('인증번호가 일치하지않습니다.');
        document.getElementById('btnJoin').disabled = true;
    }
}


  
