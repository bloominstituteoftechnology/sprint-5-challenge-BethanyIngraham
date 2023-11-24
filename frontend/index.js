async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const learnerInfo = await axios.get('http://localhost:3003/api/learners');
  const mentorInfo = await axios.get('http://localhost:3003/api/mentors');

  const learners = learnerInfo.data;
  const mentors = mentorInfo.data;

  const completeLearners = learners.map(learner => {
    return {...learner, mentors: mentors.filter(mentor => learner.mentors.includes(mentor.id))}
  });

  document.querySelector('.info').textContent = 'No learner is selected';

  const cardSection = document.querySelector('.cards');

  completeLearners.forEach(learner => {
    const learnerCard = createLearnerCard(learner);
    cardSection.appendChild(learnerCard);
  })

  function createLearnerCard(learner){
    const div = document.createElement('div');
    div.classList.add('card');
    const h3 = document.createElement('h3');
    h3.textContent = learner.fullName;
    const email = document.createElement('div');
    email.textContent = learner.email;
    const h4 = document.createElement('h4');
    h4.classList.add('closed');
    h4.textContent = 'Mentors';
    const ul = document.createElement('ul');


    h4.addEventListener('click', (evt) => {
      if(div.classList.contains('selected')){
        evt.stopPropagation();
      }
      h4.classList.toggle('closed');
      h4.classList.toggle('open');
    })

    for(let mentor of learner.mentors){
      const li = document.createElement('li');
      li.textContent = `${mentor.firstName} ${mentor.lastName}`;
      ul.appendChild(li);
    }

    div.addEventListener('click', () => {
      const infoParagraph = document.querySelector('.info');
      const cards = document.querySelectorAll('.card');
      const isCardSelected = div.classList.contains('selected');

      cards.forEach(card => {
        card.classList.remove('selected');
        const name = card.querySelector('h3');
        name.textContent = name.textContent.split(',')[0];
      })

      if(!isCardSelected){
        div.classList.add('selected');
        infoParagraph.textContent = `The selected learner is ${learner.fullName}`;
        h3.textContent = `${learner.fullName}, ID ${learner.id}`;
      } else {
        infoParagraph.textContent = 'No learner is selected';
        h3.textContent = learner.fullName;
      } 
      
    })

    div.appendChild(h3);
    div.appendChild(email);
    div.appendChild(h4);
    div.appendChild(ul);
    

    return div;
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`



  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
