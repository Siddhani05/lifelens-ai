const STORAGE_KEY = 'lifelens_db_v4'; // Upgraded database version

const defaultData = {
  productivity: [10, 20, 15, 30, 0, 0, 0], 
  quickTasks: [], 
  tasks: { completed: 0, remaining: 0 },
  activityLog: [] // NEW: The array that tracks everything the user does!
};

export function getDb() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
  const db = JSON.parse(data);
  // Migration check just in case the user has the old database format
  if (!db.activityLog) db.activityLog = []; 
  return db;
}

// --- NEW: THE TRACKING ENGINE ---
export function logActivity(type, description) {
  const db = getDb();
  
  // Create a beautiful timestamp (e.g., "10:42 AM")
  const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Add the new action to the TOP of the list
  db.activityLog.unshift({
    id: Date.now(),
    type: type, // Will be 'task', 'feynman', 'mood', etc.
    description: description,
    time: timeString
  });

  // Keep only the last 20 actions so we don't crash the browser's memory
  if (db.activityLog.length > 20) db.activityLog.pop();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  return db;
}

// --- UPDATED EXISTING FUNCTIONS TO TRIGGER THE TRACKER ---

export function addTaskToDb(taskText) {
  const db = getDb();
  db.quickTasks.push({ id: Date.now(), text: taskText, done: false });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  
  // Track it!
  logActivity('target', `Set a new goal: "${taskText}"`);
  return getDb(); 
}

export function completeTaskInDb(taskId) {
  const db = getDb();
  const task = db.quickTasks.find(t => t.id === taskId);
  
  if (task && !task.done) {
    task.done = true; 
    const day = new Date().getDay();
    const todayIndex = day === 0 ? 6 : day - 1; 
    db.productivity[todayIndex] = Math.min(100, db.productivity[todayIndex] + 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    
    // Track it!
    logActivity('success', `Mastered: "${task.text}"`);
  }
  return getDb();
}

export function completeTask() {
  const db = getDb();
  db.tasks.completed += 1;
  const day = new Date().getDay();
  const todayIndex = day === 0 ? 6 : day - 1; 
  db.productivity[todayIndex] = Math.min(100, db.productivity[todayIndex] + 15);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  
  // Track it!
  logActivity('success', 'Completed a scheduled study planner task');
  return getDb();
}