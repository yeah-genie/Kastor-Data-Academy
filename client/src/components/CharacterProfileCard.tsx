import { Star } from "lucide-react";
import { CharacterEvidence } from "@/lib/stores/useDetectiveGame";

interface CharacterProfileCardProps {
  character: CharacterEvidence;
}

export function CharacterProfileCard({ character }: CharacterProfileCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <div className="flex flex-col">
        <div className="flex gap-3 md:gap-4 mb-3">
          {character.photo && (
            <img 
              src={character.photo} 
              alt={character.name} 
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover object-center border-2 border-blue-400 shadow-lg flex-shrink-0" 
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-1">{character.name}</h4>
            <p className="text-sm md:text-base text-blue-600 font-semibold mb-2">{character.role}</p>
            {character.suspicionLevel !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-gray-600 font-medium">Suspicion Level:</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < (character.suspicionLevel || 0) ? 'fill-red-400 text-red-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm">
            <p className="text-xs md:text-sm font-bold text-blue-600 mb-1.5">PROFILE</p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">{character.description}</p>
          </div>
          
          {character.personality && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm">
              <p className="text-xs md:text-sm font-bold text-purple-600 mb-1.5">PERSONALITY</p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">{character.personality}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
