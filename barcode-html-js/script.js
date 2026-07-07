const FIELDS = [
  { id: 'itemCode',      name: 'Item Code' },
  { id: 'grade',         name: 'Grade' },
  { id: 'cropYear',      name: 'Crop Year' },
  { id: 'grossWeight',   name: 'AGL Gross Weight' },
  { id: 'netWeight',     name: 'AGL NET Weight' },
  { id: 'brokenStraps',  name: 'Number of Broken Straps' },
];

const form = document.getElementById('packForm');
const formView = document.getElementById('formView');
const previewView = document.getElementById('previewView');
const labelGrid = document.getElementById('labelGrid');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let valid = true;
  const values = {};

  FIELDS.forEach(f => {
    const input = document.getElementById(f.id);
    const wrapper = input.closest('.field');
    const val = input.value.trim();
    if (!val) {
      valid = false;
      wrapper.classList.add('invalid');
    } else {
      wrapper.classList.remove('invalid');
      values[f.id] = val;
    }
  });

  if (!valid) return;

  buildLabels(values);
  formView.style.display = 'none';
  previewView.style.display = 'block';
});

document.getElementById('backBtn').addEventListener('click', function () {
  previewView.style.display = 'none';
  formView.style.display = 'block';
});

document.getElementById('printBtn').addEventListener('click', function () {
  window.print();
});

function buildLabels(values) {
  labelGrid.innerHTML = '';

  FIELDS.forEach(f => {
    const value = values[f.id];

    const block = document.createElement('div');
    block.className = 'label-block';

    const nameEl = document.createElement('p');
    nameEl.className = 'field-name';
    nameEl.textContent = f.name;

    const valueEl = document.createElement('p');
    valueEl.className = 'field-value';
    valueEl.textContent = value;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'bc-' + f.id;

    block.appendChild(nameEl);
    block.appendChild(valueEl);
    block.appendChild(svg);
    labelGrid.appendChild(block);

    JsBarcode(svg, value, {
      format: 'CODE128',
      width: 1.6,
      height: 55,
      displayValue: true,
      fontSize: 12,
      textMargin: 4,
      margin: 4
    });
  });
}
