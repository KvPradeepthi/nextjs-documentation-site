'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function FeedbackWidget() {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast.error('Please enter your feedback');
      return;
    }

    setSubmitted(true);
    toast.success('Thank you for your feedback!');
    
    setTimeout(() => {
      setFeedback('');
      setRating(5);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div data-testid="feedback-widget" className="mt-12 p-6 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
      <h3 className="font-semibold mb-4">Was this page helpful?</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="px-3 py-2 border rounded dark:bg-slate-800"
          >
            <option value={5}>Very Helpful</option>
            <option value={4}>Helpful</option>
            <option value={3}>Neutral</option>
            <option value={2}>Not Helpful</option>
            <option value={1}>Very Unhelpful</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us how we can improve..."
            className="w-full px-3 py-2 border rounded dark:bg-slate-800 min-h-[100px]"
          />
        </div>
        
        <button
          type="submit"
          disabled={submitted}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {submitted ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}
