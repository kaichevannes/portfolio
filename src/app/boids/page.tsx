
'use client';

import { styled } from '@linaria/react';
import React from 'react';
import Link from 'next/link';

import { WEIGHTS, COLORS, QUERIES } from '@/constants';

import Rust from '@/svg/rust.svg';
import WebAssembly from '@/svg/webassembly.svg';
import Vite from '@/svg/vite.svg';
import CSSModules from '@/svg/cssmodules.svg';

import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hint } from '@/components/Hint';
import { Anchor } from '@/components/Anchor';
import { Section } from '@/components/Section';
import Simulation from './simulation';

export default function GitOps() {
    return (
        <MaxWidthWrapper>
            <Header />
            <Main>
                <PageTitle>
                    <div style={{ order: 1 }}>
                        <Title>Web Boids</Title>
                        <Description>I ported my dissertation to multithreaded WASM, it's blazingly fast.</Description>
                    </div>
                    <div>
                        <H3>Key Technologies</H3>
                        <Tech>
                            <TechEntry>
                                <Rust height='56px' />
                                <TechText>Rust</TechText>
                            </TechEntry>
                            <TechEntry>
                                <WebAssembly height='56px' />
                                <TechText>WebAssembly</TechText>
                            </TechEntry>
                            <TechEntry>
                                <Vite height='56px' />
                                <TechText>Vite</TechText>
                            </TechEntry>
                            <TechEntry>
                                <CSSModules height='56px' />
                                <TechText>Css Modules</TechText>
                            </TechEntry>
                        </Tech>
                    </div>
                </PageTitle>
                <Simulation />
                <Section title='Summary'>
                    <Section.Contents>
                        <p>
                            I implemented an optimised version of the Boids algorithm in Rust, improving performance further with multithreading. This compiles to <Hint hintContent='WebAssembly (WASM), is a modern web standard that runs binary code — typically compiled from LLVM supported languages like C, C++, and Rust — at near-native performance.'>WebAssembly</Hint> using service workers on the browser rather than operating system threads in Rust.
                        </p>
                    </Section.Contents>
                </Section>
                <Section title='Purpose & Goal'>
                    <Section.Contents>
                        <p>
                            I wasn't satisfied with the performance level of the Boids implementation I did for my University disseration. It worked, but it was slow — only running smoothly up to about 100 boids. It was written in python, didn't use any algorithmic optimisations, and wasn't multithreaded. Since learning React, I've also been interested in using <Hint hintContent='A frontend build tool and development server.'>Vite</Hint> and writing library code. My acceptance criteria were:
                        </p>
                        <ol>
                            <Li><Bold>Implement</Bold> an optimised Boids algorithm</Li>
                            <Li><Bold>Utilise</Bold> <Hint hintContent='A style of writing code where you first write failing tests, then get the tests to pass.'>Test Driven Development</Hint></Li>
                            <Li><Bold>Enable</Bold> multithreading natively and on the web</Li>
                            <Li><Bold>Verify</Bold> the optimisations improved performance</Li>
                        </ol>
                        <p>
                            This was all new to me so I started by reading <Anchor href='https://doc.rust-lang.org/book/'>The Rust Programming Language</Anchor> and completing ThePrimeagen's <Anchor href='https://static.frontendmasters.com/ud/c/eddf8c40d0/aPVwjxMZsP/algorithms.pdf'>Algorithms course</Anchor>.
                        </p>
                    </Section.Contents>
                </Section>
                <Section title='Spotlight'>
                    <Section.Contents>
                        <p>
                            Boids is a swarming algorithm modelled on the natural flocking patterns of birds. Each member of the swarm follows individual rules based on their surroundings, producing emergent behaviour. The Boids algorithm can produce many patterns of behaviour: <Bold>Birds</Bold> (see the <Bold>Basic</Bold> preset on the simulation above), <Bold>Fish</Bold> (see the <Bold>Maruyama</Bold> preset), and <Bold>UAVs</Bold> (see the <Bold>Zhang</Bold> preset). The Boids rules are as follows:
                        </p>
                        <ol>
                            <Li><Bold>Attraction</Bold> — move towards the center of mass of nearby swarm members</Li>
                            <Li><Bold>Alignment</Bold> — move in the same direction as nearby swarm members</Li>
                            <Li><Bold>Separation</Bold> — move away from nearby swarm members to avoid crashing</Li>
                        </ol>
                        <p>
                            The most intensive computation in the Boids algorithm is in determining neighbors. The naive algorithm is <Hint hintContent="Big O notation tells us how much an algorithm slows down as its input size increases. In this case the number of Boids in a swarm."><Bold>O(N<sup>2</sup>)</Bold></Hint>: for each N swarm member we have to check our distance to all N other swarm members. The tiled algorithm improves this by splitting the grid into tiles as large as each Boid's neighbour radius (the largest of the attraction/alignment/separation radii). This way we only have to check the Boids within 9 tiles. In practice there are a limited maximum number of Boids that can be in each tile, and so our algorithm tends towards <Bold>O(N)</Bold>. For the naive strategy and the tiled strategy, we can also add multithreading to improve the performance. In total there are four strategies:
                        </p>
                        <ol>
                            <Li><Bold>Naive</Bold></Li>
                            <Li><Bold>Naive Multithreaded</Bold></Li>
                            <Li><Bold>Tiled</Bold></Li>
                            <Li><Bold>Tiled Multithreaded</Bold></Li>
                        </ol>
                        <p>
                            We can fine tune the multithreaded case by changing the number of boids being processed at a time by each thread. I use a Rust <Hint hintContent='A crate is the Rust term for a package.'>crate</Hint> called <Anchor href='https://github.com/rayon-rs/rayon'>rayon</Anchor> which uses the work stealing multithreading strategy. Work stealing means that each thread is given a queue of work to complete, and once that queue is depleted, they can start taking work from the queues of other threads. The minimum number of boids in a thread changes how large those queues are. To improve the speed of work stealing, we can adjust this number and see which queue length gives us the best performance.
                        </p>
                    </Section.Contents>
                    <Section.Image
                        src='/split-evenly-vs-fixed-number.png'
                        intrinsicWidth={1354}
                        intrinsicHeight={217}
                        caption='Figure 1: A test showing worse performance when splitting the boids evenly between threads compared to a fixed minimum number of boids per thread. In this case, it was as minimum of 50 boids per thread. The test was run for 10000 boids over 100 times steps and 10 samples each.'
                        alt='A screenshot of a test result showing a regression of around 25%.'
                    />
                    <Section.Contents>
                        <p>
                            I noticed that the multithreading was slow with a minimum number of boids per thread at 1. I reasoned this was because of the extra overhead in splitting up the data into so many small batch sizes which were split between the threads. My first idea was to create N queues given N CPU cores. In Figure 1, we see that actually setting a minimum number of 50 boids per thread and letting rayon figure out the work stealing is faster.
                        </p>
                    </Section.Contents>
                    <Section.Image
                        src='/lines-1000.png'
                        intrinsicWidth={2062}
                        intrinsicHeight={1162}
                        caption='Figure 2: A line graph showing the average time for 1000 boids to complete 100 time steps over 100 samples using the multithreaded naive strategy as the minimum number of boids per thread changes from 1 to 1000. When the minimum number of boids per thread is very low, we get bad performance. When the minimum number of boids per thread gets close to the number of boids in the simulation, the performance starts to get worse. Somewhere between the two gives us the optimal performance. In this case, the optimal range seems to be between 150 and 250 boids per thread. This graph was generated using the criterion Rust crate.'
                        alt='A line graph with the minimum number of boids per thread on the x-axis and average time in milliseconds on the y-axis.'
                    />
                    <Section.Image
                        src='/violin-1000.png'
                        intrinsicWidth={1982}
                        intrinsicHeight={1163}
                        caption='Figure 3: A violin graph showing the same data as in Figure 2. Here we can see that the results at the extreme lows and extreme highs on the graph are less consistent than in the middle. We can infer that the optimal range between 150 and 250 for the minimum number of boids per thread is reliable. This graph was generated using the criterion Rust crate.'
                        alt='A violin graph with the average time in milliseconds on the x-axis and the minimum number of boids per thread on the y-axis.'
                    />
                    <Section.Contents>
                        <p>
                            Next, I ran a larger experiment to graph how long a swarm of 1000 boids would take to complete 100 time steps. I found that at the extreme lows and highs, the simulation takes longer. Based on the case of 1000 boids I determined that the range between 150 and 200 boids per thread was a good option.
                        </p>
                    </Section.Contents>
                    <Section.Image
                        src='/lines-200.png'
                        intrinsicWidth={2062}
                        intrinsicHeight={1062}
                        caption='Figure 4: A line graph showing the average time for 200 boids to complete 100 time steps over 100 samples using the multithreaded naive strategy as the minimum number of boids per thread changes from 1 to 200. We see a decreasing curve as the number of boids per thread increases. The fluctuation we see is a result of using only 100 samples, since the time to complete with a low minimum number of boids per thread is highly variable, as seen in Figure 5. This graph was generated using the criterion Rust crate.'
                        alt='A line graph with the minimum number of boids per thread on the x-axis and the average time in milliseconds on the y-axis.'
                    />
                    <Section.Image
                        src='/violin-200.png'
                        intrinsicWidth={2273}
                        intrinsicHeight={1061}
                        caption='Figure 5: A violin graph showing the same data as in Figure 4. We see that at a lower minimum number of boids per thread the results are more variable, explaining the fluctuation in Figure 4. As the number of boids per thread increase, the results become more certain, even as the minimum number of boids per thread is equal to the number of boids in the simulation. This graph was generated using the criterion Rust crate.'
                        alt='A violin graph with the average time in milliseconds on the x-axis and the minimum number of boids per thread on the y-axis.'
                    />
                    <Section.Contents>
                        <p>
                            To confirm that this range was reasonable, I did another test on a swarm of 200 boids. I found that with fewer Boids, the number of boids per thread isn't as important. Based on the two experiments, I chose 200 boids per thread as the default.
                        </p>
                    </Section.Contents>
                    <Section.Image
                        src='/strategy-comparison.png'
                        intrinsicWidth={2062}
                        intrinsicHeight={1162}
                        caption='Figure 6: A comparison of strategies using a boids per thread of 200, ranging from 1–10000 boids in the swarm for 1000 time steps over 100 samples. At the low end of the graph, we see that until an inflexion point at 100 boids, the single-threaded and multithreaded versions of each strategy perform equally, with the naive strategy outperforming the tiled strategy. After the inflexion point at 100 boids we see that the tiled strategy now outperforms the naive strategy and the multithreaded versions of each strategy outperform the single-threaded versions. Looking at the case of 10000 boids, the single-threaded naive strategy performs the worst, taking about 500 seconds on average to perform 1000 time steps. Next best is the multithreaded naive strategy, taking 100 seconds on average. Beating the naive multithreaded strategy, the single-threaded tiled strategy takes an average of 40 seconds, and best of all is the multithreaded tiled strategy, resulting in just 10 seconds. This graph was generated using the criterion Rust crate.'
                        alt='A line graph with four lines on it labelled as naive, naive_mt (multithreaded naive), tiled, tiled_mt (multithreaded tiled). The number of boids in the simulation is on the x-axis and the average time in seconds is on the y-axis.'
                    />
                    <Section.Contents>
                        <p>
                            After justifying a number of boids per thread default, I ran a larger simulation to see how the performance of the different algorithms compared. The results are seen in Figure 6. They show the tiled strategy outperforms the naive strategy and that multithreading has been implemented successfully, performing better than the single-threaded strategies. I was surprised that the single-threaded tiled algorithm outperformed the multithreaded naive algorithm, it shows how much more important algorithmic complexity is than computational power.
                        </p>
                    </Section.Contents>
                </Section>
                <Section title='Challenges'>
                    <Section.Contents>
                        <p>
                            This was far and away the most ambitious project I have ever attempted. WebAssembly is notoriously challenging to set up, and I decided not only to try and use multithreaded <Hint hintContent='WebAssembly'>WASM</Hint> — requiring me to use a nightly build of <em>Rust</em> with specific feature flags to even compile my project — but also bundle it into a Vite library using Rollup, then import it as an <Hint hintContent='Node Package Manager. A public registry and command-line tool for publishing and installing JavaScript packages.'>npm</Hint> package into a Next.js project that uses Webpack, with next to no documentation to follow because nobody else is mad enough to try to import multithreaded WASM into a Next.js application!
                        </p>
                        <p>
                            I had a lot of difficulty building my project into WebAssembly with threads. The documentation wasn't very clear, and WASM doesn't natively support threads in the same way that operating systems do. In WASM you need to use Service Workers, and they need to be spawned from JavaScript. This means you need to add a binding between Rust and JavaScript so that when you would usually create an operating system thread in Rust, you instead create a Service Worker in WASM. I used the <Anchor href="https://github.com/RReverser/wasm-bindgen-rayon">wasm-bindgen-rayon</Anchor> crate to bridge the gap between rayon and WASM.
                        </p>
                        <p>
                            While I was testing, every time that I enabled multithreading, my simulation started to run more slowly! I knew from my Rust benchmarks that the multithreaded code was faster natively, so I thought there must be some extra overhead in copying data between Service Workers in WASM and that was why it was slower. I ended up rearchitecting my code to remove all cloning of values in the multithreaded version and still it was slower. Now I thought that the WASM code must just not be initialising correctly but after confirming that the code really was running on different WASM threads I was at a loss and just decided to call the WASM multithreading a failure. At this point, I started implementing the rest of the sliders and buttons for the controls and when playing around with the values I found that when I increased the attraction, alignment, or separation radii enough, multithreading actually <em>was</em> faster. It was working the whole time... I was just testing it on the wrong values.
                        </p>
                        <p>
                            Eventually, it came to importing my Vite library into Next.js. I had already got the link working before I started writing the Boids implementation so I thought it would be as simple as publishing the new package version to npm and seeing it work. I was very wrong. Somewhere between "Hello world" and "full multithreaded Boids implementation", something broke, and I immediately regretted not continuously checking the build pipeline as I made changes.
                        </p>
                        <p>
                            Because I split my project into a WASM section, a Vite library, and a library consumer in my portfolio, it would have required me to build the WebAssembly, publish a new package version, then update the package version on my portfolio just to check if the change worked. This added friction disincentivised me from checking if any changes I made caused the link to break, and thus meant I was now entirely lost as to why it wasn't compiling.
                        </p>
                        <p>
                            I found the magical Webpack config necessary for the single-threaded code to load, but the multithreaded code was crashing on worker instantiation. Several days of debugging later I came to the conclusion that the issue was likely to do with how Webpack handles dynamic imports, and dozens of patch versions later, I ran out of time. To see the multithreading code in action, run the test app in the Vite library <Anchor href='https://github.com/kaichevannes/react-boids'>source code</Anchor>.
                        </p>
                    </Section.Contents>
                </Section>
                <Section title='Lessons Learned'>
                    <Section.Contents>
                        <p>
                            My main take away from this project is that Test Driven Development is awesome. Since the simulation code and the visualisation were separate — and I worked on the simulation code first — I had no way of knowing whether or not my code was doing what I thought it was. Writing the tests first and then getting them to pass left me with full confidence that my simulation was correct, and when I wrote the visualiser, the simulation code worked first try.
                        </p>
                        <p>
                            This is a stark contrast to my dissertation, where two months before submission I realised the simulation code had a massive bug in it: one of the Boids rules was being skipped over entirely due to a typo. I didn't have enough time left to rerun the necessary simulations for my write-up, and had to accept the failure. If I had properly utilised TDD, I wouldn't have had this problem.
                        </p>
                        <p>
                            My dissertation started as a TDD project, but my tests quickly became unmaintable since I was testing not just the public API, but also implementation details: my tests became coupled to the code, under time pressure I couldn't keep them up to date, the tests no longer represented working code, and they stopped being run. Since then, I've learned that for TDD to work, you need to test behaviour, not implementation.
                        </p>
                        <p>
                            Architecturally, I learned an important lesson in the cost of getting different systems to work together. Getting just WebAssembly working in Rust isn't all that difficult, writing a React library in Vite isn't all that difficult, importing a React library into a Next.js project isn't all that difficult. The astonishing difficulty comes when you put all of these systems together. When something fails, there is an enormous surface area of potential failure points.
                        </p>
                        <p>
                            There is so much configuration involved in the web, and so many community plugins to get things like WebAssembly working, more to get WebAssembly working with threads, more still when you need to get the same source code to work with different bundlers. Each one of those plugins is another potential point of failure that must be considered. My time and effort was mostly spent on getting my code to build in the different environments, and when we spend so much time on the accidental complexity these technologies inevitably bring to our architecture, the benefits they yield don't necessarily outweigh their costs.
                        </p>
                        <p>
                            In future projects, I will follow the maxim of only adopting dependencies that reduce complexity. More dependencies might mean more power, but it also means more time spent managing the complicated links between them. With more points of failure, and more reliance on the external world, we are left with a more brittle architecture.
                        </p>
                        <p>
                            As programmers, our goal isn't to use the mightiest technologies, it's to deliver working software. If our mighty technologies prevent us from shipping code, they're worth nothing.
                        </p>
                    </Section.Contents>
                </Section>
                <nav>
                    <PageLink href='/gitops'>{"<- GitOps"}</PageLink>
                </nav>
            </Main>
            <Footer />
        </MaxWidthWrapper >
    )
};

