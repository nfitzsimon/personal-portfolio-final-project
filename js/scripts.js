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
        throw new Error(`HTTP error! status: ${response.status}`);
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
  data.forEach((element, index, array) => {
    const project = document.createElement('div');
    project.id = element.project_id;
    project.classList.add('projectCard');
    const backgroundImageUrl = `url(${element.card_image})`
    project.style.backgroundImage = backgroundImageUrl;
    project.style.backgroundSize = "cover";

    const projectHeader = document.createElement('h4');
    projectHeader.textContent = element.project_name;
    project.append(projectHeader);

    const projectText = document.createElement('p');
    projectText.textContent = element.short_description;
    project.append(projectText);

    projectList.append(project);
  });
}

rebuildAboutMe();
rebuildProjects();