function computeLevel(xp) {
  if (xp >= 80) return 5;
  if (xp >= 60) return 4;
  if (xp >= 40) return 3;
  if (xp >= 20) return 2;
  return 1;
}

module.exports = { computeLevel };
