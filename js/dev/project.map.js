/*********************
 *  Project Map script
 ********************/

// Using DOMReady function defined in skew.scroll.js. Make sure to include skew.scroll.js before this file

const projects = [
  {
    title: 'Sigsense Technologies',
    at: [590, 620],
    tech: ['React', 'Node', 'Docker', 'D3', 'Highcharts'],
    role: 'Lead Developer',
    thumb: 'sigsense_machine_learning.png',
    link: 'https://www.sigsensetech.com'
  },
  {
    title: 'Airnest',
    at: [400 ,450],
    tech: ['React', 'React Native', 'Ruby on Rails', 'Mapbox'],
    role: 'React / Ruby on Rails Engineer, React Native Lead',
    thumb: 'thumbs/airnest-trans.png',
    transparent: true,
    link: 'https://www.measure.com/drone-software/features'
  },
  { 
    title: 'Robot Riot',
    at: [310, 310],
    tech: ['Ruby on Rails', 'TDD', 'SOLID', 'Leaderboard'],
    role: 'Ruby on Rails Developer',
    thumb: 'thumbs/fishing-screen.png',
    link: 'https://www.robotriotgames.com'
  },
  {
    title: 'DigiPro, Inc',
    at: [500, 750],
    tech: ['Node', 'Express', 'Mongoose', 'Docker'],
    role: 'Node Developer',
    thumb: 'thumbs/digipro.png',
    link: 'https://www.digi-inc.com'
  },
  {
    title: 'Acuity Scheduling',
    at: [500, 500],
    tech: ['React', 'Node', 'React Native', 'GraphQL'],
    role: 'React / React Native / GraphQL Developer',
    thumb: 'thumbs/acuity.png',
    link: 'https://www.acuityscheduling.com'
  },
  {
    title: 'Simple.Space',
    at: [430,370],
    tech: ['React', 'Ruby on Rails', 'Sidekiq', 'HAML'],
    role: 'Ruby on Rails / React Engineer',
    thumb: 'thumbs/ss.png',
    link: 'https://www.simple.space'
  },
  {
    title: 'Project Map It',
    at: [540, 660],
    tech: ['React', 'Node', 'Oauth2', 'Mongoose', 'Google Maps'],
    role: 'React / Node Developer',
    thumb: 'thumbs/pmit.png',
    link: 'https://www.projectmap.it'
  },
  {
    title: 'Strive for College',
    at: [450, 610],
    tech: ['React', 'Node', 'React Native', 'Firebase', 'Twilio'],
    role: 'Contractor',
    thumb: 'thumbs/ustrive.png',
    transparent: true,
    link: 'https://www.ustrive.com'
  },
];

const techs = [
  { key: 'react', imgUrl: '/img/tech-icons/react.png', focus: [500, 500] },
  { key: 'node', imgUrl: '/img/tech-icons/node.png', focus: [500, 700] },
  { key: 'rails', imgUrl: '/img/tech-icons/rails.png', focus: [350, 350] },
];

const areas = {};

const TechButton = tech => L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: map => {
    var container = L.DomUtil.create('div', 'proj-map-tech-btn');

    // container.style.backgroundColor = 'white';
    container.style.backgroundImage = `url(${tech.imgUrl})`;
    container.style.backgroundSize = "30px 30px";
    container.style.width = '30px';
    container.style.height = '30px';

    container.onclick = function(){
      map.panTo(tech.focus);

      for (let areaKey in areas) {
        if (areaKey !== tech.key) {
          areas[areaKey].setStyle({ stroke: false });
        } else {
          areas[areaKey].setStyle({ stroke: true });
        }
      }
      
    }

    return container;
  }
});

const generateProjContent = proj => {
  return `
    <h5>${proj.title}</h5>
    <div class="pm-role">${proj.role}</div>
    <ul class="pm-tech">${proj.tech.map(t => '<li>' + t + '</li>').join('')}</ul>
    <img class="pm-thumb ${proj.transparent ? 'no-border' : ''}" src="img/portfolio/${proj.thumb}" alt="Screenshot" />
    <div class="pm-vacancy"></div>
    <a class="pm-link" href="${proj.link}" target="_blank">Go to ${proj.title}</a>
  `;
}

const initMap = () => {
  const map = L.map('pmap', {
      crs: L.CRS.Simple,
      zoomControl: false
  });

  const bounds = [[0,0], [1000, 1000]];
  const tile = L.tileLayer('/img/map-bk.jpg').addTo(map);
  map.fitBounds(bounds);

  // Ruby on Rails
  areas['rails'] = L.circle([350, 350], {radius: 150, color: '#C7090F', stroke: false}).addTo(map);
  // Node
  areas['node'] = L.circle([500, 700], {radius: 150, color: '#87C024', stroke: false}).addTo(map);
  // React
  areas['react'] = L.circle([500, 500], {radius: 200, color: '#5ED5F4', stroke: false}).addTo(map);
  // React Native
  L.circle([460, 540], {radius: 130, color: '#5ED5F4', stroke: false}).addTo(map);

  const pane = map.createPane('fixed', document.getElementById('pmap'));

  // Projects
  const markerIcon = L.icon({
    iconUrl: '/img/map-marker.png',
    iconSize: [50, 50],
  });
  for (let proj of projects) {
    const tooltip = L.tooltip({ direction: 'bottom', className: 'proj-tooltip', offset: [0, 5] }).setContent(proj.title);
    const marker = L.marker(L.latLng(proj.at), { icon: markerIcon }).bindTooltip(tooltip).addTo(map);
    const popup = L.popup({
      pane: 'fixed',
      className: 'popup-fixed',
      autoPan: false,
    }).setContent(generateProjContent(proj));
    marker.bindPopup(popup);
  }

  // Tech buttons
  for (let tech of techs) {
    map.addControl(new (TechButton(tech)));
  }


}

DOMReady(initMap);
