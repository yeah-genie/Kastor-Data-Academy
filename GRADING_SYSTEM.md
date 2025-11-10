# Dynamic Grading System

## Overview

The case evaluation screen now dynamically tracks player performance throughout the game and assigns a grade based on actual gameplay metrics.

## Tracked Metrics

### 1. Evidence Collection
- **Tracks:** Number of evidence pieces collected vs. total available
- **Total Available:** 12 pieces
- **Display:** "Evidence Collected: X / 12"
- **Status:** ✓ (green check) if all collected, ✗ (grey X) otherwise

### 2. Logic Connections Made
- **Tracks:** Number of correct logic connections made in puzzles
- **Total Available:** 5 connections
- **Display:** "Logic Connections Made: X / 5"
- **How it's recorded:** Automatically tracked when player successfully connects two thoughts in LogicConnectionPuzzle component

### 3. Contradictions Found
- **Tracks:** Number of contradictions found during testimony analysis
- **Total Available:** 3 contradictions
- **Display:** "Contradictions Found: X / 3"
- **How it's recorded:** Automatically tracked when player presents evidence against contradictory statements in TestimonyPress component

### 4. Interview Accuracy
- **Tracks:** Percentage of correct answers during dialogue choices
- **Calculation:** (Correct Decisions / Total Decisions) × 100
- **Display:** "Interview Accuracy: X%"
- **Status:** Green if 100%, grey otherwise

### 5. Time Taken
- **Tracks:** Total time from case start to completion
- **Display:** "Time Taken: Xm Ys" or "Xs" for cases under 1 minute
- **Usage:** Contributes to final grade calculation

### 6. Interactive Sequences Completed
- **Tracks:** Number of interactive mini-games successfully completed
- **Total Available:** 6 sequences
  1. Graph Analysis
  2. Document Examination (Patch Notes)
  3. Document Examination (Server Logs)
  4. Logic Connection Puzzle
  5. Timeline Reconstruction
  6. Testimony Press
- **How it's recorded:** Automatically tracked when interactive sequences are completed successfully

## Grade Calculation

### Formula

```
decisionRate = correctDecisions / totalDecisions
evidenceRate = evidenceCollected / totalEvidence
timeScore = if time < 15min: 1.0, elif time < 25min: 0.5, else: 0
hintPenalty = hintsUsed × 0.1

finalScore = (decisionRate × 0.4) + (evidenceRate × 0.4) + (timeScore × 0.2) - hintPenalty
```

### Grade Thresholds

- **S Rank:** finalScore >= 0.9 (90%+)
  - Message: "Outstanding Detective Work!"
  - Special: "🎊 Perfect Score! You are a true Data Detective!"

- **A Rank:** finalScore >= 0.75 (75-89%)
  - Message: "Excellent Investigation!"

- **B Rank:** finalScore >= 0.6 (60-74%)
  - Message: "Good Work, Detective!"

- **C Rank:** finalScore < 0.6 (Below 60%)
  - Message: "Case Solved, But Room for Improvement"

## How Tracking Works

### Store Methods

```typescript
// Initialize metrics when starting a case
initSessionMetrics(totalEvidenceCount: number)

// Record player actions
recordLogicConnection()      // Called when logic puzzle connection made
recordContradiction()         // Called when contradiction found in testimony
recordInteractiveSequence()  // Called when any interactive sequence completed
recordDecision(questionId, choiceId, isCorrect)  // Called on dialogue choices

// Get final statistics
getCaseStats()  // Returns all metrics for display
calculateGrade()  // Returns final grade (S, A, B, or C)
```

### Component Integration

Each interactive component calls the appropriate tracking method:

- **GraphAnalysisInteractive:** Calls `recordInteractiveSequence()` on correct answer
- **LogicConnectionPuzzle:** Calls `recordLogicConnection()` for each connection + `recordInteractiveSequence()` on completion
- **TimelineReconstruction:** Calls `recordInteractiveSequence()` on correct order
- **TestimonyPress:** Calls `recordContradiction()` for each found + completion tracking
- **DocumentExamination:** Tracks completion automatically
- **EvidenceChainPresentation:** Tracks completion automatically

## Example Scenarios

### Perfect S Rank
```
Evidence Collected: 12 / 12 ✓
Logic Connections Made: 5 / 5 ✓
Contradictions Found: 3 / 3 ✓
Interview Accuracy: 100% ✓
Time Taken: 12m 30s

Final Score: (1.0 × 0.4) + (1.0 × 0.4) + (1.0 × 0.2) - 0 = 1.0
Grade: S RANK 🏆
```

### Good A Rank
```
Evidence Collected: 11 / 12
Logic Connections Made: 5 / 5 ✓
Contradictions Found: 3 / 3 ✓
Interview Accuracy: 85%
Time Taken: 18m 45s

Final Score: (0.85 × 0.4) + (0.917 × 0.4) + (0.5 × 0.2) - 0 = 0.807
Grade: A RANK
```

### Average B Rank
```
Evidence Collected: 10 / 12
Logic Connections Made: 4 / 5
Contradictions Found: 2 / 3
Interview Accuracy: 75%
Time Taken: 28m 15s

Final Score: (0.75 × 0.4) + (0.833 × 0.4) + (0 × 0.2) - 0 = 0.633
Grade: B RANK
```

### Needs Improvement C Rank
```
Evidence Collected: 8 / 12
Logic Connections Made: 3 / 5
Contradictions Found: 1 / 3
Interview Accuracy: 60%
Time Taken: 35m 00s
Hints Used: 3

Final Score: (0.60 × 0.4) + (0.667 × 0.4) + (0 × 0.2) - 0.3 = 0.207
Grade: C RANK
```

## Visual Presentation

The CaseEvaluationScreen component displays:

1. **Large Grade Letter** (S, A, B, or C) with color coding
2. **Grade Message** based on rank achieved
3. **Animated Stat Lines** with check marks for completed items
4. **Trophy Icon** with star rating visualization
5. **Special Perfect Score Banner** for S Rank achievements
6. **Continue Button** to proceed after viewing results

All stats are revealed with staggered animations for a polished presentation effect.
