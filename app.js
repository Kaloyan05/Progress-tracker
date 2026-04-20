const { useState, useEffect, useMemo, useRef } = React;

// ============ ICONS (inline SVG) ============
const Icon = ({ name, className = "w-5 h-5", strokeWidth = 2, fill = "none" }) => {
  const icons = {
    flame: <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    check: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></>,
    checkCircle: <><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></>,
    circle: <><circle cx="12" cy="12" r="10"/></>,
    plus: <><path d="M5 12h14M12 5v14"/></>,
    trash: <><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
    trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></>,
    trending: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
    calendar: <><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    sparkles: <><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></>,
    x: <><path d="M18 6 6 18M6 6l12 12"/></>,
    chevronRight: <><path d="m9 18 6-6-6-6"/></>,
    chevronLeft: <><path d="m15 18-6-6 6-6"/></>,
    zap: <><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></>,
    award: <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>,
    bar: <><path d="M3 3v18h18"/><path d="M7 16V9M12 16V5M17 16v-3"/></>,
    languages: <><path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/></>,
    quote: <><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    alert: <><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    edit: <><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></>,
    settings: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>,
    broken: <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3"/><path d="M13 2c.5 2.5 2 4.9 4 6.5"/><line x1="4" y1="4" x2="20" y2="20" strokeWidth="2.5"/></>,
    note: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};

// ============ TRANSLATIONS ============
const T = {
  bg: {
    appName: 'ПРОГРЕС', tagline: 'Превръщай амбициите в постижения',
    dashboard: 'Табло', habits: 'Навици', goals: 'Цели', tasks: 'Задачи', stats: 'Статистика', calendar: 'Календар',
    addHabit: 'Нов навик', addGoal: 'Нова цел', addTask: 'Нова задача',
    todayProgress: 'Днешен прогрес', activeStreak: 'Активна серия', longestStreak: 'Най-дълга серия',
    completedToday: 'Днес', days: 'дни', day: 'ден', done: 'Готово', ofTotal: 'от',
    progress: 'Прогрес', deadline: 'Краен срок', subtasks: 'Подзадачи', addSubtask: 'Добави подзадача',
    name: 'Име', category: 'Категория', target: 'Цел (дни серия)',
    save: 'Запази', cancel: 'Отказ', delete: 'Изтрий',
    noHabits: 'Все още няма навици. Добави първия си!', noGoals: 'Няма цели. Започни сега!', noTasks: 'Няма задачи. Добави първата!',
    priority: 'Приоритет', high: 'Висок', medium: 'Среден', low: 'Нисък',
    overdue: 'Просрочено', today: 'днес', tomorrow: 'утре', daysLeft: 'дни',
    weekActivity: 'Седмица', categoryBreakdown: 'По категории',
    totalHabits: 'Навици', totalGoals: 'Цели', totalTasks: 'Задачи', avgProgress: 'среден',
    streakBadge: 'СЕРИЯ', motivationTitle: 'Мисъл за деня', open: 'отворени',
    reminder: 'Напомняне', reminderTime: 'Час за напомняне', noReminder: 'Без напомняне',
    notes: 'Бележки', addNote: 'Добави бележка...',
    settings: 'Настройки', exportData: 'Експортирай данни', importData: 'Импортирай данни', exportSuccess: 'Файлът е изтеглен',
    importSuccess: 'Данните са заредени!', importError: 'Грешка при импортиране',
    brokenStreak: 'Серията е прекъсната', currentMonth: 'Текущ месец',
    numericGoal: 'Числова цел', currentValue: 'Текуща стойност', targetValue: 'Целева стойност', unit: 'Мерна единица',
    enableNotifications: 'Разреши известия', notifDenied: 'Известията са забранени в браузъра',
    monthNames: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
    categories: { health: 'Здраве', work: 'Работа', learning: 'Учене', personal: 'Лично', finance: 'Финанси' },
    quotes: [
      'Малките стъпки всеки ден водят до големи резултати.',
      'Успехът е сума от малки усилия, повтаряни ден след ден.',
      'Не спирай, когато си уморен. Спри, когато си готов.',
      'Дисциплината е мостът между целите и постиженията.',
      'Всеки експерт някога е бил начинаещ.',
      'Прогресът е по-важен от съвършенството.',
      'Ти си по-силен, отколкото си мислиш.',
      'Фокусирай се върху пътуването, не само върху дестинацията.',
      'Единственият невъзможен път е този, който не започваш.',
      'Мотивацията те стартира, навикът те поддържа.'
    ],
    days_short: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    mon: 'Пн', tue: 'Вт', wed: 'Ср', thu: 'Чт', fri: 'Пт', sat: 'Сб', sun: 'Нд'
  },
  en: {
    appName: 'PROGRESS', tagline: 'Turn ambitions into achievements',
    dashboard: 'Dashboard', habits: 'Habits', goals: 'Goals', tasks: 'Tasks', stats: 'Stats', calendar: 'Calendar',
    addHabit: 'New habit', addGoal: 'New goal', addTask: 'New task',
    todayProgress: "Today's progress", activeStreak: 'Active streak', longestStreak: 'Longest streak',
    completedToday: 'Today', days: 'days', day: 'day', done: 'Done', ofTotal: 'of',
    progress: 'Progress', deadline: 'Deadline', subtasks: 'Subtasks', addSubtask: 'Add subtask',
    name: 'Name', category: 'Category', target: 'Target (streak days)',
    save: 'Save', cancel: 'Cancel', delete: 'Delete',
    noHabits: 'No habits yet. Add your first!', noGoals: 'No goals yet. Start now!', noTasks: 'No tasks yet. Add your first!',
    priority: 'Priority', high: 'High', medium: 'Medium', low: 'Low',
    overdue: 'Overdue', today: 'today', tomorrow: 'tomorrow', daysLeft: 'days',
    weekActivity: 'This week', categoryBreakdown: 'By category',
    totalHabits: 'Habits', totalGoals: 'Goals', totalTasks: 'Tasks', avgProgress: 'avg',
    streakBadge: 'STREAK', motivationTitle: 'Thought of the day', open: 'open',
    reminder: 'Reminder', reminderTime: 'Reminder time', noReminder: 'No reminder',
    notes: 'Notes', addNote: 'Add note...',
    settings: 'Settings', exportData: 'Export data', importData: 'Import data', exportSuccess: 'File downloaded',
    importSuccess: 'Data imported!', importError: 'Import error',
    brokenStreak: 'Streak broken', currentMonth: 'Current month',
    numericGoal: 'Numeric goal', currentValue: 'Current value', targetValue: 'Target value', unit: 'Unit',
    enableNotifications: 'Enable notifications', notifDenied: 'Notifications blocked in browser',
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    categories: { health: 'Health', work: 'Work', learning: 'Learning', personal: 'Personal', finance: 'Finance' },
    quotes: [
      'Small steps every day lead to big results.',
      'Success is the sum of small efforts repeated daily.',
      "Don't stop when you're tired. Stop when you're done.",
      'Discipline is the bridge between goals and achievement.',
      'Every expert was once a beginner.',
      'Progress, not perfection.',
      'You are stronger than you think.',
      'Focus on the journey, not just the destination.',
      'The only impossible journey is the one you never begin.',
      'Motivation starts you. Habit keeps you going.'
    ],
    days_short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun'
  }
};

const STORAGE_KEY = 'progress-tracker-v2';

const CATEGORY_META = {
  health:   { color: '#10b981', emoji: '🌿' },
  work:     { color: '#3b82f6', emoji: '💼' },
  learning: { color: '#a855f7', emoji: '📚' },
  personal: { color: '#f59e0b', emoji: '✨' },
  finance:  { color: '#f43f5e', emoji: '💰' }
};

const PRIORITY_COLORS = {
  high:   { bg: 'bg-rose-500/15',  text: 'text-rose-400',  border: 'border-rose-500/30' },
  medium: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  low:    { bg: 'bg-slate-500/15', text: 'text-slate-400', border: 'border-slate-500/30' }
};

// ============ UTILS ============
const dateKey = (d) => {
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
};

const calculateStreak = (completions) => {
  if (!completions?.length) return 0;
  const set = new Set(completions);
  let streak = 0;
  let d = new Date();
  if (!set.has(d.toDateString())) d.setDate(d.getDate() - 1);
  while (set.has(d.toDateString())) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
};

// Check if streak was broken recently (yesterday missed but had streak before)
const isStreakBroken = (completions) => {
  if (!completions?.length) return false;
  const set = new Set(completions);
  const today = new Date();
  const yesterday = new Date(Date.now() - 86400000);
  const dayBefore = new Date(Date.now() - 2 * 86400000);

  // Broken if: yesterday NOT done AND day before WAS done AND today NOT done
  return !set.has(yesterday.toDateString()) &&
         set.has(dayBefore.toDateString()) &&
         !set.has(today.toDateString());
};

// ============ MAIN APP ============
function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'bg');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [habits, setHabits] = useState([]);
  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [modal, setModal] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [notifPermission, setNotifPermission] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'default');
  const [loaded, setLoaded] = useState(false);
  const reminderCheckRef = useRef(null);

  const t = T[lang];

  // Load data
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setHabits(data.habits || []);
        setGoals(data.goals || []);
        setTasks(data.tasks || []);
      } else {
        seedDemo();
      }
    } catch {
      seedDemo();
    }
    setLoaded(true);
    setQuoteIdx(Math.floor(Math.random() * 10));
  }, []);

  const seedDemo = () => {
    const today = new Date().toDateString();
    const y = new Date(Date.now() - 86400000).toDateString();
    const y2 = new Date(Date.now() - 2 * 86400000).toDateString();
    setHabits([
      { id: 1, name: 'Сутрешна разходка', category: 'health', completions: [today, y, y2], target: 30, reminderTime: '08:00', notes: '' },
      { id: 2, name: 'Четене 30 минути', category: 'learning', completions: [y, y2], target: 60, reminderTime: '', notes: '' },
      { id: 3, name: 'Медитация', category: 'personal', completions: [today], target: 21, reminderTime: '07:00', notes: '' }
    ]);
    setGoals([
      { id: 1, name: 'Научи испански', category: 'learning', progress: 33, deadline: '2026-12-31', notes: '',
        subtasks: [
          { id: 1, text: 'Завърши A1 курс', done: true },
          { id: 2, text: 'Достигни A2 ниво', done: false },
          { id: 3, text: 'Първи разговор', done: false }
        ], numeric: null },
      { id: 2, name: 'Прочети 24 книги', category: 'learning', progress: 25, deadline: '2026-12-31', subtasks: [], notes: '',
        numeric: { current: 6, target: 24, unit: 'книги' } }
    ]);
    setTasks([
      { id: 1, name: 'Подай данъчна декларация', category: 'personal', deadline: '2026-04-30', done: false, priority: 'high', reminderTime: '', notes: '' },
      { id: 2, name: 'Завърши проект отчет', category: 'work', deadline: '2026-04-25', done: false, priority: 'medium', reminderTime: '', notes: '' }
    ]);
  };

  // Save data
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits, goals, tasks }));
    } catch {}
  }, [habits, goals, tasks, loaded]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // ===== Reminder system =====
  useEffect(() => {
    if (!loaded || notifPermission !== 'granted') return;

    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const today = now.toDateString();
      const notifKey = `notif-${dateKey(now)}-${currentTime}`;

      // Check habits
      habits.forEach(h => {
        if (h.reminderTime === currentTime && !h.completions.includes(today)) {
          const key = `${notifKey}-h${h.id}`;
          if (!sessionStorage.getItem(key)) {
            new Notification(t.appName, { body: `🔥 ${h.name}`, icon: 'icon-192.png', tag: key });
            sessionStorage.setItem(key, '1');
          }
        }
      });

      // Check tasks
      tasks.forEach(ta => {
        if (ta.reminderTime === currentTime && !ta.done) {
          const key = `${notifKey}-t${ta.id}`;
          if (!sessionStorage.getItem(key)) {
            new Notification(t.appName, { body: `✓ ${ta.name}`, icon: 'icon-192.png', tag: key });
            sessionStorage.setItem(key, '1');
          }
        }
      });
    };

    // Check immediately and every 30 seconds
    checkReminders();
    reminderCheckRef.current = setInterval(checkReminders, 30000);
    return () => clearInterval(reminderCheckRef.current);
  }, [habits, tasks, notifPermission, loaded, t.appName]);

  const requestNotifPermission = async () => {
    if (typeof Notification === 'undefined') return;
    const result = await Notification.requestPermission();
    setNotifPermission(result);
  };

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const doneToday = habits.filter(h => h.completions.includes(today)).length;
    const habitRate = habits.length ? Math.round((doneToday / habits.length) * 100) : 0;
    const streaks = habits.map(h => calculateStreak(h.completions));
    const maxStreak = Math.max(0, ...streaks);
    const activeStreak = streaks.filter(s => s > 0).length;
    const brokenCount = habits.filter(h => isStreakBroken(h.completions)).length;
    const avgGoal = goals.length ? Math.round(goals.reduce((s, g) => s + g.progress, 0) / goals.length) : 0;
    const openTasks = tasks.filter(ta => !ta.done).length;
    const week = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const count = habits.filter(h => h.completions.includes(d.toDateString())).length;
      week.push({ day: d, count, total: habits.length });
    }
    return { doneToday, habitRate, maxStreak, activeStreak, avgGoal, openTasks, week, brokenCount };
  }, [habits, goals, tasks]);

  const toggleHabit = (id, date = null) => {
    const targetDate = date || new Date().toDateString();
    setHabits(habits.map(h => h.id === id
      ? { ...h, completions: h.completions.includes(targetDate) ? h.completions.filter(d => d !== targetDate) : [...h.completions, targetDate] }
      : h
    ));
  };

  const toggleTask = (id) => setTasks(tasks.map(ta => ta.id === id ? { ...ta, done: !ta.done } : ta));

  const toggleSubtask = (goalId, subId) => {
    setGoals(goals.map(g => {
      if (g.id !== goalId) return g;
      const subs = g.subtasks.map(s => s.id === subId ? { ...s, done: !s.done } : s);
      const progress = subs.length ? Math.round((subs.filter(s => s.done).length / subs.length) * 100) : g.progress;
      return { ...g, subtasks: subs, progress };
    }));
  };

  const addItem = (type, data) => {
    const id = Date.now();
    if (type === 'habit') setHabits([...habits, { id, completions: [], target: 30, notes: '', reminderTime: '', ...data }]);
    if (type === 'goal') setGoals([...goals, { id, progress: 0, subtasks: [], notes: '', numeric: null, ...data }]);
    if (type === 'task') setTasks([...tasks, { id, done: false, priority: 'medium', notes: '', reminderTime: '', ...data }]);
    setModal(null);
  };

  const updateItem = (type, id, updates) => {
    if (type === 'habit') setHabits(habits.map(h => h.id === id ? { ...h, ...updates } : h));
    if (type === 'goal') setGoals(goals.map(g => g.id === id ? { ...g, ...updates } : g));
    if (type === 'task') setTasks(tasks.map(ta => ta.id === id ? { ...ta, ...updates } : ta));
  };

  const deleteItem = (type, id) => {
    if (type === 'habit') setHabits(habits.filter(h => h.id !== id));
    if (type === 'goal') setGoals(goals.filter(g => g.id !== id));
    if (type === 'task') setTasks(tasks.filter(ta => ta.id !== id));
  };

  const updateGoalProgress = (id, progress) => setGoals(goals.map(g => g.id === id ? { ...g, progress } : g));

  const updateNumericGoal = (id, current) => {
    setGoals(goals.map(g => {
      if (g.id !== id || !g.numeric) return g;
      const progress = Math.min(100, Math.round((current / g.numeric.target) * 100));
      return { ...g, numeric: { ...g.numeric, current }, progress };
    }));
  };

  const addSubtask = (goalId, text) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, subtasks: [...g.subtasks, { id: Date.now(), text, done: false }] } : g));
  };

  const exportData = () => {
    const data = { habits, goals, tasks, exported: new Date().toISOString(), version: 2 };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress-backup-${dateKey(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.habits) setHabits(data.habits);
        if (data.goals) setGoals(data.goals);
        if (data.tasks) setTasks(data.tasks);
        alert(t.importSuccess);
      } catch {
        alert(t.importError);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen text-amber-50 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at top left, #1a0f08 0%, #0a0604 50%, #000000 100%)' }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, #ea580c, transparent)' }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-6 pb-28">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b, #c2410c)', boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}>
                <Icon name="flame" className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'ui-serif, Georgia, serif', letterSpacing: '-0.02em' }}>
                  <span style={{ background: 'linear-gradient(135deg, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {t.appName}
                  </span>
                </h1>
                <p className="text-xs text-amber-200/50 italic">{t.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowSettings(true)}
                className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-all active:scale-95">
                <Icon name="settings" className="w-4 h-4" />
              </button>
              <button onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-all active:scale-95">
                <Icon name="languages" className="w-4 h-4" />
                {lang === 'bg' ? 'EN' : 'BG'}
              </button>
            </div>
          </div>
        </header>

        {/* Broken streak warning */}
        {stats.brokenCount > 0 && (
          <div className="mb-4 flex items-center gap-3 p-3 rounded-2xl border border-rose-500/30 bg-rose-500/10" style={{ animation: 'shake 0.5s ease' }}>
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <Icon name="broken" className="w-5 h-5 text-rose-400" />
            </div>
            <div className="flex-1 text-sm">
              <p className="font-bold text-rose-300">{t.brokenStreak}</p>
              <p className="text-xs text-rose-200/70">{stats.brokenCount} {stats.brokenCount === 1 ? t.day : t.days}</p>
            </div>
          </div>
        )}

        <div className="mb-6 relative overflow-hidden rounded-3xl border border-amber-500/20 p-5" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(234, 88, 12, 0.03))' }}>
          <div className="absolute -top-6 -right-6 opacity-10">
            <Icon name="quote" className="w-24 h-24 text-amber-400" />
          </div>
          <div className="relative flex items-start gap-3">
            <Icon name="sparkles" className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-amber-400/70 font-bold mb-1">{t.motivationTitle}</p>
              <p className="text-amber-50/90 leading-relaxed italic" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>"{t.quotes[quoteIdx]}"</p>
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' && <DashboardView t={t} stats={stats} habits={habits} goals={goals} />}
        {activeTab === 'habits' && <HabitsView t={t} habits={habits} onToggle={toggleHabit} onDelete={(id) => deleteItem('habit', id)} onUpdate={(id, u) => updateItem('habit', id, u)} onAdd={() => setModal({ type: 'habit' })} />}
        {activeTab === 'goals' && <GoalsView t={t} goals={goals} onToggleSubtask={toggleSubtask} onDelete={(id) => deleteItem('goal', id)} onUpdate={(id, u) => updateItem('goal', id, u)} onUpdateProgress={updateGoalProgress} onUpdateNumeric={updateNumericGoal} onAddSubtask={addSubtask} onAdd={() => setModal({ type: 'goal' })} />}
        {activeTab === 'tasks' && <TasksView t={t} tasks={tasks} onToggle={toggleTask} onDelete={(id) => deleteItem('task', id)} onUpdate={(id, u) => updateItem('task', id, u)} onAdd={() => setModal({ type: 'task' })} lang={lang} />}
        {activeTab === 'calendar' && <CalendarView t={t} habits={habits} tasks={tasks} goals={goals} onToggleHabit={toggleHabit} />}
        {activeTab === 'stats' && <StatsView t={t} stats={stats} habits={habits} goals={goals} tasks={tasks} />}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-amber-500/10" style={{ background: 'rgba(10, 6, 4, 0.85)', backdropFilter: 'blur(20px)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-around py-2 px-1 overflow-x-auto scroll-hide">
          {[
            { id: 'dashboard', icon: 'bar', label: t.dashboard },
            { id: 'habits', icon: 'flame', label: t.habits },
            { id: 'goals', icon: 'target', label: t.goals },
            { id: 'tasks', icon: 'checkCircle', label: t.tasks },
            { id: 'calendar', icon: 'calendar', label: t.calendar },
            { id: 'stats', icon: 'trending', label: t.stats }
          ].map(({ id, icon, label }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all flex-shrink-0 ${activeTab === id ? 'text-amber-400' : 'text-amber-100/40'}`}>
              <div className={`relative ${activeTab === id ? 'scale-110' : ''} transition-transform`}>
                {activeTab === id && <div className="absolute inset-0 bg-amber-400 blur-xl opacity-40 -z-10" />}
                <Icon name={icon} className="w-5 h-5" strokeWidth={activeTab === id ? 2.5 : 2} />
              </div>
              <span className="text-[9px] font-bold tracking-wider uppercase">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {modal && <AddModal t={t} type={modal.type} onSave={addItem} onClose={() => setModal(null)} />}
      {showSettings && <SettingsModal t={t} onClose={() => setShowSettings(false)} onExport={exportData} onImport={importData} notifPermission={notifPermission} onRequestNotif={requestNotifPermission} />}
    </div>
  );
}

// ============ DASHBOARD ============
function DashboardView({ t, stats, habits, goals }) {
  const today = new Date().toDateString();
  return (
    <div className="space-y-5" style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label={t.todayProgress} value={`${stats.habitRate}%`} sub={`${stats.doneToday} ${t.ofTotal} ${habits.length}`} icon="zap" />
        <StatCard label={t.longestStreak} value={stats.maxStreak} sub={stats.maxStreak === 1 ? t.day : t.days} icon="flame" highlight />
      </div>

      {habits.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3 flex items-center gap-2">
            <Icon name="calendar" className="w-3.5 h-3.5" />{t.completedToday}
          </h2>
          <div className="space-y-2">
            {habits.slice(0, 4).map(h => {
              const done = h.completions.includes(today);
              const streak = calculateStreak(h.completions);
              const broken = isStreakBroken(h.completions);
              return (
                <div key={h.id} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${done ? 'bg-amber-500/10 border-amber-500/30' : broken ? 'bg-rose-500/5 border-rose-500/20' : 'bg-white/[0.02] border-white/5'}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${done ? 'bg-amber-500' : 'bg-white/5'}`}>
                    {done ? <Icon name="checkCircle" className="w-5 h-5 text-black" strokeWidth={3} /> : <Icon name="circle" className="w-5 h-5 text-amber-200/30" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${done ? 'text-amber-100' : 'text-amber-100/80'}`}>{h.name}</p>
                    <p className="text-xs text-amber-200/40">{CATEGORY_META[h.category]?.emoji} {t.categories[h.category]}</p>
                  </div>
                  {broken && !done && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30">
                      <Icon name="broken" className="w-3.5 h-3.5 text-rose-400" />
                    </div>
                  )}
                  {streak > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/15 border border-orange-500/30">
                      <Icon name="flame" className="w-3.5 h-3.5 text-orange-400" fill="currentColor" />
                      <span className="text-xs font-black text-orange-300">{streak}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3 flex items-center gap-2">
          <Icon name="trending" className="w-3.5 h-3.5" />{t.weekActivity}
        </h2>
        <div className="rounded-2xl border border-amber-500/10 bg-white/[0.02] p-4">
          <div className="flex items-end justify-between gap-2 h-32">
            {stats.week.map((d, i) => {
              const pct = d.total ? (d.count / d.total) * 100 : 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                  <div className="flex-1 w-full flex items-end">
                    <div className="w-full rounded-t-lg transition-all relative overflow-hidden"
                      style={{
                        height: `${Math.max(pct, 4)}%`,
                        background: pct > 0 ? 'linear-gradient(to top, #f59e0b, #fbbf24)' : 'rgba(245, 158, 11, 0.1)',
                        boxShadow: pct > 0 ? '0 0 20px rgba(245, 158, 11, 0.3)' : 'none'
                      }}>
                      {pct >= 100 && <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-200/40 uppercase">{t.days_short[d.day.getDay()]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {goals.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3 flex items-center gap-2">
            <Icon name="target" className="w-3.5 h-3.5" />{t.goals}
          </h2>
          <div className="space-y-2">
            {goals.slice(0, 3).map(g => (
              <div key={g.id} className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-100 truncate flex items-center gap-2">
                    <span>{CATEGORY_META[g.category]?.emoji}</span>{g.name}
                  </span>
                  <span className="text-xs font-black text-amber-400">{g.progress}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${g.progress}%`, background: `linear-gradient(to right, ${CATEGORY_META[g.category]?.color}, #fbbf24)` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value, sub, icon, highlight }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border p-4 ${highlight ? 'border-amber-500/30' : 'border-white/5'}`}
      style={{ background: `linear-gradient(135deg, ${highlight ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.02)'}, rgba(255,255,255,0.01))` }}>
      <Icon name={icon} className={`w-5 h-5 mb-2 ${highlight ? 'text-amber-400' : 'text-amber-200/40'}`} />
      <div className="text-[10px] uppercase tracking-widest text-amber-200/50 font-bold mb-1">{label}</div>
      <div className={`text-3xl font-black ${highlight ? 'text-amber-300' : 'text-amber-100'}`} style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{value}</div>
      <div className="text-xs text-amber-200/40 mt-0.5">{sub}</div>
    </div>
  );
}

// ============ HABITS ============
function HabitsView({ t, habits, onToggle, onDelete, onUpdate, onAdd }) {
  const today = new Date().toDateString();
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <SectionHeader title={t.habits} count={habits.length} onAdd={onAdd} addLabel={t.addHabit} />
      {habits.length === 0 ? <EmptyState message={t.noHabits} icon="flame" /> : (
        <div className="space-y-3">
          {habits.map(h => {
            const done = h.completions.includes(today);
            const streak = calculateStreak(h.completions);
            const broken = isStreakBroken(h.completions);
            const cat = CATEGORY_META[h.category];
            const progressPct = Math.min((streak / (h.target || 30)) * 100, 100);
            const isOpen = expanded === h.id;
            return (
              <div key={h.id} className={`relative overflow-hidden rounded-3xl border transition-all ${done ? 'border-amber-500/40' : broken ? 'border-rose-500/30' : 'border-white/5'}`}
                style={{ background: done ? 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(234,88,12,0.04))' : broken ? 'rgba(244, 63, 94, 0.05)' : 'rgba(255,255,255,0.02)' }}>
                <div className="flex items-stretch">
                  <button onClick={() => onToggle(h.id)} className={`flex-shrink-0 w-16 flex items-center justify-center transition-all ${done ? 'bg-amber-500' : 'bg-white/[0.03] hover:bg-white/[0.06]'}`}>
                    {done ? <Icon name="checkCircle" className="w-7 h-7 text-black" strokeWidth={3} /> : <Icon name="circle" className="w-7 h-7 text-amber-200/30" strokeWidth={2} />}
                  </button>
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-bold leading-tight ${done ? 'text-amber-100' : 'text-amber-50'}`}>{h.name}</h3>
                      <div className="flex gap-1">
                        <button onClick={() => setExpanded(isOpen ? null : h.id)} className="p-1 text-amber-200/40 hover:text-amber-400">
                          <Icon name="edit" className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onDelete(h.id)} className="p-1 text-amber-200/20 hover:text-rose-400">
                          <Icon name="trash" className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-xs flex-wrap">
                      <span className="text-amber-200/50">{cat?.emoji} {t.categories[h.category]}</span>
                      {h.reminderTime && (
                        <span className="flex items-center gap-1 text-amber-300/70">
                          <Icon name="bell" className="w-3 h-3" />{h.reminderTime}
                        </span>
                      )}
                      {broken && !done && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30">
                          <Icon name="broken" className="w-3 h-3 text-rose-400" />
                          <span className="font-black text-rose-300">{t.brokenStreak}</span>
                        </span>
                      )}
                      {streak > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30">
                          <Icon name="flame" className="w-3 h-3 text-orange-400" fill="currentColor" />
                          <span className="font-black text-orange-300">{streak} {streak === 1 ? t.day : t.days}</span>
                        </span>
                      )}
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, background: 'linear-gradient(to right, #f59e0b, #fbbf24)' }} />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-amber-200/40 font-bold">{streak}/{h.target || 30}</span>
                      {progressPct >= 100 && (
                        <span className="flex items-center gap-1 text-[10px] font-black text-amber-400">
                          <Icon name="trophy" className="w-3 h-3" /> {t.streakBadge}
                        </span>
                      )}
                    </div>
                    {isOpen && (
                      <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="bell" className="w-3 h-3" />{t.reminderTime}</label>
                          <input type="time" value={h.reminderTime || ''} onChange={(e) => onUpdate(h.id, { reminderTime: e.target.value })}
                            className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 focus:outline-none focus:border-amber-500/50" />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="note" className="w-3 h-3" />{t.notes}</label>
                          <textarea value={h.notes || ''} onChange={(e) => onUpdate(h.id, { notes: e.target.value })} placeholder={t.addNote} rows={2}
                            className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50 resize-none" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============ GOALS ============
function GoalsView({ t, goals, onToggleSubtask, onDelete, onUpdate, onUpdateProgress, onUpdateNumeric, onAddSubtask, onAdd }) {
  const [expanded, setExpanded] = useState(null);
  const [newSub, setNewSub] = useState('');

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <SectionHeader title={t.goals} count={goals.length} onAdd={onAdd} addLabel={t.addGoal} />
      {goals.length === 0 ? <EmptyState message={t.noGoals} icon="target" /> : (
        <div className="space-y-3">
          {goals.map(g => {
            const isOpen = expanded === g.id;
            const cat = CATEGORY_META[g.category];
            const daysLeft = g.deadline ? Math.ceil((new Date(g.deadline) - new Date()) / 86400000) : null;
            return (
              <div key={g.id} className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : g.id)} className="w-full p-4 text-left">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{cat?.emoji}</span>
                        <h3 className="font-bold text-amber-50">{g.name}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-amber-200/50 flex-wrap">
                        <span>{t.categories[g.category]}</span>
                        {daysLeft !== null && (
                          <span className={`flex items-center gap-1 ${daysLeft < 0 ? 'text-rose-400' : daysLeft < 7 ? 'text-amber-400' : ''}`}>
                            <Icon name="clock" className="w-3 h-3" />
                            {daysLeft < 0 ? t.overdue : `${daysLeft} ${t.daysLeft}`}
                          </span>
                        )}
                        {g.numeric && <span>{g.numeric.current}/{g.numeric.target} {g.numeric.unit}</span>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-black text-amber-300" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{g.progress}%</div>
                      <Icon name="chevronRight" className={`w-4 h-4 text-amber-200/40 ml-auto transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${g.progress}%`, background: `linear-gradient(to right, ${cat?.color}, #fbbf24)`, boxShadow: `0 0 10px ${cat?.color}80` }} />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-white/5 p-4 space-y-3 bg-black/20">
                    {g.numeric ? (
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-amber-300/60 font-bold">{t.currentValue}</label>
                        <div className="flex items-center gap-2">
                          <button onClick={() => onUpdateNumeric(g.id, Math.max(0, g.numeric.current - 1))}
                            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-amber-300 font-black">−</button>
                          <input type="number" value={g.numeric.current} onChange={(e) => onUpdateNumeric(g.id, parseFloat(e.target.value) || 0)}
                            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-center text-amber-50 font-bold" />
                          <span className="text-amber-200/50 text-sm">/ {g.numeric.target} {g.numeric.unit}</span>
                          <button onClick={() => onUpdateNumeric(g.id, g.numeric.current + 1)}
                            className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black">+</button>
                        </div>
                      </div>
                    ) : g.subtasks.length === 0 && (
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-amber-300/60 font-bold">{t.progress}</label>
                        <input type="range" min="0" max="100" value={g.progress}
                          onChange={(e) => onUpdateProgress(g.id, parseInt(e.target.value))}
                          className="w-full accent-amber-500" />
                      </div>
                    )}

                    {!g.numeric && (
                      <div>
                        <label className="text-xs uppercase tracking-wider text-amber-300/60 font-bold">{t.subtasks}</label>
                        <div className="mt-2 space-y-1.5">
                          {g.subtasks.map(s => (
                            <button key={s.id} onClick={() => onToggleSubtask(g.id, s.id)}
                              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.03] text-left">
                              {s.done ? <Icon name="checkCircle" className="w-4 h-4 text-amber-400 flex-shrink-0" /> : <Icon name="circle" className="w-4 h-4 text-amber-200/30 flex-shrink-0" />}
                              <span className={`text-sm ${s.done ? 'line-through text-amber-200/40' : 'text-amber-100'}`}>{s.text}</span>
                            </button>
                          ))}
                        </div>
                        <div className="mt-2 flex gap-2">
                          <input value={newSub} onChange={(e) => setNewSub(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && newSub.trim()) { onAddSubtask(g.id, newSub.trim()); setNewSub(''); }}}
                            placeholder={t.addSubtask}
                            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50" />
                          <button onClick={() => { if (newSub.trim()) { onAddSubtask(g.id, newSub.trim()); setNewSub(''); }}}
                            className="px-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
                            <Icon name="plus" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="note" className="w-3 h-3" />{t.notes}</label>
                      <textarea value={g.notes || ''} onChange={(e) => onUpdate(g.id, { notes: e.target.value })} placeholder={t.addNote} rows={2}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50 resize-none" />
                    </div>

                    <button onClick={() => onDelete(g.id)} className="w-full py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center gap-1.5">
                      <Icon name="trash" className="w-3.5 h-3.5" /> {t.delete}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============ TASKS ============
function TasksView({ t, tasks, onToggle, onDelete, onUpdate, onAdd, lang }) {
  const [expanded, setExpanded] = useState(null);
  const sorted = [...tasks].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return new Date(a.deadline || '2099-01-01') - new Date(b.deadline || '2099-01-01');
  });

  const formatDeadline = (dl) => {
    if (!dl) return '';
    const d = new Date(dl);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((d - today) / 86400000);
    if (diff < 0) return t.overdue;
    if (diff === 0) return t.today;
    if (diff === 1) return t.tomorrow;
    return d.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-US', { day: 'numeric', month: 'short' });
  };

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <SectionHeader title={t.tasks} count={tasks.filter(ta => !ta.done).length} onAdd={onAdd} addLabel={t.addTask} />
      {tasks.length === 0 ? <EmptyState message={t.noTasks} icon="checkCircle" /> : (
        <div className="space-y-2">
          {sorted.map(ta => {
            const pri = PRIORITY_COLORS[ta.priority];
            const cat = CATEGORY_META[ta.category];
            const dlText = formatDeadline(ta.deadline);
            const overdue = ta.deadline && new Date(ta.deadline) < new Date() && !ta.done;
            const isOpen = expanded === ta.id;
            return (
              <div key={ta.id} className={`rounded-2xl border transition-all ${ta.done ? 'opacity-50 border-white/5 bg-white/[0.01]' : overdue ? 'border-rose-500/30 bg-rose-500/5' : 'border-white/5 bg-white/[0.02]'}`}>
                <div className="flex items-center gap-3 p-3">
                  <button onClick={() => onToggle(ta.id)} className="flex-shrink-0">
                    {ta.done ? <Icon name="checkCircle" className="w-6 h-6 text-amber-400" strokeWidth={2.5} /> : <Icon name="circle" className="w-6 h-6 text-amber-200/30 hover:text-amber-400" strokeWidth={2} />}
                  </button>
                  <div className="flex-1 min-w-0" onClick={() => setExpanded(isOpen ? null : ta.id)}>
                    <p className={`font-medium ${ta.done ? 'line-through text-amber-200/40' : 'text-amber-50'}`}>{ta.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs text-amber-200/50">{cat?.emoji} {t.categories[ta.category]}</span>
                      {dlText && (
                        <span className={`text-xs flex items-center gap-1 ${overdue ? 'text-rose-400 font-bold' : 'text-amber-200/50'}`}>
                          {overdue && <Icon name="alert" className="w-3 h-3" />}
                          <Icon name="clock" className="w-3 h-3" /> {dlText}
                        </span>
                      )}
                      {ta.reminderTime && (
                        <span className="text-xs flex items-center gap-1 text-amber-300/70">
                          <Icon name="bell" className="w-3 h-3" />{ta.reminderTime}
                        </span>
                      )}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${pri.bg} ${pri.text} ${pri.border} font-bold uppercase`}>{t[ta.priority]}</span>
                    </div>
                  </div>
                  <button onClick={() => setExpanded(isOpen ? null : ta.id)} className="flex-shrink-0 p-1 text-amber-200/40 hover:text-amber-400">
                    <Icon name="edit" className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(ta.id)} className="flex-shrink-0 p-1 text-amber-200/20 hover:text-rose-400">
                    <Icon name="trash" className="w-4 h-4" />
                  </button>
                </div>
                {isOpen && (
                  <div className="px-3 pb-3 pt-0 space-y-2 border-t border-white/5 mt-1">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="bell" className="w-3 h-3" />{t.reminderTime}</label>
                      <input type="time" value={ta.reminderTime || ''} onChange={(e) => onUpdate(ta.id, { reminderTime: e.target.value })}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 focus:outline-none focus:border-amber-500/50" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="note" className="w-3 h-3" />{t.notes}</label>
                      <textarea value={ta.notes || ''} onChange={(e) => onUpdate(ta.id, { notes: e.target.value })} placeholder={t.addNote} rows={2}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50 resize-none" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============ CALENDAR VIEW ============
function CalendarView({ t, habits, tasks, goals, onToggleHabit }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const daysArr = [];
  for (let i = 0; i < startOffset; i++) daysArr.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArr.push(new Date(year, month, i));

  const getDayData = (d) => {
    if (!d) return null;
    const ds = d.toDateString();
    const habitCount = habits.filter(h => h.completions.includes(ds)).length;
    const taskCount = tasks.filter(ta => ta.deadline === dateKey(d) && !ta.done).length;
    const goalCount = goals.filter(g => g.deadline === dateKey(d)).length;
    return { habitCount, taskCount, goalCount, habitPct: habits.length ? habitCount / habits.length : 0 };
  };

  const selectedData = useMemo(() => {
    const ds = selectedDay.toDateString();
    const dKey = dateKey(selectedDay);
    const habitsDone = habits.filter(h => h.completions.includes(ds));
    const habitsNotDone = habits.filter(h => !h.completions.includes(ds));
    const tasksOnDay = tasks.filter(ta => ta.deadline === dKey);
    const goalsOnDay = goals.filter(g => g.deadline === dKey);
    return { habitsDone, habitsNotDone, tasksOnDay, goalsOnDay };
  }, [selectedDay, habits, tasks, goals]);

  const today = new Date();
  const isToday = (d) => d && d.toDateString() === today.toDateString();
  const isSelected = (d) => d && d.toDateString() === selectedDay.toDateString();
  const isFuture = (d) => d && d > today;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black text-amber-50" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{t.calendar}</h2>
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 rounded-lg hover:bg-white/5 text-amber-300">
            <Icon name="chevronLeft" className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-bold text-amber-100" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
            {t.monthNames[month]} {year}
          </h3>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 rounded-lg hover:bg-white/5 text-amber-300">
            <Icon name="chevronRight" className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {t.days_short.map((d, i) => (
            <div key={i} className="text-[10px] text-center font-bold text-amber-300/40 uppercase py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysArr.map((d, i) => {
            if (!d) return <div key={i} />;
            const data = getDayData(d);
            const future = isFuture(d);
            const todayBadge = isToday(d);
            const selected = isSelected(d);
            return (
              <button key={i} onClick={() => setSelectedDay(d)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs relative transition-all ${
                  selected ? 'bg-amber-500 text-black font-black' :
                  todayBadge ? 'border-2 border-amber-500/60 text-amber-300 font-bold' :
                  future ? 'text-amber-100/30' : 'text-amber-100/70 hover:bg-white/5'
                }`}>
                <span>{d.getDate()}</span>
                {data && !future && (
                  <div className="flex gap-0.5 mt-0.5">
                    {data.habitCount > 0 && (
                      <div className={`w-1 h-1 rounded-full ${selected ? 'bg-black/40' : ''}`}
                        style={!selected ? { background: `rgba(245, 158, 11, ${0.3 + data.habitPct * 0.7})` } : {}} />
                    )}
                    {data.taskCount > 0 && <div className={`w-1 h-1 rounded-full ${selected ? 'bg-black/40' : 'bg-rose-400'}`} />}
                    {data.goalCount > 0 && <div className={`w-1 h-1 rounded-full ${selected ? 'bg-black/40' : 'bg-blue-400'}`} />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-around mt-3 pt-3 border-t border-white/5 text-[10px] text-amber-200/50">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" />{t.habits}</span>
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-400" />{t.tasks}</span>
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />{t.goals}</span>
        </div>
      </div>

      {/* Selected day details */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-amber-100">
          {selectedDay.toLocaleDateString('bg-BG', { weekday: 'long', day: 'numeric', month: 'long' })}
        </h3>

        {selectedData.habitsDone.length > 0 && (
          <div>
            <h4 className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold mb-2">✓ {t.done}</h4>
            {selectedData.habitsDone.map(h => (
              <div key={h.id} className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-1">
                <Icon name="checkCircle" className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-100">{h.name}</span>
              </div>
            ))}
          </div>
        )}

        {selectedData.habitsNotDone.length > 0 && isToday(selectedDay) && (
          <div>
            <h4 className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold mb-2">{t.habits}</h4>
            {selectedData.habitsNotDone.map(h => (
              <button key={h.id} onClick={() => onToggleHabit(h.id)} className="w-full flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 mb-1 text-left">
                <Icon name="circle" className="w-4 h-4 text-amber-200/30" />
                <span className="text-sm text-amber-100/80">{h.name}</span>
              </button>
            ))}
          </div>
        )}

        {selectedData.tasksOnDay.length > 0 && (
          <div>
            <h4 className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold mb-2">{t.tasks}</h4>
            {selectedData.tasksOnDay.map(ta => (
              <div key={ta.id} className="flex items-center gap-2 p-2 rounded-lg bg-rose-500/5 border border-rose-500/20 mb-1">
                <Icon name={ta.done ? "checkCircle" : "circle"} className={`w-4 h-4 ${ta.done ? 'text-amber-400' : 'text-rose-400'}`} />
                <span className={`text-sm ${ta.done ? 'line-through text-amber-200/40' : 'text-amber-100'}`}>{ta.name}</span>
              </div>
            ))}
          </div>
        )}

        {selectedData.goalsOnDay.length > 0 && (
          <div>
            <h4 className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold mb-2">{t.goals} — {t.deadline}</h4>
            {selectedData.goalsOnDay.map(g => (
              <div key={g.id} className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/5 border border-blue-500/20 mb-1">
                <Icon name="target" className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-amber-100 flex-1">{g.name}</span>
                <span className="text-xs font-black text-amber-300">{g.progress}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ STATS ============
function StatsView({ t, stats, habits, goals, tasks }) {
  const byCategory = useMemo(() => {
    const cats = {};
    [...habits, ...goals, ...tasks].forEach(item => { cats[item.category] = (cats[item.category] || 0) + 1; });
    const total = Object.values(cats).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(cats).map(([cat, count]) => ({ cat, count, pct: (count / total) * 100 }));
  }, [habits, goals, tasks]);

  return (
    <div className="space-y-5" style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label={t.totalHabits} value={habits.length} sub={`${stats.doneToday} ${t.done}`} icon="flame" />
        <StatCard label={t.totalGoals} value={goals.length} sub={`${stats.avgGoal}% ${t.avgProgress}`} icon="target" />
        <StatCard label={t.totalTasks} value={tasks.length} sub={`${stats.openTasks} ${t.open}`} icon="checkCircle" />
        <StatCard label={t.activeStreak} value={stats.activeStreak} sub={t.days} icon="award" highlight />
      </div>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3">{t.categoryBreakdown}</h2>
        <div className="space-y-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          {byCategory.map(({ cat, count, pct }) => {
            const meta = CATEGORY_META[cat];
            return (
              <div key={cat}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-amber-100">{meta?.emoji} {t.categories[cat]}</span>
                  <span className="text-xs font-black text-amber-200/60">{count}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: meta?.color, boxShadow: `0 0 8px ${meta?.color}60` }} />
                </div>
              </div>
            );
          })}
          {byCategory.length === 0 && <p className="text-sm text-amber-200/40 text-center py-4">—</p>}
        </div>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3">{t.weekActivity}</h2>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-end justify-between gap-2 h-32">
            {stats.week.map((d, i) => {
              const pct = d.total ? (d.count / d.total) * 100 : 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                  <div className="flex-1 w-full flex items-end">
                    <div className="w-full rounded-t-lg transition-all" style={{
                      height: `${Math.max(pct, 4)}%`,
                      background: pct > 0 ? 'linear-gradient(to top, #f59e0b, #fbbf24)' : 'rgba(245, 158, 11, 0.1)'
                    }} />
                  </div>
                  <span className="text-[10px] font-bold text-amber-200/40 uppercase">{t.days_short[d.day.getDay()]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============ SHARED ============
function SectionHeader({ title, count, onAdd, addLabel }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-black text-amber-50" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{title}</h2>
        <span className="text-sm font-bold text-amber-300/40">{count}</span>
      </div>
      <button onClick={onAdd}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all"
        style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)' }}>
        <Icon name="plus" className="w-4 h-4 text-black" strokeWidth={3} />
        <span className="text-black">{addLabel}</span>
      </button>
    </div>
  );
}

function EmptyState({ message, icon }) {
  return (
    <div className="text-center py-16 px-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 mb-4">
        <Icon name={icon} className="w-7 h-7 text-amber-400/60" />
      </div>
      <p className="text-amber-200/50 text-sm">{message}</p>
    </div>
  );
}

// ============ ADD MODAL ============
function AddModal({ t, type, onSave, onClose }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('personal');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [target, setTarget] = useState(30);
  const [reminderTime, setReminderTime] = useState('');
  const [notes, setNotes] = useState('');
  const [useNumeric, setUseNumeric] = useState(false);
  const [numTarget, setNumTarget] = useState(100);
  const [numUnit, setNumUnit] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    const data = { name: name.trim(), category, notes };
    if (type === 'habit') {
      data.target = parseInt(target) || 30;
      data.reminderTime = reminderTime;
    }
    if (type === 'goal') {
      data.deadline = deadline;
      if (useNumeric) {
        data.numeric = { current: 0, target: parseFloat(numTarget) || 100, unit: numUnit };
      }
    }
    if (type === 'task') {
      data.deadline = deadline;
      data.priority = priority;
      data.reminderTime = reminderTime;
    }
    onSave(type, data);
  };

  const titleMap = { habit: t.addHabit, goal: t.addGoal, task: t.addTask };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.2s ease' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-amber-500/20 p-6 max-h-[90vh] overflow-y-auto scroll-hide"
        style={{ background: 'linear-gradient(180deg, #1a0f08, #0a0604)', animation: 'slideUp 0.3s ease', paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-black text-amber-100" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{titleMap[type]}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-amber-200/50">
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.name}</label>
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.category}</label>
            <div className="mt-1.5 grid grid-cols-5 gap-1.5">
              {Object.keys(CATEGORY_META).map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`p-2 rounded-xl border transition-all ${category === cat ? 'border-amber-500/60 bg-amber-500/10' : 'border-white/5 bg-white/[0.02]'}`}>
                  <div className="text-xl">{CATEGORY_META[cat].emoji}</div>
                  <div className="text-[9px] font-bold text-amber-100/70 mt-0.5">{t.categories[cat]}</div>
                </button>
              ))}
            </div>
          </div>

          {type === 'habit' && (
            <>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.target}</label>
                <input type="number" value={target} onChange={(e) => setTarget(e.target.value)}
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold flex items-center gap-1"><Icon name="bell" className="w-3 h-3" />{t.reminderTime}</label>
                <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)}
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
              </div>
            </>
          )}

          {(type === 'goal' || type === 'task') && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.deadline}</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
            </div>
          )}

          {type === 'goal' && (
            <div>
              <label className="flex items-center gap-2 text-xs text-amber-100">
                <input type="checkbox" checked={useNumeric} onChange={(e) => setUseNumeric(e.target.checked)} className="accent-amber-500" />
                <span className="font-bold uppercase tracking-wider text-[10px] text-amber-300/60">{t.numericGoal}</span>
              </label>
              {useNumeric && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input type="number" value={numTarget} onChange={(e) => setNumTarget(e.target.value)} placeholder={t.targetValue}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
                  <input value={numUnit} onChange={(e) => setNumUnit(e.target.value)} placeholder={t.unit}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50" />
                </div>
              )}
            </div>
          )}

          {type === 'task' && (
            <>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.priority}</label>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {['low', 'medium', 'high'].map(p => (
                    <button key={p} onClick={() => setPriority(p)}
                      className={`py-2 rounded-xl border text-xs font-bold uppercase transition-all ${priority === p ? `${PRIORITY_COLORS[p].bg} ${PRIORITY_COLORS[p].text} ${PRIORITY_COLORS[p].border}` : 'border-white/5 bg-white/[0.02] text-amber-200/40'}`}>
                      {t[p]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold flex items-center gap-1"><Icon name="bell" className="w-3 h-3" />{t.reminderTime}</label>
                <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)}
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
              </div>
            </>
          )}

          <div>
            <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold flex items-center gap-1"><Icon name="note" className="w-3 h-3" />{t.notes}</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.addNote} rows={2}
              className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50 resize-none" />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-100/70 font-bold">{t.cancel}</button>
          <button onClick={handleSave} disabled={!name.trim()}
            className="flex-1 py-3 rounded-xl font-black text-black disabled:opacity-40 active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)' }}>
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ SETTINGS MODAL ============
function SettingsModal({ t, onClose, onExport, onImport, notifPermission, onRequestNotif }) {
  const fileRef = useRef(null);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.2s ease' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-amber-500/20 p-6"
        style={{ background: 'linear-gradient(180deg, #1a0f08, #0a0604)', animation: 'slideUp 0.3s ease', paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-black text-amber-100" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{t.settings}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-amber-200/50">
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {notifPermission !== 'granted' && (
            <button onClick={onRequestNotif}
              className="w-full flex items-center gap-3 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-left">
              <Icon name="bell" className="w-5 h-5 text-amber-400" />
              <div className="flex-1">
                <p className="font-bold text-amber-100">{t.enableNotifications}</p>
                {notifPermission === 'denied' && <p className="text-xs text-rose-400 mt-0.5">{t.notifDenied}</p>}
              </div>
            </button>
          )}

          <button onClick={onExport}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-left transition-all">
            <Icon name="download" className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-amber-100">{t.exportData}</span>
          </button>

          <button onClick={() => fileRef.current?.click()}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-left transition-all">
            <Icon name="upload" className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-amber-100">{t.importData}</span>
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden"
            onChange={(e) => { if (e.target.files[0]) { onImport(e.target.files[0]); onClose(); }}} />
        </div>
      </div>
    </div>
  );
}

// Render
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
