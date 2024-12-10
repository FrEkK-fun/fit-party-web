import getWeekNumber from './getWeekNumber';

// Set xp values
const calcXpForSession = (intensity) => {
  let xp = 0;
  if (intensity === 'Easy') {
    xp = 1;
  } else if (intensity === 'Medium') {
    xp = 2;
  } else if (intensity === 'Hard') {
    xp = 3;
  }

  return xp;
};

// Group sessions by week
export function bulkSessionsPerWeek(sessions) {
  const sessionsPerWeek = [];
  sessions.forEach((session) => {
    const week = getWeekNumber(session.timestamp);
    if (!sessionsPerWeek[week]) {
      sessionsPerWeek[week] = [];
    }
    sessionsPerWeek[week].push(session);
  });

  return sessionsPerWeek;
}

// Group sessions by day
export const groupSessionsByDay = (sessions) => {
  const sameDaySessions = sessions.reduce((acc, session) => {
    const sessionDate = new Date(session.timestamp);
    const day = sessionDate.toDateString();

    if (!acc[day]) {
      acc[day] = [];
    }

    acc[day].push(session);

    return acc;
  }, {});

  return sameDaySessions;
};

// Calculate total XP for each day
export const calcTotalXpForDay = (sessions) => {
  const sameDaySessions = groupSessionsByDay(sessions);

  const totalXp = Object.keys(sameDaySessions).reduce((acc, day) => {
    const dailyXp = sameDaySessions[day].reduce((total, session) => {
      total += calcXpForSession(session.intensity);

      return total;
    }, 0);

    acc[day] = dailyXp;

    return acc;
  }, {});

  return totalXp;
};

// Adjust total XP for each day to max daily XP
const adjustMaxXpPerDay = (sessions) => {
  const totalXp = calcTotalXpForDay(sessions);
  const adjustedXp = { ...totalXp };
  const maxDailyXp = 3;

  // Check each day's total XP and adjust if necessary
  Object.keys(adjustedXp).forEach((day) => {
    if (adjustedXp[day] > maxDailyXp) {
      adjustedXp[day] = maxDailyXp;
    }
  });

  return adjustedXp;
};

// Calculate total XP for the week, adjusted for max daily XP
export const calcXpViewValue = (sessions) => {
  const weeklyXp = adjustMaxXpPerDay(sessions);

  const totalXp = Object.values(weeklyXp).reduce((total, dailyXp) => {
    total += dailyXp;

    return total;
  }, 0);

  return totalXp;
};
