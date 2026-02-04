(function initGridOverlay() {
  const gridOverlay = document.getElementById('gridOverlay');
  if (!gridOverlay) return;

  const columns = getComputedStyle(document.documentElement)
    .getPropertyValue('--grid-columns')
    .trim();

  for (let i = 0; i < parseInt(columns); i++) {
    const column = document.createElement('div');
    column.className = 'grid-column';
    gridOverlay.appendChild(column);
  }
})();