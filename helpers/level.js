/**
 * Definitions for each level. Add new entries or adjust xp thresholds as the
 * progression changes; keep the array sorted in descending xp order so the
 * lookup logic remains correct.
 */
const LEVEL_DEFINITIONS = [
  { level: 11, minXp: 500 },
  { level: 10, minXp: 450 },
  { level: 9, minXp: 400 },
  { level: 8, minXp: 350 },
  { level: 7, minXp: 300 },
  { level: 6, minXp: 250 },
  { level: 5, minXp: 200 },
  { level: 4, minXp: 150 },
  { level: 3, minXp: 100 },
  { level: 2, minXp: 50 },
  { level: 1, minXp: 0 },
];

/**
 * Calculate the level of the pet based on its xp.
 * To extend the maximum level, append new definitions to LEVEL_DEFINITIONS
 * (highest minXp first) and this method will automatically support them.
 *
 * @param {number} xp the xp of the pet
 * @returns {number} the level of the pet
 */
function computeLevel(xp) {
  const currentXp = Number.isFinite(xp) ? xp : 0;
  const levelDefinition =
    LEVEL_DEFINITIONS.find(({ minXp }) => currentXp >= minXp) ??
    LEVEL_DEFINITIONS[LEVEL_DEFINITIONS.length - 1];

  return levelDefinition.level;
}

module.exports = { computeLevel };