const Main = styled.div`
  padding-top: 96px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${QUERIES.tabletAndDown} {
    padding-top: 32px;
  }
`;

const PageTitle = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: 24px 32px;

  @media ${QUERIES.tabletAndDown} {
    display: flex;
    flex-direction: column-reverse;
    gap: revert;
  }
`;

const H3 = styled.h3`
  color: var(--color-grey900);
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};

  @media ${QUERIES.tabletAndDown} {
    font-size: ${24 / 16}rem;
  }
`;

const Tech = styled.div`
  display: flex;
  justify-content: space-between;
  height: 128px;
  padding-top: 8px;

  @media ${QUERIES.tabletAndDown} {
    justify-content: flex-start;
    gap: 48px;
  }

  @media ${QUERIES.mobileAndDown} {
    justify-content: space-between;
    gap: revert;
  }
`;

const TechEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text);
`;

const TechText = styled.p`
  font-size: ${16 / 16}rem;
  font-weight: ${WEIGHTS.regular};
  color: var(--color-grey500);
  white-space: nowrap;
`;

const Title = styled.h1`
  font-size: ${48 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-text);
  transform: translateY(-11px);
`;

const Description = styled.p`
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  color: var(--color-grey500);
  transform: translateY(-12px);
`;

const VideoWrapper = styled.div`
  margin-top: -18px;
  position: relative;
`;

