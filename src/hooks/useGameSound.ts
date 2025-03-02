import wonSound from './../assets/sound/win.m4a'
import lostSound from './../assets/sound/lost.m4a'
import sound1 from './../assets/sound/1.m4a'
import sound2 from './../assets/sound/2.m4a'
import sound3 from './../assets/sound/3.m4a'
import sound4 from './../assets/sound/4.m4a'
import sound5 from './../assets/sound/5.m4a'
import sound6 from './../assets/sound/6.m4a'
import sound7 from './../assets/sound/7.m4a'
import sound8 from './../assets/sound/8.m4a'
import sound9 from './../assets/sound/9.m4a'
import sound10 from './../assets/sound/10.m4a'
import {useRef} from "react";

export enum GameSounds {
    SOUND_1,
    SOUND_2,
    SOUND_3,
    SOUND_4,
    SOUND_5,
    SOUND_6,
    SOUND_7,
    SOUND_8,
    SOUND_9,
    SOUND_10,
    WON,
    LOST,
}

const gameSoundsMap = {
    [GameSounds.SOUND_1]: sound1,
    [GameSounds.SOUND_2]: sound2,
    [GameSounds.SOUND_3]: sound3,
    [GameSounds.SOUND_4]: sound4,
    [GameSounds.SOUND_5]: sound5,
    [GameSounds.SOUND_6]: sound6,
    [GameSounds.SOUND_7]: sound7,
    [GameSounds.SOUND_8]: sound8,
    [GameSounds.SOUND_9]: sound9,
    [GameSounds.SOUND_10]: sound10,
    [GameSounds.WON]: wonSound,
    [GameSounds.LOST]: lostSound,
}

export const useGameSound = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const play = (sound: GameSounds) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const soundPath = gameSoundsMap[sound];
        audioRef.current = new Audio(soundPath);
        void audioRef.current.play();
    };

    const stop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    return { play, stop };
};