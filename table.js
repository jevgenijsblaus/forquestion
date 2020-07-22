fetch('./BIG_DATA.json')
  .then(response => response.json())
  .then(data => {
    if(data.length > 50) {
        let dataSets = [];
        while(data.length) {
            let newArray = data.splice(0,50);
            dataSets.push(newArray);
        }

        // pagination 
        let paginationBlock = document.getElementById('pagination');
        let currentPage;
        for (let i = 0; i < dataSets.length; i++) {
            let paginationButton = document.createElement('div');
            paginationButton.innerText = i + 1;
            paginationButton.addEventListener('click', () => showTablePage(i))
            paginationBlock.appendChild(paginationButton);
        }
        let back = document.getElementById('back');
        let forward = document.getElementById('forward');


        // table
        let table = document.getElementById('table');

        function showTablePage(page) {
            currentPage = page;
            localStorage.setItem('page', currentPage);
            table.innerHTML = `
            <caption contenteditable>Table 1</caption>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quanity</th>
            </tr>
            `;
            dataSets[page].forEach(item => {
                let tr = document.createElement('tr');
                tr.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>${item.price}</td><td>${item.quantity}</td>`;
                table.appendChild(tr);
            })
            if(currentPage == 0) {
                back.style.opacity = '0.5';
                back.style.pointerEvents = 'none'
            } else {
                back.style.opacity = '1';
                back.style.pointerEvents = 'all'
            }
            if(currentPage == dataSets.length - 1) {
                forward.style.opacity = '0.5';
                forward.style.pointerEvents = 'none'
            } else {
                forward.style.opacity = '1';
                forward.style.pointerEvents = 'all'
            }

            
        }

        back.addEventListener('click', () => {
            if(currentPage > 0) {
                currentPage--;
                showTablePage(currentPage);
            }
        })
        forward.addEventListener('click', () => {
            if(currentPage < dataSets.length - 1) {
                currentPage++;
                showTablePage(currentPage);
            }
        })


        if(localStorage.getItem('page')) {
            showTablePage(localStorage.getItem('page'));
        } else {
            showTablePage(0);
        }


    } else {
        let pagination = document.getElementById('pagination');
        pagination.style.display = 'none';
        let table = document.getElementById('table');
        function showTablePage() {
            table.innerHTML = `
            <caption contenteditable>Table 1</caption>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quanity</th>
            </tr>
            `;
            data.forEach(item => {
                let tr = document.createElement('tr');
                tr.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>${item.price}</td><td>${item.quantity}</td>`;
                table.appendChild(tr);
            })
        }
        showTablePage()
    }
  });
