import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from '../utils/axiosconfig';
import { useSelector } from 'react-redux';
import { FaQuestionCircle, FaComment, FaLink, FaPaperPlane, FaSearch, FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Discussion = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState({
    question_Description: '',
    platform: '',
    topic: '',
    question_link: ''
  });
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const QUESTIONS_PER_PAGE = 7;

  const user = useSelector(state => state.user.user);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/question');
      if (response.data && Array.isArray(response.data.data)) {
        setQuestions(response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to post a question.');
      return;
    }
    try {
      const payload = {
        ...newQuestion,
        email: user.email,
        name: user.name,
      };
      await axiosInstance.post('/question', payload);
      setNewQuestion({ question_Description: '', platform: '', topic: '', question_link: '' });
      setIsFormVisible(false);
      fetchQuestions();
    } catch (error) {
      console.error('Error posting question:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Failed to post question. Please check the console for details.'}`);
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        alert('Error: Could not connect to the server. Please check your network connection and if the server is running.');
        console.error('Error request:', error.request);
      } else {
        alert(`An unexpected error occurred: ${error.message}`);
        console.error('Error message:', error.message);
      }
    }
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const handleAnswerSubmit = async (questionId) => {
    if (!user) {
      alert('Please log in to post an answer.');
      return;
    }
    try {
      const payload = {
        answer_text: newAnswer,
        email: user.email,
        name: user.name
      };
      await axiosInstance.post(`/question/${questionId}/answers`, payload);
      setNewAnswer('');
      fetchQuestions();
    } catch (error) {
      console.error('Error posting answer:', error);
    }
  };

  const filteredQuestions = useMemo(() => {
    if (!searchQuery) {
      return questions;
    }
    return questions.filter(question =>
      question.question_Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [questions, searchQuery]);

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Discussion Forum</h1>
          <p className="text-lg text-gray-600">Ask questions, share knowledge, and connect with the community.</p>
        </header>

        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl relative">
              <button onClick={() => setIsFormVisible(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition">
                <FaTimes size={24} />
              </button>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Post a New Question</h2>
              <form onSubmit={handleQuestionSubmit} className="space-y-4">
                <textarea name="question_Description" value={newQuestion.question_Description} onChange={handleInputChange} placeholder="What's your question?" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition" required rows="4"></textarea>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="platform" value={newQuestion.platform} onChange={handleInputChange} placeholder="Platform (e.g., LeetCode)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition" required />
                  <input type="text" name="topic" value={newQuestion.topic} onChange={handleInputChange} placeholder="Topic (e.g., Arrays)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition" required />
                </div>
                <input type="url" name="question_link" value={newQuestion.question_link} onChange={handleInputChange} placeholder="Link to the question (optional)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                <button type="submit" className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition flex items-center justify-center gap-2">
                  <FaPaperPlane /> Post Question
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:flex-grow">
              <input type="text" placeholder="Search by topic, platform, or question..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition shadow-sm" />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {user && (
              <button onClick={() => setIsFormVisible(true)} className="w-full md:w-auto bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition flex items-center justify-center gap-2 shadow-sm flex-shrink-0">
                <FaQuestionCircle /> Ask a Doubt
              </button>
            )}
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center p-8 bg-white rounded-lg shadow-md"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div><p className="mt-4 text-gray-600">Fetching Questions...</p></div>
            ) : currentQuestions.length > 0 ? (
              currentQuestions.map((question) => (
                <div key={question._id} className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
                  <div onClick={() => toggleQuestion(question._id)} className="p-6 cursor-pointer hover:bg-gray-50 transition">
                    <div className="flex items-start gap-4">
                      <FaQuestionCircle className="text-blue-500 text-3xl mt-1 flex-shrink-0" />
                      <div className="flex-grow">
                        <h3 className="font-bold text-xl text-gray-800">{question.question_Description}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mt-3">
                          <span>by <strong>{question.name}</strong></span>
                          <span>on {new Date(question.createdAt).toLocaleDateString()}</span>
                          <span className="font-semibold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">{question.platform}</span>
                          <span className="font-semibold bg-green-100 text-green-800 px-2.5 py-1 rounded-full">{question.topic}</span>
                          {question.question_link && <a href={question.question_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1.5"><FaLink /> Link</a>}
                        </div>
                      </div>
                    </div>
                  </div>
                  {expandedQuestion === question._id && (
                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                      <h4 className="font-bold text-lg text-gray-700 mb-4 flex items-center gap-2"><FaComment /> Answers ({question.answers.length})</h4>
                      <div className="space-y-4">
                        {question.answers.length > 0 ? question.answers.map(answer => (
                          <div key={answer._id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <p className="text-gray-800">{answer.answer_text}</p>
                            <p className="text-xs text-gray-500 mt-2">by <strong>{answer.name}</strong> on {new Date(answer.createdAt).toLocaleDateString()}</p>
                          </div>
                        )) : <p className="text-gray-500">No answers yet.</p>}
                      </div>
                      {user && (
                        <div className="mt-6">
                          <textarea value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition" placeholder="Write your answer..." rows="3"></textarea>
                          <button onClick={() => handleAnswerSubmit(question._id)} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition flex items-center gap-2">
                            <FaPaperPlane /> Submit Answer
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <p className="text-gray-600 text-lg">{searchQuery ? 'No questions match your search.' : 'No questions have been posted yet. Be the first!'}</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-4">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className="flex items-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition">
                <FaArrowLeft /> Previous
              </button>
              <span className="text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} className="flex items-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition">
                Next <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discussion;
