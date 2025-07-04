'use client';

import { styled } from '@linaria/react';
import { useEffect, useRef, useState } from 'react';
import { Tabs } from "radix-ui";
import Play from '@/svg/play.svg';
import Pause from '@/svg/pause.svg';
import { QUERIES, WEIGHTS } from '@/constants';
import { Hint } from '@/components/Hint';
import { Anchor } from '@/components/Anchor';

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
        <Wrapper id="simulation">
            <Boids.Root>
                <CanvasWrapper onClick={togglePlayback}>
                    <Boids.Canvas width={1036} height={789} />
                    <PlayPauseWrapper>
                        {playing ? <Pause /> : <Play />}
                    </PlayPauseWrapper>
                </CanvasWrapper>
                <PlaybackWrapper>
                    <Boids.Playback ref={playbackRef} />
                </PlaybackWrapper>
                <Root defaultValue="basic">
                    <List>
                        <Trigger value="basic">
                            Behaviour
                        </Trigger>
                        <Trigger value="advanced">
                            Simulation
                        </Trigger>
                        <DesktopOnly />
                    </List>
                    <Content value="basic" aria-label="Basic controls">
                        <Controls>
                            <Boids.Count />
                            <Boids.Density />
                            <Boids.AttractionWeighting />
                            <Boids.AttractionRadius />
                            <Boids.AlignmentWeighting />
                            <Boids.AlignmentRadius />
                            <Boids.SeparationWeighting />
                            <Boids.SeparationRadius />
                            <Boids.MaxVelocity />
                            <Boids.Noise />
                            <PresetWrapper>
                                <Boids.Preset />
                            </PresetWrapper>
                        </Controls>
                    </Content>
                    <Content value="advanced" aria-label="Advanced controls">
                        <Controls>
                            <CheckboxWrapper>
                                <Hint
                                    hintContent={
                                        <p>
                                            I ran out of time while trying to get the multithreading code to bundle correctly on NextJS. I discuss this in the challenges section below. To see multithreading in action run the <Anchor href='https://github.com/kaichevannes/react-boids'>source code</Anchor>.
                                        </p>
                                    }
                                >
                                    <Boids.Multithreaded disabled />
                                </Hint>
                            </CheckboxWrapper>
                            <DropdownWrapper>
                                <Boids.Algorithm />
                            </DropdownWrapper>
                            <CheckboxWrapper>
                                <Boids.CountLimiter />
                            </CheckboxWrapper>
                            <CheckboxWrapper>
                                <Boids.Fps />
                            </CheckboxWrapper>
                            <Boids.BoidsPerThread />
                        </Controls>
                    </Content>
                </Root>
            </Boids.Root>
        </Wrapper >
    );
}

const Root = styled(Tabs.Root)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    border: 2px solid var(--color-grey700);
    border-radius: 16px;
    font-size: ${20 / 16}rem;
    box-shadow: var(--shadow);
    margin-bottom: 8px;
`;

const CheckboxWrapper = styled.div`
    & div {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    & div label {
        flex: 1;
    }

    & div input {
        width: 16px;
        height: 16px;
        accent-color: var(--color-text);
    }
`;

const DropdownWrapper = styled.div`
    & div {
        display: flex;
        justify-content: space-between;
    }

    & div label {
        flex: 1;
    }

    & div select {
        background-color: var(--color-background);
        color: var(--color-text);
        border: 1px solid var(--color-text);
        border-radius: 4px;
        padding: 0px 8px;
    }

    & div select option {
    }
`;

const PresetWrapper = styled(DropdownWrapper)`
    @media ${QUERIES.mobileAndDown} {
        order: -1;
        margin-bottom: 4px;
    }
`;

const List = styled(Tabs.List)`
    display: flex;
`;

const Trigger = styled(Tabs.Trigger)`
    all: unset;
    display: flex;
    flex-basis: 128px;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    background-color: var(--color-grey700);
    color: var(--color-background);
    font-weight: ${WEIGHTS.medium};

    &:first-child {
        border-top-left-radius: 8px;
    }
    &:last-child {
        border-top-right-radius: 8px;
    }
    &[data-state="active"] {
        background-color: var(--color-primary);
    }

    @media ${QUERIES.tabletAndDown} {
        flex: 1;
    }
`;

const Content = styled(Tabs.Content)`
    font-weight: ${WEIGHTS.medium};
`;

const DesktopOnly = styled.div`
    flex: 1;
    background-image: repeating-linear-gradient(
        135deg,
        var(--color-grey700),
        var(--color-grey700) 10px,
        var(--color-background) 10px,
        var(--color-background) 20px
    );
    border-top-right-radius: 8px;
    @media ${QUERIES.tabletAndDown} {
        display: none;
    }
`;

const Controls = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    @media ${QUERIES.tabletAndDown} {
        column-gap: 8px;
        row-gap: 0px;
    }

    @media ${QUERIES.mobileAndDown} {
        grid-template-columns: 1fr;
    }
`;

const Wrapper = styled.div`
    display: grid;
    place-content: center;
    gap: 24px;
`;

const CanvasWrapper = styled.div`
    position: relative;
    display: none;

    @media (prefers-reduced-motion: no-preference) {
        display: revert;
    }
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
