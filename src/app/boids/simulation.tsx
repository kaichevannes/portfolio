'use client';

import { styled } from '@linaria/react';
import { useEffect, useRef, useState } from 'react';
import { Tabs } from "radix-ui";
import Play from '@/svg/play.svg';
import Pause from '@/svg/pause.svg';

import { COLORS } from '@/constants';

export default function Simulation() {
    const [Boids, setBoids] = useState<any>(null);
    const [playing, setPlaying] = useState(true);
    const playbackRef = useRef<HTMLButtonElement>(null);

    const togglePlayback = () => {
        if (!playbackRef.current) return;
        playbackRef.current.click();
        setPlaying(!playing)
    }

    useEffect(() => {

        (async () => {
            const mod = await import('@kaichevannes/react-boids');
            setBoids(mod.Boids);
        })();
    }, []);

    if (!Boids) {
        return <div>Loading Boids...</div>;
    }

    return (
        <Wrapper>
            <Boids.Root>
                <CanvasWrapper onClick={() => {
                    console.log('here');
                    togglePlayback();
                }}>
                    <Boids.Canvas width={1036} height={789} />
                    <PlayPauseWrapper>
                        {playing ? <Pause /> : <Play />}
                    </PlayPauseWrapper>
                </CanvasWrapper>
                <PlaybackWrapper>
                    <Boids.Playback ref={playbackRef} />
                </PlaybackWrapper>
                <Tabs.Root defaultValue="basic">
                    <Tabs.List>
                        <Tabs.Trigger value="basic">
                            Basic
                        </Tabs.Trigger>
                        <Tabs.Trigger value="advanced">
                            Advanced
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="basic" aria-label="Basic controls">
                        <Controls>
                            <Boids.Count />
                            <Boids.Density />
                            <Boids.AttractionWeighting />
                            <Boids.AlignmentRadius />
                            <Boids.AlignmentWeighting />
                            <Boids.AttractionRadius />
                            <Boids.SeparationWeighting />
                            <Boids.SeparationRadius />
                            <Boids.MaxVelocity />
                            <Boids.Noise />
                            <Boids.Preset />
                        </Controls>
                    </Tabs.Content>
                    <Tabs.Content value="advanced" aria-label="Advanced controls">
                        <Controls>
                            <Boids.Multithreaded />
                            <Boids.Algorithm />
                            <Boids.BoidsPerThread />
                            <Boids.CountLimiter />
                        </Controls>
                    </Tabs.Content>
                </Tabs.Root>
            </Boids.Root>
        </Wrapper >
    );
}

const Controls = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 8px;
`;

const Wrapper = styled.div`
    // padding: 0px 64px;
    display: grid;
    place-content: center;
`;

const CanvasWrapper = styled.div`
    position: relative;
`;

const PlaybackWrapper = styled.div`
    display: none;
`;

const PlayPauseWrapper = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 64px;
  height: 64px;
  opacity: 0;
  transition: opacity 250ms;
  color: var(--color-text);

  ${CanvasWrapper}:hover & {
    opacity: 1;
    transition: opacity 200ms;
  }
`;
