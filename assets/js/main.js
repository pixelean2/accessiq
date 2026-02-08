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
      borderWidth: 0,
      borderRadius: 8,
      spacing: 6,
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



