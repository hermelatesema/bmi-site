// Helper to select elements
const $ = (selector) => document.querySelector(selector);

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function getMessage(bmi, category, activity, gender) {
  if (!bmi || isNaN(bmi)) {
    return "Fill out the form above and click “Calculate BMI” to see your result.";
  }

  let message = `Your BMI is ${bmi.toFixed(1)}, which places you in the “${category}” category. `;

  // Category-based info
  if (category === "Underweight") {
    message += "This may indicate that you are below a typical healthy weight range. ";
  } else if (category === "Healthy") {
    message += "This is generally considered a healthy weight range. ";
  } else if (category === "Overweight") {
    message += "This means you may benefit from small, sustainable lifestyle adjustments. ";
  } else {
    message += "This suggests a higher risk category. Gentle, long-term changes may help. ";
  }

  // Gender-specific context
  if (gender === "female") {
    message += "For women, BMI categories can sometimes shift depending on muscle mass, hormonal cycles, and body composition. ";
  } else if (gender === "male") {
    message += "For men, BMI may underestimate fat levels if muscle mass is low. ";
  } else if (gender === "nonbinary") {
    message += "BMI categories are based on older binary systems and may not reflect everyone’s body accurately. ";
  }

  // Activity-based suggestions
  if (activity === "low") {
    message += "Starting with light daily movement, such as 10–15 minute walks, can help. ";
  } else if (activity === "moderate") {
    message += "Adding small increases in movement or strength training may be helpful. ";
  } else if (activity === "high") {
    message += "Maintaining balanced workouts with recovery days is important. ";
  }

  return message;
}


function handleBMIForm(event) {
  event.preventDefault();

  const heightInput = $("#height");
  const weightInput = $("#weight");
  const activitySelect = $("#activity");
  const bmiValueEl = $("#bmi-value");
  const bmiCategoryEl = $("#bmi-category");
  const bmiMessageEl = $("#bmi-message");

  const heightCm = parseFloat(heightInput.value);
  const weightKg = parseFloat(weightInput.value);
  const activity = activitySelect.value;

  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    bmiValueEl.textContent = "--";
    bmiCategoryEl.textContent = "Please enter valid numbers";
    bmiMessageEl.textContent =
      "Height and weight must be greater than zero. Check your values and try again.";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const category = getBMICategory(bmi);

  bmiValueEl.textContent = bmi.toFixed(1);
  bmiCategoryEl.textContent = category;
  bmiMessageEl.textContent = getMessage(bmi, category, activity);
}

// Set current year in footer
function setYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bmi-form");
  if (form) {
    form.addEventListener("submit", handleBMIForm);
  }
  setYear();
});
