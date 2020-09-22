
var colorMarker = deaths => {
if (deaths>1000){
    return "red";}
if (deaths>100){
    return "yellow"}
    if (deaths<=100){
        return "green"}
}


//ip location


async function getData() {
        let response = await fetch('https://corona.lmao.ninja/v2/countries/')
        response = await response.json();
        console.log(response);
        return response;}
        
        //console.log(getData([1,2,3]));
    async function creatData() {
        let select = '<select id="uList">';
        var data = await getData();
       // console.log(data);
        let i = 0;
        data.forEach(data => {
            select += `<option value=${data.countryInfo.iso2}> ${data.country} </option>`});
            select += `</select>`;
            document.getElementById(`casesData`).innerHTML = select;//הדפסה של אובייקטים
        }
        

        async function marker() {
            let data = await getData();
            let i = 0;
            data.forEach(data => {
                new mapboxgl.Marker({
                            color : colorMarker(data.deaths)
                        })
                        
                        .setLngLat ([data.countryInfo.long , data.countryInfo.lat])
                        .setPopup(new mapboxgl.Popup({ offset: 5 }) // add popups
                        .setHTML('<h4 class="popUp">' + data.country + 
                        '</h4><p class="popUpP"> סה"כ כמות  חולים:'+ data.cases +
                        '</p><p class="popUpP"> כמות  מתים:'+ data.deaths +
                        '</p><p class="popUpP"> כמות חולים פעילים:'+ data.active +
                        '</p>')) 
                        .addTo(map);  
                });
            }
getData();
creatData();
marker();

 var countrySelect;
 var chek = document.getElementById("casesData")
 chek.addEventListener('change', function (event) {
    if (event.target.tagName === 'SELECT') {
         countrySelect = event.target.value;
    console.log(countrySelect);

    async function countryselec() {
        let data = await getData();
        //let i = 0;
        
        var place= data.find(data => data.countryInfo.iso2===countrySelect);
         console.log(place);
         map.flyTo({ center: [place.countryInfo.long,place.countryInfo.lat], zoom:4.5 });
         document.getElementById("country").innerHTML = place.country;
         document.getElementById("flag").src = place.countryInfo.flag;
     document.getElementById("cases").innerHTML = place.cases;
     document.getElementById("critical").innerHTML = place.critical.toLocaleString();
     document.getElementById("death").innerHTML = place.deaths.toLocaleString();
     document.getElementById("recovered").innerHTML = place.recovered.toLocaleString();
     document.getElementById("tests").innerHTML = place.tests.toLocaleString();
     document.getElementById("active").innerHTML = place.active.toLocaleString();
    }  
    countryselec();
 }
});









//map things
mapboxgl.accessToken = 'pk.eyJ1IjoibmF0YW5rb3ppcmV2IiwiYSI6ImNrYzV2MTJ1aTA5a2wycmxqZjRkZ3lyYTEifQ.DPuU9k43ldrVnd9sm_JjvQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom :4.5,
center: [0,0]
});


//location from ip
async function ipLookUp() {
    let response = await fetch('http://ip-api.com/json')
    response = await response.json();
//console.log(response.lat+2,response.lon-2);
//console.log(response);

async function defualtcountry() {
    let data = await getData();
    var defaultPlace = data.find(data => data.countryInfo.iso2 === response.countryCode);
     console.log(defaultPlace);
     console.log(response.countryCode);
     map.flyTo({ center: [defaultPlace.countryInfo.long,defaultPlace.countryInfo.lat], zoom:4.5 });
     document.getElementById("country").innerHTML = defaultPlace.country;
     document.getElementById("flag").src = defaultPlace.countryInfo.flag;
 document.getElementById("cases").innerHTML = defaultPlace.cases;
 document.getElementById("critical").innerHTML = defaultPlace.critical.toLocaleString();
 document.getElementById("death").innerHTML = defaultPlace.deaths.toLocaleString();
 document.getElementById("recovered").innerHTML = defaultPlace.recovered.toLocaleString();
 document.getElementById("tests").innerHTML = defaultPlace.tests.toLocaleString();
 document.getElementById("active").innerHTML = defaultPlace.active.toLocaleString();
 document.getElementById("uList").value = defaultPlace.countryInfo.iso2;
} 
defualtcountry();

 }
 ipLookUp();