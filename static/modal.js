console.log("Connected!");
const spinner = document.getElementById('spinner')
const tableBody = document.getElementById('table-body-box')
const url = window.location
console.log(url.href);

const modalBody = document.getElementById('modal-body')

let incrementVal = document.getElementById('incrementVal')
const incrementBtn = document.getElementById('incrementBtn')
const decrementBtn = document.getElementById('decrementBtn')

/*
let x = parseInt(incrementVal.textContent, 10)
*/
$.ajax({
    type: 'GET',
    url: '/json-data/',
    success: function(response){
        console.log(response.data)
        const data = JSON.parse(response.data)
        console.log(data);
        data.forEach(element => {
            console.log(element.fields);
            tableBody.innerHTML += `
                <tr>
                    <td>${element.pk}</td>
                    <td>
                        <div class="img-pointer" title="Click me!" data-toggle="modal" data-target="#previewImgModal" data-img=media/${element.fields.item}>
                            <img class="img" src="media/${element.fields.item}" height="50px" width="80px" alt="">
                        </div>
                    </td>
                    <td class="info">${element.fields.info}</td>
                </tr>
            `
        console.log(`${url.href}media/${element.fields.item}`)
        });
        
        spinner.remove()
        const img = [...document.getElementsByClassName('img')]
        console.log("Image:",img);
        img.forEach(element => {
            element.addEventListener('click', e=>{
                console.log("Clicked!");
                console.log(`element: ${element.parentElement}`);
                console.log(`e: ${e.target.parentElement}`);
                imgSrc = e.target.parentElement.getAttribute('data-img')
                
                modalBody.innerHTML = `
                    <img src="${imgSrc}" id="modal-img" alt="">
                `    
            })
            
        });

        if(cart['incrementVal'] === undefined){
            cart['incrementVal'] = 0
        }
        document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
        incrementVal.innerHTML = cart['incrementVal'].toString()
        

        incrementBtn.addEventListener('click', e =>{
            //console.log(e.target);
            //console.log(x);
            //x += 1
            
            if(cart['incrementVal'] != undefined){
                cart['incrementVal'] += 1
            }
            document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
            //console.log(cart)
            incrementVal.innerHTML = cart['incrementVal'].toString()
        })

        decrementBtn.addEventListener('click', e =>{
            //console.log(e.target);
            //console.log(x);
            //x += 1
            
            if(cart['incrementVal'] != undefined && cart['incrementVal'] > 0){

                cart['incrementVal'] -= 1
            }
            document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
            //console.log(cart)
            incrementVal.innerHTML = cart['incrementVal'].toString()
        })

    },
    error: function(error){
        console.log(error)
    }

    
})