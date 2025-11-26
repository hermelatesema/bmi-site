// Helper to select elements
const $ = (selector) => document.querySelector(selector);

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function getMessage(bmi, category, activity) {
  if (!bmi || isNaN(bmi)) {
    return "Fill out the form above and click “Calculate BMI” to see your result.";
  }

  let base = `Your BMI is ${bmi.toFixed(
    1
  )}, which falls in the “${category}” range. `;
  let tip = "";

  if (category === "Underweight") {
    tip =
      "If you're concerned, consider talking with a health professional about gentle ways to support your body.";
  } else if (category === "Healthy") {
    tip = "This is generally considered a healthy range. Keep focusing on habits that make you feel good.";
  } else if (category === "Overweight") {
    tip =
      "Small, steady changes in movement and nutrition can have a positive impact over time.";
  } else {
    tip =
      "You might benefit from checking in with a doctor to build a plan that feels safe and realistic for you.";
  }

  if (activity === "low") {
    tip += " You selected a low activity level, so starting with short walks or light stretching can help.";
  } else if (activity === "moderate") {
    tip += " With a moderate activity level, you could gently add a bit more movement each week.";
  } else if (activity === "high") {
    tip += " Since you're already active, focus on rest, recovery, and balanced routines.";
  }

  return base + tip;
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
