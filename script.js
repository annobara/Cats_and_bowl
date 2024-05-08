function emulateFeeding(n, b, m, t, r) {
    let currentTime = 0;
    let currentCapacity = m;
    let i = 1;

    function feedNextCat() {
        if (i > n) {
            logResult(`Всего было затрачено времени: ${currentTime} секунд`);
            return;
        }

        if (currentCapacity > 0 && currentCapacity < b) {
            logStatus(`Котик под номером ${i} подошел к миске`);
            logStatus(`Котик под номером ${i} ест...`);
            const timeSpentEating = Math.round((currentCapacity / b) * t);
            const foodLeft = currentCapacity;
            currentTime += timeSpentEating;
            currentCapacity -= foodLeft;

            setTimeout(() => {
                logStatus(`Котик под номером ${i} ждет...`);
                logStatus('Бабушка наполняет миску...');
                currentCapacity = m;
                currentTime += r;

                setTimeout(() => {
                    logStatus('Бабушка наполнила миску');
                    logStatus(`Котик под номером ${i} продолжает есть...`);
                    currentTime += t - timeSpentEating;
                    currentCapacity -= b - foodLeft;

                    setTimeout(() => {
                        logStatus(`Котик под номером ${i} отошел от миски`);
                        i++;
                        feedNextCat();
                    }, (t - timeSpentEating) * 1000);
                }, r * 1000);
            }, timeSpentEating * 1000);
            return;
        }

        if (currentCapacity == 0) {
            logStatus('Бабушка наполняет миску...');
            currentTime += r;
            currentCapacity = m;
            setTimeout(() => {
                logStatus('Бабушка наполнила миску');
                feedNextCat();
            }, r * 1000);
            return;
        }

        logStatus(`Котик под номером ${i} подошел к миске`);
        logStatus(`Котик под номером ${i} ест...`);
        currentCapacity -= b;
        currentTime += t;

        setTimeout(() => {
            logStatus(`Котик под номером ${i} отошел от миски`);
            i++;
            feedNextCat();
        }, t * 1000);
    }

    feedNextCat();
}

function logStatus(status) {
    const output = document.querySelector('.output');
    output.innerHTML += `<div class="output__elem">${status}</div>`;
    output.scrollTop = output.scrollHeight - output.clientHeight;
}

function logResult(result) {
    const output = document.querySelector('.output');
    output.innerHTML += `<div class="output__elem output__elem_result">${result}</div>`;
    output.scrollTop = output.scrollHeight - output.clientHeight;
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const n = parseFloat(document.getElementById('n').value);
    const b = parseFloat(document.getElementById('b').value);
    const m = parseFloat(document.getElementById('m').value);
    const t = parseFloat(document.getElementById('t').value);
    const r = parseFloat(document.getElementById('r').value);

    if (m < b) {
        alert('Порция котика не может быть больше миски!');
    } else {
        emulateFeeding(n, b, m, t, r);
    }
});
