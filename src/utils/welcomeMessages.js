// Function to get a random item from an array
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// General welcome messages
export function randomWelcome(name) {
  const titles = [
    "Let's Get Moving!",
    'Hello, Champion!',
    'You’re Crushing It!',
    'Ready to Dominate?',
    'Back to Work!',
    'Hey, Rockstar!',
  ];

  const texts = [
    `Welcome back, ${name}! Your next workout victory is just a step away.`,
    `You're looking sharp, ${name}! Let’s conquer your fitness goals together today.`,
    `Good to see you again, ${name}! Let’s keep the momentum going.`,
    `Welcome back, ${name}! Every step counts—let’s make today count even more.`,
    `Good to have you back, ${name}. Your goals aren’t going to smash themselves! Let’s do this.`,
    `Hi there, ${name}! Time to sweat, smile, and smash those goals.`,
  ];

  return {
    welcomeTitle: getRandomItem(titles),
    welcomeText: getRandomItem(texts),
  };
}

// Weekend-specific messages
export function randomWelcomeWeekend(name) {
  const titles = ['Weekend Warrior Mode!', 'Happy Weekend!'];
  const texts = [
    `Happy to see you, ${name}! Weekends are for progress—let’s make it epic.`,
    `Welcome back, ${name}! Let’s make this weekend count.`,
  ];

  return {
    welcomeTitle: getRandomItem(titles),
    welcomeText: getRandomItem(texts),
  };
}

// Midweek-specific messages
export function randomWelcomeMidweek(name) {
  const titles = ['Midweek Motivation!', 'Keep Going!'];
  const texts = [
    `Welcome back, ${name}! Let’s keep the midweek momentum going.`,
    `Hey, ${name}! You're halfway through the week—let’s power through to greatness.`,
  ];

  return {
    welcomeTitle: getRandomItem(titles),
    welcomeText: getRandomItem(texts),
  };
}
