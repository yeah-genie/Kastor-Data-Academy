import { useEffect } from "react";
import { useDetectiveGame } from "./lib/stores/useDetectiveGame";
import { useAudio } from "./lib/stores/useAudio";
import { StartMenu } from "./components/StartMenu";
import { GameScene } from "./components/GameScene";
import "@fontsource/inter";

function App() {
  const { phase } = useDetectiveGame();
  const { setBackgroundMusic, setSuccessSound } = useAudio();

  useEffect(() => {
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    const successSound = new Audio("/sounds/success.mp3");
    successSound.volume = 0.5;
    setSuccessSound(successSound);
  }, [setBackgroundMusic, setSuccessSound]);

  return (
    <div className="min-h-screen bg-slate-900">
      {phase === "menu" && <StartMenu />}
      {phase !== "menu" && <GameScene />}
    </div>
  );
}

export default App;
