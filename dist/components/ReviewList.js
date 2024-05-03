import { $ } from '../common/dom.js';
import { Review } from './Review.js';
export function ReviewList({ items }) {
    const componentContainer = $.createElement('div');
    const reviewsContainerId = 'reviews-container';
    const markup = `
    <div>
      <h3>Reviews</h3>
      <div id="${reviewsContainerId}"></div>
    </div>
  `;
    function getContainer() {
        return componentContainer;
    }
    function initComponent() {
        if (items.length === 0) {
            componentContainer.insertAdjacentHTML('beforeend', '<p>No reviews were found</p>');
            return;
        }
        componentContainer.insertAdjacentHTML('beforeend', markup);
        const reviewsContainer = componentContainer.querySelector(`#${reviewsContainerId}`);
        items.forEach((item) => {
            const reviewComp = Review(item);
            reviewsContainer === null || reviewsContainer === void 0 ? void 0 : reviewsContainer.appendChild(reviewComp.getContainer());
        });
    }
    initComponent();
    return {
        getContainer,
    };
}