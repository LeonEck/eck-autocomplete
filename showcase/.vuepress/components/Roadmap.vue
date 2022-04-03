<template>
  <div class="roadmap">
    <div class="roadmap-entry">
      <div class="roadmap-entry-headline">
        <div class="roadmap-entry-headline-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M414.11 153.82C429.66 264.4 345.85 357.09 282.54 366s-169.48-57.5-185-167.68a159.82 159.82 0 11316.53-44.49z"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="32"
            />
            <path
              d="M236.06 308.05c-32.83-13-67.08-43.1-82.27-85.46M367.7 495.78c-32.83-13-63.31-40.06-78.5-82.41"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="32"
            />
            <path
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M266.71 368.21l-9.17 49.61 63.31-8.9-22.49-45.16-31.65 4.45z"
            />
          </svg>
        </div>
        <div>Roadmap to first stable release</div>
      </div>
      <div class="roadmap-entry-content">
        <ul>
          <li>Feature parity with other autocomplete implementations.</li>
          <li>Theming through custom properties.</li>
          <li>All behavior covered by E2E and unit tests.</li>
          <li>More documentation and examples on this showcase.</li>
          <li>IDE "IntelliSense" Support.</li>
          <li>Angular facade.</li>
          <li>Accessibility.</li>
          <li>Pre-built themes.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.roadmap {
  position: relative;
  display: flex;
  justify-content: center;
}

.roadmap-entry {
  position: relative;
  padding: 15px 0 0 0;
}
.roadmap-entry::before {
  background-color: #ccd;
  border-radius: 1em;
  bottom: 0;
  content: '';
  display: block;
  height: 100%;
  left: 19px;
  position: absolute;
  top: 0;
  width: 4px;
}

.roadmap-entry-headline {
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  line-height: 1.6rem;
  margin-left: 2px;
  gap: 10px;
  font-weight: 600;
}

.roadmap-entry-headline-logo {
  display: inline-flex;
  background-image: linear-gradient(to bottom, #6ee7b7, #6e9ae7);
  border-radius: 1.4rem;
  padding: 8px;
  z-index: 2;
}
.roadmap-entry-headline-logo svg {
  height: 1.4rem;
  width: 1.4rem;
}

.roadmap-entry-content {
  margin-left: 50px;
}
.roadmap-entry-content ul {
  margin: 0;
  padding-inline-start: 20px;
}
</style>
