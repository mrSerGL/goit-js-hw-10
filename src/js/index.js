import '../css/styles.css';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
};

refs.inputField.addEventListener(
    'input',
    debounce(() => {
      takeRequestData();
    }, DEBOUNCE_DELAY)
  );

function takeRequestData(event) {
  console.log(refs.inputField.value.trim());
}








