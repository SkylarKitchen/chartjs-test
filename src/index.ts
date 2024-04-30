import Chart from 'chart.js/auto';

window.Webflow ||= [];
window.Webflow.push(async () => {
  // Latest batch data
  (async function () {
    const data = [
      { year: 'Wix', count: 1 },
      { year: 'Squarespace', count: 4 },
      { year: 'Framer', count: 16.2 },
      { year: 'custom', count: 22.2 },
      { year: 'NextJs', count: 25.3 },
      { year: 'Webflow', count: 31.3 },
    ];

    // Chart 1
    const ctx1 = document.querySelector<HTMLCanvasElement>('[data-element="chart-1"]');
    if (!ctx1) return;

    const launches = await fetchLaunches();

    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: launches.map((row) => row.framework),
        datasets: [
          {
            label: 'Percentage',
            data: launches.map((row) => row.percentage),
            backgroundColor: ['#001535', '#002A6A', '#00409F', '#0055D4', '#146EF5', '#3B89FF'],
            borderColor: '#001535',
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            xAlign: 'center',
            yAlign: 'bottom',
            backgroundColor: '#363636',
          },
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => {
                return `${value}%`;
              },
            },
          },
        },
      },
    });

    // Chart 2
    const ctx2 = document.querySelector<HTMLCanvasElement>('[data-element="chart-2"]');
    if (!ctx2) return;

    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            data: data.map((row) => row.count),
            backgroundColor: ['#001535', '#002A6A', '#00409F', '#0055D4', '#146EF5', '#3B89FF'],
            borderColor: '#001535',
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            xAlign: 'center',
            yAlign: 'bottom',
            backgroundColor: '#363636',
          },
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => {
                return `${value}%`;
              },
            },
          },
        },
      },
    });

    // Chart 3
    const ctx3 = document.querySelector<HTMLCanvasElement>('[data-element="chart-3"]');
    if (!ctx3) return;

    new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            data: data.map((row) => row.count),
            backgroundColor: ['#001535', '#002A6A', '#00409F', '#0055D4', '#146EF5', '#3B89FF'],
            borderWidth: 0,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 20,
            },
          },
        },
      },
    });
  })();
});

const fetchLaunches = async () => {
  const response = await fetch('/launches');
  const html = await response.text();

  const parser = new DOMParser();
  const page = parser.parseFromString(html, 'text/html');

  const scripts = page.querySelectorAll('script[type="application/json"]');
  const launches: Array<{ framework: string; percentage: number }> = [...scripts].map((script) =>
    JSON.parse(script.textContent!)
  );

  return launches;
};
