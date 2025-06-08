import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Add this line


const Dashboard = ({ userRole }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCamps: 0,
    totalGroups: 0,
    topPerformers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's your camp summary.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏕️</div>
          <div className="stat-info">
            <h3>{stats.totalCamps}</h3>
            <p>Active Camps</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-info">
            <h3>{stats.totalGroups}</h3>
            <p>Study Groups</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Days Remaining</p>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="top-performers">
        <h3>🏆 Top Performers This Week</h3>
        <div className="performers-list">
          {stats.topPerformers.length > 0 ? (
            stats.topPerformers.map((student, index) => (
              <div key={index} className="performer-item">
                <div className="rank">#{index + 1}</div>
                <div className="student-info">
                  <h4>{student.name}</h4>
                  <p>{student.memorized} verses memorized</p>
                </div>
                <div className="score">{student.score}%</div>
              </div>
            ))
          ) : (
            <p>No performance data available yet.</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>⚡ Quick Actions</h3>
        <div className="actions-grid">
          {userRole === 'admin' && (
            <>
              <button className="action-btn">Add New Camp</button>
              <button className="action-btn">Manage Students</button>
              <button className="action-btn">View Reports</button>
              <button className="action-btn">Upload Media</button>
            </>
          )}
          {userRole === 'supervisor' && (
            <>
              <button className="action-btn">Daily Entry</button>
              <button className="action-btn">View My Group</button>
              <button className="action-btn">Student Progress</button>
              <button className="action-btn">Submit Feedback</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
