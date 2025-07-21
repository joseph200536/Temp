import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { useReviews } from '../context/ReviewContext';

const ReviewList = ({ productId, limit }) => {
  const { getProductReviews, markReviewHelpful } = useReviews();
  const reviews = getProductReviews(productId);
  
  // Sort reviews by date (newest first)
  const sortedReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Apply limit if provided
  const displayedReviews = limit ? sortedReviews.slice(0, limit) : sortedReviews;

  if (displayedReviews.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {displayedReviews.map(review => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="font-medium text-gray-800">{review.userName}</span>
              {review.verified && (
                <span className="ml-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Verified Purchase
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <div className="flex text-yellow-400 mb-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${index < review.rating ? 'fill-current' : 'fill-gray-200'}`}
              />
            ))}
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">{review.title}</h4>
          <p className="text-gray-600 mb-3">{review.comment}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>{review.helpful} people found this helpful</span>
            <button 
              onClick={() => markReviewHelpful(review.id)}
              className="ml-4 flex items-center text-[rgb(182,215,204)] hover:text-green-600"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              Helpful
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;