const LightVideoWrapper = styled(VideoWrapper)`
  padding: 24px;
  box-shadow:
    inset
    1px 2px 4px
    hsl(var(--color-shadow) / 0.3);
  border-radius: 1px;

  & video {
    box-shadow:
      2px 2px 4px
      hsl(var(--color-shadow) / 0.3);
  }

  @media ${QUERIES.tabletAndDown} {
    padding: 16px;
    margin-top: -36px;
  }
`;

const DarkVideoWrapper = styled(VideoWrapper)`
  // to prevent anti-aliasing bug
  will-change: transform;
  border-radius: 8px;
  box-shadow: var(--shadow);
`;

const Video = styled.video`
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;

const PlayPauseWrapper = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 64px;
  height: 64px;
  opacity: 0;
  transition: opacity 250ms;
  color: ${COLORS.background['light']};

  ${VideoWrapper}:hover & {
    opacity: 1;
    transition: opacity 200ms;
  }
`;

const Bold = styled.strong`
  font-weight: ${WEIGHTS.semibold};
  color: var(--color-grey700);
`;

const Li = styled.li`
  &::marker {
    color: var(--color-primary);
  }
`;

const Caption = styled.figcaption`
  font-size: ${16 / 16}rem;
  font-weight: ${WEIGHTS.regular};
  color: var(--color-grey300);
  text-align: center;
`;

const PageLink = styled(Link)`
  float: left;
  text-decoration: none;
  margin-top: 72px;
  color: var(--color-text);
  font-size: ${40 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  letter-spacing: -2%;
  text-wrap: nowrap;

  @media ${QUERIES.tabletAndDown} {
    margin-top: 48px;
  }

  @media ${QUERIES.mobileAndDown} {
    margin-top: 32px;
  }

  transition: transform 300ms;
  &:hover,
  &:focus {
    transition: transform 150ms;
    transform: scale(1.01);
  }
`;
