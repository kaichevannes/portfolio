'use client';

import { styled } from '@linaria/react';
import React, { CSSProperties } from 'react';

import { WEIGHTS, COLORS } from '@/constants';

import OracleCloud from '@/svg/oracle-cloud.svg';
import Ansible from '@/svg/ansible.svg';
import Kubernetes from '@/svg/kubernetes.svg';
import Flux from '@/svg/flux.svg';
import Play from '@/svg/play.svg';
import Pause from '@/svg/pause.svg';

import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hint } from '@/components/Hint';
import { Anchor } from '@/components/Anchor';
import { Section } from '@/components/Section';

export default function GitOps() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(true);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  }

  return (
    <MaxWidthWrapper>
      <Header />
      <Main>
        <PageTitle>
          <div>
            <H3>Key Technologies</H3>
            <Tech>
              <TechEntry>
                <OracleCloud height='56px' />
                <TechText>Oracle Cloud</TechText>
              </TechEntry>
              <TechEntry>
                <Ansible height='56px' />
                <TechText>Ansible</TechText>
              </TechEntry>
              <TechEntry>
                <Kubernetes height='56px' />
                <TechText>Kubernetes</TechText>
              </TechEntry>
              <TechEntry>
                <Flux height='56px' />
                <TechText>Flux</TechText>
              </TechEntry>
            </Tech>
          </div>
          <div>
            <Title>GitOps</Title>
            <Description>Kubernetes with no manual steps. How I self-host this portfolio for free.</Description>
          </div>
          <FullBleed>
            <figure>
              <VideoWrapper onClick={togglePlayback}>
                <Video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  loop
                  muted
                  src='/cluster-bootstrap.mp4'
                  style={{
                    opacity: playing ? 1 : 0.75,
                  }}
                />
                <PlayPauseWrapper>
                  {playing ? <Pause /> : <Play />}
                </PlayPauseWrapper>
              </VideoWrapper>
              <Caption>Figure 1: Bootstrapping the VM with Ansible</Caption>
            </figure>
          </FullBleed>
        </PageTitle>
        <Section title='Summary'>
          <SectionContents>
            <p>
              I set up a <Hint>CI/CD</Hint> pipeline using GitHub Actions to automate site updates. On each merge to `main` it follows Docker’s “<Bold>build → ship → run</Bold>” methodology:
            </p>
            <ol>
              <Li><Bold>Build</Bold> a Docker image of the site</Li>
              <Li><Bold>Ship</Bold> the image to GitHub’s Container Registry</Li>
              <Li><Bold>Run</Bold> the image on my always-free Oracle Cloud <Hint>VM</Hint></Li>
            </ol>
            <p>
              I bootstrap the VM with <Hint>Ansible</Hint>, setting up <Hint>Kubernetes</Hint> and <Hint>Flux</Hint> seen in Figure 1. Flux watches the portfolio's <Anchor href='https://github.com/kaichevannes/portfolio'>Git repository</Anchor> and syncs the cluster with its state.
            </p>
          </SectionContents>
        </Section>
        <Section title='Purpose & Goal'>
          <SectionContents>
            <p>
              I became interested in <Hint>DevOps</Hint> after reading The Phoenix Project during my 2023 summer internship at Thought Quarter. I saw this project as an opportunity to improve my mental model of CI/CD technologies and Docker. My acceptance criteria were:
            </p>
            <ol>
              <Li><Bold>One-click</Bold> cluster bootstrap</Li>
              <Li><Bold>One-click</Bold> deploy</Li>
              <Li><Bold>Zero-downtime</Bold> rolling updates</Li>
            </ol>
            <p>
              To build a foundation, I completed <Anchor href='https://www.udemy.com/certificate/UC-c44e8380-3f04-4ec5-9ba1-79e84fdadc8e/'>Docker Mastery</Anchor> and <Anchor href='https://www.udemy.com/certificate/UC-64b4f7e8-f42d-4f9a-88db-fc2634b40f90/'>Kubernetes Mastery</Anchor> by Bret Fisher on Udemy.
            </p>
          </SectionContents>
        </Section>
        <Section title='Spotlight'>
          <SectionContents>
            <p>
              GitOps changes the <Bold>run</Bold> stage of <Bold>build → ship → run</Bold>. Instead of <em>pushing</em> changes to a Kubernetes cluster using a secret key, GitOps <em>pulls</em> the changes from source control. This means we don’t need to store secrets. Figure 2 shows the Kubernetes <Hint>manifest</Hint> files that Flux will sync the cluster’s state with.
            </p>
          </SectionContents>
          <Section.Image
            src='/manifest-files.png'
            intrinsicWidth={2079}
            intrinsicHeight={1065}
            alt='A screenshot of the portfolio GitHub repo showing a list of YAML manifest files.'
            caption='Figure 2: The Kubernetes manifest files'
          />
          <SectionContents>
            <p>
              One of the key benefits of GitOps is that because we store the entire cluster state in code with uniquely tagged container images, rolling back releases is identical to rolling back the code. In the run stage of my CI/CD pipeline, I tag the portfolio container image with the commit hash it was built from, shown in Figure 3. Flux detects this change, applies it to the cluster, and Kubernetes performs a zero-downtime rolling update by spinning up the new image and then phasing out the old image.
            </p>
          </SectionContents>
          <Section.Image
            src='/image-tag.png'
            intrinsicWidth={2079}
            intrinsicHeight={1197}
            alt='A screenshot of the portfolio GitHub repo showing the portfolio-deployment.yaml file. A highlighted line shows the image hash of the current version.'
            caption='Figure 3: The image tag for the current release'
          />
        </Section>
        <Section title='Challenges'>
          <SectionContents>
            <p>
              The biggest challenge in self-hosting my portfolio was the networking. To serve a request from a user that types ‘kaichevannes.com’ into their browser, I need to:
            </p>
            <ol>
              <Li><Bold>Allow</Bold> incoming traffic on HTTP (port 80) and HTTPS (port 443) to my Oracle Cloud VM by configuring its ingress rules</Li>
              <Li><Bold>Route</Bold> incoming requests to <Hint>Traefik</Hint>, running on my Kubernetes cluster</Li>
              <Li><Bold>Provide</Bold> Traefik with the credentials to complete an <Hint>ACME</Hint> <Hint>DNS challenge</Hint> with my domain registrar</Li>
              <Li><Bold>Persist</Bold> the TLS certificate to avoid Let's Encrypt rate limits</Li>
              <Li><Bold>Redirect</Bold> HTTP (port 80) to HTTPS (port 443) using a Kubernetes Ingress resource</Li>
              <Li><Bold>Forward</Bold> HTTPS (port 443) requests to <Hint>Next.js</Hint> on its default 3000 port</Li>
            </ol>
            <p>
              Phew. You might be wondering how I knew which steps were required? I didn’t at first, but after a few days of jumping between the documentation of Kubernetes, Traefik, and K3s*, I pieced it together. Step 4 taught me why we use a staging environment!
            </p>
            <p>
              In step 3, I need to provide Traefik with a secret API token for authentication. This seems simple on the surface but with GitOps, the full cluster state is in source control. How is it possible to use secrets without pushing them to the Git repository?
            </p>
            <p>
              In enterprise, your Kubernetes cluster would be hosted with a cloud provider that has a built-in secret manager. Since I’m running a K3s cluster directly on a VM, I need to handle secrets myself.
            </p>
            <p>
              I use <Anchor href='https://github.com/bitnami-labs/sealed-secrets'>Bitnami Sealed Secrets</Anchor> which generates a public/private key pair inside the cluster. I can encrypt the secret API token using the clusters public key and safely store it in source control because the private key to decrypt this secret only exists within the cluster. You can see this in action in Figure 1, I store the necessary API tokens in environment variables, wait for the public/private key pair to be generated, seal the secrets, and automatically push them to the <Anchor href='https://github.com/kaichevannes/portfolio'>Git repository</Anchor>.
            </p>
          </SectionContents>
        </Section>
      </Main>
      <Footer />
    </MaxWidthWrapper>
  )
};

const Main = styled.div`
  padding-top: 112px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PageTitle = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: 24px 32px;
`;

const H3 = styled.h3`
color: var(--color-grey900);
font-size: {20 / 16}rem;
font-weight: ${WEIGHTS.medium};
`;

const Tech = styled.div`
  display: flex;
  gap: 32px;
  justify-content: space-between;
  height: 128px;
  padding-top: 8px;
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
  transform: translateY(-15px);
`;

const VideoWrapper = styled.div`
  margin-top: -18px;
  position: relative;
`;

const Video = styled.video`
  border-radius: 8px;
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

const SectionContents = styled.div`
  grid-column: contents;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: ${20 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  color: var(--color-grey500);
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

const FullBleed = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  margin-left: auto;
  margin-right: auto;
`;

const Caption = styled.figcaption`
  padding-top: 8px;
  font-size: ${16 / 16}rem;
  font-weight: ${WEIGHTS.regular};
  color: var(--color-grey300);
  text-align: center;
`;
