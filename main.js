function load() {
  // Listeners
  let selectTypeField = document.getElementById("selectTypeField");
  selectTypeField.addEventListener("change", function() {
    hideAllFieldsType();
    fieldType = 0;

    switch (selectTypeField.value) {
      case "1":
        fieldType = 1;
        break;
      case "2":
        fieldType = 2;
        break;
      case "3":
        document.getElementById("type-3").className = "visible";
        fieldType = 3;
        break;
      case "4":
        document.getElementById("type-4").className = "visible";
        fieldType = 4;
        break;
      case "5":
        document.getElementById("type-5").className = "visible";
        fieldType = 5;
        break;
    }
  });
}

let questionnaire = {};
questionnaire.questions = [];

let fieldType = 0;

function saveQuestionnaireTitle() {
  let title = document.getElementById("title").value;
  questionnaire.title = title;
  document.getElementById("titleQuestion").innerHTML = questionnaire.title;
}

function hideAllFieldsType() {
  document.getElementById("type-3").className = "hide";
  document.getElementById("type-4").className = "hide";
  document.getElementById("type-5").className = "hide";
}

function clearPreviewContent() {
  let previewContent = document.getElementById("preview");

  while (previewContent.firstChild) {
    previewContent.removeChild(previewContent.firstChild);
  }
}

function resetForm() {
  document.getElementById("questionTitle").value = "";
  document.getElementById("selectTypeField").value = "";
}

function addQuestion() {
  console.log("yes");
  let title = document.getElementById("questionTitle").value;

  let obj = {
    title: title,
    type: fieldType
  };

  if (parseInt(fieldType) == 3) {
    let choicesContent = document.getElementById("checkboxContent").value;
    obj.content = choicesContent.split(",");
  } else if (parseInt(fieldType) == 4) {
    let choicesContent = document.getElementById("optionsContent").value;
    obj.content = choicesContent.split(",");
  } else if (parseInt(fieldType) == 5) {
    let choicesContent = document.getElementById("radioContent").value;
    obj.content = choicesContent.split(",");
  }

  console.log(obj);
  questionnaire.questions.push(obj);

  generateQuestion();
  resetForm();
}

function generateQuestion() {
  clearPreviewContent();

  let index = 1;
  questionnaire.questions.forEach(element => {
    let preview = document.getElementById("preview");
    let numberQuestion = document.createElement("h3");
    numberQuestion.innerHTML = `Question N° ${index}`;
    preview.appendChild(numberQuestion);

    let previewTitle = document.createElement("p");
    previewTitle.innerHTML = element.title;
    preview.appendChild(previewTitle);

    switch (parseInt(element.type)) {
      case 1:
        let inputField = document.createElement("input");
        inputField.setAttribute("placeholder", "...");
        preview.appendChild(inputField);
        break;
      case 2:
        let textareaField = document.createElement("textarea");
        textareaField.setAttribute("placeholder", "...");
        preview.appendChild(textareaField);
        break;
      case 3:
        for (let i = 0; i < element.content.length; i++) {
          let divCheckbox = document.createElement("div");
          divCheckbox.className = "parent2";
          preview.appendChild(divCheckbox);

          let checkboxButton = document.createElement("input");
          checkboxButton.setAttribute("type", "checkbox");
          checkboxButton.setAttribute("id", `checkbox${i}`);
          checkboxButton.setAttribute("name", `checkbox${i}`);
          divCheckbox.appendChild(checkboxButton);

          let checkboxLabel = document.createElement("label");
          checkboxLabel.setAttribute("for", `checkbox${i}`);
          checkboxLabel.innerHTML = element.content[i];

          divCheckbox.appendChild(checkboxLabel);
        }
        break;
      case 4:
        let selectButton = document.createElement("select");
        preview.appendChild(selectButton);

        for (let i = 0; i < element.content.length; i++) {
          let optionButton = document.createElement("option");
          optionButton.innerHTML = element.content[i];
          selectButton.appendChild(optionButton);
        }
        break;
      case 5:
        for (let i = 0; i < element.content.length; i++) {
          let divRadio = document.createElement("div");
          divRadio.className = "parent2";
          preview.appendChild(divRadio);

          let radioButton = document.createElement("input");
          radioButton.setAttribute("type", "radio");
          radioButton.setAttribute("id", `radio${i}`);
          radioButton.setAttribute("name", `radio`);
          divRadio.appendChild(radioButton);

          let radioLabel = document.createElement("label");
          radioLabel.setAttribute("for", `radio${i}`);
          radioLabel.innerHTML = element.content[i];

          divRadio.appendChild(radioLabel);
        }
        break;
    }
    index++;
  });
}
