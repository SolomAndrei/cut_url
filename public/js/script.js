const form = document.getElementById('shortForm');

const renderedLinks = new Set();

form.onsubmit = function (e) {
    e.preventDefault();
    const link = e.target.elements.link.value;
    if (!link) return;
    const data = JSON.stringify({ link });

    fetch('/links/short', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
    })
        .then((res) => res.json())
        .then((res) => {
            if (renderedLinks.has(res.short)) return;
            renderedLinks.add(res.short);
            const ul = document.getElementById('links');
            const li = document.createElement('li');
            li.style.width = '100%';

            const a = document.createElement('a');

            a.style.display = 'inline-block';
            a.style.maxWidth = '100%';
            a.style.whiteSpace = 'nowrap';
            a.style.overflow = 'hidden';
            a.style.textOverflow = 'ellipsis';

            a.href = res.short;
            a.textContent = `Short link: ${res.short}`;
            a.target = '_blank';

            const p = document.createElement('p');
            p.textContent = `Original: ${res.source}`;

            p.style.whiteSpace = 'nowrap';
            p.style.overflow = 'hidden';
            p.style.textOverflow = 'ellipsis';

            li.appendChild(a);
            li.appendChild(document.createElement('br'));
            li.appendChild(p);

            ul.appendChild(li);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            e.target.elements.link.value = '';
        });
};
