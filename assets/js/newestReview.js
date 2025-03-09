import { reviews } from "./reviewsData.js";
import { generateStars } from "./othersReview.js";

reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

let currentIndex = 0;

function displayReview(index) {
  const review = reviews[index];
  document.getElementById("reviewContent").innerHTML = `
        <div class="review-left">
            <img src="" class="profile-img">
            <div>
                <h3>${review.name}</h3>
                <p><i>${review.role}</i></p>
            </div>
        </div>
        <p>${review.review}</p>
        <div class="tags">
            ${review.tags
              .map((tag) => `<span class="tag">${tag}</span>`)
              .join("")}
        </div>
    `;

  document.getElementById("ratingValue").textContent = review.rating.toFixed(1);
  document.getElementById("starsDisplay").innerHTML = generateStars(
    review.rating
  );
}

document.getElementById("nextNewReview").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % reviews.length;
  displayReview(currentIndex);
});

document.getElementById("prevNewReview").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex = (currentIndex - 1) % reviews.length;
  } else {
    currentIndex = currentIndex % reviews.length;
  }

  displayReview(currentIndex);
});

displayReview(currentIndex);
