import { reviews } from "./reviewsData.js";

let currentIndex = 0;
const reviewsPerPage = 6;
const reviewsContainer = document.getElementById("reviews-container");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const filterSelect = document.getElementById("filter");

function renderReviews(startIndex, endIndex) {
  reviews.slice(startIndex, endIndex).forEach((review) => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");
    reviewElement.innerHTML = `
    <div class='review-left'>
                
                    <img src='' class="profile-img">
                
                <div class="review-header">
                    <span class="review-title">${review.name}</span>
                    <div class="review-date">
                        <small>${review.role} &bull; ${review.date}</small>
                    </div>    
                    <p class="review-text">${review.review}</p>
                </div>
    </div>
                <div class="review-rating">
                    <span>${review.rating} </span>
                    <span>${generateStars(Math.round(review.rating))}</span>
                <div>
            `;
    reviewsContainer.appendChild(reviewElement);
  });
}

function loadMoreReviews() {
  const nextIndex = currentIndex + reviewsPerPage;
  renderReviews(currentIndex, nextIndex);
  currentIndex = nextIndex;

  if (currentIndex >= reviews.length) {
    loadMoreBtn.style.display = "none";
  }
}

function sortReviews(criteria) {
  if (criteria === "latest") {
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (criteria === "oldest") {
    reviews.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (criteria === "highest") {
    reviews.sort((a, b) => b.rating - a.rating);
  } else if (criteria === "lowest") {
    reviews.sort((a, b) => a.rating - b.rating);
  }

  reviewsContainer.innerHTML = "";
  currentIndex = 0;
  loadMoreBtn.style.display = "block";
  loadMoreReviews();
}

filterSelect.addEventListener("change", () => {
  sortReviews(filterSelect.value);
});

loadMoreBtn.addEventListener("click", loadMoreReviews);

loadMoreReviews();



// Function to generate stars
export function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += `<span class="review-star" >${i < rating ? '&#9733;' : "☆"}</span>`;
    }
    return stars;
}