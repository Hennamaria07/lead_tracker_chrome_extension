let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveInputEl = document.getElementById("saveInput-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const saveTapEl = document.getElementById('saveTap-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

saveTapEl.addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem('tapLead', JSON.stringify(tabs));
    console.log(localStorage.setItem('tapLead', JSON.stringify(myLeads)));
    render(myLeads);
  })
})

function render(lead) {
  let listItems = "";
  for (let i = 0; i < lead.length; i++) {
    listItems += `<li> 
  <a target='_blank' href='${lead[i]}'> ${lead[i]} </a> 
  </li>`;
    // ulEl.innerHTML += `<li>${myLeads[i]}</li>`
    //append method   this ia an another method for innerHTML
    // const li = document.createElement('li');
    // li.textContent += myLeads[i];
    // ulEl.append(li);
  }
  ulEl.innerHTML = listItems;
}


deleteBtn.addEventListener("click", function() {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
  


// localStorage.setItem('myLeads', 'WWW.google.com');
// console.log(localStorage.getItem("myLeads"));
saveInputEl.addEventListener("click", function () {
  myLeads.push(inputEl.value); //get the value from the input field
  inputEl.value = "";
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
  console.log(localStorage.getItem('myLeads'));
});

