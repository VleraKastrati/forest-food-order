import {reviews} from "./reviewsData.js";

const slider = document.getElementById("reviewSlider");

function renderReviews() {
  slider.innerHTML = reviews
    .map(
      (review) => `
          <div class="card">
              <div class="card-head">
                  <div class="card-head-left">   
                      <img src="">         
                  </div>
                  <div class="card-head-right">
                      <h3>${review.dish}</h3>
                      <p class="category">${review.category}</p>
                  </div>
              </div>
              <p class="review-text">${review.review}</p>
              <div class="profile">
                  <div class="profile-left">
                      <img src="#" alt="profile" class="profile-img">
                      <div class="name">
                          <strong>${review.name}</strong><br>
                          <small>${review.role}</small>
                      </div>
                  </div>
                  <div class="rating">
                      <span class="star">★</span>
                      <span class='star-nr'>${review.rating.toFixed(1)}</span>
                  </div>
              </div>
          </div>
      `
    )
    .join("");
}

renderReviews();

let index = 0;

document.getElementById("prevBtn").addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (index < reviews.length - 1) {
    index++;
    updateSlider();
  }
});

function updateSlider() {
  slider.style.transform = `translateX(-${index * 400}px)`;
}
