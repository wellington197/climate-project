
//selecionar o formulário e impedir que o mesmo seja enviado sem as informações 
document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    //Selecionar se valor foi digitado pelo usuário
    let input = document.querySelector('#searchInput').value;
    
    if(input !== '') {
        clearInfo();

        //Mostra a menssagem de espera
        showWarning('Carregando...');


        //Conectando com a nossa API do site OpenWeather. Fazer a requisição e buscar resposta com fetch.
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&units=metric&lang=pt_br&appid=39db3334c13de78069d16a7e44c8227c`);

        //
        let json = await results.json();       
        
        
        
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização. Verifique se foi digitado corretamente');
        }
    } else {
        clearInfo();
    }
});





function showInfo(obj) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`;
    
    document.querySelector('.tempInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`;
    document.querySelector('.tempInfo-description').innerHTML = `${obj.description}`;

    
    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', 
    `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}


// Função que mostra ao usuário que está carregando as informações
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}