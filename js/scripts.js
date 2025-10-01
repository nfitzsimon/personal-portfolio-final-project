const rebuildAboutMe = async () => {
  fetch('./data/aboutMeData.json')
    .then(response => {
      // Check if the response was successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      fillAboutMe(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch operation
      console.error('Error fetching JSON data:', error);
    })
}

function fillAboutMe(data) {
  const documentFragment = document.createDocumentFragment();

  const aboutDiv = document.querySelector('#aboutMe');
  const aboutParagraph = document.createElement('p');
  aboutParagraph.textContent = data.aboutMe;
  const headshotContainer = document.createElement('div');
  headshotContainer.classList.add('headshotContainer');
  const headshot = document.createElement('img');
  headshot.src = data.headshot;

  headshotContainer.append(headshot);

  documentFragment.append(aboutParagraph);
  documentFragment.append(headshotContainer);

  aboutDiv.append(documentFragment);
}

const rebuildProjects = async () => {
  fetch('./data/projectsData.json')
    .then(response => {
      // Check if the response was successful (status code 200-299)
      if (!response.ok) {
        throw new Error('Error fetching data: ${apiResponse.status}, ${apiResponse.statusText')
      }
      return response.json();
    })
    .then(data => {
      fillProjects(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch operation
      console.error('Error fetching JSON data:', error);
    })
}

function fillProjects(data) {
  const projectList = document.querySelector('#projectList');
  const projectSpotlight = document.getElementById('projectSpotlight');
  let spotlightTitles = document.getElementById('spotlightTitles');

  // Need to remove original spotlightTitles that is a div to late put in h3
  spotlightTitles.remove();
  spotlightTitles = document.createElement('h3');
  spotlightTitles.id = 'spotlightTitles';
  const spotlightDescription = document.createElement('p');
  const spotlightLink = document.createElement('a');
  spotlightLink.textContent = 'Click here to see more...';

  projectSpotlight.append(spotlightTitles, spotlightDescription, spotlightLink);

  const updateSpotlight = (project) => {
    projectSpotlight.style.backgroundImage = `url(${project.spotlight_image || '../images/spotlight_placeholder_bg.webp'})`;
    spotlightTitles.textContent = project.project_name ?? 'Unnamed Project';
    spotlightUrl = `${project.url || '#'}`;
    spotlightDescription.textContent = project.long_description || 'No description.';
    spotlightLink.href = spotlightUrl;
  }

  data.forEach((project, index) => {
    const documentFragment = document.createDocumentFragment();

    const card = document.createElement('div');
    project.id = project.project_id;
    card.classList.add('projectCard');
    card.addEventListener('click', () => updateSpotlight(project));
    const backgroundImageUrl = `url(${project.card_image ?? '../images/card_placeholder_bg.webp'})`;
    card.style.backgroundImage = backgroundImageUrl;
    card.style.backgroundSize = "cover";

    const projectHeader = document.createElement('h4');
    projectHeader.textContent = project.project_name;
    card.append(projectHeader);

    const projectText = document.createElement('p');
    projectText.textContent = project.short_description;
    card.append(projectText);

    documentFragment.append(card);

    projectList.append(documentFragment);

    if (index === 0) updateSpotlight(project);
  });
}

rebuildAboutMe();
rebuildProjects();