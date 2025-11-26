// ==============================
// Helper to select elements
// ==============================
const $ = (selector) => document.querySelector(selector);

// ==============================
// BMI helpers
// ==============================
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

  let message = `Your BMI is ${bmi.toFixed(
    1
  )}, which places you in the “${category}” category. `;

  // Category-based info
  if (category === "Underweight") {
    message +=
      "This may indicate that you are below a typical healthy weight range. ";
  } else if (category === "Healthy") {
    message += "This is generally considered a healthy weight range. ";
  } else if (category === "Overweight") {
    message +=
      "This means you may benefit from small, sustainable lifestyle adjustments. ";
  } else {
    message +=
      "This suggests a higher risk category. Gentle, long-term changes may help. ";
  }

  // Gender-specific context (optional field)
  if (gender === "female") {
    message +=
      "For women, BMI categories can be influenced by body composition, muscle mass, and hormonal changes. ";
  } else if (gender === "male") {
    message +=
      "For men, BMI may underestimate body fat if muscle mass is low and overestimate it if muscle mass is high. ";
  } else if (gender === "nonbinary") {
    message +=
      "BMI categories are based on older binary systems and may not fully reflect everyone’s body. ";
  } else if (gender === "other") {
    message +=
      "BMI is a rough tool and may not fully reflect your individual body type. ";
  }

  // Activity-based suggestions
  if (activity === "low") {
    message +=
      "Since you selected a low activity level, starting with light daily movement, such as 10–15 minute walks or gentle stretching, can be a kind first step. ";
  } else if (activity === "moderate") {
    message +=
      "With a moderate activity level, you might slowly add duration or one extra workout day to support your goals. ";
  } else if (activity === "high") {
    message +=
      "Because you’re already active, balancing movement with rest, recovery, and nutrition can help you feel your best. ";
  }

  message +=
    "If you have questions or health concerns, consider checking in with a doctor or other health professional for personalized guidance.";

  return message;
}

// ==============================
// Form handler
// ==============================
function handleBMIForm(event) {
  event.preventDefault();

  const heightInput = $("#height");
  const weightInput = $("#weight");
  const activitySelect = $("#activity");
  const genderSelect = $("#gender");

  const bmiValueEl = $("#bmi-value");
  const bmiCategoryEl = $("#bmi-category");
  const bmiMessageEl = $("#bmi-message");

  const heightCm = parseFloat(heightInput.value);
  const weightKg = parseFloat(weightInput.value);
  const activity = activitySelect.value;
  const gender = genderSelect ? genderSelect.value : "";

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
  bmiMessageEl.textContent = getMessage(bmi, category, activity, gender);
}

// ==============================
// Footer year
// ==============================
function setYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// ==============================
// Init
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bmi-form");
  if (form) {
    form.addEventListener("submit", handleBMIForm);
  }
  setYear();
});
