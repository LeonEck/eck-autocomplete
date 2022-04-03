<template>
  <div style="display: flex; justify-content: center">
    <div style="display: flex; flex-direction: column">
      <label
        style="
          color: var(--c-text-light);
          font-size: 1.3rem;
          align-self: flex-start;
        "
        for="input1"
        >Demo</label
      ><input
        id="input1"
        type="text"
        placeholder="Input with eck-autocomplete"
        style="
          height: 40px;
          width: min(350px, calc(100vw - 32px));
          padding: 0.5rem 0.75rem;
          font-size: 100%;
        "
      />
      <eck-autocomplete
        connected-to-id="input1"
        id="input1autocomplete"
        highlight-first-option
      >
      </eck-autocomplete>
    </div>
  </div>
</template>

<style>
.color-option {
  display: flex;
  gap: 5px;
  align-items: center;
}

.color-block {
  height: 20px;
  width: 20px;
  box-shadow: 0 0 10px -6px #616161;
  border: 1px solid #e0e0e0;
}
</style>

<script>
export default {
  mounted() {
    const input1 = document.getElementById('input1');
    const input1autocomplete = document.getElementById('input1autocomplete');

    /**
     * Render object into demo
     * @param options
     */
    const renderOptions = (options) => {
      input1autocomplete.innerHTML = '';
      options.forEach((option) => {
        const optionElement = document.createElement('eck-autocomplete-option');
        optionElement.value = option.value;
        optionElement.setAttribute('label', option.label);
        optionElement.innerHTML = option.html;
        input1autocomplete.appendChild(optionElement);
      });
    };

    const options = [
      {
        value: '#F0F8FF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #F0F8FF"></div><div>AliceBlue
    </div><div style="margin-left: auto; color: #455a64">#F0F8FF</div></div>`,
        label: 'AliceBlue #F0F8FF',
      },
      {
        value: '#FAEBD7',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FAEBD7"></div><div>AntiqueWhite
    </div><div style="margin-left: auto; color: #455a64">#FAEBD7</div></div>`,
        label: 'AntiqueWhite #FAEBD7',
      },
      {
        value: '#00FFFF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #00FFFF"></div><div>Aqua
    </div><div style="margin-left: auto; color: #455a64">#00FFFF</div></div>`,
        label: 'Aqua #00FFFF',
      },
      {
        value: '#7FFFD4',
        html: `<div class="color-option"><div class="color-block" style="background-color: #7FFFD4"></div><div>Aquamarine
    </div><div style="margin-left: auto; color: #455a64">#7FFFD4</div></div>`,
        label: 'Aquamarine #7FFFD4',
      },
      {
        value: '#F0FFFF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #F0FFFF"></div><div>Azure
    </div><div style="margin-left: auto; color: #455a64">#F0FFFF</div></div>`,
        label: 'Azure #F0FFFF',
      },
      {
        value: '#F5F5DC',
        html: `<div class="color-option"><div class="color-block" style="background-color: #F5F5DC"></div><div>Beige
    </div><div style="margin-left: auto; color: #455a64">#F5F5DC</div></div>`,
        label: 'Beige #F5F5DC',
      },
      {
        value: '#FFE4C4',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFE4C4"></div><div>Bisque
    </div><div style="margin-left: auto; color: #455a64">#FFE4C4</div></div>`,
        label: 'Bisque #FFE4C4',
      },
      {
        value: '#000000',
        html: `<div class="color-option"><div class="color-block" style="background-color: #000000"></div><div>Black
    </div><div style="margin-left: auto; color: #455a64">#000000</div></div>`,
        label: 'Black #000000',
      },
      {
        value: '#FFEBCD',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFEBCD"></div><div>BlanchedAlmond
    </div><div style="margin-left: auto; color: #455a64">#FFEBCD</div></div>`,
        label: 'BlanchedAlmond #FFEBCD',
      },
      {
        value: '#0000FF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #0000FF"></div><div>Blue
    </div><div style="margin-left: auto; color: #455a64">#0000FF</div></div>`,
        label: 'Blue #0000FF',
      },
      {
        value: '#8A2BE2',
        html: `<div class="color-option"><div class="color-block" style="background-color: #8A2BE2"></div><div>BlueViolet
    </div><div style="margin-left: auto; color: #455a64">#8A2BE2</div></div>`,
        label: 'BlueViolet #8A2BE2',
      },
      {
        value: '#A52A2A',
        html: `<div class="color-option"><div class="color-block" style="background-color: #A52A2A"></div><div>Brown
    </div><div style="margin-left: auto; color: #455a64">#A52A2A</div></div>`,
        label: 'Brown #A52A2A',
      },
      {
        value: '#DEB887',
        html: `<div class="color-option"><div class="color-block" style="background-color: #DEB887"></div><div>BurlyWood
    </div><div style="margin-left: auto; color: #455a64">#DEB887</div></div>`,
        label: 'BurlyWood #DEB887',
      },
      {
        value: '#5F9EA0',
        html: `<div class="color-option"><div class="color-block" style="background-color: #5F9EA0"></div><div>CadetBlue
    </div><div style="margin-left: auto; color: #455a64">#5F9EA0</div></div>`,
        label: 'CadetBlue #5F9EA0',
      },
      {
        value: '#7FFF00',
        html: `<div class="color-option"><div class="color-block" style="background-color: #7FFF00"></div><div>Chartreuse
    </div><div style="margin-left: auto; color: #455a64">#7FFF00</div></div>`,
        label: 'Chartreuse #7FFF00',
      },
      {
        value: '#D2691E',
        html: `<div class="color-option"><div class="color-block" style="background-color: #D2691E"></div><div>Chocolate
    </div><div style="margin-left: auto; color: #455a64">#D2691E</div></div>`,
        label: 'Chocolate #D2691E',
      },
      {
        value: '#FF7F50',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FF7F50"></div><div>Coral
    </div><div style="margin-left: auto; color: #455a64">#FF7F50</div></div>`,
        label: 'Coral #FF7F50',
      },
      {
        value: '#6495ED',
        html: `<div class="color-option"><div class="color-block" style="background-color: #6495ED"></div><div>CornflowerBlue
    </div><div style="margin-left: auto; color: #455a64">#6495ED</div></div>`,
        label: 'CornflowerBlue #6495ED',
      },
      {
        value: '#FFF8DC',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFF8DC"></div><div>Cornsilk
    </div><div style="margin-left: auto; color: #455a64">#FFF8DC</div></div>`,
        label: 'Cornsilk #FFF8DC',
      },
      {
        value: '#DC143C',
        html: `<div class="color-option"><div class="color-block" style="background-color: #DC143C"></div><div>Crimson
    </div><div style="margin-left: auto; color: #455a64">#DC143C</div></div>`,
        label: 'Crimson #DC143C',
      },
      {
        value: '#00FFFF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #00FFFF"></div><div>Cyan
    </div><div style="margin-left: auto; color: #455a64">#00FFFF</div></div>`,
        label: 'Cyan #00FFFF',
      },
      {
        value: '#00008B',
        html: `<div class="color-option"><div class="color-block" style="background-color: #00008B"></div><div>DarkBlue
    </div><div style="margin-left: auto; color: #455a64">#00008B</div></div>`,
        label: 'DarkBlue #00008B',
      },
      {
        value: '#008B8B',
        html: `<div class="color-option"><div class="color-block" style="background-color: #008B8B"></div><div>DarkCyan
    </div><div style="margin-left: auto; color: #455a64">#008B8B</div></div>`,
        label: 'DarkCyan #008B8B',
      },
      {
        value: '#B8860B',
        html: `<div class="color-option"><div class="color-block" style="background-color: #B8860B"></div><div>DarkGoldenRod
    </div><div style="margin-left: auto; color: #455a64">#B8860B</div></div>`,
        label: 'DarkGoldenRod #B8860B',
      },
      {
        value: '#A9A9A9',
        html: `<div class="color-option"><div class="color-block" style="background-color: #A9A9A9"></div><div>DarkGray
    </div><div style="margin-left: auto; color: #455a64">#A9A9A9</div></div>`,
        label: 'DarkGray #A9A9A9',
      },
      {
        value: '#A9A9A9',
        html: `<div class="color-option"><div class="color-block" style="background-color: #A9A9A9"></div><div>DarkGrey
    </div><div style="margin-left: auto; color: #455a64">#A9A9A9</div></div>`,
        label: 'DarkGrey #A9A9A9',
      },
      {
        value: '#006400',
        html: `<div class="color-option"><div class="color-block" style="background-color: #006400"></div><div>DarkGreen
    </div><div style="margin-left: auto; color: #455a64">#006400</div></div>`,
        label: 'DarkGreen #006400',
      },
      {
        value: '#BDB76B',
        html: `<div class="color-option"><div class="color-block" style="background-color: #BDB76B"></div><div>DarkKhaki
    </div><div style="margin-left: auto; color: #455a64">#BDB76B</div></div>`,
        label: 'DarkKhaki #BDB76B',
      },
      {
        value: '#8B008B',
        html: `<div class="color-option"><div class="color-block" style="background-color: #8B008B"></div><div>DarkMagenta
    </div><div style="margin-left: auto; color: #455a64">#8B008B</div></div>`,
        label: 'DarkMagenta #8B008B',
      },
      {
        value: '#556B2F',
        html: `<div class="color-option"><div class="color-block" style="background-color: #556B2F"></div><div>DarkOliveGreen
    </div><div style="margin-left: auto; color: #455a64">#556B2F</div></div>`,
        label: 'DarkOliveGreen #556B2F',
      },
      {
        value: '#FF8C00',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FF8C00"></div><div>DarkOrange
    </div><div style="margin-left: auto; color: #455a64">#FF8C00</div></div>`,
        label: 'DarkOrange #FF8C00',
      },
      {
        value: '#9932CC',
        html: `<div class="color-option"><div class="color-block" style="background-color: #9932CC"></div><div>DarkOrchid
    </div><div style="margin-left: auto; color: #455a64">#9932CC</div></div>`,
        label: 'DarkOrchid #9932CC',
      },
      {
        value: '#8B0000',
        html: `<div class="color-option"><div class="color-block" style="background-color: #8B0000"></div><div>DarkRed
    </div><div style="margin-left: auto; color: #455a64">#8B0000</div></div>`,
        label: 'DarkRed #8B0000',
      },
      {
        value: '#E9967A',
        html: `<div class="color-option"><div class="color-block" style="background-color: #E9967A"></div><div>DarkSalmon
    </div><div style="margin-left: auto; color: #455a64">#E9967A</div></div>`,
        label: 'DarkSalmon #E9967A',
      },
      {
        value: '#8FBC8F',
        html: `<div class="color-option"><div class="color-block" style="background-color: #8FBC8F"></div><div>DarkSeaGreen
    </div><div style="margin-left: auto; color: #455a64">#8FBC8F</div></div>`,
        label: 'DarkSeaGreen #8FBC8F',
      },
      {
        value: '#483D8B',
        html: `<div class="color-option"><div class="color-block" style="background-color: #483D8B"></div><div>DarkSlateBlue
    </div><div style="margin-left: auto; color: #455a64">#483D8B</div></div>`,
        label: 'DarkSlateBlue #483D8B',
      },
      {
        value: '#2F4F4F',
        html: `<div class="color-option"><div class="color-block" style="background-color: #2F4F4F"></div><div>DarkSlateGray
    </div><div style="margin-left: auto; color: #455a64">#2F4F4F</div></div>`,
        label: 'DarkSlateGray #2F4F4F',
      },
      {
        value: '#2F4F4F',
        html: `<div class="color-option"><div class="color-block" style="background-color: #2F4F4F"></div><div>DarkSlateGrey
    </div><div style="margin-left: auto; color: #455a64">#2F4F4F</div></div>`,
        label: 'DarkSlateGrey #2F4F4F',
      },
      {
        value: '#00CED1',
        html: `<div class="color-option"><div class="color-block" style="background-color: #00CED1"></div><div>DarkTurquoise
    </div><div style="margin-left: auto; color: #455a64">#00CED1</div></div>`,
        label: 'DarkTurquoise #00CED1',
      },
      {
        value: '#9400D3',
        html: `<div class="color-option"><div class="color-block" style="background-color: #9400D3"></div><div>DarkViolet
    </div><div style="margin-left: auto; color: #455a64">#9400D3</div></div>`,
        label: 'DarkViolet #9400D3',
      },
      {
        value: '#FF1493',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FF1493"></div><div>DeepPink
    </div><div style="margin-left: auto; color: #455a64">#FF1493</div></div>`,
        label: 'DeepPink #FF1493',
      },
      {
        value: '#00BFFF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #00BFFF"></div><div>DeepSkyBlue
    </div><div style="margin-left: auto; color: #455a64">#00BFFF</div></div>`,
        label: 'DeepSkyBlue #00BFFF',
      },
      {
        value: '#696969',
        html: `<div class="color-option"><div class="color-block" style="background-color: #696969"></div><div>DimGray
    </div><div style="margin-left: auto; color: #455a64">#696969</div></div>`,
        label: 'DimGray #696969',
      },
      {
        value: '#696969',
        html: `<div class="color-option"><div class="color-block" style="background-color: #696969"></div><div>DimGrey
    </div><div style="margin-left: auto; color: #455a64">#696969</div></div>`,
        label: 'DimGrey #696969',
      },
      {
        value: '#1E90FF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #1E90FF"></div><div>DodgerBlue
    </div><div style="margin-left: auto; color: #455a64">#1E90FF</div></div>`,
        label: 'DodgerBlue #1E90FF',
      },
      {
        value: '#B22222',
        html: `<div class="color-option"><div class="color-block" style="background-color: #B22222"></div><div>FireBrick
    </div><div style="margin-left: auto; color: #455a64">#B22222</div></div>`,
        label: 'FireBrick #B22222',
      },
      {
        value: '#FFFAF0',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFFAF0"></div><div>FloralWhite
    </div><div style="margin-left: auto; color: #455a64">#FFFAF0</div></div>`,
        label: 'FloralWhite #FFFAF0',
      },
      {
        value: '#228B22',
        html: `<div class="color-option"><div class="color-block" style="background-color: #228B22"></div><div>ForestGreen
    </div><div style="margin-left: auto; color: #455a64">#228B22</div></div>`,
        label: 'ForestGreen #228B22',
      },
      {
        value: '#FF00FF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FF00FF"></div><div>Fuchsia
    </div><div style="margin-left: auto; color: #455a64">#FF00FF</div></div>`,
        label: 'Fuchsia #FF00FF',
      },
      {
        value: '#DCDCDC',
        html: `<div class="color-option"><div class="color-block" style="background-color: #DCDCDC"></div><div>Gainsboro
    </div><div style="margin-left: auto; color: #455a64">#DCDCDC</div></div>`,
        label: 'Gainsboro #DCDCDC',
      },
      {
        value: '#F8F8FF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #F8F8FF"></div><div>GhostWhite
    </div><div style="margin-left: auto; color: #455a64">#F8F8FF</div></div>`,
        label: 'GhostWhite #F8F8FF',
      },
      {
        value: '#FFD700',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFD700"></div><div>Gold
    </div><div style="margin-left: auto; color: #455a64">#FFD700</div></div>`,
        label: 'Gold #FFD700',
      },
      {
        value: '#DAA520',
        html: `<div class="color-option"><div class="color-block" style="background-color: #DAA520"></div><div>GoldenRod
    </div><div style="margin-left: auto; color: #455a64">#DAA520</div></div>`,
        label: 'GoldenRod #DAA520',
      },
      {
        value: '#808080',
        html: `<div class="color-option"><div class="color-block" style="background-color: #808080"></div><div>Gray
    </div><div style="margin-left: auto; color: #455a64">#808080</div></div>`,
        label: 'Gray #808080',
      },
      {
        value: '#808080',
        html: `<div class="color-option"><div class="color-block" style="background-color: #808080"></div><div>Grey
    </div><div style="margin-left: auto; color: #455a64">#808080</div></div>`,
        label: 'Grey #808080',
      },
      {
        value: '#008000',
        html: `<div class="color-option"><div class="color-block" style="background-color: #008000"></div><div>Green
    </div><div style="margin-left: auto; color: #455a64">#008000</div></div>`,
        label: 'Green #008000',
      },
      {
        value: '#ADFF2F',
        html: `<div class="color-option"><div class="color-block" style="background-color: #ADFF2F"></div><div>GreenYellow
    </div><div style="margin-left: auto; color: #455a64">#ADFF2F</div></div>`,
        label: 'GreenYellow #ADFF2F',
      },
      {
        value: '#F0FFF0',
        html: `<div class="color-option"><div class="color-block" style="background-color: #F0FFF0"></div><div>HoneyDew
    </div><div style="margin-left: auto; color: #455a64">#F0FFF0</div></div>`,
        label: 'HoneyDew #F0FFF0',
      },
      {
        value: '#FF69B4',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FF69B4"></div><div>HotPink
    </div><div style="margin-left: auto; color: #455a64">#FF69B4</div></div>`,
        label: 'HotPink #FF69B4',
      },
      {
        value: '#CD5C5C',
        html: `<div class="color-option"><div class="color-block" style="background-color: #CD5C5C"></div><div>IndianRed
    </div><div style="margin-left: auto; color: #455a64">#CD5C5C</div></div>`,
        label: 'IndianRed #CD5C5C',
      },
      {
        value: '#4B0082',
        html: `<div class="color-option"><div class="color-block" style="background-color: #4B0082"></div><div>Indigo
    </div><div style="margin-left: auto; color: #455a64">#4B0082</div></div>`,
        label: 'Indigo #4B0082',
      },
      {
        value: '#FFFFF0',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFFFF0"></div><div>Ivory
    </div><div style="margin-left: auto; color: #455a64">#FFFFF0</div></div>`,
        label: 'Ivory #FFFFF0',
      },
      {
        value: '#F0E68C',
        html: `<div class="color-option"><div class="color-block" style="background-color: #F0E68C"></div><div>Khaki
    </div><div style="margin-left: auto; color: #455a64">#F0E68C</div></div>`,
        label: 'Khaki #F0E68C',
      },
      {
        value: '#E6E6FA',
        html: `<div class="color-option"><div class="color-block" style="background-color: #E6E6FA"></div><div>Lavender
    </div><div style="margin-left: auto; color: #455a64">#E6E6FA</div></div>`,
        label: 'Lavender #E6E6FA',
      },
      {
        value: '#FFF0F5',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFF0F5"></div><div>LavenderBlush
    </div><div style="margin-left: auto; color: #455a64">#FFF0F5</div></div>`,
        label: 'LavenderBlush #FFF0F5',
      },
      {
        value: '#7CFC00',
        html: `<div class="color-option"><div class="color-block" style="background-color: #7CFC00"></div><div>LawnGreen
    </div><div style="margin-left: auto; color: #455a64">#7CFC00</div></div>`,
        label: 'LawnGreen #7CFC00',
      },
      {
        value: '#FFFACD',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFFACD"></div><div>LemonChiffon
    </div><div style="margin-left: auto; color: #455a64">#FFFACD</div></div>`,
        label: 'LemonChiffon #FFFACD',
      },
      {
        value: '#ADD8E6',
        html: `<div class="color-option"><div class="color-block" style="background-color: #ADD8E6"></div><div>LightBlue
    </div><div style="margin-left: auto; color: #455a64">#ADD8E6</div></div>`,
        label: 'LightBlue #ADD8E6',
      },
      {
        value: '#F08080',
        html: `<div class="color-option"><div class="color-block" style="background-color: #F08080"></div><div>LightCoral
    </div><div style="margin-left: auto; color: #455a64">#F08080</div></div>`,
        label: 'LightCoral #F08080',
      },
      {
        value: '#E0FFFF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #E0FFFF"></div><div>LightCyan
    </div><div style="margin-left: auto; color: #455a64">#E0FFFF</div></div>`,
        label: 'LightCyan #E0FFFF',
      },
      {
        value: '#FAFAD2',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FAFAD2"></div><div>LightGoldenRodYellow
    </div><div style="margin-left: auto; color: #455a64">#FAFAD2</div></div>`,
        label: 'LightGoldenRodYellow #FAFAD2',
      },
      {
        value: '#D3D3D3',
        html: `<div class="color-option"><div class="color-block" style="background-color: #D3D3D3"></div><div>LightGray
    </div><div style="margin-left: auto; color: #455a64">#D3D3D3</div></div>`,
        label: 'LightGray #D3D3D3',
      },
      {
        value: '#D3D3D3',
        html: `<div class="color-option"><div class="color-block" style="background-color: #D3D3D3"></div><div>LightGrey
    </div><div style="margin-left: auto; color: #455a64">#D3D3D3</div></div>`,
        label: 'LightGrey #D3D3D3',
      },
      {
        value: '#90EE90',
        html: `<div class="color-option"><div class="color-block" style="background-color: #90EE90"></div><div>LightGreen
    </div><div style="margin-left: auto; color: #455a64">#90EE90</div></div>`,
        label: 'LightGreen #90EE90',
      },
      {
        value: '#FFB6C1',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFB6C1"></div><div>LightPink
    </div><div style="margin-left: auto; color: #455a64">#FFB6C1</div></div>`,
        label: 'LightPink #FFB6C1',
      },
      {
        value: '#FFA07A',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFA07A"></div><div>LightSalmon
    </div><div style="margin-left: auto; color: #455a64">#FFA07A</div></div>`,
        label: 'LightSalmon #FFA07A',
      },
      {
        value: '#20B2AA',
        html: `<div class="color-option"><div class="color-block" style="background-color: #20B2AA"></div><div>LightSeaGreen
    </div><div style="margin-left: auto; color: #455a64">#20B2AA</div></div>`,
        label: 'LightSeaGreen #20B2AA',
      },
      {
        value: '#87CEFA',
        html: `<div class="color-option"><div class="color-block" style="background-color: #87CEFA"></div><div>LightSkyBlue
    </div><div style="margin-left: auto; color: #455a64">#87CEFA</div></div>`,
        label: 'LightSkyBlue #87CEFA',
      },
      {
        value: '#778899',
        html: `<div class="color-option"><div class="color-block" style="background-color: #778899"></div><div>LightSlateGray
    </div><div style="margin-left: auto; color: #455a64">#778899</div></div>`,
        label: 'LightSlateGray #778899',
      },
      {
        value: '#778899',
        html: `<div class="color-option"><div class="color-block" style="background-color: #778899"></div><div>LightSlateGrey
    </div><div style="margin-left: auto; color: #455a64">#778899</div></div>`,
        label: 'LightSlateGrey #778899',
      },
      {
        value: '#B0C4DE',
        html: `<div class="color-option"><div class="color-block" style="background-color: #B0C4DE"></div><div>LightSteelBlue
    </div><div style="margin-left: auto; color: #455a64">#B0C4DE</div></div>`,
        label: 'LightSteelBlue #B0C4DE',
      },
      {
        value: '#FFFFE0',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFFFE0"></div><div>LightYellow
    </div><div style="margin-left: auto; color: #455a64">#FFFFE0</div></div>`,
        label: 'LightYellow #FFFFE0',
      },
      {
        value: '#00FF00',
        html: `<div class="color-option"><div class="color-block" style="background-color: #00FF00"></div><div>Lime
    </div><div style="margin-left: auto; color: #455a64">#00FF00</div></div>`,
        label: 'Lime #00FF00',
      },
      {
        value: '#32CD32',
        html: `<div class="color-option"><div class="color-block" style="background-color: #32CD32"></div><div>LimeGreen
    </div><div style="margin-left: auto; color: #455a64">#32CD32</div></div>`,
        label: 'LimeGreen #32CD32',
      },
      {
        value: '#FAF0E6',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FAF0E6"></div><div>Linen
    </div><div style="margin-left: auto; color: #455a64">#FAF0E6</div></div>`,
        label: 'Linen #FAF0E6',
      },
      {
        value: '#FF00FF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FF00FF"></div><div>Magenta
    </div><div style="margin-left: auto; color: #455a64">#FF00FF</div></div>`,
        label: 'Magenta #FF00FF',
      },
      {
        value: '#800000',
        html: `<div class="color-option"><div class="color-block" style="background-color: #800000"></div><div>Maroon
    </div><div style="margin-left: auto; color: #455a64">#800000</div></div>`,
        label: 'Maroon #800000',
      },
      {
        value: '#66CDAA',
        html: `<div class="color-option"><div class="color-block" style="background-color: #66CDAA"></div><div>MediumAquaMarine
    </div><div style="margin-left: auto; color: #455a64">#66CDAA</div></div>`,
        label: 'MediumAquaMarine #66CDAA',
      },
      {
        value: '#0000CD',
        html: `<div class="color-option"><div class="color-block" style="background-color: #0000CD"></div><div>MediumBlue
    </div><div style="margin-left: auto; color: #455a64">#0000CD</div></div>`,
        label: 'MediumBlue #0000CD',
      },
      {
        value: '#BA55D3',
        html: `<div class="color-option"><div class="color-block" style="background-color: #BA55D3"></div><div>MediumOrchid
    </div><div style="margin-left: auto; color: #455a64">#BA55D3</div></div>`,
        label: 'MediumOrchid #BA55D3',
      },
      {
        value: '#9370DB',
        html: `<div class="color-option"><div class="color-block" style="background-color: #9370DB"></div><div>MediumPurple
    </div><div style="margin-left: auto; color: #455a64">#9370DB</div></div>`,
        label: 'MediumPurple #9370DB',
      },
      {
        value: '#3CB371',
        html: `<div class="color-option"><div class="color-block" style="background-color: #3CB371"></div><div>MediumSeaGreen
    </div><div style="margin-left: auto; color: #455a64">#3CB371</div></div>`,
        label: 'MediumSeaGreen #3CB371',
      },
      {
        value: '#7B68EE',
        html: `<div class="color-option"><div class="color-block" style="background-color: #7B68EE"></div><div>MediumSlateBlue
    </div><div style="margin-left: auto; color: #455a64">#7B68EE</div></div>`,
        label: 'MediumSlateBlue #7B68EE',
      },
      {
        value: '#00FA9A',
        html: `<div class="color-option"><div class="color-block" style="background-color: #00FA9A"></div><div>MediumSpringGreen
    </div><div style="margin-left: auto; color: #455a64">#00FA9A</div></div>`,
        label: 'MediumSpringGreen #00FA9A',
      },
      {
        value: '#48D1CC',
        html: `<div class="color-option"><div class="color-block" style="background-color: #48D1CC"></div><div>MediumTurquoise
    </div><div style="margin-left: auto; color: #455a64">#48D1CC</div></div>`,
        label: 'MediumTurquoise #48D1CC',
      },
      {
        value: '#C71585',
        html: `<div class="color-option"><div class="color-block" style="background-color: #C71585"></div><div>MediumVioletRed
    </div><div style="margin-left: auto; color: #455a64">#C71585</div></div>`,
        label: 'MediumVioletRed #C71585',
      },
      {
        value: '#191970',
        html: `<div class="color-option"><div class="color-block" style="background-color: #191970"></div><div>MidnightBlue
    </div><div style="margin-left: auto; color: #455a64">#191970</div></div>`,
        label: 'MidnightBlue #191970',
      },
      {
        value: '#F5FFFA',
        html: `<div class="color-option"><div class="color-block" style="background-color: #F5FFFA"></div><div>MintCream
    </div><div style="margin-left: auto; color: #455a64">#F5FFFA</div></div>`,
        label: 'MintCream #F5FFFA',
      },
      {
        value: '#FFE4E1',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFE4E1"></div><div>MistyRose
    </div><div style="margin-left: auto; color: #455a64">#FFE4E1</div></div>`,
        label: 'MistyRose #FFE4E1',
      },
      {
        value: '#FFE4B5',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFE4B5"></div><div>Moccasin
    </div><div style="margin-left: auto; color: #455a64">#FFE4B5</div></div>`,
        label: 'Moccasin #FFE4B5',
      },
      {
        value: '#FFDEAD',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFDEAD"></div><div>NavajoWhite
    </div><div style="margin-left: auto; color: #455a64">#FFDEAD</div></div>`,
        label: 'NavajoWhite #FFDEAD',
      },
      {
        value: '#000080',
        html: `<div class="color-option"><div class="color-block" style="background-color: #000080"></div><div>Navy
    </div><div style="margin-left: auto; color: #455a64">#000080</div></div>`,
        label: 'Navy #000080',
      },
      {
        value: '#FDF5E6',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FDF5E6"></div><div>OldLace
    </div><div style="margin-left: auto; color: #455a64">#FDF5E6</div></div>`,
        label: 'OldLace #FDF5E6',
      },
      {
        value: '#808000',
        html: `<div class="color-option"><div class="color-block" style="background-color: #808000"></div><div>Olive
    </div><div style="margin-left: auto; color: #455a64">#808000</div></div>`,
        label: 'Olive #808000',
      },
      {
        value: '#6B8E23',
        html: `<div class="color-option"><div class="color-block" style="background-color: #6B8E23"></div><div>OliveDrab
    </div><div style="margin-left: auto; color: #455a64">#6B8E23</div></div>`,
        label: 'OliveDrab #6B8E23',
      },
      {
        value: '#FFA500',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFA500"></div><div>Orange
    </div><div style="margin-left: auto; color: #455a64">#FFA500</div></div>`,
        label: 'Orange #FFA500',
      },
      {
        value: '#FF4500',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FF4500"></div><div>OrangeRed
    </div><div style="margin-left: auto; color: #455a64">#FF4500</div></div>`,
        label: 'OrangeRed #FF4500',
      },
      {
        value: '#DA70D6',
        html: `<div class="color-option"><div class="color-block" style="background-color: #DA70D6"></div><div>Orchid
    </div><div style="margin-left: auto; color: #455a64">#DA70D6</div></div>`,
        label: 'Orchid #DA70D6',
      },
      {
        value: '#EEE8AA',
        html: `<div class="color-option"><div class="color-block" style="background-color: #EEE8AA"></div><div>PaleGoldenRod
    </div><div style="margin-left: auto; color: #455a64">#EEE8AA</div></div>`,
        label: 'PaleGoldenRod #EEE8AA',
      },
      {
        value: '#98FB98',
        html: `<div class="color-option"><div class="color-block" style="background-color: #98FB98"></div><div>PaleGreen
    </div><div style="margin-left: auto; color: #455a64">#98FB98</div></div>`,
        label: 'PaleGreen #98FB98',
      },
      {
        value: '#AFEEEE',
        html: `<div class="color-option"><div class="color-block" style="background-color: #AFEEEE"></div><div>PaleTurquoise
    </div><div style="margin-left: auto; color: #455a64">#AFEEEE</div></div>`,
        label: 'PaleTurquoise #AFEEEE',
      },
      {
        value: '#DB7093',
        html: `<div class="color-option"><div class="color-block" style="background-color: #DB7093"></div><div>PaleVioletRed
    </div><div style="margin-left: auto; color: #455a64">#DB7093</div></div>`,
        label: 'PaleVioletRed #DB7093',
      },
      {
        value: '#FFEFD5',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFEFD5"></div><div>PapayaWhip
    </div><div style="margin-left: auto; color: #455a64">#FFEFD5</div></div>`,
        label: 'PapayaWhip #FFEFD5',
      },
      {
        value: '#FFDAB9',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFDAB9"></div><div>PeachPuff
    </div><div style="margin-left: auto; color: #455a64">#FFDAB9</div></div>`,
        label: 'PeachPuff #FFDAB9',
      },
      {
        value: '#CD853F',
        html: `<div class="color-option"><div class="color-block" style="background-color: #CD853F"></div><div>Peru
    </div><div style="margin-left: auto; color: #455a64">#CD853F</div></div>`,
        label: 'Peru #CD853F',
      },
      {
        value: '#FFC0CB',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFC0CB"></div><div>Pink
    </div><div style="margin-left: auto; color: #455a64">#FFC0CB</div></div>`,
        label: 'Pink #FFC0CB',
      },
      {
        value: '#DDA0DD',
        html: `<div class="color-option"><div class="color-block" style="background-color: #DDA0DD"></div><div>Plum
    </div><div style="margin-left: auto; color: #455a64">#DDA0DD</div></div>`,
        label: 'Plum #DDA0DD',
      },
      {
        value: '#B0E0E6',
        html: `<div class="color-option"><div class="color-block" style="background-color: #B0E0E6"></div><div>PowderBlue
    </div><div style="margin-left: auto; color: #455a64">#B0E0E6</div></div>`,
        label: 'PowderBlue #B0E0E6',
      },
      {
        value: '#800080',
        html: `<div class="color-option"><div class="color-block" style="background-color: #800080"></div><div>Purple
    </div><div style="margin-left: auto; color: #455a64">#800080</div></div>`,
        label: 'Purple #800080',
      },
      {
        value: '#663399',
        html: `<div class="color-option"><div class="color-block" style="background-color: #663399"></div><div>RebeccaPurple
    </div><div style="margin-left: auto; color: #455a64">#663399</div></div>`,
        label: 'RebeccaPurple #663399',
      },
      {
        value: '#FF0000',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FF0000"></div><div>Red
    </div><div style="margin-left: auto; color: #455a64">#FF0000</div></div>`,
        label: 'Red #FF0000',
      },
      {
        value: '#BC8F8F',
        html: `<div class="color-option"><div class="color-block" style="background-color: #BC8F8F"></div><div>RosyBrown
    </div><div style="margin-left: auto; color: #455a64">#BC8F8F</div></div>`,
        label: 'RosyBrown #BC8F8F',
      },
      {
        value: '#4169E1',
        html: `<div class="color-option"><div class="color-block" style="background-color: #4169E1"></div><div>RoyalBlue
    </div><div style="margin-left: auto; color: #455a64">#4169E1</div></div>`,
        label: 'RoyalBlue #4169E1',
      },
      {
        value: '#8B4513',
        html: `<div class="color-option"><div class="color-block" style="background-color: #8B4513"></div><div>SaddleBrown
    </div><div style="margin-left: auto; color: #455a64">#8B4513</div></div>`,
        label: 'SaddleBrown #8B4513',
      },
      {
        value: '#FA8072',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FA8072"></div><div>Salmon
    </div><div style="margin-left: auto; color: #455a64">#FA8072</div></div>`,
        label: 'Salmon #FA8072',
      },
      {
        value: '#F4A460',
        html: `<div class="color-option"><div class="color-block" style="background-color: #F4A460"></div><div>SandyBrown
    </div><div style="margin-left: auto; color: #455a64">#F4A460</div></div>`,
        label: 'SandyBrown #F4A460',
      },
      {
        value: '#2E8B57',
        html: `<div class="color-option"><div class="color-block" style="background-color: #2E8B57"></div><div>SeaGreen
    </div><div style="margin-left: auto; color: #455a64">#2E8B57</div></div>`,
        label: 'SeaGreen #2E8B57',
      },
      {
        value: '#FFF5EE',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFF5EE"></div><div>SeaShell
    </div><div style="margin-left: auto; color: #455a64">#FFF5EE</div></div>`,
        label: 'SeaShell #FFF5EE',
      },
      {
        value: '#A0522D',
        html: `<div class="color-option"><div class="color-block" style="background-color: #A0522D"></div><div>Sienna
    </div><div style="margin-left: auto; color: #455a64">#A0522D</div></div>`,
        label: 'Sienna #A0522D',
      },
      {
        value: '#C0C0C0',
        html: `<div class="color-option"><div class="color-block" style="background-color: #C0C0C0"></div><div>Silver
    </div><div style="margin-left: auto; color: #455a64">#C0C0C0</div></div>`,
        label: 'Silver #C0C0C0',
      },
      {
        value: '#87CEEB',
        html: `<div class="color-option"><div class="color-block" style="background-color: #87CEEB"></div><div>SkyBlue
    </div><div style="margin-left: auto; color: #455a64">#87CEEB</div></div>`,
        label: 'SkyBlue #87CEEB',
      },
      {
        value: '#6A5ACD',
        html: `<div class="color-option"><div class="color-block" style="background-color: #6A5ACD"></div><div>SlateBlue
    </div><div style="margin-left: auto; color: #455a64">#6A5ACD</div></div>`,
        label: 'SlateBlue #6A5ACD',
      },
      {
        value: '#708090',
        html: `<div class="color-option"><div class="color-block" style="background-color: #708090"></div><div>SlateGray
    </div><div style="margin-left: auto; color: #455a64">#708090</div></div>`,
        label: 'SlateGray #708090',
      },
      {
        value: '#708090',
        html: `<div class="color-option"><div class="color-block" style="background-color: #708090"></div><div>SlateGrey
    </div><div style="margin-left: auto; color: #455a64">#708090</div></div>`,
        label: 'SlateGrey #708090',
      },
      {
        value: '#FFFAFA',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFFAFA"></div><div>Snow
    </div><div style="margin-left: auto; color: #455a64">#FFFAFA</div></div>`,
        label: 'Snow #FFFAFA',
      },
      {
        value: '#00FF7F',
        html: `<div class="color-option"><div class="color-block" style="background-color: #00FF7F"></div><div>SpringGreen
    </div><div style="margin-left: auto; color: #455a64">#00FF7F</div></div>`,
        label: 'SpringGreen #00FF7F',
      },
      {
        value: '#4682B4',
        html: `<div class="color-option"><div class="color-block" style="background-color: #4682B4"></div><div>SteelBlue
    </div><div style="margin-left: auto; color: #455a64">#4682B4</div></div>`,
        label: 'SteelBlue #4682B4',
      },
      {
        value: '#D2B48C',
        html: `<div class="color-option"><div class="color-block" style="background-color: #D2B48C"></div><div>Tan
    </div><div style="margin-left: auto; color: #455a64">#D2B48C</div></div>`,
        label: 'Tan #D2B48C',
      },
      {
        value: '#008080',
        html: `<div class="color-option"><div class="color-block" style="background-color: #008080"></div><div>Teal
    </div><div style="margin-left: auto; color: #455a64">#008080</div></div>`,
        label: 'Teal #008080',
      },
      {
        value: '#D8BFD8',
        html: `<div class="color-option"><div class="color-block" style="background-color: #D8BFD8"></div><div>Thistle
    </div><div style="margin-left: auto; color: #455a64">#D8BFD8</div></div>`,
        label: 'Thistle #D8BFD8',
      },
      {
        value: '#FF6347',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FF6347"></div><div>Tomato
    </div><div style="margin-left: auto; color: #455a64">#FF6347</div></div>`,
        label: 'Tomato #FF6347',
      },
      {
        value: '#40E0D0',
        html: `<div class="color-option"><div class="color-block" style="background-color: #40E0D0"></div><div>Turquoise
    </div><div style="margin-left: auto; color: #455a64">#40E0D0</div></div>`,
        label: 'Turquoise #40E0D0',
      },
      {
        value: '#EE82EE',
        html: `<div class="color-option"><div class="color-block" style="background-color: #EE82EE"></div><div>Violet
    </div><div style="margin-left: auto; color: #455a64">#EE82EE</div></div>`,
        label: 'Violet #EE82EE',
      },
      {
        value: '#F5DEB3',
        html: `<div class="color-option"><div class="color-block" style="background-color: #F5DEB3"></div><div>Wheat
    </div><div style="margin-left: auto; color: #455a64">#F5DEB3</div></div>`,
        label: 'Wheat #F5DEB3',
      },
      {
        value: '#FFFFFF',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFFFFF"></div><div>White
    </div><div style="margin-left: auto; color: #455a64">#FFFFFF</div></div>`,
        label: 'White #FFFFFF',
      },
      {
        value: '#F5F5F5',
        html: `<div class="color-option"><div class="color-block" style="background-color: #F5F5F5"></div><div>WhiteSmoke
    </div><div style="margin-left: auto; color: #455a64">#F5F5F5</div></div>`,
        label: 'WhiteSmoke #F5F5F5',
      },
      {
        value: '#FFFF00',
        html: `<div class="color-option"><div class="color-block" style="background-color: #FFFF00"></div><div>Yellow
    </div><div style="margin-left: auto; color: #455a64">#FFFF00</div></div>`,
        label: 'Yellow #FFFF00',
      },
      {
        value: '#9ACD32',
        html: `<div class="color-option"><div class="color-block" style="background-color: #9ACD32"></div><div>YellowGreen
    </div><div style="margin-left: auto; color: #455a64">#9ACD32</div></div>`,
        label: 'YellowGreen #9ACD32',
      },
    ];

    renderOptions(options);

    /**
     * When value of the demo changes we filter the objects
     */
    input1.addEventListener('input', (e) => {
      e.preventDefault();
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(input1.value.toLowerCase())
      );
      renderOptions(filteredOptions);
    });

    /**
     * When the demo is selected (focused) we filter the objects
     */
    input1.addEventListener('focus', (e) => {
      e.preventDefault();
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(input1.value.toLowerCase())
      );
      renderOptions(filteredOptions);
    });

    /**
     * When a selection occurs we filter the objects
     */
    input1autocomplete.addEventListener(
      'eck-autocomplete-option-selected',
      (e) => {
        e.preventDefault();
        const filteredOptions = options.filter((option) =>
          option.label.toLowerCase().includes(input1.value.toLowerCase())
        );
        renderOptions(filteredOptions);
      }
    );
  },
};
</script>
