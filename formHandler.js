"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact_form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            // send form
            form.classList.add('_sending')
            let resp = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            })
            console.log(resp);
            if (resp.ok) {
                let res = await resp.json();
                alert(resp.message);
                form.requestFullscreen();
            } else {
                alert('Ошибка при отправке формы');
            }
        } else {
            alert('Заполните обязательные поля');
        }
    }

    function formValidate(form) {
        let error = 0;
        let ReqFields = document.querySelectorAll('._req');

        for (let i = 0; i < ReqFields.length; i++) {
            const input = ReqFields[i];
            RemErrElandPar(input);
            if (input.getAttribute('type') === 'email') {
                if (!emailTest(input)) {
                    AddErrElandPar(input);
                    error++;
                }
            } else if (input.value === '') {
                AddErrElandPar(input);
                error++;
            }
        }
        return error;
    }

    function AddErrElandPar(el) {
        el.parentElement.classList.add('_error');
        el.classList.add('_error');
    }

    function RemErrElandPar(el) {
        el.parentElement.classList.remove('_error');
        el.classList.remove('_error');
    }

    function emailTest(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email.value);
    }
})