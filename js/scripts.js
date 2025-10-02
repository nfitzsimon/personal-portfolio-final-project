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
    card.addEventListener('pointerdown', () => updateSpotlight(project));
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

  // Arrow functionality
  const leftArrow = document.querySelector('.arrow-left');
  const rightArrow = document.querySelector('.arrow-right');

  const isMobile = window.matchMedia('(max-width: 768px)');

  const scrollProjects = (direction) => {
    const scrollAmount = 200;
    if (isMobile.matches) {
      projectList.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    } else {
      projectList.scrollTop += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  leftArrow.addEventListener('pointerdown', () => scrollProjects('left'));
  rightArrow.addEventListener('pointerdown', () => scrollProjects('right'));
}

const rebuildForm = async () => {
  const form = document.getElementById('formSection');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const charactersLeft = document.getElementById('charactersLeft');

  const illegalChars = /[^a-zA-Z0-9@._-]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  messageInput.addEventListener('input', () => {
    const length = messageInput.value.length;
    charactersLeft.textContent = `Characters: ${length}/300`;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    emailError.textContent = '';
    messageError.textContent = '';

    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!email) {
      emailError.textContent = 'Email is required.';
      valid = false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = 'Invalid email format.';
      valid = false;
    } else if (illegalChars.test(email)) {
      emailError.textContent = 'Email contains invalid characters.';
      valid = false;
    }

    if (!message) {
      messageError.textContent = 'Message is required.';
      valid = false;
    } else if (message.length > 300) {
      messageError.textContent = 'Message must be less than 300 characters.';
      valid = false;
    } else if (illegalChars.test(message)) {
      messageError.textContent = 'Message contains invalid characters.';
      valid = false;
    }

    if (valid) {
      alert('Form submitted successfully!');
    }
  })
}

rebuildAboutMe();
rebuildProjects();
rebuildForm();