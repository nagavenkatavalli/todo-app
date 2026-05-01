import { useState, useEffect } from 'react';
import './Header.css';

const quotes = [
  "“The secret of getting ahead is getting started.” – Mark Twain",
  "“Productivity is never an accident.” – Paul J. Meyer",
  "“Small daily improvements lead to stunning results.” – Robin Sharma",
  "“Done is better than perfect.” – Sheryl Sandberg",
  "“Start where you are. Use what you have. Do what you can.” – Arthur Ashe",
  "“The only way to do great work is to love what you do.” – Steve Jobs",
  "“You don't have to be great to start, but you have to start to be great.” – Zig Ziglar",
];

function Header({ total, completed, pending, percentage }) {
  const [quote, setQuote] = useState(quotes[0]);

  // Change quote every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <h1>My Todos</h1>
        <p className="quote">{quote}</p>
      </div>
      <div className="header-stats">
        {/* your stats remain the same */}
        <div className="header-stat">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="header-stat">
          <div className="stat-value">{completed}</div>
          <div className="stat-label">Done</div>
        </div>
        <div className="header-stat">
          <div className="stat-value">{pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="header-stat">
          <div className="stat-value">{percentage}%</div>
          <div className="stat-label">Complete</div>
        </div>
      </div>
    </div>
  );
}

export default Header;