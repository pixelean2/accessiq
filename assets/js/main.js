const ctx = document.getElementById('complianceChart').getContext('2d');


const complianceData = {
  weekly: [65, 25, 10],
  monthly: [80, 15, 5]
};

const labels = ['Compliant', 'Nearly Compliant', 'Non-Compliant'];


const complianceChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: labels,
    datasets: [{
      data: complianceData.weekly, 
      backgroundColor: ['#1EA5DB', '#FF9C12', '#FC7E7E'],
      borderWidth: 6,
      borderColor: '#fff',
      borderRadius: 8,
      spacing: 0,
      cutout: '70%'
    }]
  },
  options: {
    responsive: true,
    rotation: -140,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: 'nearest',      
        intersect: true,      
        position: 'nearest',
        callbacks: {
          label: function(context) {
            const index = context.dataIndex;
            const value = context.dataset.data[index];
            const label = context.chart.data.labels[index];
            return `${label} ${value}%`;
          }
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    }
  }
});


const compliantEl = document.getElementById('compliantVal');
const nearlyEl = document.getElementById('nearlyVal');
const nonEl = document.getElementById('nonVal');


function updateLabels(dataArray) {
  compliantEl.textContent = dataArray[0] + '%';
  nearlyEl.textContent = dataArray[1] + '%';
  nonEl.textContent = dataArray[2] + '%';
}


updateLabels(complianceData.weekly);


const dropdown = document.getElementById('timeRange');
dropdown.addEventListener('change', function () {
  const selected = this.value; // weekly or monthly
  const newData = complianceData[selected];


  complianceChart.data.datasets[0].data = newData;
  complianceChart.update();

  updateLabels(newData);
});



const ctx2 = document.getElementById('complianceChart2').getContext('2d');

  // Yearly and Monthly Data
  const yearlyData = [82, 91, 97, 76, 84, 72, 93, 90, 97, 82, 91, 96];
  const monthlyData = [88, 92, 85, 90];

  const labelsYearly = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const labelsMonthly = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  // Gradients
  const normalGradient = ctx2.createLinearGradient(0, 0, 0, 400);
  normalGradient.addColorStop(0, '#C5EAF5'); 
  normalGradient.addColorStop(1, '#E5F7FD'); 

  const hoverGradient = ctx2.createLinearGradient(0, 0, 0, 400);
  hoverGradient.addColorStop(0, '#51CCF0'); 
  hoverGradient.addColorStop(1, '#00A8E0'); 

  // Chart
  const barChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: labelsYearly,
      datasets: [{
        data: yearlyData,
        backgroundColor: ctx => ctx.active ? hoverGradient : normalGradient,
        borderRadius: 10,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      },
      animations: {
        y: {
          from: ctx => ctx.chart.scales.y.getPixelForValue(0)
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: false, // disable default tooltip
          external: function(context) {
            const tooltipEl = document.getElementById('chart-tooltip');
            if (!tooltipEl) return;

            const tooltipModel = context.tooltip;

            // Hide tooltip if not visible
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            // Set content (label + score)
            if (tooltipModel.dataPoints && tooltipModel.dataPoints.length) {
              const label = tooltipModel.dataPoints[0].label;
              const value = tooltipModel.dataPoints[0].raw;
              tooltipEl.innerHTML = `
                <div class="label">${label}</div>
                <div class="score">Score: ${value}</div>
              `;
            }

            // Position tooltip above the hovered bar, centered horizontally
            const canvasRect = context.chart.canvas.getBoundingClientRect();
            const left = canvasRect.left + window.pageXOffset + tooltipModel.caretX;
            const top = canvasRect.top + window.pageYOffset + tooltipModel.caretY - 50; // 50px above bar

            tooltipEl.style.left = left + 'px';
            tooltipEl.style.top = top + 'px';
            tooltipEl.style.opacity = 1;
          }
        }
      },
      scales: {
        y: {
          min: 60,
          max: 100,
          grid: {
            borderDash: [5,5],
            color: '#F0F0F4'
          }
        },
        x: {
          grid: { display: false }
        }
      },
      hover: { mode: 'nearest', intersect: true }
    }
  });

  // Toggle Yearly/Monthly
  document.getElementById('timeRange2').addEventListener('change', (e) => {
    if (e.target.value === 'monthly') {
      barChart.data.labels = labelsMonthly;
      barChart.data.datasets[0].data = monthlyData;
    } else {
      barChart.data.labels = labelsYearly;
      barChart.data.datasets[0].data = yearlyData;
    }
    barChart.update();
  });










