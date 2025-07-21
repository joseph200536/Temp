import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useReviews } from '../context/ReviewContext';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const { addReview } = useReviews();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0 || !title.trim() || !comment.trim() || !userName.trim()) {
      alert('Please fill in all fields and provide a rating');
      return;
    }
    
    const newReview = addReview({
      productId,
      userId: `user${Date.now()}`, // Generate a simple userId
      userName,
      rating,
      title,
      comment
    });
    
    // Reset form
    setRating(0);
    setTitle('');
    setComment('');
    setUserName('');
    setSubmitted(true);
    
    // Notify parent component
    if (onReviewSubmitted) {
      onReviewSubmitted(newReview);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Thank You!</h3>
        <p className="text-green-600">Your review has been submitted successfully.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-4 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
        >
          Write Another Review
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              </button>
            ))}
          </div>
        </div>      
        <div className="mb-4">
          <label htmlFor="reviewTitle" className="block text-gray-700 mb-2">Review Title</label>
          <input
            type="text"
            id="reviewTitle"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="reviewComment" className="block text-gray-700 mb-2">Your Review</label>
          <textarea
            id="reviewComment"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-[rgb(182,215,204)] hover:bg-green-600 text-white py-2 rounded-lg transition duration-200"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;