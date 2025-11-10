# Episode 1: Reconstruction Complete

## Overview

Episode 1 has been fully reconstructed with the interactive Ace Attorney-style detective gameplay, combining data analysis with investigative mechanics.

## Story Flow

### **Act 1: Introduction (Stage 1)**
1. **Opening Scene** - Detective office introduction
2. **First Meeting** - Meet Kastor (AI assistant)
3. **Email Arrives** - Maya Chen's urgent request
4. **Initial Assessment** - First choice about the case

### **Act 2: Investigation (Stage 2)**
1. **📊 Graph Analysis** - Interactive chart analysis
   - Analyze Shadow, Phoenix, Viper win rates
   - Identify the abnormal spike on Day 28

2. **📄 Document Examination** - Patch notes review
   - Check official documentation
   - Find discrepancy: Shadow listed as "No changes"

3. **🔍 Server Logs Examination** - Find the smoking gun
   - Discover admin01 modification at 23:47
   - Find log deletion attempt

### **Act 3: Data Preprocessing (Stage 3)**
1. **🧩 Logic Connection Puzzle** - Connect the clues
   - Link: Power Spike → No Official Patch → Unauthorized Modification

2. **Suspect Identification** - Maya reveals admin01 = Ryan

3. **⏰ Timeline Reconstruction** - Drag & drop events
   - Order Ryan's activities chronologically
   - Reveal he logged in from home after hours

4. **Interviews** - Daniel and Alex alibis

### **Act 4: Evidence Analysis (Stage 4)**
1. **IP Tracking** - Discover Ryan = Noctis player

2. **⚖️ Testimony Press** - Ace Attorney mechanics
   - Press Ryan's statements
   - Find contradictions with evidence
   - Present evidence to expose lies

3. **📋 Evidence Chain Presentation** - Final proof
   - Arrange evidence in logical order
   - Build airtight case

### **Act 5: Resolution (Stage 5)**
1. **Confession** - Ryan admits guilt
2. **Motive Revealed** - Wanted to win tournaments
3. **Case Summary** - Complete deduction
4. **Reactions** - NPCs respond to truth
5. **Case Closed** - Victory!

## Interactive Mechanics

### **6 Interactive Sequences**

1. **Graph Analysis** (`GraphAnalysisInteractive`)
   - Interactive line chart
   - Multiple choice selection
   - Identifies data anomalies

2. **Document Examination** (`DocumentExamination`)
   - Click to examine sections
   - Highlights suspicious information
   - Two instances: Patch notes & server logs

3. **Logic Connection Puzzle** (`LogicConnectionPuzzle`)
   - Connect thoughts to form deductions
   - Brain-teaser style
   - Reveals logical conclusions

4. **Timeline Reconstruction** (`TimelineReconstruction`)
   - Drag & drop event ordering
   - Identifies suspicious activities
   - Chronological verification

5. **Testimony Press** (`TestimonyPress`)
   - Press for more information
   - Present evidence for contradictions
   - "OBJECTION!" moments
   - 4 statements with 2 contradictions

6. **Evidence Chain** (`EvidenceChainPresentation`)
   - Arrange evidence in order
   - Builds complete case
   - 5-step logical chain

## Characters

### **Main Characters**
- **Detective (You)** - The player
- **Kastor** - AI assistant/narrator (hints and guidance)

### **Suspects & NPCs**
- **Maya Chen** - Game Director (client)
- **Ryan Nakamura** - Balance Designer (culprit)
- **Daniel Schmidt** - Senior Engineer (witness)
- **Alex Torres** - Player (red herring)

## Technical Implementation

### **New Files Created**
1. `case1-interactive-story.ts` - Original interactive version
2. `InteractiveSequenceHandler.tsx` - Sequence router component
3. `GraphAnalysisInteractive.tsx` - Chart interaction
4. `LogicConnectionPuzzle.tsx` - Logic puzzle
5. `TimelineReconstruction.tsx` - Timeline DnD
6. `TestimonyPress.tsx` - Ace Attorney testimony
7. `EvidenceChainPresentation.tsx` - Evidence ordering
8. `DocumentExamination.tsx` - Document inspector
9. `CaseEvaluationScreen.tsx` - Dynamic grading

### **Updated Files**
1. `case1-story-new.ts` - Replaced with interactive story
2. `GameScene.tsx` - Added interactive sequence handler
3. `useDetectiveGame.tsx` - Added metrics tracking
4. `TypewriterText.tsx` - Added character-by-character scroll trigger
5. All interactive components - Added metric recording

### **Story Node Structure**
```typescript
{
  id: string;
  phase: "stage1" | "stage2" | "stage3" | "stage4" | "stage5";
  messages: Message[];
  interactiveSequence?: InteractiveSequence; // NEW!
  question?: Question;
  autoAdvance?: AutoAdvance;
}
```

### **Interactive Sequence Structure**
```typescript
{
  type: "graph_analysis" | "logic_connection" | ... ;
  id: string;
  data: {
    // Sequence-specific data
  };
}
```

## Player Experience Flow

```
Read dialogue
    ↓
Interactive mini-game appears (fullscreen overlay)
    ↓
Complete puzzle/analysis
    ↓
Metrics recorded automatically
    ↓
Return to story with new information
    ↓
Make choice based on findings
    ↓
Story continues
    ↓
...repeat...
    ↓
Final evaluation screen with dynamic grade
```

## Grading Integration

All interactive sequences now contribute to final grade:
- **Graph Analysis** ✓ Counted
- **Logic Connections** ✓ Tracked (2 connections)
- **Timeline** ✓ Completion tracked
- **Testimony** ✓ Contradictions counted (2 found)
- **Evidence Chain** ✓ Completion tracked
- **Document Exams** ✓ Both tracked

**Final Grade Based On:**
- Evidence collected
- Logic connections made
- Contradictions found
- Interview accuracy
- Time taken
- Hints used

## Language

Fully in English with natural dialogue flow. Korean comments removed, story translated professionally to maintain narrative quality and detective game feel.

## Key Features

✅ Ace Attorney-style investigation
✅ Data analysis focus (charts, logs, timelines)
✅ Interactive puzzles requiring player engagement
✅ Full tracking of player performance
✅ Dynamic grading system
✅ Auto-scroll during gameplay
✅ Smooth transitions between story and gameplay
✅ Professional English narrative

Episode 1 is now a complete interactive detective experience!
