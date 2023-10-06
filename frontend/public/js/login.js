if(document.querySelector('#login_form')) {
    document.querySelector('#login_form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.target));
        if(form.email === '' || form.password === '') {
            createToast('error', "Email and password can't be empty");
            return;
        }

        fetch('/api/login', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(form)})
        .then(res => {
            if(res.status === 200) {
                window.location.href = '/';
                throw new Error('Successful login');
            } else {
                return res.json();
            }
        })
        .then(res => res && createToast('error', res.message));
    });
}

if(document.querySelector('#register_form')) {
    document.querySelector('#register_form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.target));
        if(form.firstname === '' || form.surname === '' || form.email === '' || form.password === '') {
            createToast('error', "All fields are required");
            return;
        }
    
        fetch('/api/register', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(form)})
        .then(res => {
            if(res.status === 200) {
                window.location.href = '/';
                throw new Error('Successful login');
            } else {
                return res.json();
            }
        })
        .then(res => res && createToast('error', res.message));
    });
}