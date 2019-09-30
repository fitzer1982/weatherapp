window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-degree');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/534b3799a482a7842b8fb60171137d22/${lat},${long}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temperature, summary, icon }= data.currently;
                //set DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone; 
                //set icons
                setIcons(icon, document.querySelector('.icon'));

                // change F to C
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan === 'F'){
                        temperatureSpan.textContent = 'C';

                    } else{
                        temperatureSpan.textContent = 'F'
                    }
                });

            });
            
        })

    }

    function setIcons(icon,iconID){
        const skycons= new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
});

