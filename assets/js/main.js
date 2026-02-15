
document.addEventListener('DOMContentLoaded', function () {

  const buttons = document.querySelectorAll('.notification-tab-button button');
  const contents = document.querySelectorAll('.notification-tab-content');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const tagid = this.dataset.tag;

      // remove active from all buttons
      buttons.forEach(btn => btn.classList.remove('active'));

      // remove current from all contents
      contents.forEach(content => content.classList.remove('current'));

      // add active to clicked button
      this.classList.add('active');

      // show matched content
      const target = document.getElementById(tagid);
      if (target) {
        target.classList.add('current');
      }
    });
  });

});




document.addEventListener('DOMContentLoaded', function () {
  const accordionBtn = document.querySelector('.subscription-accordion1');
  const accordionContent = document.querySelector('.accordion-des1');
  accordionContent.style.height = accordionContent.scrollHeight + 'px';
  accordionContent.style.overflow = 'hidden';
  accordionContent.style.transition = 'height 0.3s ease';

  accordionBtn.addEventListener('click', function () {
    if (accordionContent.style.height !== '0px') {
      
      accordionContent.style.height = '0px';
    } else {
      
      accordionContent.style.height = accordionContent.scrollHeight + 'px';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const accordionBtn2 = document.querySelector('.subscription-accordion2');
  const accordionContent2 = document.querySelector('.accordion-des2');
  accordionContent2.style.height = accordionContent2.scrollHeight + 'px';
  accordionContent2.style.overflow = 'hidden';
  accordionContent2.style.transition = 'height 0.3s ease';

  accordionBtn2.addEventListener('click', function () {
    if (accordionContent2.style.height !== '0px') {
      
      accordionContent2.style.height = '0px';
    } else {
      
      accordionContent2.style.height = accordionContent2.scrollHeight + 'px';
    }
  });
});

document.addEventListener('DOMContentLoaded', function(){
  const nextBtns = document.querySelectorAll(".nextBtn");
  const backBtn = document.querySelector(".login-back-button-inner");
  const titleEl = document.querySelector(".login-card-title");
  const descEl = document.querySelector(".login-card-des p");
  const form = document.querySelector(".login-form form");
  const successModal = document.getElementById("sucessModal");

  // Step change function
  function showStep(stepId) {
    const steps = document.querySelectorAll(".step");
    steps.forEach(s => s.classList.remove("active"));
    const step = document.getElementById(stepId);
    step.classList.add("active");

    if(stepId === "step1") {
      titleEl.textContent = "Forgot Password";
      descEl.textContent = "Enter your registered email address to get OTP";
    } else if(stepId === "step2") {
      titleEl.textContent = "Enter OTP";
      descEl.textContent = "We have sent 6 digit OTP to your registered email";
    } else if(stepId === "step3") {
      titleEl.textContent = "Reset Password";
      descEl.textContent = "Password must be different from previously used passwords.";
    }
  }

  // Next buttons
  nextBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const currentStep = btn.closest(".step");

      // Built-in required validation
      const inputs = currentStep.querySelectorAll("input[required]");
      for(let input of inputs) {
        if(!input.checkValidity()) {
          input.reportValidity();
          return;
        }
      }

      // OTP validation for step2
      if(currentStep.id === "step2") {
        const otpInputs = currentStep.querySelectorAll(".otp-input");
        for(let otpInput of otpInputs) {
          if(!otpInput.value.trim()) {
            alert("Please enter the complete OTP.");
            otpInput.focus();
            return;
          }
        }
      }

      const nextStep = currentStep.nextElementSibling;
      if(nextStep && nextStep.classList.contains("step")) {
        showStep(nextStep.id);
      }
    });
  });

  // Back button
  backBtn.addEventListener("click", function(e) {
    e.preventDefault();
    const currentStep = document.querySelector(".step.active");
    const prevStep = currentStep.previousElementSibling;
    if(prevStep && prevStep.classList.contains("step")) {
      showStep(prevStep.id);
    }
  });

  // OTP auto-focus & number-only
  const otpInputs = document.querySelectorAll(".otp-input");
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const value = e.target.value;
      if(value.length > 0 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if(e.key === "Backspace" && input.value === "" && index > 0) {
        otpInputs[index - 1].focus();
      }
    });

    input.addEventListener("keypress", (e) => {
      if(!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    });
  });

  // Form submission
  form.addEventListener("submit", function(e) {
    e.preventDefault(); 

    const pwd1 = form.querySelector("input[name='password1']").value.trim();
    const pwd2 = form.querySelector("input[name='password2']").value.trim();

    if(pwd1 === "" || pwd2 === "") {
      alert("Please fill in both password fields.");
      return;
    }

    if(pwd1 !== pwd2) {
      alert("Passwords do not match.");
      return;
    }

    if(pwd1.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    // Show success modal
    successModal.style.display = "flex";
  });

});


document.addEventListener('DOMContentLoaded', function() {
  // সব password input wrapper খুঁজে বের করি
  const passwordWrappers = document.querySelectorAll('.input-filed.password');

  passwordWrappers.forEach(wrapper => {
    const input = wrapper.querySelector('input');
    const toggleBtn = wrapper.querySelector('.toggle-password');
    const icons = toggleBtn.querySelectorAll('img'); // প্রথম img = password icon, দ্বিতীয় img = eye icon

    toggleBtn.addEventListener('click', () => {
      // যদি টাইপ password হয়, text করি, না হলে password করি
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      // icon visibility toggle
      icons[0].style.display = isPassword ? 'none' : 'inline-block'; // password icon
      icons[1].style.display = isPassword ? 'inline-block' : 'none'; // eye icon
    });
  });
});






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

      cutout: '70%',
      hoverBorderColor: '#fff'
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
          ticks: {
            stepSize: 10
          },
          grid: {
            display: true,
            color: '#F0F0F4',
            lineWidth: 1.5,
            borderDash: [8, 4],
            drawBorder: false
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




  










