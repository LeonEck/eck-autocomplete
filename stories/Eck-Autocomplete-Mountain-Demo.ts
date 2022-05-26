import '../dist/eck-autocomplete.js';
import './eck-autocomplete.css';

export const createMountainDemo = () => {
  return `
    <style>
      .mountain-selection .mountain-range {
        padding: 5px 5px 0;
        border-bottom: 1px solid black;
      }

      .mountain-selection .mountain {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    </style>
    <input
      id="input-mountain"
      type="text"
      placeholder="Mountain"
      style="width: 300px"
    />
    <eck-autocomplete
      connected-to-id="input-mountain"
      class="mountain-selection"
    >
    </eck-autocomplete>
    <script>
      (function () {
        const mountainData = {
          Andes: {
            Aconcagua:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Aconcagua2016.jpg/320px-Aconcagua2016.jpg',
            'Ojos del Salado':
              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ojos_del_Salado_looming_big_on_the_horizon.jpg/320px-Ojos_del_Salado_looming_big_on_the_horizon.jpg',
          },
          'Rocky Mountains': {
            'Mount Elbert':
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Mt._Elbert.jpg/320px-Mt._Elbert.jpg',
            'Mount Massive':
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Mount_Massive.jpg/320px-Mount_Massive.jpg',
          },
          Alps: {
            'Mont Blanc':
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mont-Blanc_from_Planpraz_station.jpg/320px-Mont-Blanc_from_Planpraz_station.jpg',
            'Monte Rosa':
              'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Dufourspitze_%28Monte_Rosa%29_and_Monte_Rosa_Glacier_as_seen_from_Gornergrat%2C_Wallis%2C_Switzerland%2C_2012_August.jpg/320px-Dufourspitze_%28Monte_Rosa%29_and_Monte_Rosa_Glacier_as_seen_from_Gornergrat%2C_Wallis%2C_Switzerland%2C_2012_August.jpg',
          },
        };

        const renderMountainOptions = (mountains) => {
          const autocomplete = document.querySelector('.mountain-selection');
          autocomplete.innerHTML = '';
          for (const mountainRange in mountains) {
            const rangeElement = document.createElement('div');
            rangeElement.innerText = mountainRange;
            rangeElement.className = 'mountain-range';
            autocomplete.appendChild(rangeElement);
            for (const mountain in mountains[mountainRange]) {
              const mountainOptionElement = document.createElement(
                'eck-autocomplete-option'
              );
              mountainOptionElement.setAttribute('label', mountain);
              mountainOptionElement.className = 'mountain';
              const mountainNameElement = document.createElement('div');
              mountainNameElement.innerText = mountain;
              mountainOptionElement.appendChild(mountainNameElement);
              const mountainImageElement = document.createElement('img');
              mountainImageElement.src = mountains[mountainRange][mountain];
              mountainImageElement.width = 64;
              mountainImageElement.height = 48;
              mountainImageElement.alt = mountain;
              mountainOptionElement.appendChild(mountainImageElement);
              autocomplete.appendChild(mountainOptionElement);
            }
          }
        };

        renderMountainOptions(mountainData);

        const mountainSearchInput = document.getElementById('input-mountain');

        /**
         * When value of mountain input changes the mountains should be filtered
         */
        mountainSearchInput.addEventListener('input', (e) => {
          e.preventDefault();
          const searchString = mountainSearchInput.value.toLowerCase();
          const filteredMountains = {};

          for (const mountainRange in mountainData) {
            let mountainOfThisRangeIncluded = false;
            filteredMountains[mountainRange] = {};
            for (const mountain in mountainData[mountainRange]) {
              if (mountain.toLowerCase().includes(searchString)) {
                filteredMountains[mountainRange][mountain] =
                  mountainData[mountainRange][mountain];
                mountainOfThisRangeIncluded = true;
              }
            }
            if (!mountainOfThisRangeIncluded) {
              delete filteredMountains[mountainRange];
            }
          }

          renderMountainOptions(filteredMountains);
        });
      })()
    </script>
  `;
};
