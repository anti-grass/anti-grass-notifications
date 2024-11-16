document.getElementById('start-button').addEventListener('click', () => {
    const preset = document.getElementById('preset-dropdown').value;
    const frequency = parseInt(document.getElementById('frequency-dropdown').value, 10);
  
    if (preset && frequency) {
      window.electronAPI.startNotifications({ preset, frequency });
    } else {
      alert('Please select both a preset and a frequency.');
    }
  });
  