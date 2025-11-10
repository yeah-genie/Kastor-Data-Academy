import { GraphAnalysisInteractive } from "./GraphAnalysisInteractive";
import { LogicConnectionPuzzle } from "./LogicConnectionPuzzle";
import { TimelineReconstruction as TimelineReconstructionOld } from "./TimelineReconstruction";
import { TestimonyPress } from "./TestimonyPress";
import { EvidenceChainPresentation } from "./EvidenceChainPresentation";
import { DocumentExamination } from "./DocumentExamination";
import { DatabaseSearch } from "./DatabaseSearch";
import { CaseReportAssembly } from "./CaseReportAssembly";
import { LogFilteringSequence } from "./interactive/LogFilteringSequence";
import { GhostAccountSelection } from "./interactive/GhostAccountSelection";
import { PatternMatching } from "./interactive/PatternMatching";
import { TimelineReconstruction } from "./interactive/TimelineReconstruction";
import { CodeDebugging } from "./interactive/CodeDebugging";
import { InteractiveSequence } from "@/data/case1-story-new";

interface InteractiveSequenceHandlerProps {
  sequence: InteractiveSequence;
  onComplete: () => void;
}

export function InteractiveSequenceHandler({ sequence, onComplete }: InteractiveSequenceHandlerProps) {
  switch (sequence.type) {
    case "graph_analysis":
      return (
        <GraphAnalysisInteractive
          series={sequence.data.series}
          question={sequence.data.question}
          correctAnswer={sequence.data.correctAnswer}
          onComplete={onComplete}
        />
      );

    case "logic_connection":
      return (
        <LogicConnectionPuzzle
          thoughts={sequence.data.thoughts}
          correctConnections={sequence.data.correctConnections}
          onComplete={onComplete}
        />
      );

    case "timeline_reconstruction":
      // Check if it's old format (array) or new format (object with events array)
      if (Array.isArray(sequence.data.events) && sequence.data.events.length > 0 && sequence.data.events[0].correctPosition) {
        // New format - use new component
        return (
          <TimelineReconstruction
            data={sequence.data}
            onComplete={onComplete}
          />
        );
      } else {
        // Old format - use old component
        return (
          <TimelineReconstructionOld
            events={sequence.data.events}
            onComplete={onComplete}
          />
        );
      }

    case "testimony_press":
      return (
        <TestimonyPress
          statements={sequence.data.statements}
          onComplete={onComplete}
        />
      );

    case "evidence_presentation":
      return (
        <EvidenceChainPresentation
          evidencePieces={sequence.data.evidencePieces}
          onComplete={onComplete}
        />
      );

    case "document_examination":
      return (
        <DocumentExamination
          title={sequence.data.title}
          sections={sequence.data.sections}
          onComplete={onComplete}
        />
      );

    case "database_search":
      return (
        <DatabaseSearch
          searchType={sequence.data.searchType}
          searchValue={sequence.data.searchValue}
          results={sequence.data.results}
          onComplete={onComplete}
        />
      );

    case "case_report_assembly":
      return (
        <CaseReportAssembly
          fields={sequence.data.fields}
          evidenceChecklist={sequence.data.evidenceChecklist}
          onComplete={onComplete}
        />
      );

    case "log_filtering":
      return (
        <LogFilteringSequence
          data={sequence.data}
          onComplete={(userSelections) => {
            // userSelections contains the IDs of logs the user kept
            // You can validate or store these if needed
            onComplete();
          }}
        />
      );

    case "ghost_account_selection":
      return (
        <GhostAccountSelection
          data={sequence.data}
          onComplete={(correctCount) => {
            // Score based on correct count
            onComplete();
          }}
        />
      );

    case "pattern_matching":
      return (
        <PatternMatching
          data={sequence.data}
          onComplete={(accuracy) => {
            // Score based on accuracy
            onComplete();
          }}
        />
      );

    case "code_debugging":
      return (
        <CodeDebugging
          data={sequence.data}
          onComplete={(correctCount) => {
            // Score based on correct count
            onComplete();
          }}
        />
      );

    default:
      return null;
  }
}
