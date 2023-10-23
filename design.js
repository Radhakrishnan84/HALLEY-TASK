function allowDrop(event) {
  event.preventDefault();
}

function drag(event, element) {
  event.dataTransfer.setData("text", element);
}

function drop(event) {
  event.preventDefault();
  const element = event.dataTransfer.getData("text");
  const formPreview = document.getElementById("preview-form");

  if (element === "Layout") {
    const layoutDiv = document.createElement("div");
    layoutDiv.className = "layout";
    formPreview.appendChild(layoutDiv);
    const section1 = document.createElement("div");
    section1.className = "layout-section";
    layoutDiv.appendChild(section1);
    const section2 = document.createElement("div");
    section2.className = "layout-section";
  } else if (element === "Label") {
    const label = document.createElement("label");
    label.innerText = "Label Text:";
    const input = document.createElement("input");
    input.type = "text";
    formPreview.appendChild(label);
    formPreview.appendChild(input);
  } else if (element === "Text Box") {
    const textBox = document.createElement("input");
    textBox.type = "text";
    formPreview.appendChild(textBox);
  } else if (element === "Button") {
    const button = document.createElement("button");
    button.innerText = "Button";
    formPreview.appendChild(button);
   } else if (element === "Dropdown") {
    const Dropdown = document.createElement("select");
    const option1 = document.createElement("option");
    option1.value = "option1";
    option1.text = "Vegetarian meal";
    Dropdown.appendChild(option1);
    const option2 = document.createElement("option");
    option2.value = "option2";
    option2.text = "Non-Vegetarian meal";
    Dropdown.appendChild(option2);
    formPreview.appendChild(Dropdown);
  } else if (element === "Check Box") {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    formPreview.appendChild(checkbox);
    const label = document.createElement("label");
    label.innerText = "Check Box Label";
    formPreview.appendChild(label);
  } else if (element === "Radio Button") {
    const radio = document.createElement("input");
    radio.type = "radio";
    formPreview.appendChild(radio);
    const label = document.createElement("label");
    label.innerText = "Radio Button Label";
    formPreview.appendChild(label);
  } else if (element === "Table") {
    const numCols = parseInt(prompt("Enter the number of columns:"));

if (!isNaN(numCols)) {
    // Prompt the user for column headers
    const columnHeaders = [];
    for (let i = 0; i < numCols; i++) {
        const header = prompt(`Enter the header for column ${i + 1}:`);
        columnHeaders.push(header);
    }

    const numRows = parseInt(prompt("Enter the number of rows:"));

    if (!isNaN(numRows)) {
        const Table = document.createElement("Table");
        Table.style.borderCollapse = "collapse";
        const headerRow = table.insertRow(0);
        for (let i = 0; i < numCols; i++) {
            const headerCell = headerRow.insertCell(i);
            headerCell.style.border = "1px solid #000";
            headerCell.style.fontWeight = "bold";
            headerCell.textContent = columnHeaders[i];
        }
        for (let i = 0; i < numRows; i++) {
            const row = Table.insertRow(i + 1);
            for (let j = 0; j < numCols; j++) {
                const cell = row.insertCell(j);
                cell.style.border = "1px solid #000";
                cell.innerText = `Row ${i + 1}, Col ${j + 1}`;
            }
        }
      }
    }
        formPreview.appendChild(Table);
} else if (element === "Navigation") {
    const link = document.createElement("a");
    link.href = "#";
    link.innerText = "Navigation Link";
    formPreview.appendChild(link);
  } else if (element === "Image") {
    const image = document.createElement("img");
    image.src = "path_to_your_image.jpg";
    formPreview.appendChild(image);
  }
}
function loadPreview()
 {
  const formPreview = document.getElementById("form-preview");
  const previewContent = formPreview.innerHTML;

  const newTab = window.open();
  newTab.document.open();
  newTab.document.write("<html><head><title>Form Preview</title></head><body>");
  newTab.document.write('<div id="preview-content">');
  newTab.document.write(previewContent);
  newTab.document.write("</div></body></html>");
  newTab.document.close();
}
function reloadPage(){
  window.location.reload();
}
document.getElementById('save-button').addEventListener('click', 
function() {
  const formPreview = document.getElementById("form-preview");
  const previewContent = formPreview.innerHTML;

  const format = prompt("Save as CSV or JSON? Enter 'csv' or 'json'");

  if (format === 'csv') {
      saveAsCSV(previewContent);
  } else if (format === 'json') {
      saveAsJSON(previewContent);
  } else {
      alert("Invalid format. Please enter 'csv' or 'json'.");
  }
});

function saveAsCSV(content) 
{
  const blob = new Blob([content], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'form.csv';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

function saveAsJSON(content)
 {
  const formObject = parseFormContent(content);
  const jsonString = JSON.stringify(formObject, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'form.json';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

function parseFormContent(content)
 {
  const formObject = { content: content };
  return formObject;
}